import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import GradientButton from './GradientButton';

function EmptyState({
  title = 'No data available.',
  description = 'Nothing to show yet.',
  buttonLabel = 'Go to Analyze Resume',
  buttonTo = '/analyze',
}) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
      <Sparkles size={28} className="mb-3 text-cyan-300" />
      <p className="text-base font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <Link to={buttonTo} className="mt-4 inline-flex">
        <GradientButton>{buttonLabel}</GradientButton>
      </Link>
    </div>
  );
}

export default EmptyState;
