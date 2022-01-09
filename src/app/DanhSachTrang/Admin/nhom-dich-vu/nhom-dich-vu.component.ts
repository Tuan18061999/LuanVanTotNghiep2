import { NhomDichVuDialogComponent } from './../templates/nhom-dich-vu-dialog/nhom-dich-vu-dialog.component';
import { Component, OnInit } from '@angular/core';
import { NhomDichVu } from './../../../models/NhomDichVu';
import { NhomDichVuService } from 'src/app/services/nhom-dich-vu.service';
import { XoadialogComponent } from '../xoadialog/xoadialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TrungDuLieuDialogComponent } from '../templates/trung-du-lieu-dialog/trung-du-lieu-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nhom-dich-vu',
  templateUrl: './nhom-dich-vu.component.html',
  styleUrls: ['./nhom-dich-vu.component.css'],
})
export class NhomDichVuComponent implements OnInit {
  nhomDichVu: NhomDichVu = {
    // maNhomDV: 0,
    // name: '',
  };
  listNhomDichVu!: NhomDichVu[];
  constructor(
    public nhomDichVuService: NhomDichVuService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nhomDichVuService.get_AllNhomDichVu().subscribe((data: any) => {
      this.listNhomDichVu = data;
    });
  }

  checkTrung(nhomDichVuCheck: NhomDichVu, listNhomDichVu: NhomDichVu[]) {
    for (var nhomDichVu of listNhomDichVu) {
      if (nhomDichVuCheck.name === nhomDichVu.name) return false;
    }
    return true;
  }

  MaNhomDichVuTuDongTang(listNhomDichVu: NhomDichVu[]) {
    let max = 0;
    for (var nhomDichVu of listNhomDichVu) {
      if (max < (nhomDichVu.maNhomDV || 0)) {
        max = nhomDichVu.maNhomDV || max;
      }
    }
    return max + 1;
  }

  XoaNhomDichVu(event: any, nhomDichVu: any) {
    const dialogRef = this.dialog.open(XoadialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.nhomDichVuService.delete_NhomDichVu(nhomDichVu);
        this.router.navigate(['/admin/nhom-dich-vu']);
      }
    });
  }

  ThemNhomDichVu() {
    const dialogRef = this.dialog.open(NhomDichVuDialogComponent, {
      width: '250px',
      data: {
        //maNhomDV: this.nhomDichVu.maNhomDV,
        name: this.nhomDichVu.name,
        iconNameAngular: this.nhomDichVu.iconNameAngular,
        iconNameReact: this.nhomDichVu.iconNameReact,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (this.checkTrung(result, this.listNhomDichVu)) {
        let newNhomDichVu: NhomDichVu = {};
        newNhomDichVu.name = result.name;
        newNhomDichVu.iconNameAngular = result.iconNameAngular;
        newNhomDichVu.iconNameReact = result.iconNameReact;
        newNhomDichVu.maNhomDV = this.MaNhomDichVuTuDongTang(
          this.listNhomDichVu
        );
        this.nhomDichVuService.create_NewNhomDichVu(newNhomDichVu);
        this.router.navigate(['/admin/nhom-dich-vu']);
      } else {
        const dialogRef = this.dialog.open(TrungDuLieuDialogComponent);
      }
    });
  }
  CapNhatNhomDichVu(event: any, nhomDichVu: any) {
    const dialogRef = this.dialog.open(NhomDichVuDialogComponent, {
      width: '250px',
      data: {
        id: nhomDichVu.id,
        name: nhomDichVu.name,
        iconNameAngular: nhomDichVu.iconNameAngular,
        iconNameReact: nhomDichVu.iconNameReact,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.nhomDichVuService.update_NhomDichVu(result);
      this.router.navigate(['/admin/nhom-dich-vu']);
    });
  }
}
