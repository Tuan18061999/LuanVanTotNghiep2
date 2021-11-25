import { FileUploadService } from './file-upload.service';
import { NoiDungTin } from './../models/NoiDungTin';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { analytics } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class NoiDungTinService {
  constructor(
    public fireservices: AngularFirestore,
    public fileUpLoadService: FileUploadService
  ) {}
  listNoiDungTin!: Observable<NoiDungTin[]>;
  get_AllNoiDungTinByIdDoc(id: string): Observable<any[]> {
    this.listNoiDungTin = this.fireservices
      .collection(`TinTuc/${id}/NoiDungTin`)
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data() as NoiDungTin;
            data.idDoc = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.listNoiDungTin;
  }
}
