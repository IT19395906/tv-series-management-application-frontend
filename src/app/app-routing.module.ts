import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ViewAllItemsComponent } from './view-all-items/view-all-items.component';
import { HomeComponent } from './home/home.component';
import { ViewFullDetailComponent } from './view-full-detail/view-full-detail.component';

const routes: Routes = [
    { path: 'add-item', component: AddItemComponent },
    { path: 'view', component: ViewAllItemsComponent },
    { path: 'home', component: HomeComponent },
    { path: 'view-detail/:id', component: ViewFullDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
