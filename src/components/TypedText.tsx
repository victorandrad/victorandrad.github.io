import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypedTextProps {
  strings: string[];
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  /**
   * If true, the typing animation runs only once across the component's lifetime,
   * even if `strings` reference changes or other props update.
   */
  once?: boolean;
}

const TypedText: React.FC<TypedTextProps> = ({
  strings,
  className,
  style,
  loop = true,
  typeSpeed = 50,
  backSpeed = 50,
  backDelay = 1000,
  once = false,
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);
  const lastKey = useRef<string>('');
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const validStrings = strings?.filter(s => typeof s === 'string' && s.length > 0) ?? [];
    const newKey = validStrings.join('');

    // Skip if content is identical to last animation
    if (newKey === lastKey.current) return;
    // Skip if `once` and already animated with real content
    if (once && hasAnimated.current) return;

    lastKey.current = newKey;

    if (typed.current && typeof typed.current.destroy === 'function') {
      typed.current.destroy();
      typed.current = null;
    }

    if (el.current && validStrings.length > 0) {
      typed.current = new Typed(el.current, {
        strings: validStrings,
        typeSpeed,
        backSpeed,
        backDelay,
        loop,
        smartBackspace: true,
      });
      hasAnimated.current = true;
    }
  }, [strings, once, loop, typeSpeed, backSpeed, backDelay]);

  // Cleanup only on unmount
  useEffect(() => {
    return () => {
      if (typed.current && typeof typed.current.destroy === 'function') {
        typed.current.destroy();
        typed.current = null;
      }
    };
  }, []);

  return <span ref={el} className={className} style={style}></span>;
};

export default TypedText;
