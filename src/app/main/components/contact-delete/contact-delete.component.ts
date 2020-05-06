import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('.2s ease-in-out', style({ opacity: 1}))
      ]),
      transition(':leave', [
        animate('.2s ease-in-out', style({ opacity: 0}))
      ])
    ])
  ]
})
export class ContactDeleteComponent implements OnInit {
  @Input() contact: Contact;
  @Input() isOpen: boolean;
  @Output() isSubmitted = new EventEmitter<boolean>();
  @Output() isClose = new EventEmitter<boolean>();
  
  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  handleModal() {
    this.isOpen = !this.isOpen;
    this.isClose.emit(this.isOpen);
  }

  onDelete() {
    this.contactService.deleteContact(this.contact.id).subscribe(data => {
      this.isSubmitted.emit(true);
    });
    this.handleModal();;
  }

}
