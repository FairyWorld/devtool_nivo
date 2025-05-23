import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveSwarmPlot, defaultProps } from '@nivo/swarmplot'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/swarmplot/meta.yml'
import mapper from '../../data/components/swarmplot/mapper'
import { groups } from '../../data/components/swarmplot/props'
import { generateLightDataSet } from '../../data/components/swarmplot/generator'

const initialProperties = Object.freeze({
    value: 'price',
    valueFormat: { format: '$.2f', enabled: false },
    valueScale: {
        type: 'linear',
        min: 0,
        max: 500,
        reverse: false,
    },
    size: {
        key: 'volume',
        values: [4, 20],
        sizes: [6, 20],
    },
    spacing: 2,
    layout: defaultProps.layout,
    gap: defaultProps.gap,
    forceStrength: 4,
    simulationIterations: 100,
    colors: defaultProps.colors,
    colorBy: 'group',
    borderWidth: 0,
    borderColor: defaultProps.borderColor,
    margin: {
        top: 80,
        right: 100,
        bottom: 80,
        left: 100,
    },
    enableGridX: true,
    enableGridY: true,
    axisTop: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0,
    },
    axisRight: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 60,
        truncateTickAt: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'group if vertical, price if horizontal',
        legendPosition: 'middle',
        legendOffset: 40,
        truncateTickAt: 0,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'price if vertical, group if horizontal',
        legendPosition: 'middle',
        legendOffset: -60,
        truncateTickAt: 0,
    },
    isInteractive: true,
    useMesh: false,
    debugMesh: false,
    animate: true,
    motionConfig: 'gentle',
})

const SwarmPlot = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/swarmplot.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="SwarmPlot"
            meta={meta.SwarmPlot}
            icon="swarmplot"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                groups: data.groups,
                ...properties,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
            getDataSize={data => data.data.length}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveSwarmPlot
                        {...properties}
                        data={data.data}
                        groups={data.groups}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] id: ${node.id}, group: ${node.group}, value: ${node.value}`,
                                color: node.color,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default SwarmPlot
