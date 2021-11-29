import { GiaCongThoService } from './../../../services/gia-cong-tho.service';
import { GiaVatTuService } from './../../../services/gia-vat-tu.service';
import { GiaCongViecService } from './../../../services/gia-cong-viec.service';
import { NhanBietDichVuService } from './../../../services/nhan-biet-dich-vu.service';
import { ComponentShareService } from 'src/app/services/component-share.service';
import { GiaVatTu } from './../../../models/GiaVatTu';
import { GiaCongViec } from './../../../models/GiaCongViec';
import { NhanBietDichVu } from './../../../models/NhanBietDichVu';
import { DichVuService } from 'src/app/services/dich-vu.service';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DichVu } from 'src/app/models/DichVu';
import { XoadialogComponent } from '../xoadialog/xoadialog.component';
import { combineLatest, forkJoin, from, Observable } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DichVuDialogComponent } from '../templates/dich-vu-dialog/dich-vu-dialog.component';
import { GiaCongTho } from 'src/app/models/GiaCongTho';
import { Router } from '@angular/router';
import { first, take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-dich-vu',
  templateUrl: './dich-vu.component.html',
  styleUrls: ['./dich-vu.component.css'],
})
export class DichVuComponent implements OnInit {
  listDichVu!: DichVu[];
  dichVu: DichVu = {};
  //Kieu observerbale tra ve mot list nen phai de kieu [] de co the lay du lieu
  dichVuCreated!: DichVu[];
  listNhanBietDichVu!: NhanBietDichVu[];
  listGiaCongViec!: GiaCongViec[];
  listGiaVatTu!: GiaVatTu[];
  listGiaCongTho!: GiaCongTho[];
  trangThaiForm = 'dong';


  constructor(
    public dichVuService: DichVuService,
    public dialog: MatDialog,
    private router: Router,
    public componentShareService: ComponentShareService,
    public nhanBietDichVuService: NhanBietDichVuService,
    public giaCongViecService: GiaCongViecService,
    public giaVatTuService: GiaVatTuService,
    public giaCongThoService: GiaCongThoService
  ) {}

  ngOnInit(): void {
    this.dichVuService.get_AllDichVu().subscribe((data: any) => {
      this.listDichVu = data;
    });
  }
  MaDichVuTuDongTang(listDichVu: DichVu[]) {
    let max = 0;
    for (var dichVu of listDichVu) {
      if (max < (dichVu.id || 0)) {
        max = dichVu.id || max;
      }
    }
    return max + 1;
  }
  ThemDichVu() {
    const dialogRef = this.dialog.open(DichVuDialogComponent, {
      width: '100%',
      data: {
        dichVu: this.dichVu,
        listNhanBietDichVu: this.listNhanBietDichVu,
        listGiaCongViec: this.listGiaCongViec,
        listGiaVatTu: this.listGiaVatTu,
        listGiaCongTho: this.listGiaCongTho,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      let newDichVu: DichVu = {};
      newDichVu.id = this.MaDichVuTuDongTang(this.listDichVu);
      newDichVu.imgDichVu =
        'https://firebasestorage.googleapis.com/v0/b/kltn-c4719.appspot.com/o/img-dv%2Fdichvu1.jpg?alt=media&token=25935dbe-fa76-4ef2-8e4a-9ee29079d3f1';
      newDichVu.maNhomDV = result.dichVu.maNhomDV;
      newDichVu.tenDV = result.dichVu.tenDV;
      newDichVu.camKet = result.dichVu.camKet;
      newDichVu.luuY = result.dichVu.luuY;
      newDichVu.moTa = result.dichVu.moTa;
      newDichVu.danhSachSuaChua = result.dichVu.danhSachSuaChua;
      newDichVu.danhSachDV = result.dichVu.danhSachDV;
      newDichVu.lyDoCanSua = result.dichVu.lyDoCanSua;
      newDichVu.ghiChuSuDung = result.dichVu.ghiChuSuDung;
      newDichVu.tieuChiDV = result.dichVu.tieuChiDV;
      newDichVu.quyTrinhTiepNhan = result.dichVu.quyTrinhTiepNhan;
      newDichVu.quyTrinhBD = result.dichVu.quyTrinhBD;
      newDichVu.luuYSuDung = result.dichVu.luuYSuDung;
      this.dichVuService.create_NewDichVu(newDichVu);
      this.dichVuService.get_DichVuById(newDichVu.id).subscribe((data: any) => {
        let dichVuCreated = data;
        //Tao nhan biet dich vu
        for (let nhanBietDichVu of result.listNhanBietDichVu) {
          this.nhanBietDichVuService.create_NewNhanBietDichVu(
            nhanBietDichVu,
            dichVuCreated[0].idDoc
          );
        }
        //Tao gia cong viec
        for (let giaCongViec of result.listGiaCongViec) {

          this.giaCongViecService.create_NewGiaCongViec(
            giaCongViec,
            dichVuCreated[0].idDoc
          );
        }
        //Tao gia vat tu
        for (let giaVatTu of result.listGiaVatTu) {
          this.giaVatTuService.create_NewGiaVatTu(
            giaVatTu,
            dichVuCreated[0].idDoc
          );
        }
        //Tao gia cong tho
        for (let giaCongTho of result.listGiaCongTho) {
          this.giaCongThoService.create_NewGiaCongTho(
            giaCongTho,
            dichVuCreated[0].idDoc
          );
        }
      });
      this.router.navigate(['/admin/dich-vu']);
    });
  }

  XoaDichVu(event: any, dichVu: any) {
    const dialogRef = this.dialog.open(XoadialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.nhanBietDichVuService.delete_AllNhanBietDichVu(dichVu);
        this.giaCongViecService.delete_AllGiaCongViec(dichVu);
        this.giaVatTuService.delete_AllGiaVatTu(dichVu);
        this.giaCongThoService.delete_AllGiaCongTho(dichVu);
        this.dichVuService.delete_DichVu(dichVu);
        this.router.navigate(['/admin/dich-vu']);
      }
    });
  }

  CapNhatDichVu(event: any, dichVu: DichVu) {
    let listNhanBietDichVuSelected!: NhanBietDichVu[];
    let listGiaCongViecSelected!: GiaCongViec[];
    let listGiaVatTuSelected!: GiaVatTu[];
    let listGiaCongThoSelected!: GiaCongTho[];

    combineLatest([
      this.nhanBietDichVuService.get_AllNhanBietDichVuByIdDoc(dichVu.idDoc!),
      this.giaCongViecService.get_AllGiaCongViecByIdDoc(dichVu.idDoc!),
      this.giaVatTuService.get_AllGiaVatTuByIdDoc(dichVu.idDoc!),
      this.giaCongThoService.get_AllGiaCongThoByIdDoc(dichVu.idDoc!),
    ]).pipe(take(1)).subscribe((result) => {
      listNhanBietDichVuSelected = result[0];
      listGiaCongViecSelected = result[1];
      listGiaVatTuSelected = result[2];
      listGiaCongThoSelected = result[3];

      this.CapNhatDichVuTrenForm(
        dichVu,
        listNhanBietDichVuSelected,
        listGiaCongViecSelected,
        listGiaVatTuSelected,
        listGiaCongThoSelected
      );
    });

  }


  CapNhatDichVuTrenForm(
    dichVu: any,
    listNhanBietDichVuSelected: any,
    listGiaCongViecSelected: any,
    listGiaVatTuSelected: any,
    listGiaCongThoSelected: any
  ) {
    // if (this.trangThaiForm != 'mo') {
    //   this.trangThaiForm = 'mo';
      const dialogRef = this.dialog.open(DichVuDialogComponent, {
        width: '100%',
        data: {
          dichVu: dichVu,
          listNhanBietDichVu: listNhanBietDichVuSelected,
          listGiaCongViec: listGiaCongViecSelected,
          listGiaVatTu: listGiaVatTuSelected,
          listGiaCongTho: listGiaCongThoSelected,
        },
      });

      dialogRef.afterClosed().pipe(take(1)).subscribe((result: any) => {

        if (true) {
          //// this.trangThaiForm="dong";

          this.nhanBietDichVuService.update_AllNhanBietDichVu(
            result.dichVu,
            result.listNhanBietDichVu
          );
          this.giaCongViecService.update_AllGiaCongViec(
            result.dichVu,
            result.listGiaCongViec
          );
          this.giaVatTuService.update_AllGiaVatTu(
            result.dichVu,
            result.listGiaVatTu
          );
          this.giaCongThoService.update_AllGiaCongTho(
            result.dichVu,
            result.listGiaCongTho
          );
          this.dichVuService.update_DichVu(result.dichVu);
          this.router.navigate(['/admin/dich-vu']);
        }
      });
    // }
  }

  ChiTietDichVu(dichVu: DichVu) {
    this.componentShareService.notifyCountValue(dichVu);
    this.router.navigate(['/danh-muc-dich-vu/chi-tiet-dich-vu']);
  }
  ReloadPage(){
    location.reload();
  }
}
