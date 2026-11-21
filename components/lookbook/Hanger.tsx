export function Hanger({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 72"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M100 36V24C100 16 112 14 112 8C112 3 107 1 103 1" />
      <path d="M6 66L100 36L194 66Z" />
    </svg>
  );
}
