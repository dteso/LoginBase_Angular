import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-app';

  constructor(
    private readonly storageService: StorageService,
    private router: Router
  ){
    if(!this.storageService.getItem('USER')) this.router.navigate(['/login'])
  }
}
