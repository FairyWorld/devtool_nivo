import { useMemo } from 'react'
import get from 'lodash/get.js'
import { stack as d3Stack, Stack, Series } from 'd3-shape'
import { useValueFormatter } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { InheritedColorConfig, useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { createLinearScale, ScaleLinear } from '@nivo/scales'
import {
    NormalizedDatum,
    ComputedDatum,
    DataProps,
    DatumPropertyAccessor,
    Layout,
    DimensionDatum,
    MarimekkoCommonProps,
    CustomLayerProps,
    BarDatum,
    OffsetId,
    offsetById,
} from './types'

// d3 stack does not support defining `.keys()` using
// a mix of keys and custom value accessors, so we're
// building a map of accessors in any case, we're gonna
// use it later for `stack.value()`.
export const useDataDimensions = <Datum>(rawDimensions: DataProps<Datum>['dimensions']) =>
    useMemo(() => {
        const dimensions: Record<string, (datum: Datum) => number> = {}
        const dimensionIds: string[] = []
        rawDimensions.forEach(dimension => {
            dimensionIds.push(dimension.id)
            dimensions[dimension.id] =
                typeof dimension.value === 'function'
                    ? dimension.value
                    : (datum: Datum) => get(datum, dimension.value as string, 0) as number
        })

        return { dimensionIds, dimensions }
    }, [rawDimensions])

export const useStack = <Datum>(
    dimensionIds: readonly string[],
    dimensions: Record<string, (datum: Datum) => number>,
    offset: OffsetId
) =>
    useMemo(() => {
        const offsetFunction = offsetById[offset]

        return d3Stack<Datum>()
            .keys(dimensionIds)
            .value((datum, key) => dimensions[key](datum))
            .offset(offsetFunction)
    }, [dimensionIds, dimensions, offset])

export const useStackedData = <Datum>(
    stack: Stack<any, Datum, string>,
    data: DataProps<Datum>['data']
) =>
    useMemo(() => {
        const stacked = stack(data)

        const allValues: number[] = []
        stacked.forEach(dimension => {
            dimension.forEach(datum => {
                allValues.push(datum[0])
                allValues.push(datum[1])
            })
        })

        const min = Math.min(...allValues)
        const max = Math.max(...allValues)

        return {
            stacked,
            min,
            max,
        }
    }, [stack, data])

export const useDimensionsScale = (
    min: number,
    max: number,
    width: number,
    height: number,
    layout: Layout
) =>
    useMemo(() => {
        const scaleData = { all: [min, max], min, max }
        const size = layout === 'vertical' ? height : width
        const axis = layout === 'vertical' ? 'y' : 'x'
        // here 'axis' determines whether the domain should be reversed or not
        return createLinearScale({ type: 'linear', min, max }, scaleData, size, axis)
    }, [min, max, width, height, layout])

export const useNormalizedData = <Datum>(
    data: DataProps<Datum>['data'],
    id: DataProps<Datum>['id'],
    value: DataProps<Datum>['value']
) => {
    const getId: DatumPropertyAccessor<Datum, string | number> = useMemo(() => {
        return typeof id === 'function' ? id : (datum: Datum) => get(datum, id)
    }, [id])
    const getValue: DatumPropertyAccessor<Datum, number> = useMemo(() => {
        return typeof value === 'function' ? value : (datum: Datum) => get(datum, value, 0)
    }, [value])

    return useMemo(() => {
        const normalized: NormalizedDatum<Datum>[] = []
        data.forEach((datum, index) => {
            const datumId = getId(datum)
            const datumValue = getValue(datum)

            normalized.push({
                index,
                id: datumId,
                value: datumValue,
                data: datum,
            })
        })

        return normalized
    }, [data, getId, getValue])
}

export const useThicknessScale = <Datum>({
    data,
    width,
    height,
    layout,
    outerPadding,
    innerPadding,
}: {
    data: NormalizedDatum<Datum>[]
    width: number
    height: number
    layout: Layout
    outerPadding: number
    innerPadding: number
}) =>
    useMemo(() => {
        const totalValue = data.reduce((acc, datum) => acc + datum.value, 0)
        const scaleData = { all: [0, totalValue], min: 0, max: totalValue }
        const totalPadding = 2 * outerPadding + (data.length - 1) * innerPadding
        const size = layout === 'vertical' ? width - totalPadding : height - totalPadding
        // here 'axis' means that the scale will be going forward, i.e. not reversed
        return createLinearScale({ type: 'linear' }, scaleData, size, 'x')
    }, [data, width, height, layout, innerPadding, outerPadding])

export const useComputedData = <Datum>({
    data,
    stacked,
    rawDimensions,
    valueFormat,
    thicknessScale,
    dimensionsScale,
    colors,
    layout,
    outerPadding,
    innerPadding,
}: {
    data: NormalizedDatum<Datum>[]
    stacked: Series<Datum, string>[]
    rawDimensions: DataProps<Datum>['dimensions']
    valueFormat: MarimekkoCommonProps<Datum>['valueFormat']
    thicknessScale: ScaleLinear<number>
    dimensionsScale: ScaleLinear<number>
    colors: MarimekkoCommonProps<Datum>['colors']
    layout: Layout
    outerPadding: number
    innerPadding: number
}) => {
    const getColor = useOrdinalColorScale<Omit<DimensionDatum<Datum>, 'color'>>(colors, 'id')

    const formatValue = useValueFormatter<number>(valueFormat)

    return useMemo(() => {
        const computedData: ComputedDatum<Datum>[] = []

        let position = outerPadding

        data.forEach(datum => {
            const thickness = thicknessScale(datum.value)

            const computedDatum: ComputedDatum<Datum> = {
                ...datum,
                x: layout === 'vertical' ? position : 0,
                y: layout === 'vertical' ? 0 : position,
                width: layout === 'vertical' ? thickness : 0,
                height: layout === 'vertical' ? 0 : thickness,
                dimensions: [],
            }
            const dimensions: DimensionDatum<Datum>[] = []

            const allPositions: number[] = []
            let totalSize = 0

            position += thickness + innerPadding

            rawDimensions.forEach(rawDimension => {
                const dimension = stacked.find(stack => stack.key === rawDimension.id)
                if (dimension) {
                    const dimensionPoint = dimension[datum.index]
                    const dimensionDatum: DimensionDatum<Datum> = {
                        id: rawDimension.id,
                        dimension: rawDimension,
                        datum: computedDatum,
                        value: dimensionPoint[1] - dimensionPoint[0],
                        formattedValue: formatValue(dimensionPoint[1] - dimensionPoint[0]),
                        color: 'rgba(0, 0, 0, 0)',
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }

                    const position0 = dimensionsScale(dimensionPoint[0])
                    const position1 = dimensionsScale(dimensionPoint[1])

                    if (layout === 'vertical') {
                        dimensionDatum.x = computedDatum.x
                        dimensionDatum.y = Math.min(position0, position1)
                        dimensionDatum.width = computedDatum.width
                        dimensionDatum.height = Math.max(position0, position1) - dimensionDatum.y

                        allPositions.push(dimensionDatum.y)
                        totalSize += dimensionDatum.height
                    } else {
                        dimensionDatum.x = Math.min(position0, position1)
                        dimensionDatum.y = computedDatum.y
                        dimensionDatum.width = Math.max(position0, position1) - dimensionDatum.x
                        dimensionDatum.height = computedDatum.height

                        allPositions.push(dimensionDatum.x)
                        totalSize += dimensionDatum.width
                    }

                    dimensionDatum.color = getColor(dimensionDatum)

                    dimensions.push(dimensionDatum)
                }

                if (layout === 'vertical') {
                    computedDatum.y = Math.min(...allPositions)
                    computedDatum.height = totalSize
                } else {
                    computedDatum.x = Math.min(...allPositions)
                    computedDatum.width = totalSize
                }
            })
            computedDatum.dimensions = dimensions

            computedData.push(computedDatum)
        })

        return computedData
    }, [
        data,
        stacked,
        rawDimensions,
        thicknessScale,
        dimensionsScale,
        layout,
        outerPadding,
        innerPadding,
        getColor,
        formatValue,
    ])
}

export const useBars = <Datum>(
    data: ComputedDatum<Datum>[],
    borderColor: InheritedColorConfig<DimensionDatum<Datum>>,
    borderWidth: number
) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<DimensionDatum<Datum>>(borderColor, theme)

    return useMemo(() => {
        const all: BarDatum<Datum>[] = []
        data.forEach(datum => {
            datum.dimensions.forEach(dimension => {
                all.push({
                    key: `${datum.id}-${dimension.id}`,
                    ...dimension,
                    borderColor: getBorderColor(dimension),
                    borderWidth,
                })
            })
        })

        return all
    }, [data, borderWidth, getBorderColor])
}

export const useMarimekko = <Datum>({
    data,
    id,
    value,
    valueFormat,
    dimensions: rawDimensions,
    layout,
    offset,
    outerPadding,
    innerPadding,
    colors,
    borderColor,
    borderWidth,
    width,
    height,
}: {
    data: DataProps<Datum>['data']
    id: DataProps<Datum>['id']
    value: DataProps<Datum>['value']
    valueFormat: MarimekkoCommonProps<Datum>['valueFormat']
    dimensions: DataProps<Datum>['dimensions']
    layout: Layout
    offset: OffsetId
    outerPadding: number
    innerPadding: number
    colors: MarimekkoCommonProps<Datum>['colors']
    borderColor: InheritedColorConfig<DimensionDatum<Datum>>
    borderWidth: number
    width: number
    height: number
}) => {
    const { dimensionIds, dimensions } = useDataDimensions<Datum>(rawDimensions)
    const stack = useStack<Datum>(dimensionIds, dimensions, offset)
    const { stacked, min, max } = useStackedData<Datum>(stack, data)
    const normalizedData = useNormalizedData<Datum>(data, id, value)
    const thicknessScale = useThicknessScale({
        data: normalizedData,
        width,
        height,
        layout,
        outerPadding,
        innerPadding,
    })
    const dimensionsScale = useDimensionsScale(min, max, width, height, layout)
    const computedData = useComputedData<Datum>({
        data: normalizedData,
        stacked,
        rawDimensions,
        valueFormat,
        thicknessScale,
        dimensionsScale,
        colors,
        layout,
        outerPadding,
        innerPadding,
    })
    const bars = useBars<Datum>(computedData, borderColor, borderWidth)

    return {
        computedData,
        bars,
        thicknessScale,
        dimensionsScale,
        dimensionIds,
    }
}

export const useLayerContext = <Datum>({
    data,
    bars,
    thicknessScale,
    dimensionsScale,
}: {
    data: ComputedDatum<Datum>[]
    bars: BarDatum<Datum>[]
    thicknessScale: ScaleLinear<number>
    dimensionsScale: ScaleLinear<number>
}): CustomLayerProps<Datum> =>
    useMemo(
        () => ({
            data,
            bars,
            thicknessScale,
            dimensionsScale,
        }),
        [data, bars, thicknessScale, dimensionsScale]
    )

export const useLegendData = <Datum>(dimensionIds: string[], bars: BarDatum<Datum>[]) => {
    const legendData: {
        id: string
        label: string
        color: string
        fill?: string
    }[] = []

    dimensionIds.forEach(dimensionId => {
        const bar = bars.find(bar => bar.id === dimensionId)
        if (bar) {
            legendData.push({
                id: dimensionId,
                label: dimensionId,
                color: bar.color,
                fill: bar.fill,
            })
        }
    })

    return legendData
}
