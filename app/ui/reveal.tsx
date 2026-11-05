import {useEffect, useRef, useState} from 'react';

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'li' | 'article' | 'h2';
  /** Position in a group revealed together; each step adds `--duration-stagger`. */
  order?: number;
};

/**
 * Block that rises into place the first time it scrolls into view. SSR,
 * no-JS and reduced-motion visitors see it in place; anything already on
 * screen when the page hydrates stays put rather than flickering out and back.
 * Descendants can key off it with `group-data-[state=run]/reveal:`.
 */
export function Reveal({
  as: Tag = 'div',
  order = 0,
  className = '',
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'final' | 'idle' | 'run'>('final');

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;

    const {top, bottom} = element.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) return;

    setState('idle');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState('run');
        observer.disconnect();
      },
      {rootMargin: '0px 0px -10% 0px'},
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      data-state={state}
      style={{'--reveal-order': order, ...style} as React.CSSProperties}
      className={`group/reveal motion-safe:data-[state=idle]:opacity-0 motion-safe:data-[state=run]:animate-reveal motion-safe:data-[state=run]:[animation-delay:calc(var(--reveal-order)*var(--duration-stagger))] ${className}`}
      {...rest}
    />
  );
}
