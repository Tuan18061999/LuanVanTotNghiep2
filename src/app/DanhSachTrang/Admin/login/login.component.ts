import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/Admin';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { LoginErrorComponent } from '../templates/login-error/login-error.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  hide = true;

  adminForm: Admin = {
    name: '',
    password: '',
  }

  userError = false;
  passError = false;

  admins!: Admin[];

  constructor(public adminService: AdminService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  onSubmit() {
    this.adminService.get_AllAdmin().subscribe((data: any) => {
      let khongTimThay = true;
      this.admins = data;
      for (var admin of this.admins) {
        if (this.adminForm.name == admin.name && this.adminForm.password == admin.password) {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem("admin", JSON.stringify(this.adminForm));
          this.router.navigate(['/admin']);
          khongTimThay = false;
        }
      }
      if(khongTimThay){
        const dialogRef = this.dialog.open(LoginErrorComponent);
      }
    });

  }
}
