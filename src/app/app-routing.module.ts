import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ViewAllItemsComponent } from './view-all-items/view-all-items.component';
import { HomeComponent } from './home/home.component';
import { ViewFullDetailComponent } from './view-full-detail/view-full-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add-item', component: AddItemComponent, canActivate: [AuthGuard] },
  { path: 'view', component: ViewAllItemsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'view-detail/:id', component: ViewFullDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upcoming', component: UpcomingComponent },
  { path: 'contact', component: ContactComponent },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
