import { Component,  ElementRef, OnInit, OnDestroy, NgZone, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
// require("nativescript-websockets");
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

import {MQTTClient} from "nativescript-mqtt";
import {Message} from "nativescript-mqtt/common";

import { RestApiService } from '../../restApi.service';

import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

import * as pageModule from "tns-core-modules/ui/page";
import {ListView} from "tns-core-modules/ui/list-view";

import ChatView = require("nativescript-chatview");

import { dispName, groupDetails, getTime } from '../../commonLib';

@Component({
  selector: "chatWith",
//   template: "<Label [text]='this.with'></Label>"
  templateUrl: "pages/chatWith/chatWith.html",
  styleUrls: ["pages/chatWith/chatWith.css"]
})
export class ChatWith implements OnInit {
    @ViewChild("listview") listViewElem: ElementRef;
    
    message = '';
    whose = '';
    id = '';
    chats = [];
    newChats = [];
    dispName = [];
    groupDetails = [];
    lat ='';
    lon = '';
    videoSource = '';
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

    protected page: pageModule.Page;

    // private socket: any;
    public timeSince;

    constructor(private route: ActivatedRoute, private _router: Router, public restApi: RestApiService/*, private zone: NgZone*/) { 
        this.timeSince = getTime;
        this.setupHandlers();
        // this.socket = new WebSocket("wss://apps-test.applozic.com:15677/ws", []);
    }
    
    ngOnInit(){
        console.log("Topic:" + this.token);
        this.id = this.route.snapshot.params['id'];
        this.whose = this.route.snapshot.params['whose'];
        this.groupDetails = groupDetails;
        this.dispName = dispName;      
        
        console.log(this.whose+" chatWith onInit");
        let data = {
            whose :this.whose,
            id: this.id
        }
        this.restApi.chat(data).subscribe( res => {
            console.log("res");
            this.chats = res.message;
            this.chats.reverse();

            // for(let i=0; i<this.chats.length; i++){
            //     if(this.chats[i].type==5)
            //     console.log(this.chats[i].read);
            // }
            // console.log("this.chats.length: " + this.chats.length);
            this.listViewElem.nativeElement.items = this.chats;
            this.scrollToBottom(this.listViewElem.nativeElement);
        },
        err => {
            console.log("err");
            console.log(err);
        })

<<<<<<< HEAD
        this.connect();


        // this.socket.addEventListener('open', event => {
        //     this.zone.run(() => {
        //         console.log("socket open");
        //     });
        // });
        
        // this.socket.addEventListener('message', event => {
        //     this.zone.run(() => {
        //         console.log("socket Message received");
        //         let res = event.data;
        //         this.chats = res.message;
        //         this.chats.push(res)
                
        //         // console.dir("res");
        //     });
        // });

        // this.socket.addEventListener('close', event => {
        //     this.zone.run(() => {
        //         console.log("You have been disconnected");
        //     });
        // });
        // this.socket.addEventListener('error', event => {
        //     console.log("The socket had an error", event.error);
        // });
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
            //  let newMessage = {
            //      contentType : '',

            //  };
            let newMessage = JSON.parse(message.payload);
            // console.log(newMessage.type +" "+newMessage.message);
            
            if(newMessage.type == "APPLOZIC_28"){
                let userId = newMessage.message.split(",")[0];
                console.log(userId);
                if(userId == this.whose){
                    // console.log("Present");
                    let newChats = this.chats;
                    for(let i=0; i<newChats.length; i++){
                        newChats[i].read = true;
                        this.chats = newChats;
                    }
                }
            }
            
            if(newMessage.type == "APPLOZIC_04"){
                let user = newMessage.message.split(",")[1];
                console.log(user);
                if(user == this.whose){
                    // console.log("Present");
                    let newChats = this.chats;
                    for(let i=0; i<newChats.length; i++){
                        newChats[i].delivered = true;
                        this.chats = newChats;
                    }
                }
            }

            let account = JSON.parse(getString("account"));
            // console.log(newMessage.message.fromUserName +" "+account.userId);
             if(newMessage.message.to == this.whose && newMessage.message.fromUserName != account.userId){
                //  console.dir(newMessage);
                 this.chats.push(newMessage.message)
             }

            setTimeout(() => {
                this.listViewElem.nativeElement.items = this.chats;
                this.scrollToBottom(this.listViewElem.nativeElement);
            },100);


        });
=======
        // let nowTimeStamp = Math.floor(Date.now());
        // let now = new Date(nowTimeStamp);

        // setTimeout(() => {
            
        // },100);
>>>>>>> e37c9462b14218576633a8558e986615b78f65c6
    }

    // ngOnDestroy() {
    //     this.socket.close();
    // }

      reply(){
        if(this.message.length>0){
            console.log('sending:'+this.message);
            let nowTimeStamp = Math.floor(Date.now());
            let now = new Date(nowTimeStamp);

            // // alert(now + " "+nowTimeStamp);
        //    this.chats.push({
        //         contentType:0,
        //         createdAtTime: nowTimeStamp,
        //         key:"5-null-"+nowTimeStamp,
        //         message:this.message,
        //         metadata:{},
        //         source:5,
        //         to:this.whose,
        //         type:5
        //     })

        this.chats.push({
                contentType:3,
                createdAtTime: nowTimeStamp,
                key:"5-null-"+nowTimeStamp,
                message:'',
                metadata:{},
                source:5,
                to:this.whose,
                type:5
            })

        // this.socket.send(this.message);          

        // this.chats.push({
        //         contentType:3,
        //         createdAtTime: nowTimeStamp,
        //         key:"5-null-"+nowTimeStamp,
        //         message:'',
        //         metadata:{},
        //         source:5,
        //         to:this.whose,
        //         type:5
        //     })

            setTimeout(() => {
                this.listViewElem.nativeElement.items = this.chats;
                this.scrollToBottom(this.listViewElem.nativeElement);
                // console.log("this.chats.length: " + this.chats.length);
                this.handleClearReply();
            },10000);

            // let data = {
            //     whose :this.whose,
            //     message: this.message    
            // }
            // this.restApi.send(data).subscribe( res => {
            // console.log("res");
            // },
            // err => {
            //     console.log("err");
            //     console.log(err);
            // })
        }
    }
    
    scrollToBottom(lv: ListView) {
        // console.log("listView exists: " + !!lv);
        // console.log("listView.items exists: " + !!lv.items);
        // console.log("listview.items.length: " + lv.items.length);
        if (lv && lv.items.length > 0) {
            lv.refresh();
            lv.scrollToIndex(lv.items.length - 1);
            console.log("scrolled");
        }
    }

    isMe(type){
        return (type==5);
    }

    isRead(read){
        return read;
    }
    
    isDelivered(delivered){
        return delivered;
    }

      handleClearReply(){
      this.message = '';
  }

  refreshList(args) {
        let pullRefresh = args.object;
        let endTime = this.chats[0].createdAtTime;
        this.id = this.route.snapshot.params['id'];
        this.whose = this.route.snapshot.params['whose'];
        this.groupDetails = groupDetails;
        this.dispName = dispName;
        
        
        // console.log(this.whose+" chatWith onInit");
        let data = {
            whose :this.whose,
            endTime: endTime,
            id: this.id 
        }
        this.restApi.chat(data).subscribe( res => {
            // console.log("res");
            this.newChats = res.message;
            this.newChats.reverse();
            this.chats = this.newChats.concat(this.chats);
            pullRefresh.refreshing = false;

        },
        err => {
            console.log("err");
            console.log(err);
        })
         console.log("Refreshed");
    }

    info(){
        if(this.groupDetails[this.whose]){
            this._router.navigate(["/info",this.whose]);
            console.log("I was tapped!!!");
        }
    }

    clear(){
        let data = {
            whose :this.whose,
            id: this.id
        }
        console.log(this.id+"="+this.whose);
        this.restApi.deleteConversation(data).subscribe( res => {
            console.log("Cleared");
            this.chats = [];
        },
        err => {
            console.log("err");
            console.log(err);
        })
    }

    isText(type){
        return (type!=1 && type!=2 && type!=3);
    }

    isImage(msg){
        if(msg.contentType==1){
            return (msg.fileMeta.contentType == "image/png" || msg.fileMeta.contentType == "image/jpg" || msg.fileMeta.contentType == "image/jpeg");
        }
    }

    isMap(msg){
        if(msg.contentType==2){
            let loc = JSON.parse(msg.message);
            this.lat = loc.lat;
            this.lon = loc.lon;
            console.log(this.lat+" "+this.lon);
            return true;
        }
    }

<<<<<<< HEAD
    isVideo(msg){
        if(msg.contentType==1){
            this.videoSource = "https://applozic.appspot.com/rest/ws/aws/file/" + msg.fileMeta.blobKey;
            return (msg.fileMeta.contentType == "video/m4p" || msg.fileMeta.contentType == "video/mkv");
        }
=======
    isVideo(type){
        return (type==3);
>>>>>>> e37c9462b14218576633a8558e986615b78f65c6
    }

    onMapReady(args) {
        // you can tap into the native MapView objects (MGLMapView for iOS and com.mapbox.mapboxsdk.maps.MapView for Android)
        let nativeMapView = args.ios ? args.ios : args.android;
        console.log("Mapbox onMapReady for " + (args.ios ? "iOS" : "Android") + ", native object received: " + nativeMapView);
        
        // .. or use the convenience methods exposed on args.map, for instance:
        args.map.addMarkers([
            {
            lat: this.lat,
            lng: this.lon,
            title: 'One-line title here',
            subtitle: 'Really really nice location',
            onCalloutTap: function(){console.log("'Nice location' marker callout tapped");}
            }]
        );
    }

}


 
export function onNavigatingTo(args) {
    let page = args.object;
 
    // create view
    let chatView = new ChatView.ChatView();
    
    // register event when user taps
    // on SEND button
    
    chatView.notifyOnSendMessageTap((eventData: ChatView.SendMessageTappedEventData) => {
        // add a chat message
        eventData.object.appendMessages({            
            // date: getTime(),
            // isRight: true,
            image: "~/img/avatar.jpg",
            message: eventData.message,    
        });
    });


    
    // focus text field
    chatView.focusMessageField();
    
    page.content = chatView;
}