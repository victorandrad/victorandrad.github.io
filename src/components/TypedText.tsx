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
}

const TypedText: React.FC<TypedTextProps> = ({
  strings,
  className,
  style,
  loop = true,
  typeSpeed = 50,
  backSpeed = 50,
  backDelay = 1000
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const validStrings = strings?.filter(s => typeof s === 'string' && s.length > 0) ?? [];
    if (el.current && validStrings.length > 0) {
      typed.current = new Typed(el.current, {
        strings: validStrings,
        typeSpeed,
        backSpeed,
        backDelay,
        loop,
        smartBackspace: true
      });
    }

    return () => {
      if (typed.current && typeof typed.current.destroy === 'function') {
        typed.current.destroy();
      }
    };
  }, [strings, loop, typeSpeed, backSpeed, backDelay]);

  return <span ref={el} className={className} style={style}></span>;
};

export default TypedText;
