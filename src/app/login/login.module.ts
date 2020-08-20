import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModule} from '@wizdm/connect/auth'

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  declarations: []
})
export class LoginModule { }