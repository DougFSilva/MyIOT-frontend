import { API_CONFIG } from './../../../../../../websocket_test/src/app/components/config/api.config';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/models/LoginForm';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : LoginForm = {
    username: "",
    password: ""
  }

  email = new FormControl(null, Validators.minLength(5));
  password = new FormControl(null, Validators.minLength(8));

  constructor(
    private service: AuthService,
    private router: Router,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
  }

  login():void{
    this.service.authenticate(this.form).subscribe(response => {
      this.service.successfullyLogin(response);
      this.router.navigate(["home"]);
      this.toast.success("Seja bem vindo(a)!", "SUCESSO")
    }, (ex) => {
      this.toast.error("Erro ao efetuar login, verifique o usuário e senha!", "ERRO")
    })
  }

  validFields(): boolean {
    return this.email.valid && this.password.valid
  }
}
