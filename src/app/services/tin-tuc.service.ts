import { TinTuc } from './../models/TinTuc';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TinTucService {

  constructor(public fireservices: AngularFirestore) { }
  listTinTuc!: Observable<TinTuc[]>;
  get_AllTinTuc(): Observable<any[]> {
    this.listTinTuc = this.fireservices
      .collection('TinTuc', (ref) => ref.orderBy('id', 'asc'))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as TinTuc;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listTinTuc;
  }
}
