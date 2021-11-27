import { GiaCongViec } from './../models/GiaCongViec';
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
export class GiaCongViecService {

  constructor(public fireservices: AngularFirestore) { }
  listGiaCongViec!: Observable<GiaCongViec[]>;
  get_AllGiaCongViecByIdDoc(id: string): Observable<any[]> {
    this.listGiaCongViec = this.fireservices
      .collection(`DichVu/${id}/giaCVThamKhao`)
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as GiaCongViec;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listGiaCongViec;
  }

  create_NewGiaCongViec(giaCongViec: GiaCongViec, idDoc: string){
    if(giaCongViec.tenThamKhao == undefined || giaCongViec.tenThamKhao == ''){
      delete giaCongViec.tenThamKhao;
    }
    if(giaCongViec.noiDungGia == undefined || giaCongViec.noiDungGia == ''){
      delete giaCongViec.noiDungGia;
    }
    if(giaCongViec.ghiChu == undefined || giaCongViec.ghiChu == ''){
      delete giaCongViec.ghiChu;
    }
    return this.fireservices.collection('DichVu/'+idDoc+'/giaCVThamKhao').add(giaCongViec);
  }

  giaCongViecDoc!: AngularFirestoreDocument<GiaCongViec>;
  delete_AllGiaCongViec(dichVu: DichVu) {
    this.fireservices
      .collection(`DichVu/${dichVu.idDoc}/giaCVThamKhao`)
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  }
  delete_GiaCongViec(dichVu: DichVu, giaCongViec: GiaCongViec) {
    this.giaCongViecDoc = this.fireservices.doc(
      `DichVu/${dichVu.idDoc}/giaCVThamKhao/${giaCongViec.idDoc}`
    );
    this.giaCongViecDoc.delete();
  }

  update_AllGiaCongViec(
    dichVu: DichVu,
    listNewGiaCongViec: GiaCongViec[]
  ) {
    for (let giaCongViec of listNewGiaCongViec) {
      delete giaCongViec.idDoc;
      this.create_NewGiaCongViec(giaCongViec, dichVu.idDoc!);
    }
  }
}
