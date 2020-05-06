import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Contact } from '../models/contact';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = environment.apiUrl;

  private contact = new BehaviorSubject(null);
  sharedContact = this.contact.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  nextContact(contact: Contact) {
    this.contact.next(contact)
  }

  getContacts() {
    return this.http.get<Contact[]>(`${this.url}/contact/`);
  }
  
  createContact(body) {
    return this.http.post(`${this.url}/contact/`, body);
  }

  updateContact(body, id) {
    return this.http.put(`${this.url}/contact/${id}`, body);
  }

  getContact(id) {
    return this.http.get(`${this.url}/contact/${id}`);
  }

  deleteContact(id) {
    return this.http.delete(`${this.url}/contact/${id}`);
  }
}
