import { RefreshCw } from 'lucide-react';
import GradientButton from './GradientButton';

function ErrorState({ title = 'Something went wrong.', description = 'Please try again.', onRetry }) {
  return (
    <div className="rounded-[28px] border border-rose-400/20 bg-rose-500/10 p-6 text-center shadow-[0_0_35px_rgba(244,63,94,0.12)] backdrop-blur-xl">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-200">
        <RefreshCw size={22} className="animate-spin" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      {onRetry && (
        <div className="mt-4">
          <GradientButton onClick={onRetry}>Try Again</GradientButton>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
