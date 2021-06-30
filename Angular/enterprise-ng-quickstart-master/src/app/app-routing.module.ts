import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { url } from 'inspector';
import { HomeComponent } from './home/home.component';

import { A2LNC } from './A2LN/A2LN';
import { AppComponent } from './app.component';
import { LN2LNC } from './LN2LN/LN2LN';
import { unrefCleaner } from './UnrefCleaner/unrefCleaner';
import { duplicateRemover } from './DuplicateRemover/DuplicateRemover';

import { LN2LNGridC } from './LN2LNGrid/LN2LNGrid';
const routes: Routes = [

  {
    path: 'LN2LN',
    component: LN2LNC
  },
  {
    path: 'A2LN',
    component: A2LNC
  },
  {
    path: 'unrefCleaner',
    component: unrefCleaner
  },
  {
    path: 'duplicateRemover',
    component: duplicateRemover
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
