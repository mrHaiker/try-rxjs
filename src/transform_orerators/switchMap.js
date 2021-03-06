import './style.css';
console.clear();

// begin lesson code
import './style.css';
console.clear();

// begin lesson code
import { fromEvent, empty, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  pluck,
  distinctUntilChanged,
  switchMap,
  catchError
} from 'rxjs/operators';

/*
 * BEGIN FIRST SECTION
 */
const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

click$.pipe(
  /*
   * switchMap switches to a new observable on each emission
   * from the source, cancelling any previous inner
   * observables. For instance, if you click once a new
   * interval observable will be subscribed to internally,
   * with it's values emitted. When you click again,
   * that observable will be completed, and the next
   * interval will be subscribed to, restarting
   * the count. This will happen on each emission from
   * the click$ observable.
   */
  switchMap(() => interval$)
).subscribe(console.log);

/*
 * BEGIN SECOND SECTION
 */
const BASE_URL = 'https://api.openbrewerydb.org/breweries';

//elems
const inputBox = document.getElementById('text-input');
const typeaheadContainer = document.getElementById('typeahead-container');

// streams
const input$ = fromEvent(inputBox, 'keyup');

input$
  .pipe(
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    /*
     * switchMap is perfect for GET requests, as you do
     * not normally care about the previous request
     * to the same URL if another has fired. For instance,
     * in this example if the user continues typing
     * and the previuos request has not returned,
     * switchMap will go ahead and cancel it and only
     * the current request will be considered.
     */
    switchMap(searchTerm => ajax.getJSON(
      `${BASE_URL}?by_name=${searchTerm}`
      )
    )
  )
  .subscribe((response) => {
    // update ui
    typeaheadContainer.innerHTML = response.map(b => b.name).join('<br>');
  });

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
