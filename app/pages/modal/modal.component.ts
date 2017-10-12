import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

import { RestApiService } from '../../restApi.service';
import { dispName, profilePic, groupDetails, lastSeenAtTime, convoDetails, getTime } from '../../commonLib';
 
@Component({
    selector: "my-modal",
    templateUrl: "pages/modal/modal.html",
})
export class ModalComponent {
 
    users = [];
    dispName = [];
    profilePic = [];
    lastSeenAtTime = [];
    groupDetails = [];
 
    public constructor(private params: ModalDialogParams, public restApi: RestApiService) {
        
    }

    ngOnInit(){
        this.restApi.startNew().subscribe( res => {
            console.log("res");
            this.users = res.users;
            convoDetails(this.users, this.groupDetails);
            this.dispName = dispName;
            this.profilePic =  profilePic;
            this.lastSeenAtTime = lastSeenAtTime;
        },
            
        err => {
                console.log("err");
                console.log(err);
        })
    }
 
    public close(res) {
        this.params.closeCallback(res);
    }
 
}