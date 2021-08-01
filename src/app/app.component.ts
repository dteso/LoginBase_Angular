import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'login-app';
  logged: boolean;
  isCollapsed = true;
  user;

  constructor(
    private readonly storageService: StorageService,
    private router: Router,
    private readonly authService: AuthService
  ){
    if(!this.storageService.getItem('USER')) {
      this.router.navigate(['/login']);
     }else this.user = this.storageService.getItem('USER').user;
  }

  ngOnInit(){
    this.authService.isAuthenticated$.subscribe( isLogged => this.logged = isLogged);
  }

  toggleCollapse(){
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }

  collapse(){
    this.isCollapsed = true;
  }

  logout(): void {
    this.authService.clearAuth();
    this.router.navigate(['/']);
  }
}
