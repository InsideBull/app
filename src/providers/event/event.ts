import { Injectable } from "@angular/core";
import { Events } from 'ionic-angular';

@Injectable()
export class EventProvider{
    constructor(public events: Events){

    }

    setEvent(name: string, param: any){
        return new Promise((resolve)=>{
            this.events.publish(name, param);
        });
    }

    getEvent(name: string){
        return new Promise((resolve)=>{
            this.events.subscribe(name, (param)=>{
                resolve(param);
            });
        });
    }
}