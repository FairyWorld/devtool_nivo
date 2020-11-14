import React, { memo, ReactNode } from 'react'
// @ts-ignore
import { useTheme, useValueFormatter } from '@nivo/core'
import { Chip } from './Chip'

interface BasicTooltipProps {
    id: ReactNode
    value?: number | string
    color?: string
    enableChip?: boolean
    renderContent?: () => JSX.Element
}

export const BasicTooltip = memo<BasicTooltipProps>(
    ({ id, value: _value, format, enableChip = false, color, renderContent }) => {
        const theme = useTheme()
        const formatValue = useValueFormatter(format)

        let content: JSX.Element
        if (typeof renderContent === 'function') {
            content = renderContent()
        } else {
            let value = _value
            if (formatValue !== undefined && value !== undefined) {
                value = formatValue(value)
            }
            content = (
                <div style={theme.tooltip.basic}>
                    {enableChip && <Chip color={color} style={theme.tooltip.chip} />}
                    {value !== undefined ? (
                        <span>
                            {id}: <strong>{isNaN(value) ? String(value) : value}</strong>
                        </span>
                    ) : (
                        id
                    )}
                </div>
            )
        }

        return <div style={theme.tooltip.container}>{content}</div>
    }
)

/*
BasicTooltip.displayName = 'BasicTooltip'
BasicTooltip.propTypes = {
    id: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    enableChip: PropTypes.bool.isRequired,
    color: PropTypes.string,
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    renderContent: PropTypes.func,
}
BasicTooltip.defaultProps = {
    enableChip: false,
}
*/