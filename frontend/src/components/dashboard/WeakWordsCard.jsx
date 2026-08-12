import GlassCard from '../common/GlassCard';

function WeakWordsCard({ weakWords = [] }) {
  return (
    <GlassCard title="Weak Words" subtitle="Language quality signals">
      <div className="flex flex-wrap gap-2">
        {weakWords.length ? (
          weakWords.map((word, index) => (
            <span key={`${word}-${index}`} className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-100">
              {word}
            </span>
          ))
        ) : (
          <p className="text-sm text-emerald-300">No weak words detected.</p>
        )}
      </div>
    </GlassCard>
  );
}

export default WeakWordsCard;
