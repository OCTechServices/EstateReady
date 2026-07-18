interface CompassMarkProps {
  size?: number
}

export default function CompassMark({ size = 26 }: CompassMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" fill="#1A4A2E" />
      <circle cx="16" cy="16" r="11.5" fill="none" stroke="#B5935A" strokeWidth="1.5" />
      <path d="M16 5L20 16L16 14L12 16Z" fill="#B5935A" />
      <path d="M16 27L20 16L16 18L12 16Z" fill="none" stroke="#B5935A" strokeWidth="1.25" />
      <circle cx="16" cy="16" r="1.75" fill="#1A4A2E" stroke="#B5935A" strokeWidth="1" />
    </svg>
  )
}
