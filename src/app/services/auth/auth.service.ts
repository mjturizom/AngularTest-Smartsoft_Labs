import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(credentials: { email: string, password: string }) {
    // Simulamos una respuesta exitosa de login
    const { email, password} = credentials;
    if (email === 'user' && password === 'pass')
      return of(true);
    return of(false);
  }
}
