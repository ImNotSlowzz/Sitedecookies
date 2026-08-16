interface BeeProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Bee({ className = '', style }: BeeProps) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left wing */}
      <ellipse cx="42" cy="32" rx="22" ry="14" fill="rgba(255,255,255,0.82)" stroke="rgba(40,30,20,0.15)" strokeWidth="1" />
      {/* Right wing */}
      <ellipse cx="78" cy="32" rx="22" ry="14" fill="rgba(255,255,255,0.82)" stroke="rgba(40,30,20,0.15)" strokeWidth="1" />
      {/* Body */}
      <ellipse cx="60" cy="62" rx="28" ry="24" fill="#F5C518" />
      {/* Stripes */}
      <path d="M40 55 Q60 50 80 55 L80 63 Q60 58 40 63 Z" fill="#2A1B0F" />
      <path d="M38 70 Q60 67 82 70 L82 78 Q60 75 38 78 Z" fill="#2A1B0F" />
      {/* Belly bottom */}
      <ellipse cx="60" cy="82" rx="18" ry="8" fill="#2A1B0F" />
      {/* Head */}
      <circle cx="60" cy="45" r="20" fill="#F5C518" />
      {/* Antennae */}
      <path d="M52 30 Q49 22 53 18" stroke="#2A1B0F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M68 30 Q71 22 67 18" stroke="#2A1B0F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="53" cy="17" r="2.5" fill="#2A1B0F" />
      <circle cx="67" cy="17" r="2.5" fill="#2A1B0F" />
      {/* Eyes */}
      <circle cx="53" cy="44" r="5" fill="#fff" />
      <circle cx="67" cy="44" r="5" fill="#fff" />
      <circle cx="54" cy="45" r="2.8" fill="#2A1B0F" />
      <circle cx="68" cy="45" r="2.8" fill="#2A1B0F" />
      <circle cx="55" cy="44" r="1" fill="#fff" />
      <circle cx="69" cy="44" r="1" fill="#fff" />
      {/* Cheeks */}
      <circle cx="47" cy="50" r="3.5" fill="#ff9aa2" opacity="0.55" />
      <circle cx="73" cy="50" r="3.5" fill="#ff9aa2" opacity="0.55" />
      {/* Smile */}
      <path d="M54 52 Q60 56 66 52" stroke="#2A1B0F" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Chocolate chip detail on body */}
      <circle cx="60" cy="60" r="3" fill="#3D2817" opacity="0.7" />
    </svg>
  );
}
