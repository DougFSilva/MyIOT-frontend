import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation.component';
import { FooterModule } from './../footer/footer.module';



@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    FooterModule,
    MatButtonModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
