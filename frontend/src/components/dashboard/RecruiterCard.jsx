import GlassCard from '../common/GlassCard';

function RecruiterCard({ recruiter = {} }) {
  return (
    <GlassCard title="Recruiter View" subtitle="Hiring signal summary">
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Recommendation</p>
          <p className="mt-2 text-lg font-semibold text-white">{recruiter.Recommendation || '—'}</p>
        </div>

        <div className="grid gap-3">
          <div>
            <p className="mb-2 text-sm font-medium text-white">Strengths</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {(recruiter.Strengths || []).map((item, index) => (
                <li key={index} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-white">Weaknesses</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {(recruiter.Weaknesses || []).map((item, index) => (
                <li key={index} className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-3 py-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default RecruiterCard;
