import { from } from 'rxjs';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete!')
};

/*
 * from can turn nearly anything into an observable
 * When from receieves an array, it loops through each item
 * within that array, emitting them in sequence.
 */
from([1, 2, 3, 4, 5]).subscribe(console.log);

/*
 * This works for any array like object as well, for instance,
 * when from receieves a string (which has a length property)
 * it will loop through emitting each character.
 */
from('Hello').subscribe(console.log);

/*
 * When from receieves a promise, it will call .then, emitting
 * the response. We will see ways to make requests using an
 * observable interface in upcoming lessons, but for now we will
 * just use fetch.
 */
from(fetch('https://api.github.com/users/octocat')).subscribe(console.log);

function* hello() {
  yield 'Hello';
  yield 'World';
}

const iterator = hello();

/*
 * When from receieves a iterator it will drop it in a do while loop,
 * calling .next and emitting each item until there are no more items left.
 */
from(iterator).subscribe(console.log);

/*
 * Note: If you want to see this logic yourself, check out the
 * 'subscribeTo' helper function https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/subscribeTo.ts
 * This same function is also used for all flattening operators when a
 * non-observable value is receieved.
 */
