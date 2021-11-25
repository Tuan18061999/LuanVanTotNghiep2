import { UserDetailsDialogComponent } from './../templates/user-details-dialog/user-details-dialog.component';
import { Users } from './../../../models/Users';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { XoadialogComponent } from '../xoadialog/xoadialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Users = {
    name:"",
    password:"",
    phone:"",
  }
  users!: Users[];

  constructor(public userService : UserService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    //Goi user tu dong
    this.userService.get_Alluser().subscribe((data: any) =>{
      this.users = data;
    })
  }

  openDialog(event: any, user: any){
    const dialogRef = this.dialog.open(XoadialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log(`Dialog result: ${result}`);
      if(result===true)
      {
        this.userService.delete_User(user);
        this.router.navigate(['/admin/user']);
      }
    });
  }

  ChiTietTaiKhoan(event: any, user: any){
    const dialogRef = this.dialog.open(UserDetailsDialogComponent,{
      width: '450px',
      data:{
        name: user.name,
        password: user.password,
        phone: user.phone,
        gender: user.gender,
        address!: user.address,
      }
    });
  }

}

