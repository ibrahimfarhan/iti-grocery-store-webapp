import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorMessageSubject = new BehaviorSubject<string>('');

  constructor() { }
}
