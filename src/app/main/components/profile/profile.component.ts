import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({right: '-100%'}),
        animate('.5s ease-in-out', style({ transform: 'translateX(-100%)'}))
      ]),
      transition(':leave', [
        animate('.5s ease-in-out', style({ transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  contact: Contact;

  @Input() isOpen: boolean;
  @Output() isClose = new EventEmitter<boolean>();
  @Output() isOpenForm = new EventEmitter<boolean>();
  @Output() isOpenDelete = new EventEmitter<boolean>();

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactService.sharedContact.subscribe((contact: Contact) => {
      this.contact = contact;
    });
  }

  handleModal() {
    this.isOpen = !this.isOpen;
    this.isClose.emit(this.isOpen);
  }
  
  openForm() {
    this.isOpenForm.emit(true);
  }

  openDelete() {
    this.isOpenDelete.emit(true);
  }

  getAvatar() {
    return `assets/icons/default.svg`
  }

}
