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
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
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
