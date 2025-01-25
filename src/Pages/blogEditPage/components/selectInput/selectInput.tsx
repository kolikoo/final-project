import React from "react";
import { FieldValues, UseFormRegister, FieldError } from "react-hook-form";

interface SelectInputProps {
  label: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<FieldValues>;
  name: string;
  errors: { [key: string]: FieldError | undefined };
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  register,
  name,
  errors,
}) => (
  <div>
    <label className="block font-medium">{label}</label>
    <select
      {...register(name)}
      className="w-full px-4 py-2 border-[2px] border-[#450920] focus:outline-none focus:ring-2 focus:ring-[#450920] dark:focus:ring-slate-400 rounded-[20px] dark:border-[#C4D7F2] dark:bg-zinc-900"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
  </div>
);

export default SelectInput;
