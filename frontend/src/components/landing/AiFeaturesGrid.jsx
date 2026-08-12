import { motion } from 'framer-motion';
import { BarChart3, BrainCircuit, ClipboardList, FileCheck2, FileText, GraduationCap, Lightbulb, SearchCheck, ShieldCheck, Sparkles, BadgeAlert } from 'lucide-react';

const features = [
  {
    title: 'ATS Score Analysis',
    description: 'Instantly measures resume alignment against ATS and hiring-readiness benchmarks.',
    icon: BarChart3,
  },
  {
    title: 'Resume Strength Analysis',
    description: 'Gives a clear score of overall resume quality across structure, skills, and outcomes.',
    icon: ShieldCheck,
  },
  {
    title: 'Detected Skills',
    description: 'Extracts and highlights technical and domain skills surfaced in the resume content.',
    icon: SearchCheck,
  },
  {
    title: 'Missing Skills Detection',
    description: 'Points out role-critical gaps so the user knows what to add next.',
    icon: BadgeAlert,
  },
  {
    title: 'AI Resume Rewriter',
    description: 'Transforms weak language into stronger, role-targeted language with better clarity.',
    icon: FileText,
  },
  {
    title: 'AI Cover Letter Generator',
    description: 'Generates tailored cover letters from resume intelligence and job context.',
    icon: ClipboardList,
  },
  {
    title: 'Recruiter View',
    description: 'Presents a simplified hiring perspective with strengths, gaps, and opportunities.',
    icon: BrainCircuit,
  },
  {
    title: 'Professional Suggestions',
    description: 'Equips users with direct, practical next-step recommendations to improve impact.',
    icon: Lightbulb,
  },
  {
    title: 'Weak Words Detection',
    description: 'Flags generic or weak phrasing that reduces resume confidence and relevance.',
    icon: FileCheck2,
  },
  {
    title: 'Future Interview Questions',
    description: 'Prepares candidates for likely role-based interview prompts and follow-up questions.',
    icon: GraduationCap,
    badge: 'Coming Soon',
  },
];

function AiFeaturesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">AI Features</p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Everything the modern resume pipeline needs</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(6,182,212,0.08),transparent)] opacity-80" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/20 to-cyan-400/20 text-cyan-200">
                    <Icon size={20} />
                  </div>
                  {feature.badge && (
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default AiFeaturesGrid;
