import GlassCard from '../common/GlassCard';

function SuggestionCard({ suggestions = [] }) {
  return (
    <GlassCard title="Suggestions" subtitle="Actionable improvements">
      <div className="space-y-3">
        {suggestions.map((item, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default SuggestionCard;
