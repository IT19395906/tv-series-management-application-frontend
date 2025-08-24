import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ViewAllItemsComponent } from './view-all-items/view-all-items.component';

const routes: Routes = [
    { path: 'add-item', component: AddItemComponent },
    { path: 'view', component: ViewAllItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
