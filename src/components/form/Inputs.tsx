import { cn } from "@/lib/utils";
import * as React from "react";
import { Icon } from "../Icon";

type InputWrapperProps = {
  label: React.ReactNode;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
};

export function InputWrapper({
  label,
  labelProps,
  error,
  wrapperProps,
  children,
}: React.PropsWithChildren<InputWrapperProps>) {
  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
  const { className: wrapperClassName, ...restWrapperProps } = wrapperProps ?? {};

  return (
    <div
      data-invalid={!!error}
      className={cn("group flex flex-col gap-2 w-[268px]", wrapperClassName)}
      {...restWrapperProps}
    >
      <label
        className={cn(
          "text-sm font-semibold leading-[19px] tracking-[0.5%] text-form-foreground",
          'group-has-[:required]:after:content-["*"] group-has-[:required]:after:text-[#FF6363]',
          labelClassName
        )}
        {...restLabelProps}
      >
        {label}
      </label>

      {children}

      {error && <span className="text-xs text-[#FF6363] leading-[19px] tracking-[0.5%]">{error}</span>}
    </div>
  );
}

type InputProps = {
  extra?: {
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
  };
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;
export function Input({ className, extra, wrapperProps, ...rest }: InputProps) {
  const { suffix, prefix } = extra ?? {};
  const { className: wrapperClassName, onClick, ...restWrapperProps } = wrapperProps ?? {};
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "relative group border inline-flex items-center border-form-input group-data-[invalid=true]:!border-[#FF6363] rounded-lg overflow-hidden bg-white",
        wrapperClassName
      )}
      onClick={(e) => {
        if (rest.type === "date") {
          e.preventDefault();
          inputRef.current?.showPicker();
        } else {
          onClick?.(e);
        }
      }}
      {...restWrapperProps}
    >
      {prefix && <div className="p-3 bg-form-muted text-sm leading-[19px]">{prefix}</div>}
      {rest.type === "date" && <Icon name="Calendar" className="absolute left-4 stroke-form-primary size-[18px]" />}
      <input
        ref={inputRef}
        className={cn(
          "px-4 py-3 grow placeholder-form-muted-foreground text-sm leading-[19px] tracking-[0.5%] outline-none disabled:bg-form-input disabled:text-form-foreground",
          "[&::-webkit-calendar-picker-indicator]:hidden",
          rest.type === "date" && "pl-10",
          className
        )}
        {...rest}
      />
      {suffix && <div className="p-3 bg-form-muted text-sm leading-[19px]">{suffix}</div>}
    </div>
  );
}

type SelectProps = {
  options: { value: string; label: string }[];
  placeholder?: string;
  optionProps?: React.OptionHTMLAttributes<HTMLOptionElement>;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
export function Select({ className, options, optionProps, placeholder, ...rest }: SelectProps) {
  const { className: optionClassName, ...restOptionProps } = optionProps ?? {};
  return (
    <div className="relative">
      <select
        className={cn(
          "w-full border border-form-input group-data-[invalid=true]:!border-[#FF6363] rounded-lg overflow-hidden bg-white appearance-none",
          "px-4 pr-8 py-3 placeholder-form-muted-foreground text-sm leading-[19px] tracking-[0.5%] outline-none disabled:bg-form-input disabled:text-form-foreground",
          "[&>option]:text-form-foreground [&>option:disabled]:text-form-muted-foreground",
          rest.value === "" && "text-form-muted-foreground",
          className
        )}
        {...rest}
      >
        <option hidden disabled value="">
          {placeholder ?? "Pilih salah satu"}
        </option>
        {options.length ? (
          options.map((option, index) => (
            <option
              key={`option-${index}`}
              value={option.value}
              className={cn("", optionClassName)}
              {...restOptionProps}
            >
              {option.label}
            </option>
          ))
        ) : (
          <option disabled value="-" className={cn("", optionClassName)} {...restOptionProps}>
            Tidak ada opsi
          </option>
        )}
      </select>
      <Icon
        name="ChevronDown"
        className="absolute stroke-form-primary right-3 top-1/2 transform -translate-y-1/2 size-[18px] p-0.5 pointer-events-none"
      />
    </div>
  );
}

type CheckboxProps = {
  children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;
export function Checkbox({ className, children, ...rest }: CheckboxProps) {
  return (
    <label className="inline-flex gap-2 items-center text-sm leading-[19px] tracking-[0.5%]">
      <input
        type="checkbox"
        className={cn(
          "size-[18px] rounded appearance-none bg-white m-0 border border-form-input grid place-items-center",
          "checked:bg-form-primary checked:border-form-primary before:checked:content-['✔'] before:checked:text-xs before:checked:grid before:checked:place-items-center before:checked:size-[16px] before:checked:text-white before:checked:font-bold",
          className
        )}
        {...rest}
      />
      {children}
    </label>
  );
}
