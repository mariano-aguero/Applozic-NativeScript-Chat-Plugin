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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELHlFQUEwRDtBQUUxRDtJQUFxQyxtQ0FBVTtJQUk3QztRQUFBLFlBQ0UsaUJBQU8sU0FlUjtRQWJDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5Q0FBWSxFQUFFLENBQUM7UUFDdkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUV6QyxJQUFJLE1BQU0sR0FBRztZQUNYLFFBQVEsRUFBRyxRQUFRO1lBQ25CLFVBQVUsRUFBRyxRQUFRO1lBQ3JCLHNCQUFzQixFQUFHLENBQUM7WUFDMUIsZUFBZSxFQUFHLHFCQUFxQjtZQUN2QyxnQkFBZ0IsRUFBRyxDQUFDO1NBQ3ZCLENBQUE7UUFDRCxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFHaEMsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUFxQyx1QkFBVSxHQXFCOUM7QUFyQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgQXBwbG96aWNDaGF0IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFwcGxvemljLWNoYXQnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgYXBwbG96aWNDaGF0OiBBcHBsb3ppY0NoYXQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYXBwbG96aWNDaGF0ID0gbmV3IEFwcGxvemljQ2hhdCgpO1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuYXBwbG96aWNDaGF0Lm1lc3NhZ2U7XG5cbiAgICB2YXIgYWxVc2VyID0ge1xuICAgICAgJ3VzZXJJZCcgOiAnZGVidWc0JywgICAvL1JlcGxhY2UgaXQgd2l0aCB0aGUgdXNlcklkIG9mIHRoZSBsb2dnZWQgaW4gdXNlclxuICAgICAgJ3Bhc3N3b3JkJyA6ICdkZWJ1ZzQnLCAgLy9QdXQgcGFzc3dvcmQgaGVyZVxuICAgICAgJ2F1dGhlbnRpY2F0aW9uVHlwZUlkJyA6IDEsXG4gICAgICAnYXBwbGljYXRpb25JZCcgOiAnYXBwbG96aWMtc2FtcGxlLWFwcCcsICAvL3JlcGxhY2UgXCJhcHBsb3ppYy1zYW1wbGUtYXBwXCIgd2l0aCBBcHBsaWNhdGlvbiBLZXkgZnJvbSBBcHBsb3ppYyBEYXNoYm9hcmRcbiAgICAgICdkZXZpY2VBcG5zVHlwZScgOiAwICAgIC8vU2V0IDAgZm9yIERldmVsb3BtZW50IGFuZCAxIGZvciBEaXN0cmlidXRpb24gKFJlbGVhc2UpXG4gIH1cbiAgdGhpcy5hcHBsb3ppY0NoYXQubG9naW4oYWxVc2VyKTtcbiAgLy90aGlzLmFwcGxvemljQ2hhdC5sYXVuY2hDaGF0V2l0aFVzZXJJZChcImRlYnVnNFwiKTtcblxuICB9XG59XG4iXX0=