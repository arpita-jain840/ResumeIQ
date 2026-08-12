import { Copy, Download, Printer } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import GradientButton from '../common/GradientButton';

function CoverLetterCard({ coverLetter, onGenerate, loading, onCopy, onDownload, onPrint }) {
  return (
    <GlassCard title="Cover Letter" subtitle="AI-generated application letter">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <GradientButton onClick={onGenerate} disabled={loading} variant="secondary">
            {loading ? 'Generating...' : 'Generate Cover Letter'}
          </GradientButton>
          <button type="button" onClick={onCopy} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"><Copy size={14} className="mr-2 inline" /> Copy</button>
          <button type="button" onClick={onDownload} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"><Download size={14} className="mr-2 inline" /> Download</button>
          <button type="button" onClick={onPrint} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"><Printer size={14} className="mr-2 inline" /> Print</button>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-slate-950/55 p-4 text-sm leading-7 text-slate-200">
          {coverLetter || 'The generated cover letter will appear here.'}
        </div>
      </div>
    </GlassCard>
  );
}

export default CoverLetterCard;
