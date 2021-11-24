import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faGoogle, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {auth} from 'src/app/shared/firebase/firebase-impeler';
import {signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider} from 'firebase/auth';


import { AuthService } from '../../services/auth.service';



import Swal from 'sweetalert2';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  LinkedInd=faLinkedinIn;
  Google = faGoogle;
  Facebook = faFacebookF;
  hide = true;


  FormReactive: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorService.patternEmail)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  FormReactiveForgot: FormGroup = this.fb.group({
    emailForgot: ['', [Validators.required, Validators.pattern(this.validatorService.patternEmail)]]
  });


  get emailMsg(){
    const errors = this.FormReactive.get('email')?.errors;

    if(errors?.required){
      return 'El correo es obligatorio.';
    }else if(errors?.pattern){
      return 'El valor ingresado no corresponde a un correo.';
    }

    return '';
  }

  get emailForgot(){
    const errors = this.FormReactiveForgot.get('emailForgot')?.errors;

    if (errors?.required){
      return 'El correo es obligatorio';
    }else if(errors?.pattern){
      return 'El valor ingresado no corresponde a un correo';
    }

    return '';
  }


  constructor( private fb: FormBuilder,
                private router: Router,
                private authService: AuthService,
                private validatorService: ValidatorsService) { }



  login(){
    
    //this.router.navigateByUrl('/impeler')

    const{email, password} = this.FormReactive.value;

    this.authService.login(email,password)
    .subscribe(ok =>{
        if (ok == true){
          signInWithEmailAndPassword(auth, email, password)
              .then((resp)=>{
                if(resp.user.emailVerified){
                  this.router.navigateByUrl('/impeler');
                }else{
                  localStorage.clear();
                  Swal.fire('Error', 'El correo no esta verificado', 'error')
                }
              })
          
        }else{
          Swal.fire('Error', ok, 'error');
        }
    });

  }

  loginGoogle(){

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
            this.authService.loginSocial(result.user.providerData[0].displayName!,
              result.user.providerData[0].photoURL!,
              result.user.providerData[0].email!,
              result.providerId!)
            .subscribe(ok =>{
              if (ok == true){
                this.router.navigateByUrl('/impeler');
              }else{
                Swal.fire('Error', ok, 'error');
              }
            });
          })
          .catch((error) =>{
            console.log(error);
          })


    
  }

  loginFacebook(){
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) =>{
        if(result.user.providerData[0].email != null){
          this.authService.loginSocial(result.user.providerData[0].displayName!,
            result.user.providerData[0].photoURL!,
            result.user.providerData[0].email!,
            result.providerId!)
          .subscribe(ok =>{
            if (ok == true){
              this.router.navigateByUrl('/impeler');
            }else{
              Swal.fire('Error', ok, 'error');
            }
          });
        }else{
          Swal.fire('Error', 
          'Al parecer su cuneta de facebook no cuenta con una direccion de correo electrónico, intente ingresar con otra cuenta', 
          'error');
        }
      })
      .catch((error)=>{
        console.log (error);
      })
  }

  loginTwitter(){
    this.authService.loginTwitter();;
  }

  loginFirebase(){
    const email = this.FormReactive.get('email')?.value;
    const password = this.FormReactive.get('password')?.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((user) =>{
          console.log(user.user.emailVerified);
        })
  }


  sendForgotPassword(){
    console.log(this.FormReactiveForgot.get('emailForgot')?.value)
  }


  campoValid(campo: string){
    return (this.FormReactive.get(campo)?.invalid
          && this.FormReactive.get(campo)?.touched) || 
          (this.FormReactiveForgot.get(campo)?.invalid
          && this.FormReactiveForgot.get(campo)?.touched);
  }
  

}

