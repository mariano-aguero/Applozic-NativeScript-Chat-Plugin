import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RestApiService } from '../../restApi.service';

import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "application-settings";

@Component({
  selector: "my-app",
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
  
})
export class Login {
   appId: string;
   userId: string;
   pwd: string;

   public isTurnedOn: boolean;
   public userKey: string;

   public account = {
       "appId" : '',
       "userId": '',
       "pwd": '',
       "deviceKey": ''
   }
   
   ngOnInit(){
       this.isTurnedOn = getBoolean("isTurnedOn");
       if(this.isTurnedOn){
           this.account = JSON.parse(getString("account"));
             this._router.navigate(["/conversation",this.account.deviceKey])
       }
   }

   constructor(private _router: Router, public restApi: RestApiService) {}
   submit() {
    console.log("AppId:"+this.appId+"userId:"+this.userId+"pwd:"+this.pwd);
    

        let data = {
                    appId : this.appId,
                    userId : this.userId,
                    pwd : this.pwd  
                }

        this.restApi.login(data).subscribe( res => {
            console.log("res");
            // res = res.json();
            this.account.deviceKey = res.deviceKey;
            this.account.appId = this.appId;
            this.account.userId = this.userId;
            this.account.pwd = this.pwd;
            // >> app-settings-bool-code
            setBoolean("isTurnedOn", true);
            console.log(res.token);

            // >> app-settings-string-code
            setString("account", JSON.stringify(this.account));
            setString("userKey",res.token);
             this._router.navigate(["/conversation",res.deviceKey] )
            console.dir(res);
        },
        err => {
            console.log("err");
            console.log(err);
        })
  }
}
