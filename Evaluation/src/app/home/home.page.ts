import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FirebaseAppSettings, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public isLoginCard:boolean = true;
  public message:string = 'HOLA';

  public loginForm:FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
  });

  public registerForm:FormGroup = this._formBuilder.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
    confirmPassword: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]

  });
  private _firebase = initializeApp(environment.firebaseConfig);
  private _auth = getAuth(this._firebase);

  constructor(private readonly _formBuilder:FormBuilder) {}

ngOnInit(): void {
 
}
get loginEmail():string{
  return this.loginForm.controls['email'].value;
}

get loginPassword():string{
  return this.loginForm.controls['password'].value;
}

get registerEmail():string{
  return this.registerForm.controls['email'].value;
}

get registerPassword():string{
  return this.registerForm.controls['password'].value;
}


  public activeRegisterCard():void{
    if(!this.isLoginCard){
      if(!this.registerForm.valid){
        alert('Invalid Form');
  
      }else{
        createUserWithEmailAndPassword(this._auth, this.registerEmail, this.registerPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Error: ' + errorMessage);
      // ..
    });
      }
    }
    this.isLoginCard = this.isLoginCard ? false : false;
   console.log(this.isLoginCard)
    

  }

  public activeLoginCard():void{
    
    this.isLoginCard = this.isLoginCard ? true : true;
    console.log('LOGIN FORM--->',this.loginForm)
    if(this.loginForm){
      if(!this.loginForm.valid){
        alert('Invalid Form');
  
      }else{
        this.message = 'Enter';
        signInWithEmailAndPassword(this._auth,this.loginEmail, this.loginPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Error: ' + errorMessage);
  
    });
  
      }
    }
   
  }



}

