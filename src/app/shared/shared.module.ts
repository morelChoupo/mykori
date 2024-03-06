import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from "./components/loader/loader.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";




@NgModule({
  declarations: [
    LoaderComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
