import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SohoButtonModule, SohoComponentsModule, SohoLocaleModule } from 'ids-enterprise-ng';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { DMF_UtilitiesC } from './DMF_Utilities/DMF_Utilities';
import { CommonModule } from '@angular/common';
import { LN2LNC } from './LN2LN/LN2LN';
import { A2LNC } from './A2LN/A2LN';
import { HomeComponent } from './home/home.component';
import { LN2LNGridC } from './LN2LNGrid/LN2LNGrid';
import { HttpClientModule } from '@angular/common/http';
import { A2LNGridC } from './A2LNGrid/A2LNGrid';
import { LNGridC } from './LNGrid/LNGrid';
import { unrefCleaner } from './UnrefCleaner/unrefCleaner';
import { duplicateRemover } from './DuplicateRemover/DuplicateRemover';
import { A2LNComGridComponent } from './A2LNComGrid/A2LNComGrid';
@NgModule({
  declarations: [
    AppComponent,
    DMF_UtilitiesC,
    LN2LNC, LN2LNGridC, A2LNC,
    HomeComponent,
    A2LNGridC,
    LNGridC,
    unrefCleaner,
    duplicateRemover,
    A2LNComGridComponent
  ],
  imports: [
    BrowserModule,
    SohoLocaleModule,
    SohoButtonModule,
    SohoComponentsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
