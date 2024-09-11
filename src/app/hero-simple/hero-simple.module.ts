import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeroEditNameSimpleComponent } from './hero-edit-name-simple.component';
import { HeroEditNameSimpleRFComponent } from './hero-edit-name-simple-rf.component';
import { HeroEditNameSimpleTDComponent } from './hero-edit-name-simple-td.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeroEditNameSimpleComponent, 
    HeroEditNameSimpleRFComponent, 
    HeroEditNameSimpleTDComponent,
  ],
  exports: [HeroEditNameSimpleComponent]
}) 
export class HeroSimpleModule { }
