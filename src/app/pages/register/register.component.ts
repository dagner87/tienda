import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  postString = '';
  signUpForm: FormGroup;
  constructor(private authenticationService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });
  }
  signUp() {
    const signinData = this.signUpForm.value;
    console.log(signinData);
    // tslint:disable-next-line:max-line-length
    this.postString = '{"username": "' + signinData.username +  '","email": "' + signinData.email + '","password":"' + signinData.password + '"}';
    console.log('Valor de llamado:' + this.postString);
    this.authenticationService.register({ username: signinData.username, password: signinData.password, email: signinData.email })
        .subscribe(data => {
            this.router.navigateByUrl('/dashboard');
            console.log(data);
        },
            err => {
                console.log(err);

            });

    /* localStorage.setItem('currentUser', 'true');
     this.cod_auth = 'wdwdef45h5y67j67kikik7i7i';
     console.log('Token: ' + this.cod_auth);
     this.activated = true;
     this.router.navigateByUrl('/admin/productos');*/

}

}
