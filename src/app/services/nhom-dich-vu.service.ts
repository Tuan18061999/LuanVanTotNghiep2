import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NhomDichVu } from '../models/NhomDichVu';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NhomDichVuService {

  constructor(public fireservices: AngularFirestore) { }
  listNhomDichVu!: Observable<NhomDichVu[]>;

  get_AllNhomDichVu(): Observable<any[]>{
    this.listNhomDichVu = this.fireservices
      .collection('NhomDichVu', (ref) => ref.orderBy('maNhomDV', 'asc'))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as NhomDichVu;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listNhomDichVu;
  }

  nhomDichVuDoc!: AngularFirestoreDocument<NhomDichVu>
  delete_NhomDichVu(nhomDichVu: NhomDichVu){
    this.nhomDichVuDoc = this.fireservices.doc(`NhomDichVu/${nhomDichVu.id}`);
    this.nhomDichVuDoc.delete();
  }

  create_NewNhomDichVu(nhomDichVu: any){
    return this.fireservices.collection('NhomDichVu', ref => ref.orderBy('maNhomDV','asc')).add(nhomDichVu);
  }

  update_NhomDichVu(nhomDichVu: any){
    this.nhomDichVuDoc=this.fireservices.doc(`NhomDichVu/${nhomDichVu.id}`);
    delete nhomDichVu.id;
    this.nhomDichVuDoc.update(nhomDichVu);
  }

}
