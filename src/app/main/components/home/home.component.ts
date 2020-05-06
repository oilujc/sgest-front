import { Component, OnInit } from "@angular/core";
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  isOpenForm = false;
  isOpenProfile = false;
  isOpenDelete = false;
  action: String;

  selectedItem: Contact;

  items: Contact[];

  constructor(
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.getData();

    this.contactService.sharedContact.subscribe(contact => {
      this.selectedItem = contact;
    });
  }

  addContact() {
    this.selectedItem = {
      id: null,
      name: '',
      phone: '',
      avatar: '',
      email: '',
    }

    this.isOpenForm = !this.isOpenForm;
  }

  getData() {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.items = data;
    })
  }

  openProfile(event, item) {
    event.preventDefault();

    this.contactService.nextContact(item);
    this.isOpenProfile = !this.isOpenProfile;
  }


  handleProfile(action) {
    this.isOpenProfile = action
  }

  handleForm(action) {
    this.isOpenForm = action;
  }

  handleDelete(action) {
    this.isOpenDelete = action;
  }

  handleSubmit(event) {
    if (event) {
      this.getData();
    }
  }

  handleItemSelected(event) {
    this.selectedItem = event;
  }

  handleDeleteSubmit(event) {
    if (event) {
      this.handleProfile(false);
      this.getData();
    }
  }
}
