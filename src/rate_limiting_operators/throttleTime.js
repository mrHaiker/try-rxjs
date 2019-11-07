// In opposite of debounceTime we emit first even immediately and then wait X sec

import { fromEvent } from 'rxjs';
import { map, throttleTime, tap } from 'rxjs/operators';

/*
 * BEGIN FIRST SECTION OF LESSON
 */
// const click$ = fromEvent(document, 'click');

// click$.pipe(
/*
 * throttleTime will emit the first value, then ignore
 * values for the specified duration. After that duration
 * has passed, the next value from the source will be
 * emitted, with the previous behavior repeated.
 */
//   throttleTime(3000),
// ).subscribe(console.log);

/*
 * BEGIN SECTION SECTION OF LESSON
 */
/*
 * Calculate progress based on scroll position
 */
function calculateScrollPercent(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elems
const progressBar = document.querySelector('.progress-bar');

// streams
const scroll$ = fromEvent(document, 'scroll');

const progress$ = scroll$.pipe(
  /*
   * For extremely active streams like scroll events,
   * throttleTime can be used to limit the number of emitted
   * values. In this case, we'll just update our scroll bar every
   * 30ms of scrolling.
   */
  throttleTime(30),
  /*
   * For every scroll event, we use our helper function to
   * map to a current scroll progress value.
   */
  map(({ target }) => calculateScrollPercent(target.documentElement)),
  tap(console.log)
);
/*
 * We can then take the emitted percent and set the width
 * on our progress bar.
 */
progress$.subscribe(percent => {
  progressBar.style.width = `${percent}%`;
});
