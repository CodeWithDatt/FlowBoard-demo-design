"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PasswordInput = ({ label, id, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-[12.5px] font-medium text-ink-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          {...props}
          className="h-11 w-full rounded-lg border border-border bg-background px-3.5 pr-10 text-[13.5px] text-ink placeholder:text-ink-3 transition-colors duration-200 focus:border-accent"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-3 transition-colors duration-200 hover:text-ink-2"
        >
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
