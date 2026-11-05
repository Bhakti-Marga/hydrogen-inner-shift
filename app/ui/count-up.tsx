import {useEffect, useRef, useState} from 'react';

type CountUpProps = {
  /** Whole number to count up to. */
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Figure that counts up from 0 the first time it scrolls into view. The count
 * is a CSS animation (`count-up` utility), so React renders once. SSR, no-JS
 * and reduced-motion visitors see the final value; screen readers always get
 * the final value as text.
 */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<'final' | 'idle' | 'run'>('final');

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;

    setState('idle');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState('run');
        observer.disconnect();
      },
      {threshold: 0.6},
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span className={className}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden className="tabular-nums">
        {prefix}
        <span
          ref={ref}
          data-state={state}
          style={{'--count-to': value} as React.CSSProperties}
          className="count-up motion-safe:data-[state=idle]:[--count:0] motion-safe:data-[state=run]:animate-count-up"
        />
        {suffix}
      </span>
    </span>
  );
}
