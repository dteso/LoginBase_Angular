import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() logged: boolean;
  @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  logoutSubmitted(){
    this.logout.emit(true);
  }

}
