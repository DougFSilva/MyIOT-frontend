import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { UserUpdatePasswordForm } from 'src/app/models/UserUpdatePasswordForm';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  id: string
  form: UserUpdatePasswordForm = {
    userId: "",
    currentPassword: "",
    newPassword: ""
  }
  confirmPassword: string
  currentPasswordValidate = new FormControl(null, Validators.minLength(8));
  newPasswordValidate = new FormControl(null, Validators.minLength(8));
  confirmPasswordValidate = new FormControl(null, Validators.minLength(8));

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private service: UserService,
    private toast: ToastrService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.id = this.data.id
  }

  updatePassword(): void {
    if(this.form.newPassword != this.confirmPassword){
      this.toast.error("A nova senha e a confirmação da senha devem ser iguais!", "ERRO")
      return
    }
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.service.updatePassword(this.form).subscribe(() => {
          this.toast.success("Password alterado com sucesso!", "SUCESSO")
          this.dialog.closeAll()
        }, (ex) => {
          this.toast.error(ex.error.error, "ERRO")
        })
      }
      return
    })
  }

  validateFields(): boolean {
    return this.currentPasswordValidate.valid &&
           this.newPasswordValidate.valid  &&
           this.confirmPasswordValidate.valid
  }

}
