function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>}
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>}
    </div>
  );
}

export default SectionTitle;
