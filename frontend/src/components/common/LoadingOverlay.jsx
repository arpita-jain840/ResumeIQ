import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function LoadingOverlay({ message = 'Loading...', subtext = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="flex min-h-[260px] items-center justify-center text-center"
    >
      <div>
        <Loader2 size={28} className="mx-auto animate-spin text-cyan-300" />
        <p className="mt-3 text-cyan-200">{message}</p>
        {subtext && <p className="mt-1 text-xs text-slate-400">{subtext}</p>}
      </div>
    </motion.div>
  );
}

export default LoadingOverlay;
