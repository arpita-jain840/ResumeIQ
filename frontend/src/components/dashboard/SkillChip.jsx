function SkillChip({ skill }) {
  return (
    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
      {skill}
    </span>
  );
}

export default SkillChip;
