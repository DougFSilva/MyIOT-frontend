
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { FormControl } from '@angular/forms';

import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { UserAdminService } from './../../../services/user-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  form: User = {
    id: "",
    email: "",
    name: "",
    password: "",
    clientMqttPassword: "",
    approvedRegistration: false,
    profiles: []
  }

  ELEMENT_DATA: User[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['email', 'name', 'approvedRegistration', 'profile', 'options'];
  selectNotApproved = new FormControl(false);
  constructor(
    private service: UserAdminService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findUsers()
  }

  findUsers(): void {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
    }, (ex) => {
      this.toast.error(ex.error.error, "ERRO")
    })
  }

  updateData(): void {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      this.toast.success("Dados atualizados com sucesso!", "SUCESSO")
    }, (ex) => {
      this.toast.error(ex.error.error, "ERRO")
    })
  }

  deleteById(id: string): void {
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.service.delete(id).subscribe(() => {
          this.toast.success("Usuário deletado com sucesso!", "SUCESSO")
          this.findUsers()
        }, (ex) => {
          this.toast.error(ex.error.error, "ERRO")
        })
      }
      return
    })
  }

  updateProfile(user: User, profile: string): void {
    this.form = user
    this.form.profiles = [profile]
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.service.update(user.id, this.form).subscribe(() => {
          this.toast.success("Perfil atualizado com sucesso!", "SUCESSO")
          this.findUsers()
        }, (ex) => {
          this.toast.error(ex.error.error, "ERRO")
        })
      }
    })
  }

  approvedRegistration(id: string, approved: boolean): void {
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.service.approveRegistration(id, approved).subscribe(() => {
          this.toast.success("Usuário aprovado com sucesso!", "SUCESSO")
          this.findUsers()
        }, (ex) => {
          this.toast.error(ex.error.error, "ERROR")
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByNotApproved(): void {
    if(this.selectNotApproved.value){
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA.filter(user => {
        return user.approvedRegistration == false
      }))
    }else {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
    }
  }

}
