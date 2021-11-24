import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from '@firebase/firestore';
import { AuthService } from 'src/app/auth/services/auth.service';

import { ImpelerService } from '../../services/impeler.service';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  get usuario(){
    return this.authService.usuario;
  }

  ReactiveForm: FormGroup = this.fb.group({    
    p1: ['', [Validators.required]],
    p2: ['', [Validators.required]],
    p3: ['', [Validators.required]],
    p4: ['', [Validators.required]],
    p5: ['', [Validators.required]],
    p6: ['', [Validators.required]],
    p7: ['', [Validators.required]],
    p8: ['', [Validators.required]],
    p9: ['', [Validators.required]],
    p10: ['', [Validators.required]],
    p11: ['', [Validators.required]],
    p12: ['', [Validators.required]],
    p13: ['', [Validators.required]],
    p14: ['', [Validators.required]],
    p15: ['', [Validators.required]],
    p16: ['', [Validators.required]],
    p17: ['', [Validators.required]],
    p18: ['', [Validators.required]],
    p19: ['', [Validators.required]],
    p20: ['', [Validators.required]],
    p21: ['', [Validators.required]],
    p22: ['', [Validators.required]],
    p23: ['', [Validators.required]],
    p24: ['', [Validators.required]],
    p25: ['', [Validators.required]],
    p26: ['', [Validators.required]],
    p27: ['', [Validators.required]],
    p28: ['', [Validators.required]],
    p29: ['', [Validators.required]],
    p30: ['', [Validators.required]],
    p31: ['', [Validators.required]],
    p32: ['', [Validators.required]],
    p33: ['', [Validators.required]]
  });

  
  Preguntas:DocumentData[] = [];

  


  constructor(private impelerService: ImpelerService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.impelerService.getPreguntas()
          .then( pregnutas =>{
            const question: DocumentData[] = [];

            pregnutas.forEach(pregunta=>{
              question.push({
                ...pregunta.data()
              });
            });


            this.Preguntas = question;
          });
  }

  ValueCampos(){
    const {p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
          p11, p12, p13, p14, p15, p16, p17, p18, p19,
          p20, p21, p22, p23, p24, p25, p26, p27, p28, p29,
          p30, p31, p32, p33} = this.ReactiveForm.value;

    const respuestas = {
          p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
          p11, p12, p13, p14, p15, p16, p17, p18, p19,
          p20, p21, p22, p23, p24, p25, p26, p27, p28, p29,
          p30, p31, p32, p33
    }

    
    this.impelerService.createAnswer(respuestas, this.usuario.uId)
      .then((res)=>{
        console.log(res);
        this.router.navigateByUrl('/impeler/analytcs');
      })
      .catch((err)=>{
        console.log(err);
      })


    
  }

}
