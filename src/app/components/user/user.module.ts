import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserComponent } from './user.component';
import { AdminComponent } from './admin/admin.component';
import { FooterModule } from './../footer/footer.module';

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    CreateUserComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    ToastrModule.forRoot({
      timeOut:1500,
      progressAnimation: 'increasing',
      progressBar: true
    }),
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    FooterModule,
    RouterModule
  ],
  exports: [
    AdminComponent,
    UserComponent,
    CreateUserComponent,
    UpdatePasswordComponent,
  ],
})
export class UserModule {}
