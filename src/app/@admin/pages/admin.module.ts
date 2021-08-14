import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//MODULES
import { AdminRoutingModule } from './admin-routing.module';
//COMPONENTS
import { AdminComponent } from './admin.component';
import { HeaderComponent } from '@admin-core/components/header/header.component';
import { SidebarComponent } from '@admin-core/components/sidebar/sidebar.component';
import { TitleComponent } from '@admin-core/components/title/title.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    TitleComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
