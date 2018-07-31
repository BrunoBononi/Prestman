import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from '../../providers/firebase';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  //(Se atentar ao R e ao L maiúsculos do Register e Login)
Login = true;
Register = false;
Loginform = {
  email: '',
  password: ''
}
Registerform = {
  email: '',
  password: '',
  name: ''
}


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AuthProvider: AuthProvider,
    private firebaseProvider: FirebaseProvider,
    private LoadingCtrl: LoadingController,
    private storage: Storage
  ) {
  }


  //Exibir form de registro
exibirRegistrar(){
  this.Login = false;
  this.Register = true;
}

  //Exibir form de login
  exibirLogin(){
    this.Login = true;
    this.Register = false;
  }

  //Login
  fazerLogin(){
    let load = this.LoadingCtrl.create();
    load.present();

    this.AuthProvider.login(this.Loginform)
    .then((res) =>{
      let uid = res.user.uid;

      this.firebaseProvider.getUser(uid)
      .then((res) =>{
        let data = res.data();
        this.storage.set('usuario', data)
        .then(() => 
        {
          load.dismiss();
          this.navCtrl.setRoot('RegistroDePontoPage');
        })
        
    })
      
    })
    .catch((err) =>{
      load.dismiss();
    })
  }
  
//Registro
criarNovaConta(){
  let load = this.LoadingCtrl.create();
  load.present();

  this.AuthProvider.register(this.Registerform)
  .then((res) => {
    
    let uid = res.user.uid;


    //Organizar dados
    let data = {
uid: uid,
name: this.Registerform.name,
email: this.Registerform.email,
    };

    //Gravar user no firestore
    this.firebaseProvider.postUser(data)
    .then(() => {
      load.dismiss();

      this.storage.set('usuario', data)
      .then(() => {
      })
          load.dismiss();

    })
    .catch((err) => {
    load.dismiss();
  })
})
  .catch((err) => {
    load.dismiss();
  })
}

  ionViewDidLoad() {
  }

}
