import { AlertController, ToastController, Alert, Toast } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class NotificationProvider {

  	alert: Alert;
    toast: Toast;

    constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {

  	}

  	presentConfirm(message?:string, title?:string){
      return new Promise((resolve, reject)=>{
        this.alert = this.alertCtrl.create({
          title: title || 'Confirmation',
          message: message || 'Voulez vous effectuer cette action ?',
          buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            handler: () =>{
              reject(false)
            }
          },
          {
            text: 'OK',
            handler: () => {
              resolve(true)
            }
          }
          ],
          cssClass: 'tb-alert'
        })

        this.alert.present();
      })
    }

    presentAlert(message:string, title?:string){
      this.alert = this.alertCtrl.create({
        title: title || 'Notification',
        subTitle: message,
        buttons: ['OK']
      })
    }

    PresentToast(text: string, duration?, position?, closeButton?, btnText?){
      this.toast = this.toastCtrl.create({
        message: text,
        duration: duration || closeButton ? null : 5000,
        position: position || 'top',
        showCloseButton: closeButton || false,
        closeButtonText: btnText || 'OK'
      });
      this.toast.present();
    }

    dimissToast(){
      this.toast.dismiss();
    }

  }
