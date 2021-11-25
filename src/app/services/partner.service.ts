import { Partner } from './../models/Partner';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(public fireservices: AngularFirestore) {}
  partners!: Observable<Partner[]>;

  get_AllWaitingPartner(): Observable<any[]> {
    this.partners = this.fireservices
      .collection('Partners', (ref) => ref.where('accountStatus', '==', 'Đang chờ'))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as Partner;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.partners;
  }

  get_AllConfirmPartner(): Observable<any[]> {
    this.partners = this.fireservices
      .collection('Partners', (ref) => ref.where('accountStatus', '!=', 'Đang chờ'))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as Partner;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.partners;
  }

  partnerDoc!: AngularFirestoreDocument<Partner>
  delete_Partner(partner: Partner){
    this.partnerDoc = this.fireservices.doc(`Partners/${partner.idDoc}`);
    this.partnerDoc.delete();
  }
  update_Partner(partner: Partner){
    this.partnerDoc=this.fireservices.doc(`Partners/${partner.idDoc}`);
    delete partner.idDoc;
    this.partnerDoc.update(partner);
  }
}
