import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags.component';
import { TagsRoutingModule } from './tags-routing.module';
import { TablePaginationModule } from '@shared/table-pagination/table-pagination.module';

@NgModule({
  declarations: [
    TagsComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    TablePaginationModule
  ]
})
export class TagsModule { }
