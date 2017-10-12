import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { EventData } from 'data/observable';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import {MQTTClient} from "nativescript-mqtt";
import {Message} from "nativescript-mqtt/common";


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



import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

import { RestApiService } from '../../restApi.service';
import { dispName, profilePic, groupDetails, convoDetails, getTime } from '../../commonLib';

@Component({
  selector: "conversation",
  templateUrl: "pages/conversations/conversation.html",
  styleUrls: ["pages/conversations/conversation.css"]
})
export class Conversation {
    devKey = '';
    convos = [];
    newConvos = [];
    userDetails = [];
    groupFeeds = [];
    dispName = [];
    profilePic = [];
    groupDetails = [];

    token = getString("userKey")

    mqtt_host: string = "apps-test.applozic.com";
    mqtt_port: number = 15677;
    mqtt_useSSL: boolean = true;
    mqtt_path: string = "/ws";
    mqtt_username: string = "guest";
    mqtt_password: string = "guest";
    mqtt_topic: string = this.token;

    options = {
        host: this.mqtt_host,
        port: this.mqtt_port,
        useSSL: this.mqtt_useSSL,
        path: this.mqtt_path
    };

    mqtt_client: MQTTClient = new MQTTClient(this.options);

    private socket: any;

    public isTurnedOn: boolean;
    public account = {}

    public timeSince;
    public stopCalls = false;

    constructor(private route: ActivatedRoute, private _router: Router, public restApi: RestApiService, private zone: NgZone) {
        this.timeSince = getTime;
        this.setupHandlers();
    }

    ngOnInit(){
        console.log("conversations onInit");
        this.devKey = this.route.snapshot.params['devKey'];
        let data = {
            devKey : this.devKey
        }

        this.restApi.convoList(data).subscribe( res => {
            console.log("res");
            this.convos = res.message;
            this.userDetails = res.userDetails;
            this.groupFeeds = res.groupFeeds;

            convoDetails(this.userDetails, this.groupFeeds);
            this.dispName = dispName;
            this.profilePic =  profilePic;
            this.groupDetails = groupDetails;

            console.log(this.groupFeeds.length);
            console.log(groupDetails.length);
        },
        err => {
            console.log("err");
            console.log(err);
        })

        this.connect();

    }

    connect() : void {
        try{
            this.mqtt_client.connect(this.mqtt_username, this.mqtt_password);
            console.log("Connencting...");
        }
        catch (e) {
            console.log("Caught error IN connect: " + e);
        }
    }

    subscribe() : void {
        try {
            this.mqtt_client.subscribe(this.mqtt_topic);
            console.log("Subscribed...");
        }
        catch (e) {
            console.log("Caught error In subscribe: " + e);
        }
    }

    setupHandlers() : void {
        this.mqtt_client.onConnectionFailure.on((err) => {
            console.log("Connection failed: ");
            console.dir(err);
        });

        this.mqtt_client.onConnectionSuccess.on(() => {
            console.log("Connected successfully!");
            this.subscribe();
        });

        this.mqtt_client.onConnectionLost.on((err) => {
            console.log("Connection lost: " + err);
        });

        this.mqtt_client.onMessageArrived.on((message: Message) => {
            console.log("Message received: " );
             console.log(message.payload);
             let newMessage = JSON.parse(message.payload);
             let newConvos = this.convos;
             for(let i=0; i<newConvos.length; i++){
                 if(newConvos[i].to == newMessage.message.to){
                     console.dir(newConvos[i]);
                     newConvos[i] = newMessage.message;
                     this.convos = newConvos;
                    //  delete newConvos[i];
                    //  let msg = [] ;
                    //  msg[0]  = newMessage.message;
                    //  newConvos = msg.concat(newConvos);
                    //  newConvos.push(newMessage.message);
                     console.dir(newConvos[i]);
                    //  this.convos[i] = newMessage.message;
                 }
             }
        });
    }


  chatOpen(user){
    let id = "userId";
    let whose = user.to;
    if(user.groupId){
        id = "groupId";
        whose = user.groupId;
    }
    this._router.navigate(["/chatWith",id,whose]);
  }

  loadMoreItems(){
      if (this.stopCalls) {
        return;
      }
      let endTime = this.convos[this.convos.length-1].createdAtTime;
      this.devKey = this.route.snapshot.params['devKey'];
      let that = this;
        let data = {
            devKey : this.devKey,
            endTime: endTime
        }
      console.log("Loaded");
      this.restApi.convoList(data).subscribe( res => {
            this.newConvos = res.message;
            this.userDetails = res.userDetails;
            this.groupFeeds = res.groupFeeds;

            console.dir(this.newConvos.length);
            that.stopCalls = (this.newConvos.length == 0);
            convoDetails(this.userDetails, this.groupFeeds);
            this.dispName = dispName;
            this.profilePic =  profilePic;
            this.groupDetails = groupDetails;
            this.convos = this.convos.concat(this.newConvos);
        },
        err => {
            console.log("err");
            console.log(err);
        })
  }

  fabTap = function(args) {
     this._router.navigate(["/startNew",this.devKey]);
     console.log('tapped');
  }

  logOut(){
    this.isTurnedOn = getBoolean("isTurnedOn");
    if(this.isTurnedOn){
        setBoolean("isTurnedOn", false);
        this.account = {};
        setString("account", JSON.stringify(this.account));
        this._router.navigate(["/login"] )
    }
  }

}
