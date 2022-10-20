import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

import { UpdatePasswordComponent } from './update-password/update-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = {
    id: "",
    email: "",
    name: "",
    clientMqttPassword: "",
    approvedRegistration: false,
    profiles:[]
  }

  constructor(
    private service: UserService,
    private authService: AuthService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.find();
  }

  find(): void {
    this.service.find().subscribe(response => {
      this.user = response;
    }, (ex) => {
      this.toast.error("Erro ao carregar dados do usuário", "ERROR")
    })
  }

  updatePassword(): void {
    let dialog = this.dialog.open(UpdatePasswordComponent, {data:{id: this.user.id}})
    dialog.afterClosed().subscribe((response) =>{
      if(response != "false"){
        this.authService.logout()
      }
    })
  }

  deleteAccount(): void {
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.service.delete().subscribe(response => {
          this.toast.success("Conta deletada com sucesso, sentiremos sua falta!", "SUCESSO")
          this.authService.logout()
        }, (ex) => {
          this.toast.error(ex.error.error, "ERRO")
        })
      }
    })
  }


}
