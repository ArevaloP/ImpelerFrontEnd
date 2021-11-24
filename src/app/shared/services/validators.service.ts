import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public patternName: string = '[a-zA-Z ]+';
  public patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

  passwordIguales(campo1: string, campo2: string){
    return (control: AbstractControl): ValidationErrors | null =>{

      const pass1 = control.get(campo1)?.value;
      const pass2 = control.get(campo2)?.value;

      if (pass1 !== pass2){

        control.get(campo2)?.setErrors({noIguales: true});
        return  {noIguales: true}
      }

      control.get(campo2)?.setErrors(null);

      return null;

    }
  }

  nameVacio(control: FormControl){
    const name: string = control.value?.trim();

    if (name === ''){
      return {
        vacio: true
      }
    }

    return null;
  }
}
