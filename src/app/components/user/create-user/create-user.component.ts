import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: User = {
    id: "",
    email: "",
    name: "",
    password: "",
    clientMqttPassword: "",
    approvedRegistration: false,
    profiles: []
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
    console.log(this.form)
    this.service.create(this.form).subscribe(() => {
      this.toast.success("Usuário criado com sucesso!", "SUCESSO")
      this.router.navigate(["login"])
    }, (ex) => {
      this.toast.error(ex.error.error, "ERROR")
    })
  }

  validFields(): boolean {
    return this.email.valid && this.name.valid && this.password.valid
  }
}
