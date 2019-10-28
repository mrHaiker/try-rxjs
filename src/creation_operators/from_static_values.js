import { of, range } from 'rxjs';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete!')
};

/*
 * Emits each item you provide in sequence, synchronously.
 * of literally just loops through the items and emits them,
 * there is no flattening involved. For instance, if you pass an
 * array the entire array will be emitted, not each item within
 * the array.
 */
const source$ = of(1,2,3,4,5);

console.log('proving');
source$.subscribe(observer);
console.log('this is synchronous');

/*
 * If you just want to emit numbers between a specific range
 * you could also use the range operator instead.
 */
console.log('proving');
range(1,5).subscribe(observer);
console.log('this is synchronous');
