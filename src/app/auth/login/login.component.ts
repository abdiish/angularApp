import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor( private router: Router, 
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone,
               private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe( resp => {
        if ( this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value); 
        } else{
          localStorage.removeItem('email');
        }
        this.ngZone.run( () => {
           // Navegar al Dashboard
           this.router.navigateByUrl('/');
        })
      }, (err) =>{
        this.toastr.error(err.error.msg, 'Error al iniciar sesión', { timeOut: 3000 });
      });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp() {
    
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
    
  };

  attachSignin(element: any) {
    
    this.auth2.attachClickHandler( element, {},
        (googleUser: any) => {
            const id_token = googleUser.getAuthResponse().id_token;
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });

        }, (error: any) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

}
