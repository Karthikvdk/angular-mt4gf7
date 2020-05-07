
import { Component, OnInit } from '@angular/core';
import { Observable, of, pipe, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';

import { BookService } from './hello.service';
import { Book } from './hello';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'hello',
  template: `<h3>Search Book</h3>
    <form [formGroup]="bookForm">
      ID: <input formControlName="bookId">
    </form>
    <br/>
    <div *ngIf="book">
      Id: {{book.id}}, Name: {{book.name}}, Category: {{book.category}}
    </div>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit  {
   book: Book;
   constructor(private bookService: BookService, private formBuilder: FormBuilder) { }
   ngOnInit() {
      this.searchBook();

      of("A", "B", "C", "D", "E").pipe(
        map(el => {
          if (el === "C") {
            throw new Error("Error occurred.");
          }
          return el;
        }),
        catchError(err => {
          console.error(err.message);
          console.log("Error is handled");
          return throwError("Error thrown from catchError");
        })
      ).subscribe(el => console.log(el),
                 err => console.error(err),
                 () => console.log("Processing Complete.")
      );

   }
   bookId = new FormControl(); 
   bookForm: FormGroup = this.formBuilder.group({
      bookId: this.bookId
     }
   );
   searchBook() {
    this.bookId.valueChanges.pipe(
      debounceTime(500),
      switchMap(id => {
        console.log(id);
        return this.bookService.getBook(id);
      })
    ).subscribe(res => this.book = res);
   }
}
