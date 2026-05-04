const SmiloLogo = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="0"
        y="30"
        fontFamily="'Fraunces', serif"
        fontSize="28"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        Smilo
      </text>
    </svg>
  );
};

export default SmiloLogo;
