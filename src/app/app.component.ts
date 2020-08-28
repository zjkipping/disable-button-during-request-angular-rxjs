import { Component } from '@angular/core';
import { Observable, Subject, interval, merge } from 'rxjs';
import { switchMap, take, shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  responseData: Observable<any>;
  disableButton: Observable<boolean>;
  startRequest = new Subject<void>();

  constructor() {
    let x = 0;
    this.responseData = this.startRequest.pipe(
      switchMap(() => interval(1000).pipe(take(1), map(() => ++x))),
      shareReplay({ refCount: true, bufferSize: 1 })
    )

    this.disableButton = merge(
      this.startRequest.pipe(map(() => true)),
      this.responseData.pipe(map(() => false))
    )
  }

  doSomething() {
    console.log('hello');
    this.startRequest.next();
  }
}
