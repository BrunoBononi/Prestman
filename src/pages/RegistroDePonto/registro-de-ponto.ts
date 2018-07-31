import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AlertController } from 'ionic-angular';
import { registerLocaleData } from '@angular/common';
import { FirebaseProvider } from '../../providers/firebase';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-registro-de-ponto',
  templateUrl: 'registro-de-ponto.html',
})


export class RegistroDePontoPage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public FireBase: FirebaseProvider,
    public loadingController: LoadingController,
    public toastCtrl: ToastController

  ) {
  }
//Função entrada
  entrada() {
    this.storage.get('usuario')
      .then((usuario) => {
        //Criando variáveis, usa-se "let"
        let data = new Date();
        let uid = usuario.uid;
        let email = usuario.email;
        let tipo = "entrada";
        let obj = {
          data: data,
          user: uid,
          email: email,
          tipo: tipo
        };
        //Alerta do registro
         const confirm = this.alertCtrl.create({
            title:data.toString(),
            
            buttons: [
              {
                text: 'Confirmar',
                handler: () => {
                  //Começa o Loading
                  let load = this.loadingController.create()
                  load.present();
                  this.FireBase.postData(obj)
                  .then(() => {
                    load.dismiss();
                    //Retirar Loading
                  })
                  .catch(() => {
                  })
              
                    const toast = this.toastCtrl.create({
                      message: 'Registro efetuado com sucesso !',
                      duration: 4000
                    });
                    toast.present();
                  } 
              },
            ]
          });
          confirm.present();
      })
}


//Função saída
  saida() {
    this.storage.get('usuario')
    .then((usuario) => {
      //Criando variáveis, usa-se "let"
      let data = new Date();
      let uid = usuario.uid;
      let email = usuario.email;
      let tipo = "saida";
      let obj = {
        data: data,
        user: uid,
        email: email,
        tipo: tipo
      };

       const confirm = this.alertCtrl.create({
          title:data.toString(),
          
          buttons: [
            {
              text: 'Confirmar',
              handler: () => {
                //Começa o Loading
                this.FireBase.postData(obj)
                .then(() => {
                  //Retirar Loading
                })
                .catch(() => {
                })

                const toast = this.toastCtrl.create({
                  message: 'Registro efetuado com sucesso !',
                  duration: 4000
                });
                toast.present();
              } 
            },
          ]
        });
        confirm.present();
    })
}

    Logout(){
      this.storage.clear();
      this.navCtrl.setRoot('LoginPage');
    }


  btnClick() {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroDePontoPage');
  }

}

