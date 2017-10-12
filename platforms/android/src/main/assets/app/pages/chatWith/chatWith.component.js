"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// require("nativescript-websockets");
var application_settings_1 = require("application-settings");
var nativescript_mqtt_1 = require("nativescript-mqtt");
var restApi_service_1 = require("../../restApi.service");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
element_registry_1.registerElement("Mapbox", function () { return require("nativescript-mapbox").MapboxView; });
element_registry_1.registerElement("VideoPlayer", function () { return require("nativescript-videoplayer").Video; });
var ChatView = require("nativescript-chatview");
var commonLib_1 = require("../../commonLib");
var ChatWith = (function () {
    function ChatWith(route, _router, restApi /*, private zone: NgZone*/) {
        this.route = route;
        this._router = _router;
        this.restApi = restApi; /*, private zone: NgZone*/
        this.message = '';
        this.whose = '';
        this.id = '';
        this.chats = [];
        this.newChats = [];
        this.dispName = [];
        this.groupDetails = [];
        this.lat = '';
        this.lon = '';
        this.videoSource = '';
        this.token = application_settings_1.getString("userKey");
        this.mqtt_host = "apps-test.applozic.com";
        this.mqtt_port = 15677;
        this.mqtt_useSSL = true;
        this.mqtt_path = "/ws";
        this.mqtt_username = "guest";
        this.mqtt_password = "guest";
        this.mqtt_topic = this.token;
        this.options = {
            host: this.mqtt_host,
            port: this.mqtt_port,
            useSSL: this.mqtt_useSSL,
            path: this.mqtt_path
        };
        this.mqtt_client = new nativescript_mqtt_1.MQTTClient(this.options);
        this.timeSince = commonLib_1.getTime;
        this.setupHandlers();
        // this.socket = new WebSocket("wss://apps-test.applozic.com:15677/ws", []);
    }
    ChatWith.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Topic:" + this.token);
        this.id = this.route.snapshot.params['id'];
        this.whose = this.route.snapshot.params['whose'];
        this.groupDetails = commonLib_1.groupDetails;
        this.dispName = commonLib_1.dispName;
        console.log(this.whose + " chatWith onInit");
        var data = {
            whose: this.whose,
            id: this.id
        };
        this.restApi.chat(data).subscribe(function (res) {
            console.log("res");
            _this.chats = res.message;
            _this.chats.reverse();
            // for(let i=0; i<this.chats.length; i++){
            //     if(this.chats[i].type==5)
            //     console.log(this.chats[i].read);
            // }
            // console.log("this.chats.length: " + this.chats.length);
            _this.listViewElem.nativeElement.items = _this.chats;
            _this.scrollToBottom(_this.listViewElem.nativeElement);
        }, function (err) {
            console.log("err");
            console.log(err);
        });
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
=======
        // let nowTimeStamp = Math.floor(Date.now());
        // let now = new Date(nowTimeStamp);
        // setTimeout(() => {
        // },100);
>>>>>>> e37c9462b14218576633a8558e986615b78f65c6
    };
    ChatWith.prototype.connect = function () {
        try {
            this.mqtt_client.connect(this.mqtt_username, this.mqtt_password);
            console.log("Connencting...");
        }
        catch (e) {
            console.log("Caught error IN connect: " + e);
        }
    };
    ChatWith.prototype.subscribe = function () {
        try {
            this.mqtt_client.subscribe(this.mqtt_topic);
            console.log("Subscribed...");
        }
        catch (e) {
            console.log("Caught error In subscribe: " + e);
        }
    };
    ChatWith.prototype.setupHandlers = function () {
        var _this = this;
        this.mqtt_client.onConnectionFailure.on(function (err) {
            console.log("Connection failed: ");
            console.dir(err);
        });
        this.mqtt_client.onConnectionSuccess.on(function () {
            console.log("Connected successfully!");
            _this.subscribe();
        });
        this.mqtt_client.onConnectionLost.on(function (err) {
            console.log("Connection lost: " + err);
        });
        this.mqtt_client.onMessageArrived.on(function (message) {
            console.log("Message received: ");
            console.log(message.payload);
            //  let newMessage = {
            //      contentType : '',
            //  };
            var newMessage = JSON.parse(message.payload);
            // console.log(newMessage.type +" "+newMessage.message);
            if (newMessage.type == "APPLOZIC_28") {
                var userId = newMessage.message.split(",")[0];
                console.log(userId);
                if (userId == _this.whose) {
                    // console.log("Present");
                    var newChats = _this.chats;
                    for (var i = 0; i < newChats.length; i++) {
                        newChats[i].read = true;
                        _this.chats = newChats;
                    }
                }
            }
            if (newMessage.type == "APPLOZIC_04") {
                var user = newMessage.message.split(",")[1];
                console.log(user);
                if (user == _this.whose) {
                    // console.log("Present");
                    var newChats = _this.chats;
                    for (var i = 0; i < newChats.length; i++) {
                        newChats[i].delivered = true;
                        _this.chats = newChats;
                    }
                }
            }
            var account = JSON.parse(application_settings_1.getString("account"));
            // console.log(newMessage.message.fromUserName +" "+account.userId);
            if (newMessage.message.to == _this.whose && newMessage.message.fromUserName != account.userId) {
                //  console.dir(newMessage);
                _this.chats.push(newMessage.message);
            }
            setTimeout(function () {
                _this.listViewElem.nativeElement.items = _this.chats;
                _this.scrollToBottom(_this.listViewElem.nativeElement);
            }, 100);
        });
    };
    // ngOnDestroy() {
    //     this.socket.close();
    // }
    ChatWith.prototype.reply = function () {
        var _this = this;
        if (this.message.length > 0) {
            console.log('sending:' + this.message);
            var nowTimeStamp = Math.floor(Date.now());
            var now = new Date(nowTimeStamp);
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
                contentType: 3,
                createdAtTime: nowTimeStamp,
                key: "5-null-" + nowTimeStamp,
                message: '',
                metadata: {},
                source: 5,
                to: this.whose,
                type: 5
            });
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
            setTimeout(function () {
                _this.listViewElem.nativeElement.items = _this.chats;
                _this.scrollToBottom(_this.listViewElem.nativeElement);
                // console.log("this.chats.length: " + this.chats.length);
                _this.handleClearReply();
            }, 10000);
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
    };
    ChatWith.prototype.scrollToBottom = function (lv) {
        // console.log("listView exists: " + !!lv);
        // console.log("listView.items exists: " + !!lv.items);
        // console.log("listview.items.length: " + lv.items.length);
        if (lv && lv.items.length > 0) {
            lv.refresh();
            lv.scrollToIndex(lv.items.length - 1);
            console.log("scrolled");
        }
    };
    ChatWith.prototype.isMe = function (type) {
        return (type == 5);
    };
    ChatWith.prototype.isRead = function (read) {
        return read;
    };
    ChatWith.prototype.isDelivered = function (delivered) {
        return delivered;
    };
    ChatWith.prototype.handleClearReply = function () {
        this.message = '';
    };
    ChatWith.prototype.refreshList = function (args) {
        var _this = this;
        var pullRefresh = args.object;
        var endTime = this.chats[0].createdAtTime;
        this.id = this.route.snapshot.params['id'];
        this.whose = this.route.snapshot.params['whose'];
        this.groupDetails = commonLib_1.groupDetails;
        this.dispName = commonLib_1.dispName;
        // console.log(this.whose+" chatWith onInit");
        var data = {
            whose: this.whose,
            endTime: endTime,
            id: this.id
        };
        this.restApi.chat(data).subscribe(function (res) {
            // console.log("res");
            _this.newChats = res.message;
            _this.newChats.reverse();
            _this.chats = _this.newChats.concat(_this.chats);
            pullRefresh.refreshing = false;
        }, function (err) {
            console.log("err");
            console.log(err);
        });
        console.log("Refreshed");
    };
    ChatWith.prototype.info = function () {
        if (this.groupDetails[this.whose]) {
            this._router.navigate(["/info", this.whose]);
            console.log("I was tapped!!!");
        }
    };
    ChatWith.prototype.clear = function () {
        var _this = this;
        var data = {
            whose: this.whose,
            id: this.id
        };
        console.log(this.id + "=" + this.whose);
        this.restApi.deleteConversation(data).subscribe(function (res) {
            console.log("Cleared");
            _this.chats = [];
        }, function (err) {
            console.log("err");
            console.log(err);
        });
    };
    ChatWith.prototype.isText = function (type) {
        return (type != 1 && type != 2 && type != 3);
    };
    ChatWith.prototype.isImage = function (msg) {
        if (msg.contentType == 1) {
            return (msg.fileMeta.contentType == "image/png" || msg.fileMeta.contentType == "image/jpg" || msg.fileMeta.contentType == "image/jpeg");
        }
    };
    ChatWith.prototype.isMap = function (msg) {
        if (msg.contentType == 2) {
            var loc = JSON.parse(msg.message);
            this.lat = loc.lat;
            this.lon = loc.lon;
            console.log(this.lat + " " + this.lon);
            return true;
        }
    };
<<<<<<< HEAD
    ChatWith.prototype.isVideo = function (msg) {
        if (msg.contentType == 1) {
            this.videoSource = "https://applozic.appspot.com/rest/ws/aws/file/" + msg.fileMeta.blobKey;
            return (msg.fileMeta.contentType == "video/m4p" || msg.fileMeta.contentType == "video/mkv");
        }
=======
    ChatWith.prototype.isVideo = function (type) {
        return (type == 3);
>>>>>>> e37c9462b14218576633a8558e986615b78f65c6
    };
    ChatWith.prototype.onMapReady = function (args) {
        // you can tap into the native MapView objects (MGLMapView for iOS and com.mapbox.mapboxsdk.maps.MapView for Android)
        var nativeMapView = args.ios ? args.ios : args.android;
        console.log("Mapbox onMapReady for " + (args.ios ? "iOS" : "Android") + ", native object received: " + nativeMapView);
        // .. or use the convenience methods exposed on args.map, for instance:
        args.map.addMarkers([
            {
                lat: this.lat,
                lng: this.lon,
                title: 'One-line title here',
                subtitle: 'Really really nice location',
                onCalloutTap: function () { console.log("'Nice location' marker callout tapped"); }
            }
        ]);
    };
    return ChatWith;
}());
__decorate([
    core_1.ViewChild("listview"),
    __metadata("design:type", core_1.ElementRef)
], ChatWith.prototype, "listViewElem", void 0);
ChatWith = __decorate([
    core_1.Component({
        selector: "chatWith",
        //   template: "<Label [text]='this.with'></Label>"
        templateUrl: "pages/chatWith/chatWith.html",
        styleUrls: ["pages/chatWith/chatWith.css"]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, restApi_service_1.RestApiService /*, private zone: NgZone*/])
], ChatWith);
exports.ChatWith = ChatWith;
function onNavigatingTo(args) {
    var page = args.object;
    // create view
    var chatView = new ChatView.ChatView();
    // register event when user taps
    // on SEND button
    chatView.notifyOnSendMessageTap(function (eventData) {
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
exports.onNavigatingTo = onNavigatingTo;
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFdpdGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhdFdpdGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZGO0FBQzdGLDBDQUF1RTtBQUN2RSxzQ0FBc0M7QUFDdEMsNkRBVThCO0FBRTlCLHVEQUE2QztBQUc3Qyx5REFBdUQ7QUFFdkQsMEVBQXdFO0FBQ3hFLGtDQUFlLENBQUMsZUFBZSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxhQUFhLEVBQW5ELENBQW1ELENBQUMsQ0FBQztBQUM1RixrQ0FBZSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFDM0Usa0NBQWUsQ0FBQyxhQUFhLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEtBQUssRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0FBS2hGLGdEQUFtRDtBQUVuRCw2Q0FBa0U7QUFRbEUsSUFBYSxRQUFRO0lBcUNqQixrQkFBb0IsS0FBcUIsRUFBVSxPQUFlLEVBQVMsT0FBdUIsQ0FBQSwwQkFBMEI7UUFBeEcsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0IsQ0FBQSwwQkFBMEI7UUFsQzVILFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsT0FBRSxHQUFHLEVBQUUsQ0FBQztRQUNSLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLFFBQUcsR0FBRSxFQUFFLENBQUM7UUFDUixRQUFHLEdBQUcsRUFBRSxDQUFDO1FB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LEVBQUUsVUFBVTtRQUN0QixtREFBbUQ7UUFDakQsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztLQUMzQyxDQUFDO3FDQXNDNkIsdUJBQWMsRUFBbUIsZUFBTSxFQUFrQixnQ0FBYyxDQUFBLDBCQUEwQjtHQXJDbkgsUUFBUSxDQWtYcEI7QUFsWFksNEJBQVE7QUFzWHJCLHdCQUErQixJQUFJO0lBQy9CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFdkIsY0FBYztJQUNkLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXZDLGdDQUFnQztJQUNoQyxpQkFBaUI7SUFFakIsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFVBQUMsU0FBOEM7UUFDM0UscUJBQXFCO1FBQ3JCLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQzVCLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIsS0FBSyxFQUFFLGtCQUFrQjtZQUN6QixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87U0FDN0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFJSCxtQkFBbUI7SUFDbkIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFFN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFDNUIsQ0FBQztBQXpCRCx3Q0F5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsICBFbGVtZW50UmVmLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lLCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zLCBEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8vIHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtd2Vic29ja2V0c1wiKTtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5pbXBvcnQge01RVFRDbGllbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtbXF0dFwiO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1xdHQvY29tbW9uXCI7XG5cbmltcG9ydCB7IFJlc3RBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcmVzdEFwaS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xucmVnaXN0ZXJFbGVtZW50KFwiTWFwYm94XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpLk1hcGJveFZpZXcpO1xucmVnaXN0ZXJFbGVtZW50KFwiVmlkZW9QbGF5ZXJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC12aWRlb3BsYXllclwiKS5WaWRlbyk7XG5cbmltcG9ydCAqIGFzIHBhZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHtMaXN0Vmlld30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5cbmltcG9ydCBDaGF0VmlldyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2hhdHZpZXdcIik7XG5cbmltcG9ydCB7IGRpc3BOYW1lLCBncm91cERldGFpbHMsIGdldFRpbWUgfSBmcm9tICcuLi8uLi9jb21tb25MaWInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY2hhdFdpdGhcIixcbi8vICAgdGVtcGxhdGU6IFwiPExhYmVsIFt0ZXh0XT0ndGhpcy53aXRoJz48L0xhYmVsPlwiXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2NoYXRXaXRoL2NoYXRXaXRoLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jaGF0V2l0aC9jaGF0V2l0aC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ2hhdFdpdGggaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBWaWV3Q2hpbGQoXCJsaXN0dmlld1wiKSBsaXN0Vmlld0VsZW06IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgbWVzc2FnZSA9ICcnO1xuICAgIHdob3NlID0gJyc7XG4gICAgaWQgPSAnJztcbiAgICBjaGF0cyA9IFtdO1xuICAgIG5ld0NoYXRzID0gW107XG4gICAgZGlzcE5hbWUgPSBbXTtcbiAgICBncm91cERldGFpbHMgPSBbXTtcbiAgICBsYXQgPScnO1xuICAgIGxvbiA9ICcnO1xuICAgIHZpZGVvU291cmNlID0gJyc7XG4gICAgdG9rZW4gPSBnZXRTdHJpbmcoXCJ1c2VyS2V5XCIpXG5cbiAgICBtcXR0X2hvc3Q6IHN0cmluZyA9IFwiYXBwcy10ZXN0LmFwcGxvemljLmNvbVwiO1xuICAgIG1xdHRfcG9ydDogbnVtYmVyID0gMTU2Nzc7XG4gICAgbXF0dF91c2VTU0w6IGJvb2xlYW4gPSB0cnVlO1xuICAgIG1xdHRfcGF0aDogc3RyaW5nID0gXCIvd3NcIjtcbiAgICBtcXR0X3VzZXJuYW1lOiBzdHJpbmcgPSBcImd1ZXN0XCI7XG4gICAgbXF0dF9wYXNzd29yZDogc3RyaW5nID0gXCJndWVzdFwiO1xuICAgIG1xdHRfdG9waWM6IHN0cmluZyA9IHRoaXMudG9rZW47XG5cbiAgICBvcHRpb25zID0ge1xuICAgICAgICBob3N0OiB0aGlzLm1xdHRfaG9zdCxcbiAgICAgICAgcG9ydDogdGhpcy5tcXR0X3BvcnQsXG4gICAgICAgIHVzZVNTTDogdGhpcy5tcXR0X3VzZVNTTCxcbiAgICAgICAgcGF0aDogdGhpcy5tcXR0X3BhdGhcbiAgICB9O1xuXG4gICAgbXF0dF9jbGllbnQ6IE1RVFRDbGllbnQgPSBuZXcgTVFUVENsaWVudCh0aGlzLm9wdGlvbnMpO1xuXG4gICAgcHJvdGVjdGVkIHBhZ2U6IHBhZ2VNb2R1bGUuUGFnZTtcblxuICAgIC8vIHByaXZhdGUgc29ja2V0OiBhbnk7XG4gICAgcHVibGljIHRpbWVTaW5jZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHVibGljIHJlc3RBcGk6IFJlc3RBcGlTZXJ2aWNlLyosIHByaXZhdGUgem9uZTogTmdab25lKi8pIHsgXG4gICAgICAgIHRoaXMudGltZVNpbmNlID0gZ2V0VGltZTtcbiAgICAgICAgdGhpcy5zZXR1cEhhbmRsZXJzKCk7XG4gICAgICAgIC8vIHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzczovL2FwcHMtdGVzdC5hcHBsb3ppYy5jb206MTU2Nzcvd3NcIiwgW10pO1xuICAgIH1cbiAgICBcbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRvcGljOlwiICsgdGhpcy50b2tlbik7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcbiAgICAgICAgdGhpcy53aG9zZSA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWyd3aG9zZSddO1xuICAgICAgICB0aGlzLmdyb3VwRGV0YWlscyA9IGdyb3VwRGV0YWlscztcbiAgICAgICAgdGhpcy5kaXNwTmFtZSA9IGRpc3BOYW1lOyAgICAgIFxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2codGhpcy53aG9zZStcIiBjaGF0V2l0aCBvbkluaXRcIik7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgd2hvc2UgOnRoaXMud2hvc2UsXG4gICAgICAgICAgICBpZDogdGhpcy5pZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzdEFwaS5jaGF0KGRhdGEpLnN1YnNjcmliZSggcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzXCIpO1xuICAgICAgICAgICAgdGhpcy5jaGF0cyA9IHJlcy5tZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy5jaGF0cy5yZXZlcnNlKCk7XG5cbiAgICAgICAgICAgIC8vIGZvcihsZXQgaT0wOyBpPHRoaXMuY2hhdHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgLy8gICAgIGlmKHRoaXMuY2hhdHNbaV0udHlwZT09NSlcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0aGlzLmNoYXRzW2ldLnJlYWQpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzLmNoYXRzLmxlbmd0aDogXCIgKyB0aGlzLmNoYXRzLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLmxpc3RWaWV3RWxlbS5uYXRpdmVFbGVtZW50Lml0ZW1zID0gdGhpcy5jaGF0cztcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20odGhpcy5saXN0Vmlld0VsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XG5cblxuICAgICAgICAvLyB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJzb2NrZXQgb3BlblwiKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldmVudCA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcInNvY2tldCBNZXNzYWdlIHJlY2VpdmVkXCIpO1xuICAgICAgICAvLyAgICAgICAgIGxldCByZXMgPSBldmVudC5kYXRhO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2hhdHMgPSByZXMubWVzc2FnZTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNoYXRzLnB1c2gocmVzKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUuZGlyKFwicmVzXCIpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJZb3UgaGF2ZSBiZWVuIGRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBldmVudCA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRoZSBzb2NrZXQgaGFkIGFuIGVycm9yXCIsIGV2ZW50LmVycm9yKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgY29ubmVjdCgpIDogdm9pZCB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRoaXMubXF0dF9jbGllbnQuY29ubmVjdCh0aGlzLm1xdHRfdXNlcm5hbWUsIHRoaXMubXF0dF9wYXNzd29yZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lbmN0aW5nLi4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdWdodCBlcnJvciBJTiBjb25uZWN0OiBcIiArIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKCkgOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMubXF0dF9jbGllbnQuc3Vic2NyaWJlKHRoaXMubXF0dF90b3BpYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnNjcmliZWQuLi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F1Z2h0IGVycm9yIEluIHN1YnNjcmliZTogXCIgKyBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHVwSGFuZGxlcnMoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLm1xdHRfY2xpZW50Lm9uQ29ubmVjdGlvbkZhaWx1cmUub24oKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGZhaWxlZDogXCIpO1xuICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tcXR0X2NsaWVudC5vbkNvbm5lY3Rpb25TdWNjZXNzLm9uKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHN1Y2Nlc3NmdWxseSFcIik7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1xdHRfY2xpZW50Lm9uQ29ubmVjdGlvbkxvc3Qub24oKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGxvc3Q6IFwiICsgZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tcXR0X2NsaWVudC5vbk1lc3NhZ2VBcnJpdmVkLm9uKChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgcmVjZWl2ZWQ6IFwiICk7XG4gICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgICAgIC8vICBsZXQgbmV3TWVzc2FnZSA9IHtcbiAgICAgICAgICAgIC8vICAgICAgY29udGVudFR5cGUgOiAnJyxcblxuICAgICAgICAgICAgLy8gIH07XG4gICAgICAgICAgICBsZXQgbmV3TWVzc2FnZSA9IEpTT04ucGFyc2UobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld01lc3NhZ2UudHlwZSArXCIgXCIrbmV3TWVzc2FnZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYobmV3TWVzc2FnZS50eXBlID09IFwiQVBQTE9aSUNfMjhcIil7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJJZCA9IG5ld01lc3NhZ2UubWVzc2FnZS5zcGxpdChcIixcIilbMF07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlcklkKTtcbiAgICAgICAgICAgICAgICBpZih1c2VySWQgPT0gdGhpcy53aG9zZSl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUHJlc2VudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NoYXRzID0gdGhpcy5jaGF0cztcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bmV3Q2hhdHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2hhdHNbaV0ucmVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXRzID0gbmV3Q2hhdHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKG5ld01lc3NhZ2UudHlwZSA9PSBcIkFQUExPWklDXzA0XCIpe1xuICAgICAgICAgICAgICAgIGxldCB1c2VyID0gbmV3TWVzc2FnZS5tZXNzYWdlLnNwbGl0KFwiLFwiKVsxXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyKTtcbiAgICAgICAgICAgICAgICBpZih1c2VyID09IHRoaXMud2hvc2Upe1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlByZXNlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdDaGF0cyA9IHRoaXMuY2hhdHM7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG5ld0NoYXRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NoYXRzW2ldLmRlbGl2ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXRzID0gbmV3Q2hhdHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBhY2NvdW50ID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJhY2NvdW50XCIpKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld01lc3NhZ2UubWVzc2FnZS5mcm9tVXNlck5hbWUgK1wiIFwiK2FjY291bnQudXNlcklkKTtcbiAgICAgICAgICAgICBpZihuZXdNZXNzYWdlLm1lc3NhZ2UudG8gPT0gdGhpcy53aG9zZSAmJiBuZXdNZXNzYWdlLm1lc3NhZ2UuZnJvbVVzZXJOYW1lICE9IGFjY291bnQudXNlcklkKXtcbiAgICAgICAgICAgICAgICAvLyAgY29uc29sZS5kaXIobmV3TWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgIHRoaXMuY2hhdHMucHVzaChuZXdNZXNzYWdlLm1lc3NhZ2UpXG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RWaWV3RWxlbS5uYXRpdmVFbGVtZW50Lml0ZW1zID0gdGhpcy5jaGF0cztcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKHRoaXMubGlzdFZpZXdFbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfSwxMDApO1xuXG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgLy8gfVxuXG4gICAgICByZXBseSgpe1xuICAgICAgICBpZih0aGlzLm1lc3NhZ2UubGVuZ3RoPjApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmc6Jyt0aGlzLm1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IG5vd1RpbWVTdGFtcCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUobm93VGltZVN0YW1wKTtcblxuICAgICAgICAgICAgLy8gLy8gYWxlcnQobm93ICsgXCIgXCIrbm93VGltZVN0YW1wKTtcbiAgICAgICAgICAgdGhpcy5jaGF0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTowLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFRpbWU6IG5vd1RpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICBrZXk6XCI1LW51bGwtXCIrbm93VGltZVN0YW1wLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6dGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOnt9LFxuICAgICAgICAgICAgICAgIHNvdXJjZTo1LFxuICAgICAgICAgICAgICAgIHRvOnRoaXMud2hvc2UsXG4gICAgICAgICAgICAgICAgdHlwZTo1XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIC8vIHRoaXMuc29ja2V0LnNlbmQodGhpcy5tZXNzYWdlKTsgICAgICAgICAgXG5cbiAgICAgICAgLy8gdGhpcy5jaGF0cy5wdXNoKHtcbiAgICAgICAgLy8gICAgICAgICBjb250ZW50VHlwZTozLFxuICAgICAgICAvLyAgICAgICAgIGNyZWF0ZWRBdFRpbWU6IG5vd1RpbWVTdGFtcCxcbiAgICAgICAgLy8gICAgICAgICBrZXk6XCI1LW51bGwtXCIrbm93VGltZVN0YW1wLFxuICAgICAgICAvLyAgICAgICAgIG1lc3NhZ2U6JycsXG4gICAgICAgIC8vICAgICAgICAgbWV0YWRhdGE6e30sXG4gICAgICAgIC8vICAgICAgICAgc291cmNlOjUsXG4gICAgICAgIC8vICAgICAgICAgdG86dGhpcy53aG9zZSxcbiAgICAgICAgLy8gICAgICAgICB0eXBlOjVcbiAgICAgICAgLy8gICAgIH0pXG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFZpZXdFbGVtLm5hdGl2ZUVsZW1lbnQuaXRlbXMgPSB0aGlzLmNoYXRzO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20odGhpcy5saXN0Vmlld0VsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzLmNoYXRzLmxlbmd0aDogXCIgKyB0aGlzLmNoYXRzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGVhclJlcGx5KCk7XG4gICAgICAgICAgICB9LDEwMCk7XG5cbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHdob3NlIDp0aGlzLndob3NlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVzdEFwaS5zZW5kKGRhdGEpLnN1YnNjcmliZSggcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2Nyb2xsVG9Cb3R0b20obHY6IExpc3RWaWV3KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibGlzdFZpZXcgZXhpc3RzOiBcIiArICEhbHYpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImxpc3RWaWV3Lml0ZW1zIGV4aXN0czogXCIgKyAhIWx2Lml0ZW1zKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJsaXN0dmlldy5pdGVtcy5sZW5ndGg6IFwiICsgbHYuaXRlbXMubGVuZ3RoKTtcbiAgICAgICAgaWYgKGx2ICYmIGx2Lml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGx2LnJlZnJlc2goKTtcbiAgICAgICAgICAgIGx2LnNjcm9sbFRvSW5kZXgobHYuaXRlbXMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNjcm9sbGVkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNNZSh0eXBlKXtcbiAgICAgICAgcmV0dXJuICh0eXBlPT01KTtcbiAgICB9XG5cbiAgICBpc1JlYWQocmVhZCl7XG4gICAgICAgIHJldHVybiByZWFkO1xuICAgIH1cbiAgICBcbiAgICBpc0RlbGl2ZXJlZChkZWxpdmVyZWQpe1xuICAgICAgICByZXR1cm4gZGVsaXZlcmVkO1xuICAgIH1cblxuICAgICAgaGFuZGxlQ2xlYXJSZXBseSgpe1xuICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gIH1cblxuICByZWZyZXNoTGlzdChhcmdzKSB7XG4gICAgICAgIGxldCBwdWxsUmVmcmVzaCA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgZW5kVGltZSA9IHRoaXMuY2hhdHNbMF0uY3JlYXRlZEF0VGltZTtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xuICAgICAgICB0aGlzLndob3NlID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ3dob3NlJ107XG4gICAgICAgIHRoaXMuZ3JvdXBEZXRhaWxzID0gZ3JvdXBEZXRhaWxzO1xuICAgICAgICB0aGlzLmRpc3BOYW1lID0gZGlzcE5hbWU7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy53aG9zZStcIiBjaGF0V2l0aCBvbkluaXRcIik7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgd2hvc2UgOnRoaXMud2hvc2UsXG4gICAgICAgICAgICBlbmRUaW1lOiBlbmRUaW1lLFxuICAgICAgICAgICAgaWQ6IHRoaXMuaWQgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXN0QXBpLmNoYXQoZGF0YSkuc3Vic2NyaWJlKCByZXMgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXNcIik7XG4gICAgICAgICAgICB0aGlzLm5ld0NoYXRzID0gcmVzLm1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLm5ld0NoYXRzLnJldmVyc2UoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhdHMgPSB0aGlzLm5ld0NoYXRzLmNvbmNhdCh0aGlzLmNoYXRzKTtcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuICAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoZWRcIik7XG4gICAgfVxuXG4gICAgaW5mbygpe1xuICAgICAgICBpZih0aGlzLmdyb3VwRGV0YWlsc1t0aGlzLndob3NlXSl7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2luZm9cIix0aGlzLndob3NlXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgd2FzIHRhcHBlZCEhIVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCl7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgd2hvc2UgOnRoaXMud2hvc2UsXG4gICAgICAgICAgICBpZDogdGhpcy5pZFxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaWQrXCI9XCIrdGhpcy53aG9zZSk7XG4gICAgICAgIHRoaXMucmVzdEFwaS5kZWxldGVDb252ZXJzYXRpb24oZGF0YSkuc3Vic2NyaWJlKCByZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDbGVhcmVkXCIpO1xuICAgICAgICAgICAgdGhpcy5jaGF0cyA9IFtdO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGlzVGV4dCh0eXBlKXtcbiAgICAgICAgcmV0dXJuICh0eXBlIT0xICYmIHR5cGUhPTIgJiYgdHlwZSE9Myk7XG4gICAgfVxuXG4gICAgaXNJbWFnZShtc2cpe1xuICAgICAgICBpZihtc2cuY29udGVudFR5cGU9PTEpe1xuICAgICAgICAgICAgcmV0dXJuIChtc2cuZmlsZU1ldGEuY29udGVudFR5cGUgPT0gXCJpbWFnZS9wbmdcIiB8fCBtc2cuZmlsZU1ldGEuY29udGVudFR5cGUgPT0gXCJpbWFnZS9qcGdcIiB8fCBtc2cuZmlsZU1ldGEuY29udGVudFR5cGUgPT0gXCJpbWFnZS9qcGVnXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNNYXAobXNnKXtcbiAgICAgICAgaWYobXNnLmNvbnRlbnRUeXBlPT0yKXtcbiAgICAgICAgICAgIGxldCBsb2MgPSBKU09OLnBhcnNlKG1zZy5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMubGF0ID0gbG9jLmxhdDtcbiAgICAgICAgICAgIHRoaXMubG9uID0gbG9jLmxvbjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGF0K1wiIFwiK3RoaXMubG9uKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNWaWRlbyhtc2cpe1xuICAgICAgICBpZihtc2cuY29udGVudFR5cGU9PTEpe1xuICAgICAgICAgICAgdGhpcy52aWRlb1NvdXJjZSA9IFwiaHR0cHM6Ly9hcHBsb3ppYy5hcHBzcG90LmNvbS9yZXN0L3dzL2F3cy9maWxlL1wiICsgbXNnLmZpbGVNZXRhLmJsb2JLZXk7XG4gICAgICAgICAgICByZXR1cm4gKG1zZy5maWxlTWV0YS5jb250ZW50VHlwZSA9PSBcInZpZGVvL200cFwiIHx8IG1zZy5maWxlTWV0YS5jb250ZW50VHlwZSA9PSBcInZpZGVvL21rdlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTWFwUmVhZHkoYXJncykge1xuICAgICAgICAvLyB5b3UgY2FuIHRhcCBpbnRvIHRoZSBuYXRpdmUgTWFwVmlldyBvYmplY3RzIChNR0xNYXBWaWV3IGZvciBpT1MgYW5kIGNvbS5tYXBib3gubWFwYm94c2RrLm1hcHMuTWFwVmlldyBmb3IgQW5kcm9pZClcbiAgICAgICAgbGV0IG5hdGl2ZU1hcFZpZXcgPSBhcmdzLmlvcyA/IGFyZ3MuaW9zIDogYXJncy5hbmRyb2lkO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcGJveCBvbk1hcFJlYWR5IGZvciBcIiArIChhcmdzLmlvcyA/IFwiaU9TXCIgOiBcIkFuZHJvaWRcIikgKyBcIiwgbmF0aXZlIG9iamVjdCByZWNlaXZlZDogXCIgKyBuYXRpdmVNYXBWaWV3KTtcbiAgICAgICAgXG4gICAgICAgIC8vIC4uIG9yIHVzZSB0aGUgY29udmVuaWVuY2UgbWV0aG9kcyBleHBvc2VkIG9uIGFyZ3MubWFwLCBmb3IgaW5zdGFuY2U6XG4gICAgICAgIGFyZ3MubWFwLmFkZE1hcmtlcnMoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgbGF0OiB0aGlzLmxhdCxcbiAgICAgICAgICAgIGxuZzogdGhpcy5sb24sXG4gICAgICAgICAgICB0aXRsZTogJ09uZS1saW5lIHRpdGxlIGhlcmUnLFxuICAgICAgICAgICAgc3VidGl0bGU6ICdSZWFsbHkgcmVhbGx5IG5pY2UgbG9jYXRpb24nLFxuICAgICAgICAgICAgb25DYWxsb3V0VGFwOiBmdW5jdGlvbigpe2NvbnNvbGUubG9nKFwiJ05pY2UgbG9jYXRpb24nIG1hcmtlciBjYWxsb3V0IHRhcHBlZFwiKTt9XG4gICAgICAgICAgICB9XVxuICAgICAgICApO1xuICAgIH1cblxufVxuXG5cbiBcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzKSB7XG4gICAgbGV0IHBhZ2UgPSBhcmdzLm9iamVjdDtcbiBcbiAgICAvLyBjcmVhdGUgdmlld1xuICAgIGxldCBjaGF0VmlldyA9IG5ldyBDaGF0Vmlldy5DaGF0VmlldygpO1xuICAgIFxuICAgIC8vIHJlZ2lzdGVyIGV2ZW50IHdoZW4gdXNlciB0YXBzXG4gICAgLy8gb24gU0VORCBidXR0b25cbiAgICBcbiAgICBjaGF0Vmlldy5ub3RpZnlPblNlbmRNZXNzYWdlVGFwKChldmVudERhdGE6IENoYXRWaWV3LlNlbmRNZXNzYWdlVGFwcGVkRXZlbnREYXRhKSA9PiB7XG4gICAgICAgIC8vIGFkZCBhIGNoYXQgbWVzc2FnZVxuICAgICAgICBldmVudERhdGEub2JqZWN0LmFwcGVuZE1lc3NhZ2VzKHsgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGRhdGU6IGdldFRpbWUoKSxcbiAgICAgICAgICAgIC8vIGlzUmlnaHQ6IHRydWUsXG4gICAgICAgICAgICBpbWFnZTogXCJ+L2ltZy9hdmF0YXIuanBnXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBldmVudERhdGEubWVzc2FnZSwgICAgXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBcbiAgICAvLyBmb2N1cyB0ZXh0IGZpZWxkXG4gICAgY2hhdFZpZXcuZm9jdXNNZXNzYWdlRmllbGQoKTtcbiAgICBcbiAgICBwYWdlLmNvbnRlbnQgPSBjaGF0Vmlldztcbn0iXX0=
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFdpdGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhdFdpdGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBFO0FBQzFFLDBDQUF1RTtBQUN2RSx5REFBdUQ7QUFFdkQsMEVBQXdFO0FBQ3hFLGtDQUFlLENBQUMsZUFBZSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxhQUFhLEVBQW5ELENBQW1ELENBQUMsQ0FBQztBQUM1RixrQ0FBZSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFDM0Usa0NBQWUsQ0FBQyxhQUFhLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEtBQUssRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0FBS2hGLGdEQUFtRDtBQUVuRCw2Q0FBa0U7QUFRbEUsSUFBYSxRQUFRO0lBaUJqQixrQkFBb0IsS0FBcUIsRUFBVSxPQUFlLEVBQVMsT0FBdUI7UUFBOUUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFkbEcsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxPQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ1IsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsUUFBRyxHQUFFLEVBQUUsQ0FBQztRQUNSLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFPTCxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFPLENBQUM7SUFDN0IsQ0FBQztJQUVELDJCQUFRLEdBQVI7UUFB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QUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87U0FDN0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFJSCxtQkFBbUI7SUFDbkIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFFN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFDNUIsQ0FBQztBQXpCRCx3Q0F5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsICBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMsIERhdGEgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUmVzdEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9yZXN0QXBpLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XG5yZWdpc3RlckVsZW1lbnQoXCJNYXBib3hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIikuTWFwYm94Vmlldyk7XG5yZWdpc3RlckVsZW1lbnQoXCJWaWRlb1BsYXllclwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXZpZGVvcGxheWVyXCIpLlZpZGVvKTtcblxuaW1wb3J0ICogYXMgcGFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQge0xpc3RWaWV3fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcblxuaW1wb3J0IENoYXRWaWV3ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1jaGF0dmlld1wiKTtcblxuaW1wb3J0IHsgZGlzcE5hbWUsIGdyb3VwRGV0YWlscywgZ2V0VGltZSB9IGZyb20gJy4uLy4uL2NvbW1vbkxpYic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjaGF0V2l0aFwiLFxuLy8gICB0ZW1wbGF0ZTogXCI8TGFiZWwgW3RleHRdPSd0aGlzLndpdGgnPjwvTGFiZWw+XCJcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvY2hhdFdpdGgvY2hhdFdpdGguaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2NoYXRXaXRoL2NoYXRXaXRoLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBDaGF0V2l0aCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZChcImxpc3R2aWV3XCIpIGxpc3RWaWV3RWxlbTogRWxlbWVudFJlZjtcbiAgICBcbiAgICBtZXNzYWdlID0gJyc7XG4gICAgd2hvc2UgPSAnJztcbiAgICBpZCA9ICcnO1xuICAgIGNoYXRzID0gW107XG4gICAgbmV3Q2hhdHMgPSBbXTtcbiAgICBkaXNwTmFtZSA9IFtdO1xuICAgIGdyb3VwRGV0YWlscyA9IFtdO1xuICAgIGxhdCA9Jyc7XG4gICAgbG9uID0gJyc7XG5cbiAgICBwcm90ZWN0ZWQgcGFnZTogcGFnZU1vZHVsZS5QYWdlO1xuXG4gICAgcHVibGljIHRpbWVTaW5jZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHVibGljIHJlc3RBcGk6IFJlc3RBcGlTZXJ2aWNlKSB7IFxuICAgICAgICB0aGlzLnRpbWVTaW5jZSA9IGdldFRpbWU7XG4gICAgfVxuICAgIFxuICAgIG5nT25Jbml0KCl7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcbiAgICAgICAgdGhpcy53aG9zZSA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWyd3aG9zZSddO1xuICAgICAgICB0aGlzLmdyb3VwRGV0YWlscyA9IGdyb3VwRGV0YWlscztcbiAgICAgICAgdGhpcy5kaXNwTmFtZSA9IGRpc3BOYW1lOyAgICAgIFxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2codGhpcy53aG9zZStcIiBjaGF0V2l0aCBvbkluaXRcIik7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgd2hvc2UgOnRoaXMud2hvc2UsXG4gICAgICAgICAgICBpZDogdGhpcy5pZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzdEFwaS5jaGF0KGRhdGEpLnN1YnNjcmliZSggcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzXCIpO1xuICAgICAgICAgICAgdGhpcy5jaGF0cyA9IHJlcy5tZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy5jaGF0cy5yZXZlcnNlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuY2hhdHMubGVuZ3RoOiBcIiArIHRoaXMuY2hhdHMubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMubGlzdFZpZXdFbGVtLm5hdGl2ZUVsZW1lbnQuaXRlbXMgPSB0aGlzLmNoYXRzO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSh0aGlzLmxpc3RWaWV3RWxlbS5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIC8vIGZvcihsZXQgY29udm8gaW4gdGhpcy5jb252b3Mpe1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKGNvbnZvKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHJlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gbGV0IG5vd1RpbWVTdGFtcCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSk7XG4gICAgICAgIC8vIGxldCBub3cgPSBuZXcgRGF0ZShub3dUaW1lU3RhbXApO1xuXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIH0sMTAwKTtcbiAgICB9XG5cbiAgICAgIHJlcGx5KCl7XG4gICAgICAgIGlmKHRoaXMubWVzc2FnZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZGluZzonK3RoaXMubWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgbm93VGltZVN0YW1wID0gTWF0aC5mbG9vcihEYXRlLm5vdygpKTtcbiAgICAgICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZShub3dUaW1lU3RhbXApO1xuXG4gICAgICAgICAgICAvLyAvLyBhbGVydChub3cgKyBcIiBcIitub3dUaW1lU3RhbXApO1xuICAgICAgICAvLyAgICB0aGlzLmNoYXRzLnB1c2goe1xuICAgICAgICAvLyAgICAgICAgIGNvbnRlbnRUeXBlOjAsXG4gICAgICAgIC8vICAgICAgICAgY3JlYXRlZEF0VGltZTogbm93VGltZVN0YW1wLFxuICAgICAgICAvLyAgICAgICAgIGtleTpcIjUtbnVsbC1cIitub3dUaW1lU3RhbXAsXG4gICAgICAgIC8vICAgICAgICAgbWVzc2FnZTp0aGlzLm1lc3NhZ2UsXG4gICAgICAgIC8vICAgICAgICAgbWV0YWRhdGE6e30sXG4gICAgICAgIC8vICAgICAgICAgc291cmNlOjUsXG4gICAgICAgIC8vICAgICAgICAgdG86dGhpcy53aG9zZSxcbiAgICAgICAgLy8gICAgICAgICB0eXBlOjVcbiAgICAgICAgLy8gICAgIH0pXG5cbiAgICAgICAgdGhpcy5jaGF0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTozLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFRpbWU6IG5vd1RpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICBrZXk6XCI1LW51bGwtXCIrbm93VGltZVN0YW1wLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6JycsXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6e30sXG4gICAgICAgICAgICAgICAgc291cmNlOjUsXG4gICAgICAgICAgICAgICAgdG86dGhpcy53aG9zZSxcbiAgICAgICAgICAgICAgICB0eXBlOjVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFZpZXdFbGVtLm5hdGl2ZUVsZW1lbnQuaXRlbXMgPSB0aGlzLmNoYXRzO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20odGhpcy5saXN0Vmlld0VsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmNoYXRzLmxlbmd0aDogXCIgKyB0aGlzLmNoYXRzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGVhclJlcGx5KCk7XG4gICAgICAgICAgICB9LDEwMDAwKTtcblxuICAgICAgICAgICAgLy8gbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAvLyAgICAgd2hvc2UgOnRoaXMud2hvc2UsXG4gICAgICAgICAgICAvLyAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlICAgIFxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gdGhpcy5yZXN0QXBpLnNlbmQoZGF0YSkuc3Vic2NyaWJlKCByZXMgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXNcIik7XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgLy8gZXJyID0+IHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzY3JvbGxUb0JvdHRvbShsdjogTGlzdFZpZXcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsaXN0VmlldyBleGlzdHM6IFwiICsgISFsdik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibGlzdFZpZXcuaXRlbXMgZXhpc3RzOiBcIiArICEhbHYuaXRlbXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImxpc3R2aWV3Lml0ZW1zLmxlbmd0aDogXCIgKyBsdi5pdGVtcy5sZW5ndGgpO1xuICAgICAgICBpZiAobHYgJiYgbHYuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbHYucmVmcmVzaCgpO1xuICAgICAgICAgICAgbHYuc2Nyb2xsVG9JbmRleChsdi5pdGVtcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01lKHR5cGUpe1xuICAgICAgICByZXR1cm4gKHR5cGU9PTUpO1xuICAgIH1cblxuICAgIGlzUmVhZChyZWFkKXtcbiAgICAgICAgcmV0dXJuIHJlYWQ7XG4gICAgfVxuICAgIFxuICAgIGlzRGVsaXZlcmVkKGRlbGl2ZXJlZCl7XG4gICAgICAgIHJldHVybiBkZWxpdmVyZWQ7XG4gICAgfVxuXG4gICAgICBoYW5kbGVDbGVhclJlcGx5KCl7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgfVxuXG4gIHJlZnJlc2hMaXN0KGFyZ3MpIHtcbiAgICAgICAgbGV0IHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG4gICAgICAgIGxldCBlbmRUaW1lID0gdGhpcy5jaGF0c1swXS5jcmVhdGVkQXRUaW1lO1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ107XG4gICAgICAgIHRoaXMud2hvc2UgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snd2hvc2UnXTtcbiAgICAgICAgdGhpcy5ncm91cERldGFpbHMgPSBncm91cERldGFpbHM7XG4gICAgICAgIHRoaXMuZGlzcE5hbWUgPSBkaXNwTmFtZTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLndob3NlK1wiIGNoYXRXaXRoIG9uSW5pdFwiKTtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICB3aG9zZSA6dGhpcy53aG9zZSxcbiAgICAgICAgICAgIGVuZFRpbWU6IGVuZFRpbWUsXG4gICAgICAgICAgICBpZDogdGhpcy5pZCBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3RBcGkuY2hhdChkYXRhKS5zdWJzY3JpYmUoIHJlcyA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlc1wiKTtcbiAgICAgICAgICAgIHRoaXMubmV3Q2hhdHMgPSByZXMubWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMubmV3Q2hhdHMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgdGhpcy5jaGF0cyA9IHRoaXMubmV3Q2hhdHMuY29uY2F0KHRoaXMuY2hhdHMpO1xuICAgICAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlJlZnJlc2hlZFwiKTtcbiAgICB9XG5cbiAgICBpbmZvKCl7XG4gICAgICAgIGlmKHRoaXMuZ3JvdXBEZXRhaWxzW3RoaXMud2hvc2VdKXtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvaW5mb1wiLHRoaXMud2hvc2VdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSSB3YXMgdGFwcGVkISEhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKXtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICB3aG9zZSA6dGhpcy53aG9zZSxcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pZCtcIj1cIit0aGlzLndob3NlKTtcbiAgICAgICAgdGhpcy5yZXN0QXBpLmRlbGV0ZUNvbnZlcnNhdGlvbihkYXRhKS5zdWJzY3JpYmUoIHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsZWFyZWRcIik7XG4gICAgICAgICAgICB0aGlzLmNoYXRzID0gW107XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaXNUZXh0KHR5cGUpe1xuICAgICAgICByZXR1cm4gKHR5cGUhPTEgJiYgdHlwZSE9MiAmJiB0eXBlIT0zKTtcbiAgICB9XG5cbiAgICBpc0ltYWdlKHR5cGUpe1xuICAgICAgICByZXR1cm4gKHR5cGU9PTEpO1xuICAgIH1cblxuICAgIGlzTWFwKG1zZyl7XG4gICAgICAgIGlmKG1zZy5jb250ZW50VHlwZT09Mil7XG4gICAgICAgICAgICBsZXQgbG9jID0gSlNPTi5wYXJzZShtc2cubWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLmxhdCA9IGxvYy5sYXQ7XG4gICAgICAgICAgICB0aGlzLmxvbiA9IGxvYy5sb247XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxhdCtcIiBcIit0aGlzLmxvbik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVmlkZW8odHlwZSl7XG4gICAgICAgIHJldHVybiAodHlwZT09Myk7XG4gICAgfVxuXG4gICAgb25NYXBSZWFkeShhcmdzKSB7XG4gICAgICAgIC8vIHlvdSBjYW4gdGFwIGludG8gdGhlIG5hdGl2ZSBNYXBWaWV3IG9iamVjdHMgKE1HTE1hcFZpZXcgZm9yIGlPUyBhbmQgY29tLm1hcGJveC5tYXBib3hzZGsubWFwcy5NYXBWaWV3IGZvciBBbmRyb2lkKVxuICAgICAgICBsZXQgbmF0aXZlTWFwVmlldyA9IGFyZ3MuaW9zID8gYXJncy5pb3MgOiBhcmdzLmFuZHJvaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwYm94IG9uTWFwUmVhZHkgZm9yIFwiICsgKGFyZ3MuaW9zID8gXCJpT1NcIiA6IFwiQW5kcm9pZFwiKSArIFwiLCBuYXRpdmUgb2JqZWN0IHJlY2VpdmVkOiBcIiArIG5hdGl2ZU1hcFZpZXcpO1xuICAgICAgICBcbiAgICAgICAgLy8gLi4gb3IgdXNlIHRoZSBjb252ZW5pZW5jZSBtZXRob2RzIGV4cG9zZWQgb24gYXJncy5tYXAsIGZvciBpbnN0YW5jZTpcbiAgICAgICAgYXJncy5tYXAuYWRkTWFya2VycyhbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICBsYXQ6IHRoaXMubGF0LFxuICAgICAgICAgICAgbG5nOiB0aGlzLmxvbixcbiAgICAgICAgICAgIHRpdGxlOiAnT25lLWxpbmUgdGl0bGUgaGVyZScsXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ1JlYWxseSByZWFsbHkgbmljZSBsb2NhdGlvbicsXG4gICAgICAgICAgICBvbkNhbGxvdXRUYXA6IGZ1bmN0aW9uKCl7Y29uc29sZS5sb2coXCInTmljZSBsb2NhdGlvbicgbWFya2VyIGNhbGxvdXQgdGFwcGVkXCIpO31cbiAgICAgICAgICAgIH1dXG4gICAgICAgICk7XG4gICAgfVxuXG59XG5cblxuIFxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3MpIHtcbiAgICBsZXQgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuIFxuICAgIC8vIGNyZWF0ZSB2aWV3XG4gICAgbGV0IGNoYXRWaWV3ID0gbmV3IENoYXRWaWV3LkNoYXRWaWV3KCk7XG4gICAgXG4gICAgLy8gcmVnaXN0ZXIgZXZlbnQgd2hlbiB1c2VyIHRhcHNcbiAgICAvLyBvbiBTRU5EIGJ1dHRvblxuICAgIFxuICAgIGNoYXRWaWV3Lm5vdGlmeU9uU2VuZE1lc3NhZ2VUYXAoKGV2ZW50RGF0YTogQ2hhdFZpZXcuU2VuZE1lc3NhZ2VUYXBwZWRFdmVudERhdGEpID0+IHtcbiAgICAgICAgLy8gYWRkIGEgY2hhdCBtZXNzYWdlXG4gICAgICAgIGV2ZW50RGF0YS5vYmplY3QuYXBwZW5kTWVzc2FnZXMoeyAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZGF0ZTogZ2V0VGltZSgpLFxuICAgICAgICAgICAgLy8gaXNSaWdodDogdHJ1ZSxcbiAgICAgICAgICAgIGltYWdlOiBcIn4vaW1nL2F2YXRhci5qcGdcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGV2ZW50RGF0YS5tZXNzYWdlLCAgICBcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIFxuICAgIC8vIGZvY3VzIHRleHQgZmllbGRcbiAgICBjaGF0Vmlldy5mb2N1c01lc3NhZ2VGaWVsZCgpO1xuICAgIFxuICAgIHBhZ2UuY29udGVudCA9IGNoYXRWaWV3O1xufSJdfQ==
>>>>>>> e37c9462b14218576633a8558e986615b78f65c6
