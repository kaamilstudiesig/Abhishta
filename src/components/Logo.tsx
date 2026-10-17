/**
 * Interim vector logo: a 1.5px line palm-and-sun mark with a Fraunces wordmark.
 * Replace with the client's redrawn palm + cow mark when it arrives.
 */
export function Logo({ className = "", subtitle = true }: { className?: string; subtitle?: boolean }) {
  return (
    <span translate="no" className={`inline-flex items-center gap-s8 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="23.5" cy="21" r="5" className="text-gold" stroke="currentColor" />
        <path d="M14 30c.6-6.5.3-12-1.2-17" />
        <path d="M12.8 13C10 9.5 6.3 9 3.5 10.8 6.8 10.6 9.8 11.6 12.8 13z" />
        <path d="M12.8 13c.6-4.4 3.8-7.3 7.8-7.3-3 1.4-5.5 3.9-7.8 7.3z" />
        <path d="M12.8 13c-1.6-4-.6-7.8 2.4-10-1.2 3-1.6 6.4-2.4 10z" />
        <path d="M12.8 13c3.6-1.6 7.6-.6 9.7 2.2-3.4-1.2-6.6-1.6-9.7-2.2z" />
        <path d="M3 30.5h28" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[23px] font-medium tracking-[-0.01em]">Abhishta</span>
        {subtitle ? (
          <span className="mt-[3px] text-[9.5px] font-bold tracking-[0.24em] uppercase opacity-80">
            Agri Farm Stay
          </span>
        ) : null}
      </span>
    </span>
  );
}
