import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { FooterModule } from './../footer/footer.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    ToastrModule.forRoot({
      timeOut:1500,
      progressAnimation: 'increasing',
      progressBar: true
    }),
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
