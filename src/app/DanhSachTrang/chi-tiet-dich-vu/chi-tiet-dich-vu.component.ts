import { GiaCongThoService } from './../../services/gia-cong-tho.service';
import { GiaCongTho } from './../../models/GiaCongTho';
import { GiaVatTuService } from './../../services/gia-vat-tu.service';
import { GiaCongViecService } from './../../services/gia-cong-viec.service';
import { GiaCongViec } from './../../models/GiaCongViec';
import { NhanBietDichVuService } from './../../services/nhan-biet-dich-vu.service';
import { DichVu } from './../../models/DichVu';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentShareService } from 'src/app/services/component-share.service';
import { NhanBietDichVu } from 'src/app/models/NhanBietDichVu';
import { GiaVatTu } from 'src/app/models/GiaVatTu';

@Component({
  selector: 'app-chi-tiet-dich-vu',
  templateUrl: './chi-tiet-dich-vu.component.html',
  styleUrls: ['./chi-tiet-dich-vu.component.css'],
})
export class ChiTietDichVuComponent implements OnInit {
  private valueFromChildSubscription!: Subscription;
  dichVu: DichVu = {};
  listNhanBietDichVu!: NhanBietDichVu[];
  listGiaCongViec!: GiaCongViec[];
  listGiaVatTu!: GiaVatTu[];
  listGiaCongTho!: GiaCongTho[];

  //Cac truong cua table gia vat tu
  showTenVT = false;
  showDonViVT = false;
  showGiaVT = false;
  showNhomVT = false;
  showPhiVT = false;
  showTrieuChungVT = false;
  showBaoHanhVT = false;
  showGhiChuVT = false;

  //Cac truong cua table gia cong tho
  showTenCT = false;
  showDonVi1CT = false;
  showGiaCT = false;
  showGiaThayCT = false;
  showPhiCT = false;
  showDonVi2CT = false;

  constructor(
    public componentShareService: ComponentShareService,
    public nhanBietDichVuService: NhanBietDichVuService,
    public giaCongViecService: GiaCongViecService,
    public giaVatTuService: GiaVatTuService,
    public giaCongThoService: GiaCongThoService
  ) {}

  ngOnInit(): void {
    this.valueFromChildSubscription =
      this.componentShareService.ValueFromChild.subscribe((data: any) => {
        this.dichVu = data;
      });

    this.nhanBietDichVuService
      .get_AllNhanBietDichVuByIdDoc(this.dichVu.idDoc!)
      .subscribe((data: any) => {
        this.listNhanBietDichVu = data;
      });

    this.giaCongViecService
      .get_AllGiaCongViecByIdDoc(this.dichVu.idDoc!)
      .subscribe((data: any) => {
        this.listGiaCongViec = data;
      });

    this.giaVatTuService
      .get_AllGiaVatTuByIdDoc(this.dichVu.idDoc!)
      .subscribe((data: any) => {
        this.listGiaVatTu = data;
        for (let giaVatTu of this.listGiaVatTu) {
          if (giaVatTu.tenVatTu != null) {
            this.showTenVT = true;
          }
          if (giaVatTu.DVT != null) {
            this.showDonViVT = true;
          }
          if (giaVatTu.giaVatTu != null) {
            this.showGiaVT = true;
          }
          if (giaVatTu.nhomVT != null) {
            this.showNhomVT = true;
          }
          if (giaVatTu.phiDV != null) {
            this.showPhiVT = true;
          }
          if (giaVatTu.trieuChung != null) {
            this.showTrieuChungVT = true;
          }
          if (giaVatTu.baoHanhVT != null) {
            this.showBaoHanhVT = true;
          }
          if (giaVatTu.ghiChu != null) {
            this.showGhiChuVT = true;
          }
        }
      });

    this.giaCongThoService
      .get_AllGiaCongThoByIdDoc(this.dichVu.idDoc!)
      .subscribe((data: any) => {
        this.listGiaCongTho = data;
        for (let giaCongTho of this.listGiaCongTho) {
          if (giaCongTho.tenCongTho != null) {
            this.showTenCT = true;
          }
          if (giaCongTho.DVT != null) {
            this.showDonVi1CT = true;
          }
          if (giaCongTho.giaCongTho != null) {
            this.showGiaCT = true;
          }
          if (giaCongTho.giaThayVT != null) {
            this.showGiaThayCT = true;
          }
          if (giaCongTho.phiDV != null) {
            this.showPhiCT = true;
          }
          if (giaCongTho.DVT2 != null) {
            this.showDonVi2CT = true;
          }
        }
      });
  }

  isEmpty(data: any[]) {
    if (data === undefined || data.length === 0) {
      return false;
    }
    return true;
  }
}
