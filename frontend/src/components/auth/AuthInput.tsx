import type { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const AuthInput = ({ label, id, ...props }: AuthInputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12.5px] font-medium text-ink-2">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="h-11 rounded-lg border border-border bg-background px-3.5 text-[13.5px] text-ink placeholder:text-ink-3 transition-colors duration-200 focus:border-accent"
      />
    </div>
  );
};

export default AuthInput;
