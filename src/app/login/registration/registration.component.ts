import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  title = 'angularpopup';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  public loaded = true;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }
  // tslint:disable-next-line:typedef
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
  }
  // Bootstrap Modal Close event
  // tslint:disable-next-line:typedef
  hide()
  {
    this.showModal = false;
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }
// convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() { return this.registerForm.controls; }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.loaded = false;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.loaded = false;
      return;
    }
    if (this.submitted)
    {
      this.showModal = false;
    }
    // tslint:disable-next-line:prefer-const
    this.authenticationService.registrationUser(this.registerForm.value).subscribe(response => {
      this.showModal = false;
      this.loaded = true;
      this.router.navigate(['home']);
    }, error => {
      // tslint:disable-next-line:triple-equals
      if (error.status == 500) {
        alert('Attenzione,esiste già un account con questo username.');
      }
    });


  }

}