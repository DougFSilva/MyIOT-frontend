import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

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
    private toast: ToastrService

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

}
