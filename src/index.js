import { from } from 'rxjs';

from([1,2,3,5]).subscribe(val => {
  console.log('val', val);
});
