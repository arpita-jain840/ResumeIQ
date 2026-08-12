import { motion } from 'framer-motion';

function Loader({ messages = ['Analyzing Resume...'] }) {
  return (
    <div className="rounded-[24px] border border-cyan-400/30 bg-slate-950/50 p-5 text-white shadow-[0_0_35px_rgba(6,182,212,0.18)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          className="h-4 w-4 rounded-full border-2 border-cyan-300 border-t-transparent"
        />
        <span className="text-sm font-medium text-cyan-200">{messages[0]}</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: '10%' }}
          animate={{ width: ['12%', '46%', '74%', '100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
        />
      </div>
      <div className="mt-3 space-y-1 text-xs text-slate-400">
        {messages.map((message) => (
          <p key={message}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default Loader;
