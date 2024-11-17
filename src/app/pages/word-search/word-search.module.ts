import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordSearchPageRoutingModule } from './word-search-routing.module';

import { WordSearchPage } from './word-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordSearchPageRoutingModule
  ],
  declarations: [WordSearchPage]
})
export class WordSearchPageModule {}
