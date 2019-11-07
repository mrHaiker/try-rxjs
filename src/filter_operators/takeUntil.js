import { interval, fromEvent } from 'rxjs';
import { scan, mapTo, takeWhile, takeUntil, tap } from 'rxjs/operators';

/*
 * CODE FOR FOR FIRST SECTION OF LESSON
 */
// const counter$ = interval(1000);
// const click$ = fromEvent(document, 'click');

/*
 * takeUntil lets you complete a stream based
 * on when another stream emits a value. For instance,
 * in this example our counter will run until the click$
 * stream emits a value, at which point the observable
 * will be completed.
 */
// counter$.pipe(
//   takeUntil(click$)
// ).subscribe(console.log);

/*
 * BEGIN SECOND SECTION OF LESSON
 */
// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const abortButton = document.getElementById('abort');

// streams
const counter$ = interval(1000);
const abort$ = fromEvent(abortButton, 'click');

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    takeWhile(value => value >= 0),
    /*
     * When you want to complete a stream based on another
     * stream you can use takeUntil. In this case, whenever
     * our button click stream emits the observable will
     * complete, letting us stop the countdown before
     * it reaches zero.
     */
    takeUntil(abort$)
  )
  .subscribe((value) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
