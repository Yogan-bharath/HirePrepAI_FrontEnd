function Loading({ size = "md" }) {
  const sizes = {
    sm: "w-1 h-4",
    md: "w-1.5 h-6",
    lg: "w-2 h-8",
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <span className="inline-flex items-center justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`${sizes[size]} rounded-full bg-blue-600`}
          style={{
            animation: "hirePrepPulse 1s ease-in-out infinite",
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes hirePrepPulse {
          0%, 100% {
            transform: scaleY(0.35);
            opacity: 0.35;
          }

          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </span>
    </div>
  );
}

export default Loading;