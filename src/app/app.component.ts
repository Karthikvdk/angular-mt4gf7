import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from '../course.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(private http: HttpClient) {}

    ngOnInit() {

       const http$ = this.http.get<Course[]>('/api/courses');

http$
    .pipe(
        catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(err);
        })
    )
    .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    );
    }
}
