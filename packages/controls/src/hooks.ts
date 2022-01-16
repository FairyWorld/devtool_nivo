import { useCallback, useState } from 'react'
import { ControlProps } from './types'

export const useControl = <Props extends ControlProps = any>({
    value: _value,
    onChange: _onChange,
    context = { path: [] },
    ...rest
}: Props) => {
    const [value, setValue] = useState<Props['value']>(_value)

    const onChange = useCallback(
        (newValue: Props['value']) => {
            setValue(newValue)
            _onChange?.(newValue)
        },
        [setValue, _onChange]
    )

    return {
        value,
        onChange,
        context,
        ...rest,
    }
}