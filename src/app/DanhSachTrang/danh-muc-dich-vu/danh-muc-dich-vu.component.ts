import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-danh-muc-dich-vu',
  templateUrl: './danh-muc-dich-vu.component.html',
  styleUrls: ['./danh-muc-dich-vu.component.css'],
})
export class DanhMucDichVuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

  //Khong duoc xoa, chua nho bien nay de lam gi
  showFiller = false;
  ChuyenToiTrangChu(){

  }
}
