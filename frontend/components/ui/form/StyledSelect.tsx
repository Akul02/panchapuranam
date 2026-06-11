"use client"

import { useEffect, useState } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

type OptionType = {
    value: string;
    label: string;
};

const selectStyles: StylesConfig<OptionType, true> = {
    control: (base, state) => ({
        ...base,
        borderRadius: "0.375rem",
        borderWidth: "1px",
        borderColor: "var(--primary)",
        boxShadow: "none",
        fontFamily: "Georgia, serif",
        fontSize: "1rem",
        backgroundColor: "var(--surface)",
        "&:hover": {
            borderColor: "var(--primary)",
        },
    }),
    option: (base, state) => ({
        ...base,
        fontFamily: "Georgia, serif",
        fontSize: "1rem",
        borderRadius: "0.375rem",
        backgroundColor: state.isFocused
              ? "var(--surface)"
              : "#ffffff",
        color: "var(--primary)",
        "&:active": {
            backgroundColor: "var(--primary)",
            color: "var(--accent)"
        },
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "#fff",
        borderRadius: "0.375rem",
    }),
    multiValueLabel: (base) => ({
        ...base,
        fontFamily: "Georgia, serif",
        fontSize: "1rem",
        color: "var(--primary)",
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: "var(--primary)",
        "&:hover": {
            backgroundColor: "var(--primary)",
            color: "var(--surface)",
        },
    }),
    placeholder: (base) => ({
        ...base,
        fontFamily: "Georgia, serif",
        fontSize: "1rem",
        color: "var(--placeholder)",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "0.375rem",
        border: "1px solid var(--primary)",
        boxShadow: "none",
    }),
    menuList: (base) => ({
        ...base,
        padding: "2px",
    }),
};

export default function StyledSelect({
    options,
    handleSelectInput,
    error,
    instanceId,
    label,
}: {
    options: OptionType[];
    handleSelectInput?: (selected: MultiValue<OptionType>) => void;
    error?: boolean;
    instanceId: string;
    label: string;
}) {

    const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMenuPortalTarget(document.body);
    }, []);

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
                menuPortalTarget={menuPortalTarget ?? undefined}
                menuPosition="fixed"
                styles={{
                    ...selectStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
            />
        </div>
    );
}
