import { motion } from 'framer-motion';

function ScoreCircle({ score = 0, label = 'Score', color = 'from-blue-500 to-cyan-400' }) {
  const normalized = Math.max(0, Math.min(score, 100));
  const circumference = 2 * Math.PI * 48;
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg className="h-32 w-32 -rotate-90">
          <circle cx="64" cy="64" r="48" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="64"
            cy="64"
            r="48"
            stroke="url(#scoreGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <p className="text-2xl font-semibold text-white">{normalized}</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreCircle;
