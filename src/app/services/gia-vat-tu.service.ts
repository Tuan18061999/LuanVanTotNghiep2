import { GiaVatTu } from './../models/GiaVatTu';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DichVu } from '../models/DichVu';

@Injectable({
  providedIn: 'root'
})
export class GiaVatTuService {

  constructor(public fireservices: AngularFirestore) { }
  listGiaVatTu!: Observable<GiaVatTu[]>;
  get_AllGiaVatTuByIdDoc(id: string): Observable<any[]> {
    this.listGiaVatTu = this.fireservices
      .collection(`DichVu/${id}/giaVTThamKhao`)
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as GiaVatTu;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listGiaVatTu;
  }
  create_NewGiaVatTu(giaVatTu: any, idDoc: string){
    return this.fireservices.collection('DichVu/'+idDoc+'/giaVTThamKhao').add(giaVatTu);
  }

  giaVatTuDoc!: AngularFirestoreDocument<GiaVatTu>;
  delete_AllGiaCongTho(dichVu: DichVu) {
    this.fireservices
      .collection(`DichVu/${dichVu.idDoc}/giaVTThamKhao`)
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  }

  delete_GiaVatTu(dichVu: DichVu, giaVatTu: GiaVatTu) {
    this.giaVatTuDoc = this.fireservices.doc(
      `DichVu/${dichVu.idDoc}/giaVTThamKhao/${giaVatTu.idDoc}`
    );
    this.giaVatTuDoc.delete();
  }

  update_AllGiaVatTu(
    dichVu: DichVu,
    listOldGiaVatTu: GiaVatTu[],
    listNewGiaVatTu: GiaVatTu[]
  ) {
    for(let giaVatTu of listOldGiaVatTu){
      this.delete_GiaVatTu(dichVu,giaVatTu);
    }
    for (let giaVatTu of listNewGiaVatTu) {
      delete giaVatTu.idDoc;
      this.create_NewGiaVatTu(giaVatTu, dichVu.idDoc!);
    }
  }
}