import { Component, HostListener, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  innerWidth: any;
  sideNavMode: any;
  sideNavOpen: boolean = true;
  userProfile: string = "";
  constructor(private authService: AuthService) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setSideNavMode();
}

  ngOnInit(): void {
    this.setSideNavMode();
    this.getUserProfile();
  }

  setSideNavMode(): void{
    this.innerWidth = window.innerWidth;
    if(this.innerWidth > 768){
      this.sideNavMode = 'side';
      this.sideNavOpen = true;
    }else{
      this.sideNavMode = 'over';
      this.sideNavOpen = false;
    }
  }

  getUserProfile() {
    const profile = localStorage.getItem("profiles");
    if (profile.includes("ADMIN")) {
      this.userProfile = "ADMIN";
      return;
    } else if (profile.includes("GOLD_USER")) {
      this.userProfile = "GOLD_USER";
      return;
    } else if (profile.includes("SILVER_USER")) {
      this.userProfile = "SILVER_USER";
      return;
    }
    return null;
  }

  logout() : void {
    this.authService.logout();
  }
}
