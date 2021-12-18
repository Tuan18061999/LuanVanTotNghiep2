import { RequestServicesUpdate } from './../../../../models/RequestServicesUpdate';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Partner } from 'src/app/models/Partner';

@Component({
  selector: 'app-partner-request-dialog',
  templateUrl: './partner-request-dialog.component.html',
  styleUrls: ['./partner-request-dialog.component.css']
})
export class PartnerRequestDialogComponent implements OnInit {

  constructor(dialogRef: MatDialogRef<PartnerRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      partner: Partner;
      request: RequestServicesUpdate;
    }) { }

  ngOnInit(): void {
  }

}
