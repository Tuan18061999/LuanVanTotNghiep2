import { Partner } from './../../../../models/Partner';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-partner-dialog',
  templateUrl: './partner-dialog.component.html',
  styleUrls: ['./partner-dialog.component.css']
})
export class PartnerDialogComponent implements OnInit {

  constructor(dialogRef: MatDialogRef<PartnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      partner: Partner;
    }) { }

  ngOnInit(): void {
  }

}
