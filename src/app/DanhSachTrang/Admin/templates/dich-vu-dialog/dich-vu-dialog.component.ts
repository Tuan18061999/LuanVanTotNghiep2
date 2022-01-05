import { FileUploadService } from './../../../../services/file-upload.service';
import { GiaCongThoService } from './../../../../services/gia-cong-tho.service';
import { GiaVatTuService } from './../../../../services/gia-vat-tu.service';
import { GiaCongViecService } from './../../../../services/gia-cong-viec.service';
import { NhanBietDichVuService } from './../../../../services/nhan-biet-dich-vu.service';
import { GiaVatTu } from 'src/app/models/GiaVatTu';
import { NhanBietDichVu } from './../../../../models/NhanBietDichVu';
import { NhomDichVuService } from 'src/app/services/nhom-dich-vu.service';
import { NhomDichVu } from 'src/app/models/NhomDichVu';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DichVu } from 'src/app/models/DichVu';
import { GiaCongViec } from 'src/app/models/GiaCongViec';
import { GiaCongTho } from 'src/app/models/GiaCongTho';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dich-vu-dialog',
  templateUrl: './dich-vu-dialog.component.html',
  styleUrls: ['./dich-vu-dialog.component.css'],
})
export class DichVuDialogComponent implements OnInit {
  listNhomDichVu!: NhomDichVu[];

  nhanBietDichVu: NhanBietDichVu = {};
  giaCongViec: GiaCongViec = {};
  giaVatTu: GiaVatTu = {};
  giaCongTho: GiaCongTho = {};

  //Cac list co vai tro giu gai tri ban dau
  listNhanBietDichVuBanDau: NhanBietDichVu[] = [];
  listGiaCongViecBanDau: GiaCongViec[] = [];
  listGiaVatTuBanDau: GiaVatTu[] = [];
  listGiaCongThoBanDau: GiaCongTho[] = [];

  //Cac bien cua file up anh
  title = 'cloudsSorage';
  selectedFile!: File;
  fb: any;
  downloadURL!: Observable<string>;

  @ViewChild('dauHieu') dauHieu: any;
  @ViewChild('moTa') moTa: any;

  //Cac bien cua form
  trangThaiAnh: boolean = true;
  trangThaiNhanBiet: boolean = true;
  trangThaiGiaCongViec: boolean = true;
  trangThaiGiaVatTu: boolean = true;
  trangThaiGiaCongTho: boolean = true;
  idSelected!: number;

  DialogRef: any;
  constructor(
    private storage: AngularFireStorage,
    public fileUploadService: FileUploadService,
    public nhanBietDichVuService: NhanBietDichVuService,
    public giaCongViecService: GiaCongViecService,
    public giaVatTuService: GiaVatTuService,
    public giaCongThoService: GiaCongThoService,
    public nhomDichVuSerVice: NhomDichVuService,
    dialogRef: MatDialogRef<DichVuDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dichVu: DichVu;
      listNhanBietDichVu: NhanBietDichVu[];
      listGiaCongViec: GiaCongViec[];
      listGiaVatTu: GiaVatTu[];
      listGiaCongTho: GiaCongTho[];
    }
  ) {
    this.nhomDichVuSerVice.get_AllNhomDichVu().subscribe((data: any) => {
      this.listNhomDichVu = data;
    });
    this.DialogRef = dialogRef;
  }

  ngOnInit(): void {
    //Khoi tao bo nho cho cac list de co the xai ham push
    if (this.data.listNhanBietDichVu == null) {
      //Khi moi tao chua co du lieu nen phai phai gan du lieu [] de xai ham push
      this.data.listNhanBietDichVu = [];
    } else {
      for (let nhanBiet of this.data.listNhanBietDichVu) {
        //Khi o trang thai sua, gan gia tri cho mang de giu lai gia tri ban dau
        this.listNhanBietDichVuBanDau.push(nhanBiet);
      }
    }

    if (this.data.listGiaCongViec == null) {
      this.data.listGiaCongViec = [];
    } else {
      for (let giaCongViec of this.data.listGiaCongViec) {
        this.listGiaCongViecBanDau.push(giaCongViec);
      }
    }

    if (this.data.listGiaVatTu == null) {
      this.data.listGiaVatTu = [];
    } else {
      for (let giaVatTu of this.data.listGiaVatTu) {
        this.listGiaVatTuBanDau.push(giaVatTu);
      }
    }

    if (this.data.listGiaCongTho == null) {
      this.data.listGiaCongTho = [];
    } else {
      for (let giaCongTho of this.data.listGiaCongTho) {
        this.listGiaCongThoBanDau.push(giaCongTho);
      }
    }

    if(this.data.dichVu.imgDichVu != null){
      //Anh da co nen chuyen trang thai bang false. Khong cho chinh sua. Neu muon chinh sua
      //phai nhan vao nut chinh sua
      this.trangThaiAnh = false;
    }

  }
  onNoClick() {
    this.DialogRef.close();
  }
  //Dung de xoa het du lieu truoc khi cap nhat du lieu moi
  XoaDuLieu() {
    for (let nhanBiet of this.listNhanBietDichVuBanDau) {
      this.nhanBietDichVuService.delete_NhanBietDichVu(
        this.data.dichVu,
        nhanBiet
      );
    }
    for (let giaCongViec of this.listGiaCongViecBanDau) {
      this.giaCongViecService.delete_GiaCongViec(this.data.dichVu, giaCongViec);
    }
    for (let giaVatTu of this.listGiaVatTuBanDau) {
      this.giaVatTuService.delete_GiaVatTu(this.data.dichVu, giaVatTu);
    }
    for (let giaCongTho of this.listGiaCongThoBanDau) {
      this.giaCongThoService.delete_GiaCongTho(this.data.dichVu, giaCongTho);
    }
  }

  ChuoiThanhMangNBDV(event: any) {
    this.nhanBietDichVu.dauHieu = event.target.value.split('\n');
  }
  ChuoiThanhMangCamKet(event: any) {
    this.data.dichVu.camKet = event.target.value.split('\n');
  }
  ChuoiThanhMangLuuY(event: any) {
    this.data.dichVu.luuY = event.target.value.split('\n');
  }

  ChuoiThanhMangMoTa(event: any) {
    this.data.dichVu.moTa = event.target.value.split('\n');
  }
  ChuoiThanhMangDanhSachSuaChua(event: any) {
    this.data.dichVu.danhSachSuaChua = event.target.value.split('\n');
  }
  ChuoiThanhMangDanhSachDV(event: any) {
    this.data.dichVu.danhSachDV = event.target.value.split('\n');
  }
  ChuoiThanhMangLyDoCanSua(event: any) {
    this.data.dichVu.lyDoCanSua = event.target.value.split('\n');
  }
  ChuoiThanhMangGhiChuSuDung(event: any) {
    this.data.dichVu.ghiChuSuDung = event.target.value.split('\n');
  }
  ChuoiThanhMangTieuChiDV(event: any) {
    this.data.dichVu.tieuChiDV = event.target.value.split('\n');
  }
  ChuoiThanhMangQuyTrinhTiepNhan(event: any) {
    this.data.dichVu.quyTrinhTiepNhan = event.target.value.split('\n');
  }
  ChuoiThanhMangQuyTrinhBD(event: any) {
    this.data.dichVu.quyTrinhBD = event.target.value.split('\n');
  }
  ChuoiThanhMangLuuYSuDung(event: any) {
    this.data.dichVu.luuYSuDung = event.target.value.split('\n');
  }
  //Nhan biet dich vu
  clearNhanBiet() {
    this.nhanBietDichVu.tenNhanBiet = '';
    this.nhanBietDichVu.dauHieu = [];
    this.dauHieu.nativeElement.value = ' ';
  }
  ThemNhanBiet() {
    let newNhanBietDichVu: NhanBietDichVu = {};
    newNhanBietDichVu.tenNhanBiet = this.nhanBietDichVu.tenNhanBiet;
    newNhanBietDichVu.dauHieu = this.nhanBietDichVu.dauHieu;
    this.data.listNhanBietDichVu.push(newNhanBietDichVu);
    this.clearNhanBiet();
  }
  XoaNhanBiet(id: number) {
    this.data.listNhanBietDichVu.splice(id, 1);
  }
  SuaNhanBiet(id: number) {
    this.idSelected = id;
    let nhanBietDichVuSelected: NhanBietDichVu;
    nhanBietDichVuSelected = this.data.listNhanBietDichVu[id];
    this.nhanBietDichVu.tenNhanBiet = nhanBietDichVuSelected.tenNhanBiet;
    this.nhanBietDichVu.dauHieu = nhanBietDichVuSelected.dauHieu;
    this.dauHieu.nativeElement.value =
      nhanBietDichVuSelected.dauHieu?.join('\n');
    this.trangThaiNhanBiet = false;
  }
  LuuNhanBiet() {
    this.data.listNhanBietDichVu[this.idSelected].tenNhanBiet =
      this.nhanBietDichVu.tenNhanBiet;
    this.data.listNhanBietDichVu[this.idSelected].dauHieu =
      this.nhanBietDichVu.dauHieu;
    this.trangThaiNhanBiet = true;
    this.clearNhanBiet();
  }

  //Gia cong viec
  clearGiaCongViec() {
    this.giaCongViec.tenThamKhao = '';
    this.giaCongViec.noiDungGia = '';
    this.giaCongViec.ghiChu = '';
  }
  ThemGiaCongViec() {
    let newGiaCongViec: GiaCongViec = {};
    newGiaCongViec.tenThamKhao = this.giaCongViec.tenThamKhao;
    newGiaCongViec.noiDungGia = this.giaCongViec.noiDungGia;
    newGiaCongViec.ghiChu = this.giaCongViec.ghiChu;
    this.data.listGiaCongViec.push(newGiaCongViec);
    this.clearGiaCongViec();
  }
  XoaGiaCongViec(id: number) {
    this.data.listGiaCongViec.splice(id, 1);
  }
  SuaGiaCongViec(id: number) {
    this.idSelected = id;
    let giaCongViecSelected: GiaCongViec;
    giaCongViecSelected = this.data.listGiaCongViec[id];
    this.giaCongViec.tenThamKhao = giaCongViecSelected.tenThamKhao;
    this.giaCongViec.noiDungGia = giaCongViecSelected.noiDungGia;
    this.giaCongViec.ghiChu = giaCongViecSelected.ghiChu;
    this.trangThaiGiaCongViec = false;
  }
  LuuGiaCongViec() {
    this.data.listGiaCongViec[this.idSelected].tenThamKhao =
      this.giaCongViec.tenThamKhao;
    this.data.listGiaCongViec[this.idSelected].noiDungGia =
      this.giaCongViec.noiDungGia;
    this.data.listGiaCongViec[this.idSelected].ghiChu = this.giaCongViec.ghiChu;
    this.trangThaiGiaCongViec = true;
    this.clearGiaCongViec();
  }

  //Gia vat tu
  ClearGiaVatTu() {
    this.giaVatTu.tenVatTu = '';
    this.giaVatTu.giaVatTu = '';
    this.giaVatTu.DVT = '';
    this.giaVatTu.nhomVT = '';
    this.giaVatTu.phiDV = '';
    this.giaVatTu.trieuChung = '';
    this.giaVatTu.baoHanhVT = '';
    this.giaVatTu.ghiChu = '';
  }
  ThemGiaVatTu() {
    let newGiaVatTu: GiaVatTu = {};
    newGiaVatTu.tenVatTu = this.giaVatTu.tenVatTu;
    newGiaVatTu.giaVatTu = this.giaVatTu.giaVatTu;
    newGiaVatTu.DVT = this.giaVatTu.DVT;
    newGiaVatTu.nhomVT = this.giaVatTu.nhomVT;
    newGiaVatTu.phiDV = this.giaVatTu.phiDV;
    newGiaVatTu.trieuChung = this.giaVatTu.trieuChung;
    newGiaVatTu.baoHanhVT = this.giaVatTu.baoHanhVT;
    newGiaVatTu.ghiChu = this.giaVatTu.ghiChu;
    this.data.listGiaVatTu.push(newGiaVatTu);
    this.ClearGiaVatTu();
  }
  XoaGiaVatTu(id: number) {
    this.data.listGiaVatTu.splice(id, 1);
  }
  SuaGiaVatTu(id: number) {
    this.idSelected = id;
    let giaVatTuSelected: GiaVatTu;
    giaVatTuSelected = this.data.listGiaVatTu[id];
    this.giaVatTu.tenVatTu = giaVatTuSelected.tenVatTu;
    this.giaVatTu.giaVatTu = giaVatTuSelected.giaVatTu;
    this.giaVatTu.DVT = giaVatTuSelected.DVT;
    this.giaVatTu.nhomVT = giaVatTuSelected.nhomVT;
    this.giaVatTu.phiDV = giaVatTuSelected.phiDV;
    this.giaVatTu.trieuChung = giaVatTuSelected.trieuChung;
    this.giaVatTu.baoHanhVT = giaVatTuSelected.baoHanhVT;
    this.giaVatTu.ghiChu = giaVatTuSelected.ghiChu;
    this.trangThaiGiaVatTu = false;
  }
  LuuGiaVatTu() {
    this.data.listGiaVatTu[this.idSelected].tenVatTu = this.giaVatTu.tenVatTu;
    this.data.listGiaVatTu[this.idSelected].giaVatTu = this.giaVatTu.giaVatTu;
    this.data.listGiaVatTu[this.idSelected].DVT = this.giaVatTu.DVT;
    this.data.listGiaVatTu[this.idSelected].nhomVT = this.giaVatTu.nhomVT;
    this.data.listGiaVatTu[this.idSelected].phiDV = this.giaVatTu.phiDV;
    this.data.listGiaVatTu[this.idSelected].trieuChung =
      this.giaVatTu.trieuChung;
    this.data.listGiaVatTu[this.idSelected].baoHanhVT = this.giaVatTu.baoHanhVT;
    this.data.listGiaVatTu[this.idSelected].ghiChu = this.giaVatTu.ghiChu;
    this.trangThaiGiaVatTu = true;
    this.ClearGiaVatTu();
  }

  //Gia cong tho
  ClearGiaCongTho() {
    this.giaCongTho.tenCongTho = '';
    this.giaCongTho.DVT = '';
    this.giaCongTho.giaCongTho = '';
    this.giaCongTho.giaThayVT = '';
    this.giaCongTho.phiDV = '';
    this.giaCongTho.DVT2 = '';
  }
  ThemGiaCongTho() {
    let newGiaCongTho: GiaCongTho = {};
    newGiaCongTho.tenCongTho = this.giaCongTho.tenCongTho;
    newGiaCongTho.DVT = this.giaCongTho.DVT;
    newGiaCongTho.giaCongTho = this.giaCongTho.giaCongTho;
    newGiaCongTho.giaThayVT = this.giaCongTho.giaThayVT;
    newGiaCongTho.phiDV = this.giaCongTho.phiDV;
    newGiaCongTho.DVT2 = this.giaCongTho.DVT2;
    this.data.listGiaCongTho.push(newGiaCongTho);
    this.ClearGiaCongTho();
  }
  XoaGiaCongTho(id: number) {
    this.data.listGiaCongTho.splice(id, 1);
  }
  SuaGiaCongTho(id: number) {
    this.idSelected = id;
    let giaCongThoSelected: GiaCongTho;
    giaCongThoSelected = this.data.listGiaCongTho[id];
    this.giaCongTho.tenCongTho = giaCongThoSelected.tenCongTho;
    this.giaCongTho.DVT = giaCongThoSelected.DVT;
    this.giaCongTho.giaCongTho = giaCongThoSelected.giaCongTho;
    this.giaCongTho.giaThayVT = giaCongThoSelected.giaThayVT;
    this.giaCongTho.phiDV = giaCongThoSelected.phiDV;
    this.giaCongTho.DVT2 = giaCongThoSelected.DVT2;
    this.trangThaiGiaCongTho = false;
  }
  LuuGiaCongTho() {
    this.data.listGiaCongTho[this.idSelected].tenCongTho =
      this.giaCongTho.tenCongTho;
    this.data.listGiaCongTho[this.idSelected].DVT = this.giaCongTho.DVT;
    this.data.listGiaCongTho[this.idSelected].giaCongTho =
      this.giaCongTho.giaCongTho;
    this.data.listGiaCongTho[this.idSelected].giaThayVT =
      this.giaCongTho.giaThayVT;
    this.data.listGiaCongTho[this.idSelected].phiDV = this.giaCongTho.phiDV;
    this.data.listGiaCongTho[this.idSelected].DVT2 = this.giaCongTho.DVT2;
    this.trangThaiGiaCongTho = true;
    this.ClearGiaCongTho();
  }

  onFileSelected(event: any) {
    this.upLoadImage(event);
  }

  upLoadImage(event: any) {
    //n la ten cua anh se duoc luu tren storage
    var currentTime = Date.now();
    var fileName = event.target.files[0].name;
    var n = fileName + currentTime;
    const file = event.target.files[0];
    console.log('loai file', file);
    const filePath = `img-dv/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`img-dv/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.data.dichVu.imgDichVu = url;
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log('url', url);
        }
      });
  }
  ChangeImageStatus(){
    this.trangThaiAnh = true;
  }
}
