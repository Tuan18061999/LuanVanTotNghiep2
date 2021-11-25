import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(public fireservices: AngularFirestore) {}
  admins!: Observable<Admin[]>;

  get_AllAdmin(): Observable<any[]> {
    this.admins = this.fireservices
      .collection('Admin', (ref) => ref.orderBy('name', 'asc'))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as Admin;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.admins;
  }

  adminDoc!: AngularFirestoreDocument<Admin>
  delete_Admin(admin: Admin){
    this.adminDoc = this.fireservices.doc(`Admin/${admin.id}`);
    this.adminDoc.delete();
  }

  create_NewAdmin(admin: any){
    return this.fireservices.collection('Admin', ref => ref.orderBy('name','asc')).add(admin);
  }

  update_Admin(admin: any){
    this.adminDoc=this.fireservices.doc(`Admin/${admin.id}`);
    delete admin.id;
    this.adminDoc.update(admin);
  }

}
