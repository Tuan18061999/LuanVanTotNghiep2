import { Orders } from './../models/Orders';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(public fireservices: AngularFirestore) {}
  orders!: Observable<Orders[]>;

  get_AllOrder(): Observable<any[]> {
    this.orders = this.fireservices
      .collection('Orders')
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as Orders;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.orders;
  }
}
