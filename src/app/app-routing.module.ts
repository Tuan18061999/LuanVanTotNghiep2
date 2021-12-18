import { ThongKeComponent } from './DanhSachTrang/Admin/thong-ke/thong-ke.component';
import { PartnerComponent } from './DanhSachTrang/Admin/partner/partner.component';
import { DichVuComponent } from './DanhSachTrang/Admin/dich-vu/dich-vu.component';
import { ChiTietTinTucComponent } from './DanhSachTrang/chi-tiet-tin-tuc/chi-tiet-tin-tuc.component';
import { ChiTietDichVuComponent } from './DanhSachTrang/chi-tiet-dich-vu/chi-tiet-dich-vu.component';
import { DanhSachDichVuComponent } from './DanhSachTrang/danh-sach-dich-vu/danh-sach-dich-vu.component';
import { NhomDichVuComponent } from './DanhSachTrang/Admin/nhom-dich-vu/nhom-dich-vu.component';
import { AdminAccountComponent } from './DanhSachTrang/Admin/admin-account/admin-account.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './DanhSachTrang/Admin/login/login.component';
import { UserComponent } from './DanhSachTrang/Admin/user/user.component';
import { DashboardComponent } from './DanhSachTrang/Admin/dashboard/dashboard.component';
import { HomeComponent } from './DanhSachTrang/Admin/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucDichVuComponent } from './DanhSachTrang/danh-muc-dich-vu/danh-muc-dich-vu.component';
import { TrangChuComponent } from './DanhSachTrang/trang-chu/trang-chu.component';
import { AdminComponent } from './DanhSachTrang/Admin/admin/admin.component';
import { OrderComponent } from './DanhSachTrang/Admin/order/order.component';

const routes: Routes = [
  { path: 'trangchu', component: TrangChuComponent },
  { path: '', redirectTo: 'trangchu', pathMatch: 'full' },
  {
    path: 'danh-muc-dich-vu',
    component: DanhMucDichVuComponent,
    children: [
      {
        path: 'danh-sach-dich-vu',
        component: DanhSachDichVuComponent,
      },
      {
        path:'chi-tiet-dich-vu',
        component: ChiTietDichVuComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'admin-account',
        component: AdminAccountComponent,
      },
      {
        path: 'nhom-dich-vu',
        component: NhomDichVuComponent,
      },
      {
        path: 'dich-vu',
        component: DichVuComponent,
      },
      {
        path: 'partner',
        component: PartnerComponent,
      },
      {
        path: 'thong-ke',
        component: ThongKeComponent,
      },
      {
        path: 'don-hang',
        component: OrderComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'chi-tiet-tin-tuc', component: ChiTietTinTucComponent },
  // { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
