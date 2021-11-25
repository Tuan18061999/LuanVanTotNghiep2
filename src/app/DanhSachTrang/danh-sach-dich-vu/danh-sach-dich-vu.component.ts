import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DichVu } from 'src/app/models/DichVu';
import { NhomDichVu } from 'src/app/models/NhomDichVu';
import { ComponentShareService } from 'src/app/services/component-share.service';
import { DichVuService } from 'src/app/services/dich-vu.service';

@Component({
  selector: 'app-danh-sach-dich-vu',
  templateUrl: './danh-sach-dich-vu.component.html',
  styleUrls: ['./danh-sach-dich-vu.component.css'],
})
export class DanhSachDichVuComponent implements OnInit {
  nhomDichVu: NhomDichVu = {
    name: '',
    iconNameAngular: '',
  };

  // dichVu: DichVu = {};
  listDichVu!: DichVu[];
  private valueFromChildSubscription!: Subscription;
  constructor(
    public componentShareService: ComponentShareService,
    public dichVuService: DichVuService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //Lay nhom dich vu qua component share service
    this.valueFromChildSubscription =
      this.componentShareService.ValueFromChild.subscribe((data: any) => {
        this.nhomDichVu = data;

        //Show dich vu khi nhan vao menu dua vao ma nhom
        this.dichVuService
          .get_DichVuByMaNhom(this.nhomDichVu.maNhomDV || 0)
          .subscribe((data: any) => {
            this.listDichVu = data;
          });
      });
  }

  showFiller = false;

  truyenDichVu(dichVu: DichVu) {
    this.componentShareService.notifyCountValue(dichVu);
  }

  chuyenToiChiTiet(dichVu: DichVu) {
    this.truyenDichVu(dichVu);
    this.router.navigate(['/danh-muc-dich-vu/chi-tiet-dich-vu']);
  }
}
