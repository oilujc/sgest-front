import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactDeleteComponent } from './components/contact-delete/contact-delete.component';
import { ContactService } from './services/contact.service';


@NgModule({
  declarations: [HomeComponent, ContactFormComponent, ProfileComponent, ContactDeleteComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ContactService
  ]
})
export class MainModule { }
