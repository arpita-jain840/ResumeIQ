function GlassCard({ title, subtitle, children, className = '' }) {
  return (
    <section className={`rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_0_35px_rgba(37,99,235,0.12)] backdrop-blur-xl ${className}`}>
      {title && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}

export default GlassCard;
