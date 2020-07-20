import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import '@angular/common/locales/global/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HistoryComponent } from './history/history.component';
import { TransferComponent } from './transfer/transfer.component';
import { MessageComponent } from './message/message.component';
import { CardNumberDirective } from './card-number.directive';
import { CardNumberPipe } from './card-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HistoryComponent,
    TransferComponent,
    MessageComponent,
    CardNumberDirective,
    CardNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'ru'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
