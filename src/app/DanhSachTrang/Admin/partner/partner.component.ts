import { PartnerService } from './../../../services/partner.service';
import { Partner } from './../../../models/Partner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PartnerDialogComponent } from '../templates/partner-dialog/partner-dialog.component';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
})
export class PartnerComponent implements OnInit {
  partner: Partner = {};
  waitingPartners!: Partner[];
  confirmPartners!: Partner[];
  constructor(
    public partnerService: PartnerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.partnerService.get_AllWaitingPartner().subscribe((data) => {
      this.waitingPartners = data;
    });

    this.partnerService.get_AllConfirmPartner().subscribe((data) => {
      this.confirmPartners = data;
    });
  }

  ngOnInit(): void {}

  ConfirmWaitingPartner(partner: Partner) {
    console.log('partner tu view', partner);
    partner.accountStatus = 'Đang mở';
    this.partnerService.update_Partner(partner);
    this.router.navigate(['/admin/partner']);
  }

  PartnerDetail(event: any, partnerSelected: any) {
    const dialogRef = this.dialog.open(PartnerDialogComponent, {
      width: '400px',
      data: {
        partner: partnerSelected,
      },
    });
  }

  CheckStatus(partner: Partner){
    if(partner.accountStatus === "Đang mở"){
      return true;
    }
    return false;
  }
  OpenAccount(partner: Partner){
    partner.accountStatus = 'Đang mở';
    this.partnerService.update_Partner(partner);
    this.router.navigate(['/admin/partner']);
  }
  LockAccount(partner: Partner){
    partner.accountStatus = 'Đang khoá';
    this.partnerService.update_Partner(partner);
    this.router.navigate(['/admin/partner']);
  }
  DeletePartner(event: any,partner: Partner){
    this.partnerService.delete_Partner(partner);
    this.router.navigate(['/admin/partner']);
  }
}
