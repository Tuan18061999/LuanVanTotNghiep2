import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { UserService } from './services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TrangChuComponent } from './DanhSachTrang/trang-chu/trang-chu.component';
import { DanhMucDichVuComponent } from './DanhSachTrang/danh-muc-dich-vu/danh-muc-dich-vu.component';
import { AdminComponent } from './DanhSachTrang/Admin/admin/admin.component';
import { HeaderComponent } from './DanhSachTrang/Admin/header/header.component';
import { SidenavComponent } from './DanhSachTrang/Admin/sidenav/sidenav.component';
import { HomeComponent } from './DanhSachTrang/Admin/home/home.component';
import { DashboardComponent } from './DanhSachTrang/Admin/dashboard/dashboard.component';
import { UserComponent } from './DanhSachTrang/Admin/user/user.component';
import { XoadialogComponent } from './DanhSachTrang/Admin/xoadialog/xoadialog.component';
import { HeaderTrangChuComponent } from './DanhSachTrang/header-trang-chu/header-trang-chu.component';
import { LoginComponent } from './DanhSachTrang/Admin/login/login.component';
import { LoginErrorComponent } from './DanhSachTrang/Admin/templates/login-error/login-error.component';
import { AdminAccountComponent } from './DanhSachTrang/Admin/admin-account/admin-account.component';
import { AdminAccountDialogComponent } from './DanhSachTrang/Admin/templates/admin-account-dialog/admin-account-dialog.component';
import { TrungDuLieuDialogComponent } from './DanhSachTrang/Admin/templates/trung-du-lieu-dialog/trung-du-lieu-dialog.component';
import { UserDetailsDialogComponent } from './DanhSachTrang/Admin/templates/user-details-dialog/user-details-dialog.component';
import { MenuDichVuComponent } from './DanhSachTrang/menu-dich-vu/menu-dich-vu.component';
import { NhomDichVuComponent } from './DanhSachTrang/Admin/nhom-dich-vu/nhom-dich-vu.component';
import { NhomDichVuDialogComponent } from './DanhSachTrang/Admin/templates/nhom-dich-vu-dialog/nhom-dich-vu-dialog.component';
import { DanhSachDichVuComponent } from './DanhSachTrang/danh-sach-dich-vu/danh-sach-dich-vu.component';
import { ChiTietDichVuComponent } from './DanhSachTrang/chi-tiet-dich-vu/chi-tiet-dich-vu.component';
import { ChiTietTinTucComponent } from './DanhSachTrang/chi-tiet-tin-tuc/chi-tiet-tin-tuc.component';
import { DichVuComponent } from './DanhSachTrang/Admin/dich-vu/dich-vu.component';
import { DichVuDialogComponent } from './DanhSachTrang/Admin/templates/dich-vu-dialog/dich-vu-dialog.component';
import { PartnerComponent } from './DanhSachTrang/Admin/partner/partner.component';
import { PartnerDialogComponent } from './DanhSachTrang/Admin/templates/partner-dialog/partner-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { ThongKeComponent } from './DanhSachTrang/Admin/thong-ke/thong-ke.component';


@NgModule({
  declarations: [
    AppComponent,
    TrangChuComponent,
    DanhMucDichVuComponent,
    AdminComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    UserComponent,
    XoadialogComponent,
    HeaderTrangChuComponent,
    LoginComponent,
    LoginErrorComponent,
    AdminAccountComponent,
    AdminAccountDialogComponent,
    TrungDuLieuDialogComponent,
    UserDetailsDialogComponent,
    MenuDichVuComponent,
    NhomDichVuComponent,
    NhomDichVuDialogComponent,
    DanhSachDichVuComponent,
    ChiTietDichVuComponent,
    ChiTietTinTucComponent,
    DichVuComponent,
    DichVuDialogComponent,
    PartnerComponent,
    PartnerDialogComponent,
    ThongKeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
