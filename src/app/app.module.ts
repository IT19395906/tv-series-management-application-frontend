import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeatherModule } from 'angular-feather';
import { AddItemComponent } from './add-item/add-item.component';

import {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Key,
  UserCheck,
  Mail,
  Search,
  Edit,
  Edit3,
  Trello,
  FileText,
  Settings,
  DollarSign,
  CreditCard,
  Coffee,
  Users
} from 'angular-feather/icons';
import { ViewAllItemsComponent } from './view-all-items/view-all-items.component';
import { ViewSingleItemComponent } from './view-single-item/view-single-item.component';
import { HomeComponent } from './home/home.component';

const icons = {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Key,
  UserCheck,
  Mail,
  Search,
  Edit,
  Edit3,
  Trello,
  FileText,
  Settings,
  DollarSign,
  CreditCard,
  Coffee,
  Users
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    SidebarComponent,
    AddItemComponent,
    ViewAllItemsComponent,
    ViewSingleItemComponent,
    HomeComponent
  ],
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
    DatePipe,
    MatDatepickerModule,
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),
    FeatherModule.pick(icons),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
