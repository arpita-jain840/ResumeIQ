import { motion } from 'framer-motion';

function PageHeader({ eyebrow, title, description, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-6"
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>
      )}
      <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>}
      {badge && <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">{badge}</div>}
    </motion.div>
  );
}

export default PageHeader;
