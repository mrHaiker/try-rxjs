import { of, from } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, scan, map } from 'rxjs/operators';

const numbers$ = of(1, '1', 2, 3, 3, 3, 4, 5, 3);

/*
 * distinctUntilChanged emits unique values based
 * on a === comparison to the last emitted value.
 */
numbers$.pipe(distinctUntilChanged()).subscribe(console.log);

const user = [
  { name: 'Brian', loggedIn: false, token: null },
  { name: 'Brian', loggedIn: true, token: 'abc' },
  { name: 'Brian', loggedIn: true, token: '123' }
];

const state$ = from(user).pipe(
  scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  }, {})
);

const name$ = state$.pipe(
  /*
   * If comparing based on a property you can use
   * the distinctUntilKeyChanged helper operator instead.
   */
  // @ts-ignore
  distinctUntilKeyChanged('name'),
  /*
   * If you need to use a custom comparer, you can
   * pass distinctUntilChanged a comparer function.
   * ex. distinctUntilChanged((prev, curr) => {
   *   return prev.name === curr.name;
   * })
   */
  map((state) => state.name)
);

name$.subscribe(console.log);


