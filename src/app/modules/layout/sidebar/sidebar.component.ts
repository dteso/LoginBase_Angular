import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() user;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  logoutSubmitted(){
    this.onNavigate.emit(true);
    this.logout.emit(true);
  }

  navigateToSkills(){
    this.router.navigate(['skills']);
    this.onNavigate.emit(true);
  }
}
