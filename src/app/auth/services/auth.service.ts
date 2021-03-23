import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  signUp(email:string,password:string){
    return this.fireAuth.createUserWithEmailAndPassword(email,password);
  }

  login(email:string,password:string){
    return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

  loginWithGoogle(){
    return this.autoLogin(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook(){
    return this.autoLogin(new firebase.auth.FacebookAuthProvider());
  }

  loginWithApple(){
    return this.autoLogin(new firebase.auth.OAuthProvider('apple.com'));
  }

  autoLogin(provider:any){
    return this.fireAuth.signInWithPopup(provider);
  }

  logout(){
    return this.fireAuth.signOut();
  }
}
