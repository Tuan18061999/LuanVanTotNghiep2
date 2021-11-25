import { TrungDuLieuDialogComponent } from './../templates/trung-du-lieu-dialog/trung-du-lieu-dialog.component';
import { AdminAccountDialogComponent } from './../templates/admin-account-dialog/admin-account-dialog.component';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from './../../../models/Admin';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { XoadialogComponent } from '../xoadialog/xoadialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  admin: Admin = {
    name:"",
    password: "",
  }
  admins!: Admin[];

  constructor(public adminService : AdminService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.adminService.get_AllAdmin().subscribe((data: any) =>{
      this.admins = data;

    })
  }

  checkTrung(adminCheck: Admin, admins: Admin[]){
    for(var admin of admins){
      if(adminCheck.name === admin.name)
        return false;
    }
    return true;
  }

  openDialog(event: any, admin: any){
    const dialogRef = this.dialog.open(XoadialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log(`Dialog result: ${result}`);
      if(result===true)
      {
        this.adminService.delete_Admin(admin);
      }
    });
  }
  ThemAccount(){
    const dialogRef = this.dialog.open(AdminAccountDialogComponent,{
      width: '250px',
      data:{
        name: this.admin.name,
        password: this.admin.password,
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(this.checkTrung(result,this.admins)){
        let newAdmin: Admin = {};
        newAdmin.name = result.name;
        newAdmin.password = result.password;
        this.adminService.create_NewAdmin(newAdmin);
        this.router.navigate(['/admin/admin-account']);
      }
      else
      {
        const dialogRef = this.dialog.open(TrungDuLieuDialogComponent);
      }
    });
  }
  CapNhatAccount(event: any, admin: any){
    const dialogRef = this.dialog.open(AdminAccountDialogComponent,{
      width: '250px',
      data: {
        id: admin.id,
        name: admin.name,
        password: admin.password,
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(this.checkTrung(result,this.admins)){
        this.adminService.update_Admin(result);
        this.router.navigate(['/admin/admin-account']);
      }
      else
      {
        const dialogRef = this.dialog.open(TrungDuLieuDialogComponent);
      }

    });
  }
}
