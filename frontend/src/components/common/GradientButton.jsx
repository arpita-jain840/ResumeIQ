function GradientButton({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) {
  const base = 'inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:scale-[1.02]',
    secondary: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
    ghost: 'text-slate-300 hover:text-white',
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export default GradientButton;
