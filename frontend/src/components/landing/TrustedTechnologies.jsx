import { motion } from 'framer-motion';
import { BrainCircuit, Database, FlaskConical, GitBranch, Image, LineChart, Layers3, NotebookTabs, Rocket } from 'lucide-react';

const technologies = [
  { name: 'Python', icon: NotebookTabs },
  { name: 'React', icon: Rocket },
  { name: 'Flask', icon: FlaskConical },
  { name: 'Scikit-learn', icon: Layers3 },
  { name: 'Power BI', icon: LineChart },
  { name: 'OpenCV', icon: Image },
  { name: 'MySQL', icon: Database },
  { name: 'MongoDB', icon: Database },
  { name: 'Git', icon: GitBranch },
  { name: 'GitHub', icon: GitBranch },
  { name: 'Gemini AI', icon: BrainCircuit },
];

function TrustedTechnologies() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(37,99,235,0.14)] backdrop-blur-xl">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Trusted Technologies</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Built with modern AI and data tooling</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-[22px] border border-white/10 bg-slate-950/40 px-4 py-4 text-center transition"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/20 to-cyan-400/20 text-cyan-200">
                  <Icon size={18} />
                </div>
                <p className="mt-3 text-sm font-medium text-white">{tech.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustedTechnologies;
