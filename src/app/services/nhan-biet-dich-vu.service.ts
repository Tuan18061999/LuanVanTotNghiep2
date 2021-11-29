import { DichVu } from 'src/app/models/DichVu';
import { NhanBietDichVu } from './../models/NhanBietDichVu';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NhanBietDichVuService {
  constructor(public fireservices: AngularFirestore) {}
  listOld!: NhanBietDichVu[];
  listNhanBietDichVu!: Observable<NhanBietDichVu[]>;
  get_AllNhanBietDichVuByIdDoc(idDoc: string): Observable<any[]> {
    this.listNhanBietDichVu = this.fireservices
      .collection(`DichVu/${idDoc}/nhanBietDV`)
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as NhanBietDichVu;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listNhanBietDichVu;
  }

  create_NewNhanBietDichVu(nhanBietDichVu: NhanBietDichVu, idDoc: string) {
    console.log('them nhan biet');
    if (
      nhanBietDichVu.tenNhanBiet == undefined ||
      nhanBietDichVu.tenNhanBiet == ''
    ) {
      delete nhanBietDichVu.tenNhanBiet;
    }

    if (nhanBietDichVu.dauHieu == undefined || nhanBietDichVu.dauHieu == []) {
      delete nhanBietDichVu.dauHieu;
    }

    return this.fireservices
      .collection('DichVu/' + idDoc + '/nhanBietDV')
      .add(nhanBietDichVu);
  }

  nhanBietDoc!: AngularFirestoreDocument<NhanBietDichVu>;
  //Delete luon ca collection
  delete_AllNhanBietDichVu(dichVu: DichVu) {
    this.fireservices
      .collection(`DichVu/${dichVu.idDoc}/nhanBietDV`)
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
          console.log('xoa nhan biet');
        });
      });
  }

  update_NhanBietDichVu(dichVu: DichVu, nhanBiet: NhanBietDichVu) {
    this.nhanBietDoc = this.fireservices.doc(
      `DichVu/${dichVu.idDoc}/nhanBietDV/${nhanBiet.idDoc}`
    );
    delete nhanBiet.idDoc;
    this.nhanBietDoc.update(nhanBiet);
  }

  delete_NhanBietDichVu(dichVu: DichVu, nhanBiet: NhanBietDichVu) {
    console.log('thanh cong xoa');
    this.nhanBietDoc = this.fireservices.doc(
      `DichVu/${dichVu.idDoc}/nhanBietDV/${nhanBiet.idDoc}`
    );
    this.nhanBietDoc.delete();
  }

  update_AllNhanBietDichVu(
    dichVu: DichVu,

    listNewNhanBietDichVu: NhanBietDichVu[]
  ) {
    for (let nhanBiet of listNewNhanBietDichVu) {
      delete nhanBiet.idDoc;
      this.create_NewNhanBietDichVu(nhanBiet, dichVu.idDoc!);
    }
  }
}
