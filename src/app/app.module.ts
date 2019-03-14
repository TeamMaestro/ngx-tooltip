import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { TooltipModule, TooltipOptions } from 'dist/ngx-tooltip';
// import { TooltipModule, TooltipOptions } from '@teamhive/ngx-tooltip';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot({
        placement: 'top',
        content: 'Lorem ipsum dolor'
    } as TooltipOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
