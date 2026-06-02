import Select, { MultiValue, StylesConfig } from 'react-select'

type OptionType = {
    value: string,
    label: string,
}

const selectStyles: StylesConfig<OptionType, true> = {
    control: (base, state) => ({
        ...base,
        borderRadius: '6px',
        borderWidth: '1.5px',
        borderColor: state.isFocused ? '#4A1515' : '#7A2828',
        boxShadow: 'none',
        fontFamily: 'Georgia, serif',
        fontSize: '13px',
        color: '#2C1A1A',
        backgroundColor: '#fff',
        '&:hover': {
            borderColor: '#4A1515',
        },
    }),
    option: (base, state) => ({
        ...base,
        fontFamily: 'Georgia, serif',
        fontSize: '13px',
        backgroundColor: state.isSelected ? '#6B2121' : state.isFocused ? '#EDE7D9' : '#fff',
        color: state.isSelected ? '#C8A84B' : '#2C1A1A',
        '&:active': {
            backgroundColor: '#4A1515',
        },
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#EDE7D9',
        borderRadius: '4px',
    }),
    multiValueLabel: (base) => ({
        ...base,
        fontFamily: 'Georgia, serif',
        fontSize: '12px',
        color: '#6B2121',
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: '#7A5C5C',
        '&:hover': {
            backgroundColor: '#6B2121',
            color: '#C8A84B',
        },
    }),
    placeholder: (base) => ({
        ...base,
        fontFamily: 'Georgia, serif',
        fontSize: '13px',
        color: '#b0978e',
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '6px',
        border: '1.5px solid #7A2828',
        boxShadow: 'none',
    }),
    menuList: (base) => ({
        ...base,
        padding: '4px',
    }),
}

export default function StyledSelect({ options, handleSelectInput, error, instanceId, label }: {
    options: OptionType[],
    handleSelectInput?: (selected: MultiValue<OptionType>) => void,
    error?: boolean,
    instanceId: string,
    label: string
}) {
    return (
        <div className="w-full">
            <label className="block text-xs font-bold uppercase tracking-widest text-maroon/60 mb-1">
                {label}
            </label>
            <Select
                isMulti
                options={options}
                onChange={handleSelectInput}
                instanceId={instanceId}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                    ...selectStyles,
                    control: (base, state) => ({
                        ...selectStyles.control!(base, state),
                        borderColor: error ? '#E24B4A' : state.isFocused ? '#4A1515' : '#7A2828',
                    }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
            />
        </div>
    )
}
