const AVG_ADVANCE = 60;

export default function HeroTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const width = Math.max(1, Math.round(text.length * AVG_ADVANCE));

  return (
    <h1 data-hero-in aria-label={text} className={className}>
      <svg
        viewBox={`0 0 ${width} 100`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="block w-full overflow-visible"
      >
        <text
          x="0"
          y="80"
          textLength={width}
          lengthAdjust="spacingAndGlyphs"
          style={{ fontSize: "100px" }}
          fill="currentColor"
          className="font-display font-black uppercase"
        >
          {text}
        </text>
      </svg>
    </h1>
  );
}
