import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

//Plugin
import { IonicStorageModule } from '@ionic/storage';

//Firebase config
import { firebaseConfig } from '../configs/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


//Providers
import {AuthProvider} from '../providers/auth'; 
import { FirebaseProvider } from '../providers/firebase';


//Pages
import {LoginPageModule} from '../pages/login/login.module';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    //Pages
    LoginPageModule,
    //Others
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],

  providers: [
    AuthProvider,
    FirebaseProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
