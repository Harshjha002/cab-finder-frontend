import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AutoCompleteInput = ({ label, value, onChange, options, placeholder }) => {
    const [filtered, setFiltered] = useState([]);
    const ref = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setFiltered(
            value ? options.filter((opt) => opt.toLowerCase().includes(value.toLowerCase())) : []
        );
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!ref.current?.contains(e.target)) setFiltered([]);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <Label className="pb-3">{label}</Label>
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off"
                ref={inputRef}
            />
            {filtered.length > 0 && (
                <ul className="absolute z-10 w-full bg-popover border rounded-lg shadow-md mt-1 max-h-40 overflow-auto">
                    {filtered.map((item) => (
                        <li
                            key={item}
                            className="px-4 py-2 cursor-pointer hover:bg-muted"
                            onClick={() => {
                                onChange(item);
                                setFiltered([]);
                                inputRef.current?.blur();
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoCompleteInput;
