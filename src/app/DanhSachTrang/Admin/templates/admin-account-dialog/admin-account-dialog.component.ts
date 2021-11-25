import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-account-dialog',
  templateUrl: './admin-account-dialog.component.html',
  styleUrls: ['./admin-account-dialog.component.css'],
})
export class AdminAccountDialogComponent implements OnInit {
  DialogRef: any;

  constructor(
    dialogRef: MatDialogRef<AdminAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      name: string;
      password: string;
    }
  ) {
    this.DialogRef = dialogRef;
  }

  ngOnInit(): void {}

  onNoClick() {
    this.DialogRef.close();
  }
}
