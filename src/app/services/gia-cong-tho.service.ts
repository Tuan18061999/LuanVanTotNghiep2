import { GiaCongTho } from './../models/GiaCongTho';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DichVu } from '../models/DichVu';

@Injectable({
  providedIn: 'root',
})
export class GiaCongThoService {
  constructor(public fireservices: AngularFirestore) {}
  listGiaCongTho!: Observable<GiaCongTho[]>;
  get_AllGiaCongThoByIdDoc(id: string): Observable<any[]> {
    this.listGiaCongTho = this.fireservices
      .collection(`DichVu/${id}/giaCongThoThamKhao`)
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as GiaCongTho;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listGiaCongTho;
  }

  create_NewGiaCongTho(giaCongTho: GiaCongTho, idDoc: string) {
    if(giaCongTho.tenCongTho == undefined || giaCongTho.tenCongTho == ''){
      delete giaCongTho.tenCongTho;
    }
    if(giaCongTho.DVT == undefined || giaCongTho.DVT == ''){
      delete giaCongTho.DVT;
    }
    if(giaCongTho.DVT2 == undefined || giaCongTho.DVT2 == ''){
      delete giaCongTho.DVT2;
    }
    if(giaCongTho.giaCongTho == undefined || giaCongTho.giaCongTho == ''){
      delete giaCongTho.giaCongTho;
    }
    if(giaCongTho.giaThayVT == undefined || giaCongTho.giaThayVT == ''){
      delete giaCongTho.giaThayVT;
    }
    if(giaCongTho.phiDV == undefined || giaCongTho.phiDV == ''){
      delete giaCongTho.phiDV;
    }
    return this.fireservices
      .collection('DichVu/' + idDoc + '/giaCongThoThamKhao')
      .add(giaCongTho);
  }

  giaCongThoDoc!: AngularFirestoreDocument<GiaCongTho>;
  delete_AllGiaCongTho(dichVu: DichVu) {
    this.fireservices
      .collection(`DichVu/${dichVu.idDoc}/giaCongThoThamKhao`)
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  }

  delete_GiaCongTho(dichVu: DichVu, giaCongTho: GiaCongTho) {
    this.giaCongThoDoc = this.fireservices.doc(
      `DichVu/${dichVu.idDoc}/giaCongThoThamKhao/${giaCongTho.idDoc}`
    );
    this.giaCongThoDoc.delete();
  }

  update_AllGiaCongTho(
    dichVu: DichVu,
    listNewGiaCongTho: GiaCongTho[]
  ) {
    for (let giaCongTho of listNewGiaCongTho) {
      delete giaCongTho.idDoc;
      this.create_NewGiaCongTho(giaCongTho, dichVu.idDoc!);
    }
  }
}
