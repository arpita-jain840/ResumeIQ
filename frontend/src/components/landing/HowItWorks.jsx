import { motion } from 'framer-motion';
import {
  Upload,
  Sparkles,
  BrainCircuit,
  BarChart3,
  FilePenLine,
  FileText,
  MessageCircle,
} from 'lucide-react';

const steps = [
  {
    title: 'Upload Resume',
    description: 'Upload your PDF resume securely using our drag-and-drop uploader.',
    icon: Upload,
    accent: 'from-blue-500/30 to-cyan-400/20',
  },
  {
    title: 'AI Resume Analysis',
    description: 'Our AI extracts resume content, detects skills, analyzes ATS compatibility, and evaluates resume quality.',
    icon: BrainCircuit,
    accent: 'from-violet-500/30 to-blue-500/20',
  },
  {
    title: 'ATS Score',
    description: 'Receive an ATS score along with resume strength, detected skills, missing keywords, and recruiter insights.',
    icon: BarChart3,
    accent: 'from-cyan-500/30 to-sky-400/20',
  },
  {
    title: 'AI Resume Rewriter',
    description: 'Rewrite your resume using AI while preserving factual information and improving ATS compatibility.',
    icon: FilePenLine,
    accent: 'from-emerald-500/30 to-cyan-400/20',
  },
  {
    title: 'AI Cover Letter',
    description: 'Generate a professional cover letter tailored to your resume and job description.',
    icon: FileText,
    accent: 'from-fuchsia-500/30 to-violet-500/20',
  },
  {
    title: 'Interview Preparation',
    description: 'Practice AI-generated interview questions based on your resume.',
    icon: MessageCircle,
    accent: 'from-amber-400/30 to-orange-400/20',
    badge: 'Coming Soon',
  },
];

function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">How ResumeIQ Works</p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">From Resume Upload to Recruiter-Ready in just a few AI-powered steps.</h2>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-linear-to-b from-cyan-400/60 via-violet-400/40 to-transparent lg:block" />
        <div className="absolute left-1/2 top-0 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.9)] lg:block" />

        <div className="space-y-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLeft = index % 2 === 0;

            return (
              <div key={step.title} className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
                <div className={isLeft ? 'lg:col-start-1 lg:pr-8' : 'lg:col-start-2 lg:pl-8'}>
                  <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_0_35px_rgba(37,99,235,0.14)] backdrop-blur-xl"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(6,182,212,0.08),transparent)] opacity-85" />
                    <div className="relative flex items-start gap-4">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${step.accent} text-white shadow-[0_0_24px_rgba(6,182,212,0.25)]`}>
                        <Icon size={22} />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                          {step.badge && (
                            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
                              {step.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{step.description}</p>
                      </div>
                    </div>
                  </motion.article>
                </div>

                <div className="hidden lg:block">
                  <div className="mx-auto h-2 w-32 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_20px_rgba(37,99,235,0.50)]" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-4 -translate-x-1/2 lg:block">
          <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-linear-to-b from-cyan-400 via-blue-500 to-violet-500 opacity-70" />
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[10%] top-[12%] h-3 w-3 rounded-full bg-cyan-400/60 blur-[1px]" />
          <div className="absolute right-[18%] top-[24%] h-2 w-2 rounded-full bg-violet-400/65 blur-[1px]" />
          <div className="absolute left-[22%] bottom-[14%] h-3 w-3 rounded-full bg-blue-400/60 blur-[1px]" />
          <div className="absolute right-[12%] bottom-[18%] h-2 w-2 rounded-full bg-cyan-300/70 blur-[1px]" />
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
