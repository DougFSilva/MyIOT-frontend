import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
