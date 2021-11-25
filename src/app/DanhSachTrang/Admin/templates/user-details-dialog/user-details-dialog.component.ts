import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
})
export class UserDetailsDialogComponent implements OnInit {

  constructor(dialogRef: MatDialogRef<UserDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      password: string;
      phone: string;
      gender: string;
      address:{
        district: string;
        number_street: string;
        province: string;
        ward: string;
      };
    }) { }

  ngOnInit(): void {
  }

}
