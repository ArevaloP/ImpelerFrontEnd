import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import {auth} from 'src/app/shared/firebase/firebase-impeler';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  LinkedInd=faLinkedinIn;
  Google = faGoogle;
  Facebook = faFacebookF;

  hide = true;

  FormReactive: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorsService.patternName), this.validatorsService.nameVacio ] ],
    apellido: ['', [Validators.required, Validators.pattern(this.validatorsService.patternName), this.validatorsService.nameVacio ] ],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.patternEmail) ] ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordv: ['', [Validators.required]]
  },
  {
    validators: [this.validatorsService.passwordIguales('password', 'passwordv')]
  });

  get emailMsg(): string{
    const errors = this.FormReactive.get('email')?.errors;
    if(errors?.required){
      return 'El correo electrónico es obligatorio.';
    }else if (errors?.pattern){
      return 'El valor ingresado no corresponde a un correo.';
    }
    return '';
  }

  get emailValue(): string{
    return this.FormReactive.get('email')?.value;
  }


  get nameMsg(): string {
    const errors = this.FormReactive.get('nombre')?.errors;

    if (errors?.required || errors?.vacio){
      return 'El nombre es obligatorio.';
    }else if (errors?.pattern){
      return 'El nombre no peude contener caracteres numericos o especiales.';
    }

    return '';
  }

  get apellidoMsg(): string {
    const errors = this.FormReactive.get('apellido')?.errors;

    if (errors?.required || errors?.vacio){
      return 'El apellido es obligatorio.';
    }else if (errors?.pattern){
      return 'El apellido no peude contener caracteres numericos o especiales.';
    }

    return '';
  }

  constructor( private fb: FormBuilder,
                private router: Router,
                private authService: AuthService,
                private validatorsService: ValidatorsService) { }


  campoValid(campo:string){
    return this.FormReactive.get(campo)?.invalid
            && this.FormReactive.get(campo)?.touched;
  }



  registrarse(){

    const{nombre, apellido, email, password} = this.FormReactive.value;

      this.authService.register(nombre, apellido, email,password)
      .subscribe(ok =>{
        if (ok == true){
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              sendEmailVerification(auth.currentUser!)
                .then(()=>{
                  Swal.fire('Regsitro Exitoso', 'Se ha enviado un correo electrónico a la cuenta registrada para su verificación', 'success');
                })
                .catch(console.error)
            })
            .catch(console.error)
          this.router.navigateByUrl('/auth/login');
        }else{
          Swal.fire('Error', ok, 'error');
        }

      }); 
  }

}

