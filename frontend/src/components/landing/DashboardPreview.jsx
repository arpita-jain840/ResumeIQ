import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  FileText,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';

const detectedSkills = ['Python', 'SQL', 'React', 'Power BI', 'Machine Learning', 'Scikit-learn', 'Git', 'MongoDB'];
const missingSkills = ['Docker', 'AWS', 'Statistics', 'TensorFlow', 'GitHub Actions'];
const suggestions = ['Improve Summary', 'Add Action Verbs', 'Include Quantified Results', 'Optimize Skills Section'];

function StatChip({ label, tone = 'cyan' }) {
  const toneMap = {
    cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100',
    rose: 'border-rose-400/30 bg-rose-400/10 text-rose-100',
    emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
    violet: 'border-violet-400/30 bg-violet-400/10 text-violet-100',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -2, scale: 1.03 }}
      className={`rounded-full border px-3 py-1 text-xs font-medium ${toneMap[tone]}`}
    >
      {label}
    </motion.span>
  );
}

function DashboardCard({ title, subtitle, children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -5 }}
      className={`rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_0_40px_rgba(37,99,235,0.12)] backdrop-blur-xl ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function ScoreRing({ score = 92 }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-36 w-36 -rotate-90" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          stroke="url(#scoreGlow)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="scoreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-semibold text-white">{score}</p>
        <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">ATS</p>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Dashboard Preview</p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">A real product experience, built as a premium AI workflow dashboard.</h2>
      </div>

      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#071022]/90 p-4 shadow-[0_0_55px_rgba(37,99,235,0.18)] backdrop-blur-xl sm:p-6">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute right-1/4 top-12 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute bottom-6 right-8 h-32 w-32 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[28px_28px]" />
        </div>

        <div className="relative grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <DashboardCard title="ATS Score" subtitle="Applicant tracking alignment">
              <div className="flex items-center justify-center">
                <ScoreRing score={92} />
              </div>
            </DashboardCard>

            <DashboardCard title="Resume Strength" subtitle="Overall profile quality">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Excellent</span>
                  <span className="font-semibold text-emerald-300">88%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '88%' }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-linear-to-r from-emerald-400 to-cyan-400"
                  />
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Detected Skills" subtitle="High-confidence resume signals">
              <div className="flex flex-wrap gap-2">
                {detectedSkills.map((skill) => (
                  <StatChip key={skill} label={skill} tone="cyan" />
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Missing Skills" subtitle="Opportunities to strengthen the profile">
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <StatChip key={skill} label={skill} tone="rose" />
                ))}
              </div>
            </DashboardCard>
          </div>

          <div className="space-y-4">
            <DashboardCard title="Recruiter View" subtitle="Hiring perspective">
              <div className="space-y-4">
                <div className="rounded-[20px] border border-emerald-400/30 bg-emerald-500/10 p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Recommendation</p>
                  <p className="mt-2 text-lg font-semibold text-white">Strong Hire</p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-3">
                    <p className="mb-2 text-sm font-medium text-white">Strengths</p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2"><BadgeCheck className="mt-0.5 text-emerald-300" size={14} /> Strong Projects</li>
                      <li className="flex gap-2"><BadgeCheck className="mt-0.5 text-emerald-300" size={14} /> Good Technical Skills</li>
                      <li className="flex gap-2"><BadgeCheck className="mt-0.5 text-emerald-300" size={14} /> ATS Friendly</li>
                    </ul>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-3">
                    <p className="mb-2 text-sm font-medium text-white">Weaknesses</p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2"><Sparkles className="mt-0.5 text-amber-300" size={14} /> Add Certifications</li>
                      <li className="flex gap-2"><Sparkles className="mt-0.5 text-amber-300" size={14} /> Add SQL Project</li>
                    </ul>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="AI Suggestions" subtitle="Actionable next steps">
              <div className="space-y-3">
                {suggestions.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200">
                    <Sparkles size={14} className="text-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>
            </DashboardCard>

            <div className="grid gap-4 md:grid-cols-2">
              <DashboardCard title="Resume Rewrite Preview" subtitle="AI personalized output">
                <div className="rounded-[20px] border border-cyan-400/30 bg-slate-950/60 p-3 font-mono text-xs leading-6 text-slate-200">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-cyan-200">Rewrite</span>
                    <button className="rounded-full bg-linear-to-r from-blue-600 to-cyan-400 px-3 py-1 text-[10px] font-semibold text-white">
                      Rewrite
                    </button>
                  </div>
                  <p>• Improved leadership summary</p>
                  <p>• Stronger action verbs</p>
                  <p>• ATS-aligned project impact</p>
                </div>
              </DashboardCard>

              <DashboardCard title="Cover Letter Preview" subtitle="Professional application letter">
                <div className="rounded-[20px] border border-violet-400/30 bg-slate-950/60 p-3 text-sm leading-6 text-slate-200">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-violet-200">Document</span>
                    <button className="rounded-full bg-linear-to-r from-violet-600 to-blue-500 px-3 py-1 text-[10px] font-semibold text-white">
                      Generate
                    </button>
                  </div>
                  <p>Dear Hiring Team,</p>
                  <p className="mt-2">I am excited to apply for this role...</p>
                  <p className="mt-2">My background in AI, analytics, and product execution aligns with your team's needs.</p>
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>

        <div className="relative mt-4 flex items-center justify-between rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={16} className="text-cyan-300" />
            Live AI Dashboard Preview
          </div>
          <div className="flex items-center gap-2 text-white">
            Upload your resume and let AI analyze it in seconds.
            <ArrowRight size={16} className="text-cyan-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;
