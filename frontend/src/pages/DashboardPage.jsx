import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, BrainCircuit, ClipboardList, Gauge, Sparkles, ShieldCheck } from 'lucide-react';
import ATSCard from '../components/dashboard/ATSCard';
import RecruiterCard from '../components/dashboard/RecruiterCard';
import SuggestionCard from '../components/dashboard/SuggestionCard';
import WeakWordsCard from '../components/dashboard/WeakWordsCard';
import SkillChip from '../components/dashboard/SkillChip';
import GlassCard from '../components/common/GlassCard';
import EmptyState from '../components/common/EmptyState';
import Navbar from '../components/landing/Navbar';

function DashboardPage() {
  const location = useLocation();
  const analysis = location.state || null;

  const score = Number(analysis?.['ATS Score'] ?? 0);
  const strength = Number(analysis?.['Resume Strength'] ?? 0);
  const detectedSkills = Array.isArray(analysis?.['Detected Skills']) ? analysis['Detected Skills'] : [];
  const missingSkills = Array.isArray(analysis?.['Missing Skills']) ? analysis['Missing Skills'] : [];
  const weakWords = Array.isArray(analysis?.['Weak Words']) ? analysis['Weak Words'] : [];
  const recruiterView = analysis?.['Recruiter View'] || {};
  const suggestions = Array.isArray(analysis?.['Suggestions']) ? analysis['Suggestions'] : [];

  const strengthLabel = strength >= 80 ? 'Excellent' : strength >= 60 ? 'Strong' : strength >= 40 ? 'Average' : 'Needs work';

  const getScoreTone = (value) => {
    if (value >= 80) return 'from-emerald-400 to-cyan-300';
    if (value >= 60) return 'from-cyan-400 to-blue-500';
    if (value >= 40) return 'from-amber-400 to-orange-500';
    return 'from-rose-400 to-red-500';
  };

  if (!analysis) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#050816] px-4 py-10 text-white">
          <div className="mx-auto mt-16 max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_0_45px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <Sparkles size={28} className="mx-auto mb-4 text-cyan-300" />
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Resume Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">No resume analyzed yet.</h1>
            <p className="mt-2 text-sm text-slate-400">Upload a PDF on the analyze page to unlock ATS intelligence and recruiter-focused recommendations.</p>
            <div className="mt-6">
              <EmptyState
                title="Start with a fresh analysis"
                description="Drop a PDF and let the AI evaluation pipeline generate your resume intelligence dashboard."
                buttonLabel="Analyze Resume"
                buttonTo="/analyze"
              />
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050816] text-white pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Resume Intelligence Snapshot</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Live results from the backend analysis response.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Analysis result loaded from router state
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <ATSCard
              atsScore={score}
              atsReport={analysis['ATS Report'] || {}}
              recommendation={recruiterView.Recommendation}
            />

            <GlassCard title="Resume Strength" subtitle="Overall profile quality">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-cyan-200">
                    <Gauge size={16} />
                    <span className="text-sm font-medium">Strength score</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{strength}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strength}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${getScoreTone(strength)}`}
                  />
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2 text-sm text-slate-300">
                  <span className="font-semibold text-white">Label:</span> {strengthLabel}
                </div>
              </div>
            </GlassCard>

            <div className="grid gap-4 lg:grid-cols-2">
              <GlassCard title="Detected Skills" subtitle="High-confidence resume signals">
                <div className="flex flex-wrap gap-2">
                  {detectedSkills.length ? (
                    detectedSkills.map((skill, index) => (
                      <motion.div key={`${skill}-${index}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                        <SkillChip skill={skill} />
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No detected skills found.</p>
                  )}
                </div>
              </GlassCard>

              <GlassCard title="Missing Skills" subtitle="Opportunities to strengthen the profile">
                <div className="flex flex-wrap gap-2">
                  {missingSkills.length ? (
                    missingSkills.map((skill, index) => (
                      <motion.span
                        key={`${skill}-${index}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-100"
                      >
                        {skill}
                      </motion.span>
                    ))
                  ) : (
                    <p className="text-sm text-emerald-300">No missing skills detected.</p>
                  )}
                </div>
              </GlassCard>
            </div>

            <WeakWordsCard weakWords={weakWords} />
            <RecruiterCard recruiter={recruiterView} />
            <SuggestionCard suggestions={suggestions} />
          </div>

          <div className="space-y-4">
            <GlassCard title="AI Summary" subtitle="Executive overview">
              <div className="space-y-3">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-50">
                  <div className="mb-2 flex items-center gap-2 text-cyan-200">
                    <BrainCircuit size={16} />
                    <span className="font-medium">Recruiter recommendation</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{recruiterView.Recommendation || '—'}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="mb-2 flex items-center gap-2 text-emerald-300">
                      <ShieldCheck size={16} />
                      <span className="text-sm font-medium">Strengths</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {(recruiterView.Strengths || []).map((item, index) => (
                        <li key={`${item}-${index}`} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="mb-2 flex items-center gap-2 text-amber-300">
                      <AlertTriangle size={16} />
                      <span className="text-sm font-medium">Weaknesses</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {(recruiterView.Weaknesses || []).map((item, index) => (
                        <li key={`${item}-${index}`} className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-3 py-2">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard title="Checklist" subtitle="Action items for improvement">
              <div className="space-y-3">
                {(suggestions || []).length ? (
                  suggestions.map((item, index) => (
                    <motion.div
                      key={`${item}-${index}`}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                    >
                      <div className="mt-0.5 rounded-full bg-cyan-400/10 p-1 text-cyan-300">
                        <ClipboardList size={14} />
                      </div>
                      <p className="text-sm text-slate-200">{item}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No suggestions available.</p>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

export default DashboardPage;
