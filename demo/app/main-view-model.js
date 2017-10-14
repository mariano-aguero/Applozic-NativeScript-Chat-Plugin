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
        _this.applozicChat.login(alUser);
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELHlFQUEwRDtBQUUxRDtJQUFxQyxtQ0FBVTtJQUk3QztRQUFBLFlBQ0UsaUJBQU8sU0FhUjtRQVhDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5Q0FBWSxFQUFFLENBQUM7UUFDdkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUV6QyxJQUFJLE1BQU0sR0FBRztZQUNULFFBQVEsRUFBRyxRQUFRO1lBQ25CLFVBQVUsRUFBRyxRQUFRO1lBQ3JCLHNCQUFzQixFQUFHLENBQUM7WUFDMUIsZUFBZSxFQUFHLHFCQUFxQjtZQUN2QyxnQkFBZ0IsRUFBRyxDQUFDO1NBQ3ZCLENBQUE7UUFDRCxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFDbEMsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFxQyx1QkFBVSxHQW1COUM7QUFuQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgQXBwbG96aWNDaGF0IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFwcGxvemljLWNoYXQnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgYXBwbG96aWNDaGF0OiBBcHBsb3ppY0NoYXQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYXBwbG96aWNDaGF0ID0gbmV3IEFwcGxvemljQ2hhdCgpO1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuYXBwbG96aWNDaGF0Lm1lc3NhZ2U7XG5cbiAgICB2YXIgYWxVc2VyID0ge1xuICAgICAgICAndXNlcklkJyA6ICdkZWJ1ZzQnLCAgIC8vUmVwbGFjZSBpdCB3aXRoIHRoZSB1c2VySWQgb2YgdGhlIGxvZ2dlZCBpbiB1c2VyXG4gICAgICAgICdwYXNzd29yZCcgOiAnZGVidWc0JywgIC8vUHV0IHBhc3N3b3JkIGhlcmVcbiAgICAgICAgJ2F1dGhlbnRpY2F0aW9uVHlwZUlkJyA6IDEsXG4gICAgICAgICdhcHBsaWNhdGlvbklkJyA6ICdhcHBsb3ppYy1zYW1wbGUtYXBwJywgIC8vcmVwbGFjZSBcImFwcGxvemljLXNhbXBsZS1hcHBcIiB3aXRoIEFwcGxpY2F0aW9uIEtleSBmcm9tIEFwcGxvemljIERhc2hib2FyZFxuICAgICAgICAnZGV2aWNlQXBuc1R5cGUnIDogMCAgICAvL1NldCAwIGZvciBEZXZlbG9wbWVudCBhbmQgMSBmb3IgRGlzdHJpYnV0aW9uIChSZWxlYXNlKVxuICAgIH1cbiAgICB0aGlzLmFwcGxvemljQ2hhdC5sb2dpbihhbFVzZXIpO1xuICB9XG59XG4iXX0=