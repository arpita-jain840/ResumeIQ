import { motion } from 'framer-motion';
import ScoreCircle from './ScoreCircle';
import GlassCard from '../common/GlassCard';

function ATSCard({ atsScore, atsReport, recommendation }) {
  return (
    <GlassCard title="ATS Score" subtitle="Applicant tracking score overview">
      <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
        <ScoreCircle score={atsScore} label="ATS" />
        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Recruiter Recommendation</p>
            <p className="mt-2 text-lg font-semibold text-white">{recommendation}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {Object.entries(atsReport || {}).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <p className="text-xs text-slate-400">{key}</p>
                <p className="mt-1 text-sm font-medium text-white">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default ATSCard;
