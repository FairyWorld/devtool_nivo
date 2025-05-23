import {
    createElement,
    useEffect,
    useMemo,
    useRef,
    MouseEvent,
    forwardRef,
    Ref,
    ReactElement,
} from 'react'
import { getRelativeCursor, useDimensions, Container, WithChartRef, mergeRefs } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { renderLegendToCanvas } from '@nivo/legends'
import { useInheritedColor, InheritedColorConfig } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import {
    Arc,
    findArcUnderCursor,
    useArcLabels,
    drawCanvasArcLabels,
    useArcLinkLabels,
    drawCanvasArcLinkLabels,
} from '@nivo/arcs'
import { useNormalizedData, usePieFromBox } from './hooks'
import { ComputedDatum, PieCanvasProps, MayHaveLabel } from './types'
import { defaultProps } from './props'

const InnerPieCanvas = <RawDatum extends MayHaveLabel>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    sortByValue = defaultProps.sortByValue,
    startAngle = defaultProps.startAngle,
    endAngle = defaultProps.endAngle,
    padAngle = defaultProps.padAngle,
    fit = defaultProps.fit,
    innerRadius: innerRadiusRatio = defaultProps.innerRadius,
    cornerRadius = defaultProps.cornerRadius,
    activeInnerRadiusOffset = defaultProps.activeInnerRadiusOffset,
    activeOuterRadiusOffset = defaultProps.activeOuterRadiusOffset,
    width,
    height,
    margin: partialMargin,
    pixelRatio = defaultProps.pixelRatio,
    colors = defaultProps.colors,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    enableArcLabels = defaultProps.enableArcLabels,
    arcLabel = defaultProps.arcLabel,
    arcLabelsSkipAngle = defaultProps.arcLabelsSkipAngle,
    arcLabelsTextColor = defaultProps.arcLabelsTextColor,
    arcLabelsRadiusOffset = defaultProps.arcLabelsRadiusOffset,
    enableArcLinkLabels = defaultProps.enableArcLinkLabels,
    arcLinkLabel = defaultProps.arcLinkLabel,
    arcLinkLabelsSkipAngle = defaultProps.arcLinkLabelsSkipAngle,
    arcLinkLabelsOffset = defaultProps.arcLinkLabelsOffset,
    arcLinkLabelsDiagonalLength = defaultProps.arcLinkLabelsDiagonalLength,
    arcLinkLabelsStraightLength = defaultProps.arcLinkLabelsStraightLength,
    arcLinkLabelsThickness = defaultProps.arcLinkLabelsThickness,
    arcLinkLabelsTextOffset = defaultProps.arcLinkLabelsTextOffset,
    arcLinkLabelsTextColor = defaultProps.arcLinkLabelsTextColor,
    arcLinkLabelsColor = defaultProps.arcLinkLabelsColor,
    isInteractive = defaultProps.isInteractive,
    onClick,
    onMouseMove,
    tooltip = defaultProps.tooltip,
    activeId: activeIdFromProps,
    onActiveIdChange,
    defaultActiveId,
    legends = defaultProps.legends,
    forwardLegendData,
    role,
    forwardedRef,
}: PieCanvasProps<RawDatum> & {
    forwardedRef: Ref<HTMLCanvasElement>
}) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const theme = useTheme()

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const normalizedData = useNormalizedData<RawDatum>({
        data,
        id,
        value,
        valueFormat,
        colors,
    })

    const { dataWithArc, arcGenerator, centerX, centerY, radius, innerRadius, setActiveId } =
        usePieFromBox<RawDatum>({
            data: normalizedData,
            width: innerWidth,
            height: innerHeight,
            fit,
            innerRadius: innerRadiusRatio,
            startAngle,
            endAngle,
            padAngle,
            sortByValue,
            cornerRadius,
            activeInnerRadiusOffset,
            activeOuterRadiusOffset,
            activeId: activeIdFromProps,
            onActiveIdChange,
            defaultActiveId,
            forwardLegendData,
        })

    const getBorderColor = useInheritedColor<ComputedDatum<RawDatum>>(borderColor, theme)

    const arcLabels = useArcLabels<ComputedDatum<RawDatum>>({
        data: dataWithArc,
        label: arcLabel,
        skipAngle: arcLabelsSkipAngle,
        offset: arcLabelsRadiusOffset,
        textColor: arcLabelsTextColor,
    })

    const arcLinkLabels = useArcLinkLabels<ComputedDatum<RawDatum>>({
        data: dataWithArc,
        skipAngle: arcLinkLabelsSkipAngle,
        offset: arcLinkLabelsOffset,
        diagonalLength: arcLinkLabelsDiagonalLength,
        straightLength: arcLinkLabelsStraightLength,
        label: arcLinkLabel,
        linkColor: arcLinkLabelsColor,
        textOffset: arcLinkLabelsTextOffset,
        textColor: arcLinkLabelsTextColor,
    })

    useEffect(() => {
        if (!canvasEl.current) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')!

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)

        ctx.save()
        ctx.translate(margin.left, margin.top)
        arcGenerator.context(ctx)

        ctx.save()
        ctx.translate(centerX, centerY)

        dataWithArc.forEach(arc => {
            ctx.beginPath()
            ctx.fillStyle = arc.color

            ctx.strokeStyle = getBorderColor(arc)
            ctx.lineWidth = borderWidth

            arcGenerator(arc.arc)

            ctx.fill()

            if (borderWidth > 0) {
                ctx.stroke()
            }
        })

        if (enableArcLinkLabels === true) {
            drawCanvasArcLinkLabels<ComputedDatum<RawDatum>>(
                ctx,
                arcLinkLabels,
                theme,
                arcLinkLabelsThickness
            )
        }

        if (enableArcLabels === true) {
            drawCanvasArcLabels<ComputedDatum<RawDatum>>(ctx, arcLabels, theme)
        }

        // legends assume a box rather than a center,
        // that's why we restore previously saved position here.
        ctx.restore()
        legends.forEach(legend => {
            renderLegendToCanvas(ctx, {
                ...legend,
                data: dataWithArc,
                containerWidth: innerWidth,
                containerHeight: innerHeight,
                theme,
            })
        })
    }, [
        canvasEl,
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        margin.top,
        margin.left,
        pixelRatio,
        centerX,
        centerY,
        arcGenerator,
        dataWithArc,
        borderWidth,
        getBorderColor,
        enableArcLabels,
        arcLabels,
        enableArcLinkLabels,
        arcLinkLabels,
        arcLinkLabelsThickness,
        legends,
        theme,
    ])

    const arcs = useMemo(
        () =>
            dataWithArc.map(datum => ({
                id: datum.id,
                ...datum.arc,
            })),
        [dataWithArc]
    )

    const getArcFromMouse = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!canvasEl.current) return null

        const [x, y] = getRelativeCursor(canvasEl.current, event)

        const hoveredArc = findArcUnderCursor<Arc & { id: string | number }>(
            margin.left + centerX,
            margin.top + centerY,
            radius,
            innerRadius,
            arcs,
            x,
            y
        )

        if (!hoveredArc) return null

        return dataWithArc.find(datum => datum.id === hoveredArc.id)
    }

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = (event: MouseEvent<HTMLCanvasElement>) => {
        const datum = getArcFromMouse(event)
        if (datum) {
            onMouseMove?.(datum, event)
            setActiveId(datum.id)
            showTooltipFromEvent(createElement(tooltip, { datum }), event)
        } else {
            setActiveId(null)
            hideTooltip()
        }
    }

    const handleMouseLeave = () => {
        hideTooltip()
    }

    const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!onClick) return

        const arc = getArcFromMouse(event)
        if (arc) {
            onClick(arc, event)
        }
    }

    return (
        <canvas
            ref={mergeRefs(canvasEl, forwardedRef)}
            width={outerWidth * pixelRatio}
            height={outerHeight * pixelRatio}
            style={{
                width: outerWidth,
                height: outerHeight,
                cursor: isInteractive ? 'auto' : 'normal',
            }}
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
            role={role}
        />
    )
}

export const PieCanvas = forwardRef(
    <RawDatum extends MayHaveLabel>(
        {
            isInteractive = defaultProps.isInteractive,
            theme,
            renderWrapper,
            ...otherProps
        }: PieCanvasProps<RawDatum>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <Container {...{ isInteractive, renderWrapper, theme }}>
            <InnerPieCanvas<RawDatum>
                isInteractive={isInteractive}
                {...otherProps}
                forwardedRef={ref}
            />
        </Container>
    )
) as <RawDatum extends MayHaveLabel>(
    props: WithChartRef<PieCanvasProps<RawDatum>, HTMLCanvasElement>
) => ReactElement
