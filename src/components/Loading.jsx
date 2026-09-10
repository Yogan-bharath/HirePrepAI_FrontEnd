function Loading({ size = 28, color = "bg-white/70" }) {
  return (
    <span className="inline-flex items-center gap-[3px] h-6">
      {Array.from({ length: size }).map((_, i) => (
        <span
          key={i}
          className={`w-1 h-full rounded-full ${color}`}
          style={{
            animation: "barPulse 1.1s ease-in-out infinite",
            animationDelay: `${i * 0.045}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes barPulse {
          0%, 100% { transform: scaleY(0.3); opacity: 0.25; }
          50% { transform: scaleY(1); opacity: 0.9; }
        }
      `}</style>
    </span>
  );
}

export default Loading;