import './style.css';
console.clear();

// begin lesson code
import { fromEvent, interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  concatMap,
  catchError,
  take,
  delay
} from 'rxjs/operators';


// ConcatMap принимает новые события и ставит в очередь их - Выполнит одни
// за другим по complete предыдущего стрима

/*
 * BEGIN FIRST SECTION
 */
// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');

// click$.pipe(
/*
 * concat based operators are the 'single file line'
 * of operators, maintaining 1 active inner observable at
 * a time. For instance, in this example on the first click a new
 * interval observable will be subscribed to internally,
 * with any emitted values being emitted by concatMap.
 * If you click again while that inner interval
 * is active, the next interval will be queued until
 * the current active interval completes. At this point,
 * the next inner observable will be activated and so on...
 */
//   concatMap(() => interval$.pipe(take(3)))
// ).subscribe(console.log);

/*
 * BEGIN SECOND SECTION
 */
const saveAnswer = answer => {
  // simulate delayed request
  return of(`Saved: ${answer}`).pipe(delay(1500));
};

// elems
const radioButtons = document.querySelectorAll('.radio-option');

// streams
const answerChange$ = fromEvent(radioButtons, 'click');

answerChange$
  .pipe(
    /*
     * concatMap can be useful if you need to queue
     * requests client side. For instance, in this example
     * we are emulating save requests on a quiz, ensuring
     * order remains in tact by not initiating the next
     * request until the previous completes. Be careful though,
     * as long running inner observables could cause backups.
     */
    concatMap((event) => saveAnswer(event.target.value))
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
