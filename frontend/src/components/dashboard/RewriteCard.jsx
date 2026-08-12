import { useState } from 'react';
import { Copy, Download, Maximize2 } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import GradientButton from '../common/GradientButton';

function RewriteCard({ rewrittenResume, onRewrite, loading, onCopy, onDownload }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassCard title="Resume Rewrite" subtitle="AI-generated rewrite preview">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <GradientButton onClick={onRewrite} disabled={loading} variant="secondary">
            {loading ? 'Rewriting...' : 'Rewrite Resume'}
          </GradientButton>
          <button type="button" onClick={onCopy} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"> <Copy size={14} className="mr-2 inline" /> Copy</button>
          <button type="button" onClick={onDownload} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"> <Download size={14} className="mr-2 inline" /> Download TXT</button>
          <button type="button" onClick={() => setExpanded((prev) => !prev)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"> <Maximize2 size={14} className="mr-2 inline" /> {expanded ? 'Collapse' : 'Fullscreen'}</button>
        </div>

        <div className={`rounded-[22px] border border-cyan-400/20 bg-slate-950/60 p-4 font-mono text-sm text-slate-200 ${expanded ? 'min-h-[420px]' : 'max-h-[320px] overflow-auto'}`}>
          {rewrittenResume || 'Rewrite output will appear here.'}
        </div>
      </div>
    </GlassCard>
  );
}

export default RewriteCard;
