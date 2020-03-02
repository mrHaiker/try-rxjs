import './style.css';
console.clear();

// begin lesson code
import { fromEvent, combineLatest, interval } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';

// elems
const first = document.getElementById('first');
const second = document.getElementById('second');

// streams
const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// helpers
const keyupAsValue = elem => {
  return fromEvent(elem, 'keyup').pipe(
    map((event) => event.target.valueAsNumber)
  );
};

/*
 * Each time any stream provided to combineLatest
 * emits a value, the latest value from all provided
 * streams will be emitted as an array. Note that all
 * provided streams must emit at least one value before
 * combineLatest will emit any values.
 */
// combineLatest(
//   keyup$,
//   click$
// ).subscribe(console.log);

/*
 * When you want to augment one stream with
 * information from a second stream on emitted values,
 * withLatestFrom is a perfect choice.
 */
// click$.pipe(
//   withLatestFrom(interval(1000))
// ).subscribe(console.log);

/*
 * combineLatest is great when an element depends
 * on the combination of multiple streams to make
 * some calculation or determination. We will explore
 * this concept further in the next lab.
 */
combineLatest(
  keyupAsValue(first),
  keyupAsValue(second)
)
  .pipe(
    filter(([first, second]) => {
      return !isNaN(first) && !isNaN(second);
    }),
    map(([first, second]) => first + second)
  )
  .subscribe(console.log);

/********************
 * Have a question, comment, or just want to chat about RxJS?
 * Ping me on Ultimate Courses slack or on
 * Twitter https://twitter.com/btroncone
 * I look forward to hearing from you!
 * For additional RxJS info and operator examples check out
 * Learn RxJS (https://www.learnrxjs.io) and
 * the Ultimate Course RxJS blog!
 * (https://ultimatecourses.com/blog/category/rxjs)
 ********************/
