import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { BannerAreaComponent } from './banner-area/banner-area.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard02Component } from './dashboard02/dashboard02.component';
// import { ImageUploadComponent } from './image-upload/image-upload.component';

export const routes: Routes = [
    {path:'Home', component:BannerAreaComponent},
    {path:'Contact', component:ContactComponent},
    // {path:'Dashboard', component:DashboardComponent},
    {path:'Dashboard', component:Dashboard02Component}
];
