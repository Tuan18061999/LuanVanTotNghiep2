import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) { }
  public adminName: string = '';
  ngOnInit(): void {
    let admin = JSON.parse(sessionStorage.getItem('admin') || '{}');
    console.log(admin.name);
    this.adminName = admin.name;
  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }

  LogOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
