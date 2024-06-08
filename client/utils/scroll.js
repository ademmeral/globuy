/**
  * @ADEMMERAL_xSmoothScroll
  * https://github.com/ademmeral/XModules/blob/main/xSmoothScroll.js
*/

export function smoothScroll({ element, targetPos = 0, duration = 1000, direction = 'x' } = {}) {
  if (!element) return;
  if (!['x','y'].includes(direction))
    throw new Error('We do not support other directions! LoL');

  element.classList.remove(`${direction}-mandatory`);
  let reqId;
  const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const startTime = Date.now();
  let startPos = direction === 'x' ? element.scrollLeft : element.scrollTop;

  function xScrollStep() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easing(progress);
    const _scrollTo = startPos + (targetPos - startPos) * ease;
    
    if (direction === 'x')
      element.scrollLeft = _scrollTo
    else if (direction === 'y')
      element.scrollTop = _scrollTo;
    startPos = _scrollTo;

    if (progress < 1)
      return reqId = window.requestAnimationFrame(xScrollStep);
    else element.classList.add(`${direction}-mandatory`);
  }

  reqId = requestAnimationFrame(xScrollStep);
  return {
    clear: () => window.cancelAnimationFrame(reqId),
    elapsed : reqId
  }
}

/***** EXAMPLE USAGE *****/

// const scrollButton = document.getElementById('scrollButton');

// // (!) Always use it in an event handler function 
// /* ====== Y Direction ======= */
// const elemY = document.querySelector('.box');
// scrollButton.addEventListener('click', () => { xSmoothScroll(elemY, 'y', 300, 750) })
// elemY.addEventListener('scroll', () => console.log(elemY.scrollTop))

/* ====== X Direction ======= */
// const elemX = document.querySelector('.horizontal');
// scrollButton.addEventListener('click', () => { xSmoothScroll(elemY, 'x', 300, 750) });
// elemX.addEventListener('scroll', () => console.log(elemX.scrollLeft))