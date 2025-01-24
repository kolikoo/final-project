// src/Components/TextInput.tsx
import React from "react";

interface TextInputProps {
  label: string;
  placeholder: string;
  register: any;
  name: string;
  errors: any;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  register,
  name,
  errors,
}) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      {...register(name)}
      className="w-full px-4 py-2 border-[2px] border-[#450920] dark:border-[#C4D7F2] focus:outline-none focus:ring-2 focus:ring-[#450920] dark:bg-zinc-900 dark:focus:ring-slate-400 rounded-[20px]"
      placeholder={placeholder}
    />
    {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
  </div>
);

export default TextInput;
