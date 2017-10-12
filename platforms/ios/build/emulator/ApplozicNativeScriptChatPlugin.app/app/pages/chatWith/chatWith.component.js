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
    ChatWith.prototype.goBack = function () {
        //this._router.navigate(["/conversations"]);
        //this.routerExtensions.back();
        var account = JSON.parse(application_settings_1.getString("account"));
        alert(account);
        this._router.navigate(["/conversation", account.deviceKey]);
        //this.routerExtensions.backToPreviousPage();
    };
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
        // let nowTimeStamp = Math.floor(Date.now());
        // let now = new Date(nowTimeStamp);
        // setTimeout(() => {
        // },100);
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
        return false;
    };
    ChatWith.prototype.isMap = function (msg) {
        if (msg.contentType == 2) {
            var loc = JSON.parse(msg.message);
            this.lat = loc.lat;
            this.lon = loc.lon;
            console.log(this.lat + " " + this.lon);
            return true;
        }
        return false;
    };
    ChatWith.prototype.isVideo = function (msg) {
        if (msg.contentType == 1) {
            this.videoSource = "https://applozic.appspot.com/rest/ws/aws/file/" + msg.fileMeta.blobKey;
            return (msg.fileMeta.contentType == "video/m4p" || msg.fileMeta.contentType == "video/mkv");
        }
        return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFdpdGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhdFdpdGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZGO0FBQzdGLDBDQUF1RTtBQUN2RSxzQ0FBc0M7QUFDdEMsNkRBVThCO0FBRTlCLHVEQUE2QztBQUc3Qyx5REFBdUQ7QUFFdkQsMEVBQXdFO0FBQ3hFLGtDQUFlLENBQUMsZUFBZSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxhQUFhLEVBQW5ELENBQW1ELENBQUMsQ0FBQztBQUM1RixrQ0FBZSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFDM0Usa0NBQWUsQ0FBQyxhQUFhLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEtBQUssRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0FBS2hGLGdEQUFtRDtBQUVuRCw2Q0FBa0U7QUFRbEUsSUFBYSxRQUFRO0lBcUNqQixrQkFBb0IsS0FBcUIsRUFBVSxPQUFlLEVBQVMsT0FBdUIsQ0FBQSwwQkFBMEI7UUFBeEcsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0IsQ0FBQSwwQkFBMEI7UUFsQzVILFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsT0FBRSxHQUFHLEVBQUUsQ0FBQztRQUNSLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLFFBQUcsR0FBRSxFQUFFLENBQUM7UUFDUixRQUFHLEdBQUcsRUFBRSxDQUFDO1FB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QkQsd0NBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCAgRWxlbWVudFJlZiwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFBhcmFtcywgRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG4vLyByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXdlYnNvY2tldHNcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuaW1wb3J0IHtNUVRUQ2xpZW50fSBmcm9tIFwibmF0aXZlc2NyaXB0LW1xdHRcIjtcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tcXR0L2NvbW1vblwiO1xuXG5pbXBvcnQgeyBSZXN0QXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3Jlc3RBcGkuc2VydmljZSc7XG5cbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcbnJlZ2lzdGVyRWxlbWVudChcIk1hcGJveFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1hcGJveFwiKS5NYXBib3hWaWV3KTtcbnJlZ2lzdGVyRWxlbWVudChcIlZpZGVvUGxheWVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdmlkZW9wbGF5ZXJcIikuVmlkZW8pO1xuXG5pbXBvcnQgKiBhcyBwYWdlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7TGlzdFZpZXd9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xuXG5pbXBvcnQgQ2hhdFZpZXcgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWNoYXR2aWV3XCIpO1xuXG5pbXBvcnQgeyBkaXNwTmFtZSwgZ3JvdXBEZXRhaWxzLCBnZXRUaW1lIH0gZnJvbSAnLi4vLi4vY29tbW9uTGliJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNoYXRXaXRoXCIsXG4vLyAgIHRlbXBsYXRlOiBcIjxMYWJlbCBbdGV4dF09J3RoaXMud2l0aCc+PC9MYWJlbD5cIlxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9jaGF0V2l0aC9jaGF0V2l0aC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY2hhdFdpdGgvY2hhdFdpdGguY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENoYXRXaXRoIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKFwibGlzdHZpZXdcIikgbGlzdFZpZXdFbGVtOiBFbGVtZW50UmVmO1xuXG4gICAgbWVzc2FnZSA9ICcnO1xuICAgIHdob3NlID0gJyc7XG4gICAgaWQgPSAnJztcbiAgICBjaGF0cyA9IFtdO1xuICAgIG5ld0NoYXRzID0gW107XG4gICAgZGlzcE5hbWUgPSBbXTtcbiAgICBncm91cERldGFpbHMgPSBbXTtcbiAgICBsYXQgPScnO1xuICAgIGxvbiA9ICcnO1xuICAgIHZpZGVvU291cmNlID0gJyc7XG4gICAgdG9rZW4gPSBnZXRTdHJpbmcoXCJ1c2VyS2V5XCIpXG5cbiAgICBtcXR0X2hvc3Q6IHN0cmluZyA9IFwiYXBwcy10ZXN0LmFwcGxvemljLmNvbVwiO1xuICAgIG1xdHRfcG9ydDogbnVtYmVyID0gMTU2Nzc7XG4gICAgbXF0dF91c2VTU0w6IGJvb2xlYW4gPSB0cnVlO1xuICAgIG1xdHRfcGF0aDogc3RyaW5nID0gXCIvd3NcIjtcbiAgICBtcXR0X3VzZXJuYW1lOiBzdHJpbmcgPSBcImd1ZXN0XCI7XG4gICAgbXF0dF9wYXNzd29yZDogc3RyaW5nID0gXCJndWVzdFwiO1xuICAgIG1xdHRfdG9waWM6IHN0cmluZyA9IHRoaXMudG9rZW47XG5cbiAgICBvcHRpb25zID0ge1xuICAgICAgICBob3N0OiB0aGlzLm1xdHRfaG9zdCxcbiAgICAgICAgcG9ydDogdGhpcy5tcXR0X3BvcnQsXG4gICAgICAgIHVzZVNTTDogdGhpcy5tcXR0X3VzZVNTTCxcbiAgICAgICAgcGF0aDogdGhpcy5tcXR0X3BhdGhcbiAgICB9O1xuXG4gICAgbXF0dF9jbGllbnQ6IE1RVFRDbGllbnQgPSBuZXcgTVFUVENsaWVudCh0aGlzLm9wdGlvbnMpO1xuXG4gICAgcHJvdGVjdGVkIHBhZ2U6IHBhZ2VNb2R1bGUuUGFnZTtcblxuICAgIC8vIHByaXZhdGUgc29ja2V0OiBhbnk7XG4gICAgcHVibGljIHRpbWVTaW5jZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHVibGljIHJlc3RBcGk6IFJlc3RBcGlTZXJ2aWNlLyosIHByaXZhdGUgem9uZTogTmdab25lKi8pIHtcbiAgICAgICAgdGhpcy50aW1lU2luY2UgPSBnZXRUaW1lO1xuICAgICAgICB0aGlzLnNldHVwSGFuZGxlcnMoKTtcbiAgICAgICAgLy8gdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3NzOi8vYXBwcy10ZXN0LmFwcGxvemljLmNvbToxNTY3Ny93c1wiLCBbXSk7XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgLy90aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2NvbnZlcnNhdGlvbnNcIl0pO1xuICAgICAgLy90aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgICAgbGV0IGFjY291bnQgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcImFjY291bnRcIikpO1xuICAgICAgYWxlcnQoYWNjb3VudCk7XG4gICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2NvbnZlcnNhdGlvblwiLCBhY2NvdW50LmRldmljZUtleV0pXG4gICAgICAvL3RoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRvcGljOlwiICsgdGhpcy50b2tlbik7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcbiAgICAgICAgdGhpcy53aG9zZSA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWyd3aG9zZSddO1xuICAgICAgICB0aGlzLmdyb3VwRGV0YWlscyA9IGdyb3VwRGV0YWlscztcbiAgICAgICAgdGhpcy5kaXNwTmFtZSA9IGRpc3BOYW1lO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMud2hvc2UrXCIgY2hhdFdpdGggb25Jbml0XCIpO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHdob3NlIDp0aGlzLndob3NlLFxuICAgICAgICAgICAgaWQ6IHRoaXMuaWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3RBcGkuY2hhdChkYXRhKS5zdWJzY3JpYmUoIHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc1wiKTtcbiAgICAgICAgICAgIHRoaXMuY2hhdHMgPSByZXMubWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMuY2hhdHMucmV2ZXJzZSgpO1xuXG4gICAgICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTx0aGlzLmNoYXRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIC8vICAgICBpZih0aGlzLmNoYXRzW2ldLnR5cGU9PTUpXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5jaGF0c1tpXS5yZWFkKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcy5jaGF0cy5sZW5ndGg6IFwiICsgdGhpcy5jaGF0cy5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5saXN0Vmlld0VsZW0ubmF0aXZlRWxlbWVudC5pdGVtcyA9IHRoaXMuY2hhdHM7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKHRoaXMubGlzdFZpZXdFbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuXG5cbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XG5cblxuICAgICAgICAvLyB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJzb2NrZXQgb3BlblwiKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJzb2NrZXQgTWVzc2FnZSByZWNlaXZlZFwiKTtcbiAgICAgICAgLy8gICAgICAgICBsZXQgcmVzID0gZXZlbnQuZGF0YTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNoYXRzID0gcmVzLm1lc3NhZ2U7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jaGF0cy5wdXNoKHJlcylcblxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUuZGlyKFwicmVzXCIpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJZb3UgaGF2ZSBiZWVuIGRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBldmVudCA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRoZSBzb2NrZXQgaGFkIGFuIGVycm9yXCIsIGV2ZW50LmVycm9yKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgY29ubmVjdCgpIDogdm9pZCB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRoaXMubXF0dF9jbGllbnQuY29ubmVjdCh0aGlzLm1xdHRfdXNlcm5hbWUsIHRoaXMubXF0dF9wYXNzd29yZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lbmN0aW5nLi4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdWdodCBlcnJvciBJTiBjb25uZWN0OiBcIiArIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKCkgOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMubXF0dF9jbGllbnQuc3Vic2NyaWJlKHRoaXMubXF0dF90b3BpYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnNjcmliZWQuLi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F1Z2h0IGVycm9yIEluIHN1YnNjcmliZTogXCIgKyBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHVwSGFuZGxlcnMoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLm1xdHRfY2xpZW50Lm9uQ29ubmVjdGlvbkZhaWx1cmUub24oKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGZhaWxlZDogXCIpO1xuICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tcXR0X2NsaWVudC5vbkNvbm5lY3Rpb25TdWNjZXNzLm9uKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHN1Y2Nlc3NmdWxseSFcIik7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1xdHRfY2xpZW50Lm9uQ29ubmVjdGlvbkxvc3Qub24oKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGxvc3Q6IFwiICsgZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tcXR0X2NsaWVudC5vbk1lc3NhZ2VBcnJpdmVkLm9uKChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgcmVjZWl2ZWQ6IFwiICk7XG4gICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgICAgIC8vICBsZXQgbmV3TWVzc2FnZSA9IHtcbiAgICAgICAgICAgIC8vICAgICAgY29udGVudFR5cGUgOiAnJyxcblxuICAgICAgICAgICAgLy8gIH07XG4gICAgICAgICAgICBsZXQgbmV3TWVzc2FnZSA9IEpTT04ucGFyc2UobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld01lc3NhZ2UudHlwZSArXCIgXCIrbmV3TWVzc2FnZS5tZXNzYWdlKTtcblxuICAgICAgICAgICAgaWYobmV3TWVzc2FnZS50eXBlID09IFwiQVBQTE9aSUNfMjhcIil7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJJZCA9IG5ld01lc3NhZ2UubWVzc2FnZS5zcGxpdChcIixcIilbMF07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlcklkKTtcbiAgICAgICAgICAgICAgICBpZih1c2VySWQgPT0gdGhpcy53aG9zZSl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUHJlc2VudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NoYXRzID0gdGhpcy5jaGF0cztcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bmV3Q2hhdHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2hhdHNbaV0ucmVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXRzID0gbmV3Q2hhdHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKG5ld01lc3NhZ2UudHlwZSA9PSBcIkFQUExPWklDXzA0XCIpe1xuICAgICAgICAgICAgICAgIGxldCB1c2VyID0gbmV3TWVzc2FnZS5tZXNzYWdlLnNwbGl0KFwiLFwiKVsxXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyKTtcbiAgICAgICAgICAgICAgICBpZih1c2VyID09IHRoaXMud2hvc2Upe1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlByZXNlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdDaGF0cyA9IHRoaXMuY2hhdHM7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG5ld0NoYXRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NoYXRzW2ldLmRlbGl2ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXRzID0gbmV3Q2hhdHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBhY2NvdW50ID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJhY2NvdW50XCIpKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld01lc3NhZ2UubWVzc2FnZS5mcm9tVXNlck5hbWUgK1wiIFwiK2FjY291bnQudXNlcklkKTtcbiAgICAgICAgICAgICBpZihuZXdNZXNzYWdlLm1lc3NhZ2UudG8gPT0gdGhpcy53aG9zZSAmJiBuZXdNZXNzYWdlLm1lc3NhZ2UuZnJvbVVzZXJOYW1lICE9IGFjY291bnQudXNlcklkKXtcbiAgICAgICAgICAgICAgICAvLyAgY29uc29sZS5kaXIobmV3TWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgIHRoaXMuY2hhdHMucHVzaChuZXdNZXNzYWdlLm1lc3NhZ2UpXG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RWaWV3RWxlbS5uYXRpdmVFbGVtZW50Lml0ZW1zID0gdGhpcy5jaGF0cztcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKHRoaXMubGlzdFZpZXdFbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfSwxMDApO1xuXG5cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGxldCBub3dUaW1lU3RhbXAgPSBNYXRoLmZsb29yKERhdGUubm93KCkpO1xuICAgICAgICAvLyBsZXQgbm93ID0gbmV3IERhdGUobm93VGltZVN0YW1wKTtcblxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAvLyB9LDEwMCk7XG4gICAgfVxuXG4gICAgLy8gbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgLy8gfVxuXG4gICAgICByZXBseSgpe1xuICAgICAgICBpZih0aGlzLm1lc3NhZ2UubGVuZ3RoPjApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmc6Jyt0aGlzLm1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IG5vd1RpbWVTdGFtcCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUobm93VGltZVN0YW1wKTtcblxuICAgICAgICAgICAgLy8gLy8gYWxlcnQobm93ICsgXCIgXCIrbm93VGltZVN0YW1wKTtcbiAgICAgICAgLy8gICAgdGhpcy5jaGF0cy5wdXNoKHtcbiAgICAgICAgLy8gICAgICAgICBjb250ZW50VHlwZTowLFxuICAgICAgICAvLyAgICAgICAgIGNyZWF0ZWRBdFRpbWU6IG5vd1RpbWVTdGFtcCxcbiAgICAgICAgLy8gICAgICAgICBrZXk6XCI1LW51bGwtXCIrbm93VGltZVN0YW1wLFxuICAgICAgICAvLyAgICAgICAgIG1lc3NhZ2U6dGhpcy5tZXNzYWdlLFxuICAgICAgICAvLyAgICAgICAgIG1ldGFkYXRhOnt9LFxuICAgICAgICAvLyAgICAgICAgIHNvdXJjZTo1LFxuICAgICAgICAvLyAgICAgICAgIHRvOnRoaXMud2hvc2UsXG4gICAgICAgIC8vICAgICAgICAgdHlwZTo1XG4gICAgICAgIC8vICAgICB9KVxuXG4gICAgICAgIHRoaXMuY2hhdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6MyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRUaW1lOiBub3dUaW1lU3RhbXAsXG4gICAgICAgICAgICAgICAga2V5OlwiNS1udWxsLVwiK25vd1RpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOicnLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOnt9LFxuICAgICAgICAgICAgICAgIHNvdXJjZTo1LFxuICAgICAgICAgICAgICAgIHRvOnRoaXMud2hvc2UsXG4gICAgICAgICAgICAgICAgdHlwZTo1XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIC8vIHRoaXMuc29ja2V0LnNlbmQodGhpcy5tZXNzYWdlKTtcblxuICAgICAgICAvLyB0aGlzLmNoYXRzLnB1c2goe1xuICAgICAgICAvLyAgICAgICAgIGNvbnRlbnRUeXBlOjMsXG4gICAgICAgIC8vICAgICAgICAgY3JlYXRlZEF0VGltZTogbm93VGltZVN0YW1wLFxuICAgICAgICAvLyAgICAgICAgIGtleTpcIjUtbnVsbC1cIitub3dUaW1lU3RhbXAsXG4gICAgICAgIC8vICAgICAgICAgbWVzc2FnZTonJyxcbiAgICAgICAgLy8gICAgICAgICBtZXRhZGF0YTp7fSxcbiAgICAgICAgLy8gICAgICAgICBzb3VyY2U6NSxcbiAgICAgICAgLy8gICAgICAgICB0bzp0aGlzLndob3NlLFxuICAgICAgICAvLyAgICAgICAgIHR5cGU6NVxuICAgICAgICAvLyAgICAgfSlcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Vmlld0VsZW0ubmF0aXZlRWxlbWVudC5pdGVtcyA9IHRoaXMuY2hhdHM7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSh0aGlzLmxpc3RWaWV3RWxlbS5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMuY2hhdHMubGVuZ3RoOiBcIiArIHRoaXMuY2hhdHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNsZWFyUmVwbHkoKTtcbiAgICAgICAgICAgIH0sMTAwMDApO1xuXG4gICAgICAgICAgICAvLyBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIC8vICAgICB3aG9zZSA6dGhpcy53aG9zZSxcbiAgICAgICAgICAgIC8vICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2VcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIHRoaXMucmVzdEFwaS5zZW5kKGRhdGEpLnN1YnNjcmliZSggcmVzID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzXCIpO1xuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIC8vIGVyciA9PiB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJcIik7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxUb0JvdHRvbShsdjogTGlzdFZpZXcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJsaXN0VmlldyBleGlzdHM6IFwiICsgISFsdik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibGlzdFZpZXcuaXRlbXMgZXhpc3RzOiBcIiArICEhbHYuaXRlbXMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImxpc3R2aWV3Lml0ZW1zLmxlbmd0aDogXCIgKyBsdi5pdGVtcy5sZW5ndGgpO1xuICAgICAgICBpZiAobHYgJiYgbHYuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbHYucmVmcmVzaCgpO1xuICAgICAgICAgICAgbHYuc2Nyb2xsVG9JbmRleChsdi5pdGVtcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01lKHR5cGUpe1xuICAgICAgICByZXR1cm4gKHR5cGU9PTUpO1xuICAgIH1cblxuICAgIGlzUmVhZChyZWFkKXtcbiAgICAgICAgcmV0dXJuIHJlYWQ7XG4gICAgfVxuXG4gICAgaXNEZWxpdmVyZWQoZGVsaXZlcmVkKXtcbiAgICAgICAgcmV0dXJuIGRlbGl2ZXJlZDtcbiAgICB9XG5cbiAgICAgIGhhbmRsZUNsZWFyUmVwbHkoKXtcbiAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICB9XG5cbiAgcmVmcmVzaExpc3QoYXJncykge1xuICAgICAgICBsZXQgcHVsbFJlZnJlc2ggPSBhcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IGVuZFRpbWUgPSB0aGlzLmNoYXRzWzBdLmNyZWF0ZWRBdFRpbWU7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcbiAgICAgICAgdGhpcy53aG9zZSA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWyd3aG9zZSddO1xuICAgICAgICB0aGlzLmdyb3VwRGV0YWlscyA9IGdyb3VwRGV0YWlscztcbiAgICAgICAgdGhpcy5kaXNwTmFtZSA9IGRpc3BOYW1lO1xuXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy53aG9zZStcIiBjaGF0V2l0aCBvbkluaXRcIik7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgd2hvc2UgOnRoaXMud2hvc2UsXG4gICAgICAgICAgICBlbmRUaW1lOiBlbmRUaW1lLFxuICAgICAgICAgICAgaWQ6IHRoaXMuaWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3RBcGkuY2hhdChkYXRhKS5zdWJzY3JpYmUoIHJlcyA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlc1wiKTtcbiAgICAgICAgICAgIHRoaXMubmV3Q2hhdHMgPSByZXMubWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMubmV3Q2hhdHMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgdGhpcy5jaGF0cyA9IHRoaXMubmV3Q2hhdHMuY29uY2F0KHRoaXMuY2hhdHMpO1xuICAgICAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlJlZnJlc2hlZFwiKTtcbiAgICB9XG5cbiAgICBpbmZvKCl7XG4gICAgICAgIGlmKHRoaXMuZ3JvdXBEZXRhaWxzW3RoaXMud2hvc2VdKXtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvaW5mb1wiLHRoaXMud2hvc2VdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSSB3YXMgdGFwcGVkISEhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKXtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICB3aG9zZSA6dGhpcy53aG9zZSxcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pZCtcIj1cIit0aGlzLndob3NlKTtcbiAgICAgICAgdGhpcy5yZXN0QXBpLmRlbGV0ZUNvbnZlcnNhdGlvbihkYXRhKS5zdWJzY3JpYmUoIHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsZWFyZWRcIik7XG4gICAgICAgICAgICB0aGlzLmNoYXRzID0gW107XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaXNUZXh0KHR5cGUpe1xuICAgICAgICByZXR1cm4gKHR5cGUhPTEgJiYgdHlwZSE9MiAmJiB0eXBlIT0zKTtcbiAgICB9XG5cbiAgICBpc0ltYWdlKG1zZyl7XG4gICAgICAgIGlmKG1zZy5jb250ZW50VHlwZT09MSl7XG4gICAgICAgICAgICByZXR1cm4gKG1zZy5maWxlTWV0YS5jb250ZW50VHlwZSA9PSBcImltYWdlL3BuZ1wiIHx8IG1zZy5maWxlTWV0YS5jb250ZW50VHlwZSA9PSBcImltYWdlL2pwZ1wiIHx8IG1zZy5maWxlTWV0YS5jb250ZW50VHlwZSA9PSBcImltYWdlL2pwZWdcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzTWFwKG1zZyl7XG4gICAgICAgIGlmKG1zZy5jb250ZW50VHlwZT09Mil7XG4gICAgICAgICAgICBsZXQgbG9jID0gSlNPTi5wYXJzZShtc2cubWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLmxhdCA9IGxvYy5sYXQ7XG4gICAgICAgICAgICB0aGlzLmxvbiA9IGxvYy5sb247XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxhdCtcIiBcIit0aGlzLmxvbik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBpc1ZpZGVvKG1zZyl7XG4gICAgICAgIGlmKG1zZy5jb250ZW50VHlwZT09MSl7XG4gICAgICAgICAgICB0aGlzLnZpZGVvU291cmNlID0gXCJodHRwczovL2FwcGxvemljLmFwcHNwb3QuY29tL3Jlc3Qvd3MvYXdzL2ZpbGUvXCIgKyBtc2cuZmlsZU1ldGEuYmxvYktleTtcbiAgICAgICAgICAgIHJldHVybiAobXNnLmZpbGVNZXRhLmNvbnRlbnRUeXBlID09IFwidmlkZW8vbTRwXCIgfHwgbXNnLmZpbGVNZXRhLmNvbnRlbnRUeXBlID09IFwidmlkZW8vbWt2XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgIH1cblxuICAgIG9uTWFwUmVhZHkoYXJncykge1xuICAgICAgICAvLyB5b3UgY2FuIHRhcCBpbnRvIHRoZSBuYXRpdmUgTWFwVmlldyBvYmplY3RzIChNR0xNYXBWaWV3IGZvciBpT1MgYW5kIGNvbS5tYXBib3gubWFwYm94c2RrLm1hcHMuTWFwVmlldyBmb3IgQW5kcm9pZClcbiAgICAgICAgbGV0IG5hdGl2ZU1hcFZpZXcgPSBhcmdzLmlvcyA/IGFyZ3MuaW9zIDogYXJncy5hbmRyb2lkO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcGJveCBvbk1hcFJlYWR5IGZvciBcIiArIChhcmdzLmlvcyA/IFwiaU9TXCIgOiBcIkFuZHJvaWRcIikgKyBcIiwgbmF0aXZlIG9iamVjdCByZWNlaXZlZDogXCIgKyBuYXRpdmVNYXBWaWV3KTtcblxuICAgICAgICAvLyAuLiBvciB1c2UgdGhlIGNvbnZlbmllbmNlIG1ldGhvZHMgZXhwb3NlZCBvbiBhcmdzLm1hcCwgZm9yIGluc3RhbmNlOlxuICAgICAgICBhcmdzLm1hcC5hZGRNYXJrZXJzKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXQsXG4gICAgICAgICAgICBsbmc6IHRoaXMubG9uLFxuICAgICAgICAgICAgdGl0bGU6ICdPbmUtbGluZSB0aXRsZSBoZXJlJyxcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnUmVhbGx5IHJlYWxseSBuaWNlIGxvY2F0aW9uJyxcbiAgICAgICAgICAgIG9uQ2FsbG91dFRhcDogZnVuY3Rpb24oKXtjb25zb2xlLmxvZyhcIidOaWNlIGxvY2F0aW9uJyBtYXJrZXIgY2FsbG91dCB0YXBwZWRcIik7fVxuICAgICAgICAgICAgfV1cbiAgICAgICAgKTtcbiAgICB9XG5cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzKSB7XG4gICAgbGV0IHBhZ2UgPSBhcmdzLm9iamVjdDtcblxuICAgIC8vIGNyZWF0ZSB2aWV3XG4gICAgbGV0IGNoYXRWaWV3ID0gbmV3IENoYXRWaWV3LkNoYXRWaWV3KCk7XG5cbiAgICAvLyByZWdpc3RlciBldmVudCB3aGVuIHVzZXIgdGFwc1xuICAgIC8vIG9uIFNFTkQgYnV0dG9uXG5cbiAgICBjaGF0Vmlldy5ub3RpZnlPblNlbmRNZXNzYWdlVGFwKChldmVudERhdGE6IENoYXRWaWV3LlNlbmRNZXNzYWdlVGFwcGVkRXZlbnREYXRhKSA9PiB7XG4gICAgICAgIC8vIGFkZCBhIGNoYXQgbWVzc2FnZVxuICAgICAgICBldmVudERhdGEub2JqZWN0LmFwcGVuZE1lc3NhZ2VzKHtcbiAgICAgICAgICAgIC8vIGRhdGU6IGdldFRpbWUoKSxcbiAgICAgICAgICAgIC8vIGlzUmlnaHQ6IHRydWUsXG4gICAgICAgICAgICBpbWFnZTogXCJ+L2ltZy9hdmF0YXIuanBnXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBldmVudERhdGEubWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuXG4gICAgLy8gZm9jdXMgdGV4dCBmaWVsZFxuICAgIGNoYXRWaWV3LmZvY3VzTWVzc2FnZUZpZWxkKCk7XG5cbiAgICBwYWdlLmNvbnRlbnQgPSBjaGF0Vmlldztcbn1cbiJdfQ==