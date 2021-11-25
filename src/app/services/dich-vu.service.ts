import { DichVu } from './../models/DichVu';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DichVuService {
  constructor(public fireservices: AngularFirestore) {}
  listDichVu!: Observable<DichVu[]>;
  dichVu!: Observable<DichVu>;
  get_AllDichVu(): Observable<any[]> {
    this.listDichVu = this.fireservices
      .collection('DichVu', (ref) => ref.orderBy('id', 'desc'))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as DichVu;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listDichVu;
  }

  get_DichVuByMaNhom(maNhom: number): Observable<any[]> {
    this.listDichVu = this.fireservices
      .collection('DichVu', (ref) => ref.where('maNhomDV', '==', maNhom))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as DichVu;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listDichVu;
  }

  get_DichVuById(id: number): Observable<DichVu> {
    this.dichVu = this.fireservices
      .collection('DichVu', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as DichVu;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.dichVu;
  }

  create_NewDichVu(dichVu: DichVu) {
    if (dichVu.camKet == undefined) {
      delete dichVu.camKet;
    }
    if (dichVu.luuY == undefined) {
      delete dichVu.luuY;
    }
    if (dichVu.moTa == undefined) {
      delete dichVu.moTa;
    }
    if (dichVu.danhSachSuaChua == undefined) {
      delete dichVu.danhSachSuaChua;
    }
    if (dichVu.danhSachDV == undefined) {
      delete dichVu.danhSachDV;
    }
    if (dichVu.lyDoCanSua == undefined) {
      delete dichVu.lyDoCanSua;
    }
    if (dichVu.ghiChuSuDung == undefined) {
      delete dichVu.ghiChuSuDung;
    }
    if (dichVu.tieuChiDV == undefined) {
      delete dichVu.tieuChiDV;
    }
    if (dichVu.quyTrinhTiepNhan == undefined) {
      delete dichVu.quyTrinhTiepNhan;
    }
    if (dichVu.quyTrinhBD == undefined) {
      delete dichVu.quyTrinhBD;
    }
    if (dichVu.luuYSuDung == undefined) {
      delete dichVu.luuYSuDung;
    }
    return this.fireservices.collection('DichVu').add(dichVu);
  }

  dichVuDoc!: AngularFirestoreDocument<DichVu>;
  delete_DichVu(dichVu: DichVu) {
    this.dichVuDoc = this.fireservices.doc(`DichVu/${dichVu.idDoc}`);
    this.dichVuDoc.delete();
  }
  update_DichVu(dichVu: any) {
    this.dichVuDoc = this.fireservices.doc(`DichVu/${dichVu.idDoc}`);
    if (dichVu.camKet == undefined) {
      delete dichVu.camKet;
    }
    if (dichVu.luuY == undefined) {
      delete dichVu.luuY;
    }
    if (dichVu.moTa == undefined) {
      delete dichVu.moTa;
    }
    if (dichVu.danhSachSuaChua == undefined) {
      delete dichVu.danhSachSuaChua;
    }
    if (dichVu.danhSachDV == undefined) {
      delete dichVu.danhSachDV;
    }
    if (dichVu.lyDoCanSua == undefined) {
      delete dichVu.lyDoCanSua;
    }
    if (dichVu.ghiChuSuDung == undefined) {
      delete dichVu.ghiChuSuDung;
    }
    if (dichVu.tieuChiDV == undefined) {
      delete dichVu.tieuChiDV;
    }
    if (dichVu.quyTrinhTiepNhan == undefined) {
      delete dichVu.quyTrinhTiepNhan;
    }
    if (dichVu.quyTrinhBD == undefined) {
      delete dichVu.quyTrinhBD;
    }
    if (dichVu.luuYSuDung == undefined) {
      delete dichVu.luuYSuDung;
    }
    delete dichVu.idDoc;
    this.dichVuDoc.update(dichVu);

  }
}
