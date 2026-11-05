/** 14.5×9.5 right arrow for text links and buttons; inherits `currentColor`. */
export function ArrowRightIcon({className = ''}: {className?: string}) {
  return (
    <svg
      aria-hidden
      width="14.5"
      height="9.5"
      viewBox="0 0 14.5 9.5"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <path
        transform="translate(0 9.5) rotate(-90)"
        d="M5.30353 14.2561C5.16144 14.4115 4.96057 14.5 4.75001 14.5C4.53944 14.5 4.33857 14.4115 4.19648 14.2561L0.196483 9.88108C-0.0830155 9.57538 -0.0617738 9.10098 0.243928 8.82148C0.549629 8.54198 1.02403 8.56322 1.30353 8.86892L4.00001 11.8182V0.75C4.00001 0.335787 4.33579 0 4.75001 0C5.16422 0 5.50001 0.335787 5.50001 0.75V11.8182L8.19648 8.86892C8.47598 8.56322 8.95038 8.54198 9.25608 8.82148C9.56178 9.10098 9.58302 9.57537 9.30353 9.88108L5.30353 14.2561Z"
        fill="currentColor"
      />
    </svg>
  );
}
