import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) { }

  login(e:any): void {
    console.log(this.form)
     if (this.form.valid){
      
      const email = this.form.get('email')?.value || "";
      const password = this.form.get('password')?.value || "";
      this.authService.login({email, password}).subscribe(success => {
        if (success) {
          localStorage.setItem("loged", "true")
          this.router.navigate(['/upload-csv'])
        } else {
          console.log('Login failed');
          // Error handle
        }
        this.form.reset({email:"", password:""});
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.setErrors(null);
      });
      
      this.form.updateValueAndValidity()
        
      });
      
      
      
    }
    
  }
}
