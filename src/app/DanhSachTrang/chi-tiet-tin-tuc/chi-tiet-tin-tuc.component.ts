import { FileUploadService } from './../../services/file-upload.service';
import { TinTuc } from './../../models/TinTuc';
import { NoiDungTinService } from './../../services/noi-dung-tin.service';
import { NoiDungTin } from './../../models/NoiDungTin';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentShareService } from 'src/app/services/component-share.service';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-chi-tiet-tin-tuc',
  templateUrl: './chi-tiet-tin-tuc.component.html',
  styleUrls: ['./chi-tiet-tin-tuc.component.css'],
})
export class ChiTietTinTucComponent implements OnInit {
  private valueFromChildSubscription!: Subscription;
  tinTuc: TinTuc = {};
  listNoiDungTin!: NoiDungTin[];
  imgUrl!: string;
  constructor(
    public componentShareService: ComponentShareService,
    public noiDungTinService: NoiDungTinService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.valueFromChildSubscription =
      this.componentShareService.ValueFromChild.subscribe((data: any) => {
        this.tinTuc = data;

        this.noiDungTinService
          .get_AllNoiDungTinByIdDoc(this.tinTuc.idDoc!)
          .subscribe((data: any) => {
            this.listNoiDungTin = data;
          });
      });
  }

  //ham de get ang tu storage
  getProfileImageUrl() {
    const userStorageRef = firebase
      .storage()
      .ref()
      .child('img-noidungtin/noidungtin-6-1.jpg');
    userStorageRef.getDownloadURL().then((url) => {
      this.imgUrl = url;
      console.log('url tu chi chi tiet tin tuc', this.imgUrl);
    });
    return this.imgUrl;
  }
}
