"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var nativescript_applozic_chat_1 = require("nativescript-applozic-chat");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.applozicChat = new nativescript_applozic_chat_1.ApplozicChat();
        _this.message = _this.applozicChat.message;
        var alUser = {
            'userId': 'debug4',
            'password': 'debug4',
            'authenticationTypeId': 1,
            'applicationId': 'applozic-sample-app',
            'deviceApnsType': 0
        };
        var that = _this;
        _this.applozicChat.login(alUser, function (response) {
            console.log("###onLoginSuccess.response: " + response);
            that.applozicChat.launchChat();
        }, function (error) {
            console.log("###error callback");
            console.log(error);
        });
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELHlFQUEwRDtBQUUxRDtJQUFxQyxtQ0FBVTtJQUs3QztRQUFBLFlBQ0UsaUJBQU8sU0E0QlI7UUExQkMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHlDQUFZLEVBQUUsQ0FBQztRQUN2QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBRXpDLElBQUksTUFBTSxHQUFHO1lBQ1gsUUFBUSxFQUFHLFFBQVE7WUFDbkIsVUFBVSxFQUFHLFFBQVE7WUFDckIsc0JBQXNCLEVBQUcsQ0FBQztZQUMxQixlQUFlLEVBQUcscUJBQXFCO1lBQ3ZDLGdCQUFnQixFQUFHLENBQUM7U0FDckIsQ0FBQTtRQUVELElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQztRQUVoQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBUyxRQUFRO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUUsVUFBUyxLQUFLO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7O0lBT1AsQ0FBQztJQUVILHNCQUFDO0FBQUQsQ0FBQyxBQXBDRCxDQUFxQyx1QkFBVSxHQW9DOUM7QUFwQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgQXBwbG96aWNDaGF0IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFwcGxvemljLWNoYXQnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgYXBwbG96aWNDaGF0OiBBcHBsb3ppY0NoYXQ7XG4gIHB1YmxpYyBvbkxvZ2luU3VjY2VzczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFwcGxvemljQ2hhdCA9IG5ldyBBcHBsb3ppY0NoYXQoKTtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLmFwcGxvemljQ2hhdC5tZXNzYWdlO1xuXG4gICAgdmFyIGFsVXNlciA9IHtcbiAgICAgICd1c2VySWQnIDogJ2RlYnVnNCcsICAgLy9SZXBsYWNlIGl0IHdpdGggdGhlIHVzZXJJZCBvZiB0aGUgbG9nZ2VkIGluIHVzZXJcbiAgICAgICdwYXNzd29yZCcgOiAnZGVidWc0JywgIC8vUHV0IHBhc3N3b3JkIGhlcmVcbiAgICAgICdhdXRoZW50aWNhdGlvblR5cGVJZCcgOiAxLFxuICAgICAgJ2FwcGxpY2F0aW9uSWQnIDogJ2FwcGxvemljLXNhbXBsZS1hcHAnLCAgLy9yZXBsYWNlIFwiYXBwbG96aWMtc2FtcGxlLWFwcFwiIHdpdGggQXBwbGljYXRpb24gS2V5IGZyb20gQXBwbG96aWMgRGFzaGJvYXJkXG4gICAgICAnZGV2aWNlQXBuc1R5cGUnIDogMCAgICAvL1NldCAwIGZvciBEZXZlbG9wbWVudCBhbmQgMSBmb3IgRGlzdHJpYnV0aW9uIChSZWxlYXNlKVxuICAgIH1cblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBcbiAgICB0aGlzLmFwcGxvemljQ2hhdC5sb2dpbihhbFVzZXIsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjb25Mb2dpblN1Y2Nlc3MucmVzcG9uc2U6IFwiICsgcmVzcG9uc2UpO1xuICAgICAgICB0aGF0LmFwcGxvemljQ2hhdC5sYXVuY2hDaGF0KCk7XG4gICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIiMjI2Vycm9yIGNhbGxiYWNrXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9KTtcblxuICAgIC8qXG4gICAgdGhpcy5vbkxvZ2luU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCIjIyNvbkxvZ2luU3VjY2Vzcy5yZXNwb25zZTogXCIpO1xuICAgICAgdGhhdC5hcHBsb3ppY0NoYXQubGF1bmNoQ2hhdCgpO1xuICAgIH0gKi9cbiAgfVxuXG59XG4iXX0=