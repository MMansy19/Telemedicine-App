interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  additionalText?: string;
  errorText?: string;
}

const InputComponent = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  additionalText,
  errorText,
}: InputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-1.5 text-base font-semibold text-neutral-700"
      >
        {label} {required && "*"}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={onChange}
        required={required}
        className="bg-neutral-100 w-full py-4 px-6 text-base rounded-lg border border-solid border-neutral-300 grey-100 outline-none transition-[border-color] focus:border-sky-500 focus:bg-neutral-50"
      />
      {additionalText && (
        <small className="text-xs mt-1 text-neutral-500">
          {additionalText}
        </small>
      )}
      {errorText && (
        <small className="text-xs mt-1 text-red-700 font-semibold">
          {errorText}
        </small>
      )}
    </div>
  );
};

export default InputComponent;
