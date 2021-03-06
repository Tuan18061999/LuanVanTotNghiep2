import { Partner } from 'src/app/models/Partner';
import { Users } from './../../../models/Users';
import { DichVuService } from 'src/app/services/dich-vu.service';
import { PartnerService } from './../../../services/partner.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { DichVu } from 'src/app/models/DichVu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listUser!: Users[];
  listPartner!: Partner[];
  listDichVu!: DichVu[];
  constructor(
    public userService: UserService,
    public partnerService: PartnerService,
    public dichVuService: DichVuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.get_Alluser().subscribe(data =>{
      this.listUser = data;
    });
    this.partnerService.get_AllConfirmPartner().subscribe(data => {
      this.listPartner = data;
    });
    this.dichVuService.get_AllDichVu().subscribe(data => {
      this.listDichVu = data;
    })
  }
  GoToAdmin(){
    this.router.navigate(['/admin/admin-account']);
  }
  GoToUser(){
    this.router.navigate(['/admin/user']);
  }
  GoToGroupService(){
    this.router.navigate(['/admin/nhom-dich-vu']);
  }
  GoToService(){
    this.router.navigate(['/admin/dich-vu']);
  }
  GoToPartner(){
    this.router.navigate(['/admin/partner']);
  }
  GoToOrder(){
    this.router.navigate(['/admin/don-hang']);
  }
  GoToAnalyst(){
    this.router.navigate(['/admin/thong-ke']);
  }
}
