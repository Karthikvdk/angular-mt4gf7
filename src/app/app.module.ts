import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { HelloComponent }  from './hello.component';

//For InMemory testing
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TestData } from './test-data';

@NgModule({
  imports: [     
      BrowserModule,
	  HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      InMemoryWebApiModule.forRoot(TestData)		
  ],
  declarations: [
      AppComponent,
      HelloComponent
  ],
  providers: [
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }