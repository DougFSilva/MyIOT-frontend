import { UserForm } from './../../../models/UserForm';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: UserForm = {
    email: "",
    name: "",
    password: ""
  }
  email = new FormControl(null, Validators.minLength(5));
  name = new FormControl(null, Validators.minLength(3));
  password = new FormControl(null, Validators.minLength(8));

  constructor(
    private service: UserService,
    private toast:ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  create():void {
    this.service.create(this.form).subscribe(response => {
      this.toast.success("Usuário criado com sucesso!", "SUCESSO")
      this.router.navigate(["login"])
    }, (ex) => {
      console.log(ex)
      this.toast.error(ex.error.error, "ERROR")
    })
  }

  validFields(): boolean {
    return this.email.valid && this.name.valid && this.password.valid
  }
}
