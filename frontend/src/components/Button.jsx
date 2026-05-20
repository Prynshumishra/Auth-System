import Loader from './Loader';

const Button = ({
  children,
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
  variant = 'primary',
  fullWidth = true,
  className = '',
}) => {
  const variants = {
    primary: 'btn-teal text-white font-semibold',
    outline:
      'bg-transparent border border-teal-500/50 text-teal-400 hover:border-teal-400 hover:bg-teal-500/10 transition-all duration-300',
    danger:
      'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 transition-all duration-300',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        ${variants[variant]}
        px-6 py-3.5 rounded-xl
        font-orbitron text-sm tracking-wider uppercase
        flex items-center justify-center gap-2
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
    >
      {loading ? <Loader size="sm" /> : children}
    </button>
  );
};

export default Button;
