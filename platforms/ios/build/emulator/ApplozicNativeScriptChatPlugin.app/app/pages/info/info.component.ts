import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import * as dialogs from "ui/dialogs";
import { Router, ActivatedRoute, Params, Data } from "@angular/router";
import { RestApiService } from '../../restApi.service';
import { ModalComponent } from "../modal/modal.component";
import { dispName, profilePic, groupDetails, lastSeenAtTime, convoDetails, getTime } from '../../commonLib';

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
  selector: "info",
  templateUrl: "pages/info/info.html",
//   styleUrls: ["pages/startNew/startNew-common.css", "pages/startNew/startNew.css"]
  
})
export class Info {
   users = [];
   dispName = [];
   profilePic = [];
   groupDetails = [];
   lastSeenAtTime = [];
   members = [];
   whose = '';
   defaultGroupIcon = "~/images/singleUser.jpg";
   account = {
      "appId" : '',
      "userId": '',
      "pwd": ''
  }


   constructor(private route: ActivatedRoute, private _router: Router, public restApi: RestApiService,private modal: ModalDialogService, private vcRef: ViewContainerRef) {
   }
   
   ngOnInit(){
     this.whose = this.route.snapshot.params['whose'];
     this.dispName = dispName;
     this.profilePic =  profilePic;
     this.groupDetails = groupDetails;
     this.lastSeenAtTime = lastSeenAtTime;
     this.members = this.groupDetails[this.whose].membersId;
   }

   showModal() {
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(ModalComponent, options).then(res => {
            console.dir(res);

            // this.account = JSON.parse(getString("account"));
            // let data = {
            //   clientGroupId: this.groupDetails[this.whose].clientGroupId,
            //   adminId: this.account.userId
            // }
            // this.restApi.addMember(data).subscribe( res => {
            // console.log("added");
            // },
            
            // err => {
            //     console.log("err");
            //     console.log(err);
            // })            
            this.members.push(res.userId)
        });
    }

   timeSince(timeStamp){
      if(timeStamp != null){
        return "Last seen at " + getTime(timeStamp);
      }
      return "";
   }

   remove(member){
     let index = this.members.indexOf(member);
     this.members.splice(index, 1)
  //    this.account = JSON.parse(getString("account"));
  //           let data = {
  //             clientGroupId: this.groupDetails[this.whose].clientGroupId,
  //             adminId: this.account.userId
  //           }
  //           this.restApi.removeMember(data).subscribe( res => {
  //           console.log("removed");
  //           },
            
  //           err => {
  //               console.log("err");
  //               console.log(err);
  //           });
   }
   
}