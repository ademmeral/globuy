import { createContext, createElement, useCallback, useEffect, useRef, useState } from "react"
import { useProducts } from '@hooks/products'
import { TIMEOUT_XL } from '@constants/constants';

export const useClickOut = (toggle = true) => {
  const ref = useRef();
  const [out, setOut] = useState(true);

  useEffect(() => {
    const handleClick = e => {
      if (!ref.current) return;
      const cond = !ref.current.contains(e.target);
      if (cond) setOut(() => true)
      else setOut(p => toggle ? !p : false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);
  return [ref, out];
};

export const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOn = setIsOnline(true)
    const handleOff = () => setIsOnline(false)
    window.addEventListener('online', handleOn)
    window.addEventListener('online', handleOff)

    return () => {
      window.removeEventListener('online', handleOn)
      window.removeEventListener('offline', handleOff)
    }
  }, []);

  return isOnline;
}

export const useResizeObserver = () => {
  const [size, setSize] = useState({
    width: window?.innerWidth || 0,
    height: window?.innerHeight  || 0
  });

  useEffect(() => {
    if (!window) return; // !! = Boolean(window)
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, []);

  return size;
}

export const useAsyncState = url => {
  const [state, setState] = useState({
    status : 'loading',
    error : null
  });

  useEffect(() => {
    if (state.status) return;
    (async () => {
      try {
        const { data: result } = await axios.get(url)
        setState({ ...state, status: 'success', result });
      } catch (error) {
        console.log(error)
        setState({ ...state, status: 'failed', error })
      }
    })()
  }, [url])
  return state;
}

export const useLazyProducts = (params, config) => {
  const ref = useRef();
  const [isVisible, setVisible] = useState(false);
  const swr = useProducts('', params, isVisible)

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const iso = new IntersectionObserver(
      (entries) => {
        for (const ent of entries)
          if (ent.isIntersecting) {
            // swr.trigger();
            setVisible(true);
            iso.unobserve(target);
          };
        },
      config
    );

    const clean = () => {
      iso.unobserve(target);
      iso.disconnect();
    };

    iso.observe(target);
    return clean;
  }, []);

  return { ...swr, ref }
}

export const useCopyText = (selector) => {
  const timeout = useRef(0);

  const handleCopy = async e => {
    const target = e.currentTarget;
    const element = document.querySelector(selector);
    if (!element || !target) return;
    await navigator.clipboard.writeText(element.textContent);
    clearTimeout(timeout.current);

    const prevContent = target.textContent;
    const prevColor = target.style.color;
    target.textContent = "Copied"
    target.style.color = 'var(--green-light)';

    timeout.current = setTimeout(() => {
      target.textContent = prevContent;
      target.style.color = prevColor;
    }, TIMEOUT_XL);
    
  };
  return handleCopy;
}

export const useMediaCapture = (vid) => {
  const trigger = useRef((selector = vid) => {
    const canvas = document.createElement('canvas');
    const video = document.getElementById(selector);
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight );
    return canvas;
  })
  return trigger.current;
}

export const useTimer = (duration = 1000) => {
  const id = useRef(0);
  const [seconds, setSeconds] = useState(0);
  // const [active, setActive] = useState(true);

  const start = useCallback(() => {
    clearInterval(id.current);
    // setActive(() => true)
    id.current = setInterval(
      () => setSeconds(p => p + duration), 
      duration
    );
  }, [])

  const pause = useCallback(() => {
    // setActive(() => false)
    clearInterval(id.current);
  }, [])

  const reset = useCallback(() => {
    pause();
    setSeconds(0)
  }, [])

  return { 
    start, pause, reset, id: id.current, 
    seconds, //active,
  };
} 