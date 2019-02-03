import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  postString = '';
  signinForm: FormGroup;
  error = '';
  loading = false;
  constructor(private authenticationService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });
    this.authenticationService.logout();
  }
  signin() {
    const signinData = this.signinForm.value;
    console.log(signinData);
    this.postString = '{"username": "' + signinData.username + '","password":"' + signinData.password + '"}';
    console.log('Valor de llamado:' + this.postString);
    this.authenticationService.login({ username: signinData.username, password: signinData.password })
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigateByUrl('/home/one');
            console.log(data);
        },
            error => {
              this.error = error;
                    this.loading = false;

            });

    /* localStorage.setItem('currentUser', 'true');
     this.cod_auth = 'wdwdef45h5y67j67kikik7i7i';
     console.log('Token: ' + this.cod_auth);
     this.activated = true;
     this.router.navigateByUrl('/admin/productos');*/

}
gotoRegister() {
  this.router.navigateByUrl('/pages/register');
}

}
