const Loader = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <div
        className={`${sizes[size]} rounded-full border-transparent border-t-teal-400 animate-spin`}
        style={{ borderTopColor: '#14b8a6' }}
      />
      {text && <span className="text-teal-400 font-exo text-sm">{text}</span>}
    </div>
  );
};

export default Loader;
