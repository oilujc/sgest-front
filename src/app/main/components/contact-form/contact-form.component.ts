import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ left: '-100%' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(100%)' }))
      ]),
      transition(':leave', [
        animate('.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ContactFormComponent implements OnInit {

  private _contact: Contact;

  @Input() set contact(value: Contact) {
    this._contact = value;

    this.setForm(this._contact);
  }

  get contact(): Contact {
    return this._contact;
  }

  @Input() isOpen: boolean;
  @Output() isSubmitted = new EventEmitter<boolean>();
  @Output() isClose = new EventEmitter<boolean>();

  contactForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [this.contact ? this.contact.name : '', Validators.required],
      phone: [this.contact ? this.contact.phone : '', Validators.required],
      email: [this.contact ? this.contact.email : '', Validators.required],
    })
  }

  setForm(contact) {
    this.contactForm = this.fb.group({
      name: [contact ? contact.name : '', Validators.required],
      phone: [contact ? contact.phone : '', Validators.required],
      email: [contact ? contact.email : '', Validators.required],
    })
  }

  handleModal() {
    this.isOpen = !this.isOpen;
    this.isClose.emit(this.isOpen);
  }

  getAvatar() {
    return this.contact.id !== null ? this.contact.avatar : `assets/icons/default.svg`;
  }

  getTitle() {
    return this.contact.id !== null ? 'Edit contact' : 'Add new contact';
  }

  onSubmit() {

    console.log(this.contact);
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {

      if (this.contact.id === null) {
        this.contactService.createContact(this.contactForm.value).subscribe(data => {
          this.isSubmitted.emit(true);
        });
      } else {
        this.contactService.updateContact(this.contactForm.value, this.contact.id).subscribe((data: any) => {
          this.isSubmitted.emit(true);
          console.log(data);
          this.contactService.nextContact(data.contact);
        });
      }
      this.handleModal();
    }
  }
}
