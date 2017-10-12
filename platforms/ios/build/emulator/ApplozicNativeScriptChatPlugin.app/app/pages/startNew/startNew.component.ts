import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params, Data } from "@angular/router";

import { RestApiService } from '../../restApi.service';
import { dispName, profilePic, groupDetails, convoDetails, getTime } from '../../commonLib';

@Component({
  selector: "startNew",
  templateUrl: "pages/startNew/startNew.html",
//   styleUrls: ["pages/startNew/startNew-common.css", "pages/startNew/startNew.css"]
  
})
export class StartNew {
   users = [];
   dispName = [];
   profilePic = [];
   groupDetails = [];
   devKey = '';

   public timeSince;

   constructor(private route: ActivatedRoute, private _router: Router, public restApi: RestApiService) {
       this.timeSince = getTime;
   }
   
   ngOnInit(){
        this.restApi.startNew().subscribe( res => {
            console.log("res");
            this.users = res.users;
            convoDetails(this.users, this.groupDetails);
            this.dispName = dispName;
            this.profilePic =  profilePic;
        },
        err => {
            console.log("err");
            console.log(err);
        })

        this.devKey = this.route.snapshot.params['devKey'];
        let data = {
            devKey : this.devKey
        }

        this.restApi.convoList(data).subscribe( res => {
            console.log("res");
            this.groupDetails = res.groupFeeds;
        },
        err => {
            console.log("err");
            console.log(err);
        })
   }
   
   chatOpen(user){
    console.dir(user);
    if(user.userId){
        let id = "userId";
        let whose = user.userId;
        this._router.navigate(["/chatWith",id,whose]);
    }
    else{
        let id = "groupId";
        let whose = user.id;
        this._router.navigate(["/chatWith",id,whose]);
    }
  }
}