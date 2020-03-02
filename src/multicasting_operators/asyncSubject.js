import './style.css';
console.clear();
// begin lesson code
import './style.css';
console.clear();
// begin lesson code
// Только на complete отдает всем слушателям данные

import { AsyncSubject } from 'rxjs';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

/*
 * AsyncSubject's only emit the final value on completion.
 */
const subject = new AsyncSubject();

/*
 * For instance, let's create a few subscribers here...
 */
const subscription = subject.subscribe(observer);
const secondSubscription = subject.subscribe(observer);

/*
 * next 4 values to AsyncSubject, nothing is emitted to observers.
 */
subject.next('Hello');
subject.next('World');
subject.next('Goodbye!');
subject.next('World!');

/*
 * Once the subject completes, the last value, in this case
 * 'World!' is emitted.
 */
subject.complete();


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

import { AsyncSubject } from 'rxjs';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

/*
 * AsyncSubject's only emit the final value on completion.
 */
const subject = new AsyncSubject();

/*
 * For instance, let's create a few subscribers here...
 */
const subscription = subject.subscribe(observer);
const secondSubscription = subject.subscribe(observer);

/*
 * next 4 values to AsyncSubject, nothing is emitted to observers.
 */
subject.next('Hello');
subject.next('World');
subject.next('Goodbye!');
subject.next('World!');

/*
 * Once the subject completes, the last value, in this case
 * 'World!' is emitted.
 */
subject.complete();


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
