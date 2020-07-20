import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferComponent } from './transfer/transfer.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/transfer', pathMatch: 'full' },
  { path: 'transfer', component: TransferComponent },
  { path: 'transfer/:id', component: TransferComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
