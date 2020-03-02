import './style.css';
console.clear();

// Запускает каждый последующий стрим по выполнению предыдущего

// begin lesson code
import { interval, empty, concat } from 'rxjs';
import { take, concat as _concat, startWith, delay } from 'rxjs/operators';

const interval$ = interval(1000);
const delayed$ = empty().pipe(delay(1000));

/*
 * concat subscribes to each observable in order,
 * subscribing to the next as the previous completes.
 * Like concatMap, you can think of concat based
 * operators as a single file line.
 */
concat(
  interval$.pipe(take(3)),
  interval$.pipe(take(2))
).subscribe(console.log);

/*
 * There is also a pipeable operator version that can
 * be used to add observables to a pre-existing stream
 * on completion. This version is used far less than
 * static version, but is available if needed.
 */
/*
 * On top of ordering requests, like we saw in the
 * concatMap lesson, concat can also be used for some
 * interesting UI scenarios such as ordering
 * messaging or animations.
 */
delayed$
  .pipe(
    /*
     * Note: I am using alias here because we are also
     * using the concat creation operator on this page.
     */
    _concat(
      delayed$.pipe(startWith('3...')),
      delayed$.pipe(startWith('2...')),
      delayed$.pipe(startWith('1...')),
      delayed$.pipe(startWith('Go!'))
    ),
    startWith('Get Ready!')
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
