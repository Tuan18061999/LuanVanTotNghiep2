import { LockPartnerDialogComponent } from './../templates/lock-partner-dialog/lock-partner-dialog.component';
import { RequestServicesUpdate } from './../../../models/RequestServicesUpdate';
import { PartnerService } from './../../../services/partner.service';
import { Partner } from './../../../models/Partner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PartnerDialogComponent } from '../templates/partner-dialog/partner-dialog.component';
import { identifierModuleUrl } from '@angular/compiler';
import { RequestServicesUpdateService } from 'src/app/services/request-services-update.service';
import { PartnerRequestDialogComponent } from '../templates/partner-request-dialog/partner-request-dialog.component';
import { XoadialogComponent } from '../xoadialog/xoadialog.component';
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
})
export class PartnerComponent implements OnInit {
  partner: Partner = {};
  waitingPartners!: Partner[];
  confirmPartners: Partner[] = [];
  listRequest: RequestServicesUpdate[] = [];
  listPartnerByRequest: Partner[] = [];
  constructor(
    public partnerService: PartnerService,
    public requestServicesUpdateService: RequestServicesUpdateService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.partnerService.get_AllWaitingPartner().subscribe((data) => {
      this.waitingPartners = data;
    });

    this.partnerService.get_AllConfirmPartner().subscribe((data) => {
      let listConfirmPartnerFromServer: Partner[] = data;
      this.confirmPartners.splice(0, this.confirmPartners.length);
      for (let partner of listConfirmPartnerFromServer) {
        this.confirmPartners.push(partner);
      }
    });

    this.requestServicesUpdateService.get_AllRequest().subscribe((data) => {
      let listRequestFromServer: RequestServicesUpdate[] = data;
      this.listRequest.splice(0, this.listRequest.length);
      for (let request of listRequestFromServer) {
        this.listRequest.push(request);
      }
      this.listPartnerByRequest.splice(0, this.listPartnerByRequest.length);
      for (let request of this.listRequest) {
        for (let partner of this.confirmPartners) {
          if (partner.idDoc == request.partnerid) {
            this.listPartnerByRequest.push(partner);
          }
        }
      }
      console.log('lsPbyR', this.listPartnerByRequest);
    });

    // console.log('ls1', this.listRequest.length);
    // console.log('ls2', this.confirmPartners.length);

    // console.log('lsPbyR', this.listPartnerByRequest);
  }

  ConfirmWaitingPartner(partner: Partner) {
    console.log('partner tu view', partner);
    partner.accountStatus = 'Đang mở';
    this.partnerService.update_Partner(partner);
    this.router.navigate(['/admin/partner']);
  }

  ConfirmRequestPartner(partnerSelected: Partner) {
    let reqquestSelected = this.listRequest.find((request) => {
      return request.partnerid == partnerSelected.idDoc;
    });
    partnerSelected.choicesServiceList = reqquestSelected?.listService;
    this.partnerService.update_Partner(partnerSelected);
    this.requestServicesUpdateService.delete_Request(reqquestSelected!);
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

  PartnerRequestDetail(event: any, partnerSelected: Partner) {
    let reqquestSelected = this.listRequest.find((request) => {
      return request.partnerid == partnerSelected.idDoc;
    });
    const dialogRef = this.dialog.open(PartnerRequestDialogComponent, {
      width: '800px',
      data: {
        partner: partnerSelected,
        request: reqquestSelected,
      },
    });
  }

  CheckStatus(partner: Partner) {
    if (partner.accountStatus === 'Đang mở') {
      return true;
    }
    return false;
  }
  OpenAccount(partner: Partner) {
    const dialogRef = this.dialog.open(LockPartnerDialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        partner.accountStatus = 'Đang mở';
        this.partnerService.update_Partner(partner);
        this.router.navigate(['/admin/partner']);
      }
    });

    // partner.accountStatus = 'Đang mở';
    // this.partnerService.update_Partner(partner);
    // this.router.navigate(['/admin/partner']);
  }
  LockAccount(partner: Partner) {
    const dialogRef = this.dialog.open(LockPartnerDialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        partner.accountStatus = 'Đang khoá';
        this.partnerService.update_Partner(partner);
        this.router.navigate(['/admin/partner']);
      }
    });

    // partner.accountStatus = 'Đang khoá';
    // this.partnerService.update_Partner(partner);
    // this.router.navigate(['/admin/partner']);
  }
  DeletePartner(event: any, partner: Partner) {
    const dialogRef = this.dialog.open(XoadialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.partnerService.delete_Partner(partner);
        this.router.navigate(['/admin/partner']);
      }
    });
  }
  DeleteRequestPartner(event: any, partnerSelected: Partner) {
    const dialogRef = this.dialog.open(XoadialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        let reqquestSelected = this.listRequest.find((request) => {
          return request.partnerid == partnerSelected.idDoc;
        });
        this.requestServicesUpdateService.delete_Request(reqquestSelected!);
      }
    });
  }
}
