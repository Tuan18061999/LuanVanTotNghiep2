import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Users } from './../models/Users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public fireservices: AngularFirestore) {}

  users!: Observable<Users[]>;
  get_Alluser(): Observable<any[]> {
    this.users = this.fireservices
      .collection('Users', (ref) => ref.orderBy('name', 'asc'))
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as Users;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.users;
  }

  userDoc!: AngularFirestoreDocument<Users>;
  delete_User(user: Users) {
    this.userDoc = this.fireservices.doc(`Users/${user.id}`);
    this.userDoc.delete();
  }
}
