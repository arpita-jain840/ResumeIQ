import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, BrainCircuit, FileCheck2, PenSquare, MessageSquareText } from 'lucide-react';
import GradientButton from '../common/GradientButton';

const floatingCards = [
  { title: 'ATS Score', value: '92%', detail: 'Strong alignment', accent: 'from-blue-500/35 to-cyan-400/20' },
  { title: 'Resume Strength', value: '88%', detail: 'High impact profile', accent: 'from-violet-500/35 to-blue-500/20' },
  { title: 'Detected Skills', value: '12', detail: 'AI + Analytics + Cloud', accent: 'from-cyan-500/30 to-blue-500/20' },
  { title: 'Missing Skills', value: '3', detail: 'Add SQL + ML Ops', accent: 'from-amber-400/30 to-rose-400/20' },
  { title: 'Recruiter Recommendation', value: 'Strong Hire', detail: 'Top 10% shortlist', accent: 'from-emerald-500/30 to-cyan-500/20' },
  { title: 'Resume Rewrite', value: 'AI Polished', detail: 'Tailored bullet points', accent: 'from-blue-500/30 to-violet-500/20' },
  { title: 'Cover Letter', value: 'Generated', detail: 'Job-specific tone', accent: 'from-cyan-500/25 to-sky-400/20' },
  { title: 'Interview Questions', value: '8', detail: 'Role-fit prep model', accent: 'from-violet-500/25 to-pink-400/20' },
];

function FloatingPreviewCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="rounded-[20px] border border-white/10 bg-white/5 p-3 backdrop-blur-xl"
    >
      <div className={`rounded-2xl bg-linear-to-br ${item.accent} p-3`}>
        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">{item.title}</p>
        <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
        <p className="mt-1 text-xs text-slate-300">{item.detail}</p>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col justify-center"
      >
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100">
          <Sparkles size={14} />
          AI Resume Intelligence
        </div>

        <h1 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          Land More Interviews with <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">AI</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          ResumeIQ analyzes your resume, uncovers ATS gaps, highlights missing skills, rewrites your profile, and generates recruiter-ready materials in one premium workflow.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <GradientButton className="w-full sm:w-auto">
            Analyze Resume <ArrowRight size={16} className="ml-2" />
          </GradientButton>
          <GradientButton variant="secondary" className="w-full sm:w-auto">
            See Dashboard
          </GradientButton>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            { icon: FileCheck2, label: 'ATS Ready' },
            { icon: BrainCircuit, label: 'AI Recommendations' },
            { icon: PenSquare, label: 'Resume Rewrite' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200">
                <Icon size={16} className="text-cyan-300" />
                {item.label}
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -left-8 top-6 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-8 bottom-2 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative grid gap-3 rounded-[30px] border border-white/10 bg-white/5 p-4 shadow-[0_0_50px_rgba(37,99,235,0.18)] backdrop-blur-xl sm:grid-cols-2">
          {floatingCards.map((item, index) => (
            <FloatingPreviewCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-4"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 text-emerald-300" size={18} />
            <div>
              <p className="text-sm font-semibold text-white">ResumeIQ turns resume noise into clear hiring signals.</p>
              <p className="mt-1 text-sm text-slate-300">ATS score, recruiter hints, rewrite and cover letter generation all in one premium workflow.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
