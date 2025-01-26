import React from "react";

interface SelectInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  options,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-2">
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-[#450920] dark:border-slate-400 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
