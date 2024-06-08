import { createElement, useEffect, useMemo, useRef, useState } from "react"

function LazyMedia({ children, as = 'img', source, fallback, config, ...props }) {
  const ref = useRef();
  const [src, setSource] = useState(fallback || '');

  const conf = useMemo(() => {
    return {
      threshold : .5,
      ...config
    }
  }, [config]);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const iso = new IntersectionObserver((ents, _conf) => {
      for (const ent of ents)
        if (ent.isIntersecting) {
          setSource(source);
          iso.unobserve(target);
        };
    }, conf);
      iso.observe(target);
    return () => {
      iso.unobserve(target);
      iso.disconnect();
    };
  }, []);

  return createElement(
    as, 
    { ...props, src, ref }, 
    as !== 'img' ? children : null
  );
}

export default LazyMedia