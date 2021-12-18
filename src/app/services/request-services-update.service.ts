import { RequestServicesUpdate } from './../models/RequestServicesUpdate';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RequestServicesUpdateService {

  constructor(public fireservices: AngularFirestore) { }
  listRequestUpdateServices!: Observable<RequestServicesUpdate[]>;
  get_AllRequest(): Observable<any[]> {
    this.listRequestUpdateServices = this.fireservices
      .collection('RequestServicesUpdate')
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as RequestServicesUpdate;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );

    return this.listRequestUpdateServices;
  }

  requestDoc!: AngularFirestoreDocument<RequestServicesUpdate>
  delete_Request(request: RequestServicesUpdate){
    this.requestDoc = this.fireservices.doc(`RequestServicesUpdate/${request.idDoc}`);
    this.requestDoc.delete();
  }
}
