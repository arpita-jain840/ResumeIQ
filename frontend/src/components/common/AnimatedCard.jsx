import { motion } from 'framer-motion';

function AnimatedCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_0_35px_rgba(37,99,235,0.12)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedCard;
