import { useEffect, useState } from 'react';

function TypewriterText({ text, speed = 36, className = '' }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= text.length) {
          window.clearInterval(timer);
          return current;
        }

        return current + 1;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [speed, text]);

  return (
    <span className={className}>
      {text.slice(0, visibleCount)}
      <span className="typing-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}

export default TypewriterText;
