const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
  required = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-xs font-semibold text-teal-400 uppercase tracking-widest mb-2 font-exo"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-500 opacity-70">
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full glass-input rounded-xl px-4 py-3.5
            ${icon ? 'pl-11' : 'pl-4'}
            text-slate-200 placeholder-slate-500
            font-exo text-sm
            focus:ring-0
            ${error ? 'border-red-500/60 focus:border-red-400' : ''}
          `}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-exo flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
