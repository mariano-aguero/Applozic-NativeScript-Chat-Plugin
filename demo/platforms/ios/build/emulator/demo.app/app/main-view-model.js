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
        _this.applozicChat.launchChatWithUserId("debug4");
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELHlFQUEwRDtBQUUxRDtJQUFxQyxtQ0FBVTtJQUk3QztRQUFBLFlBQ0UsaUJBQU8sU0FjUjtRQVpDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5Q0FBWSxFQUFFLENBQUM7UUFDdkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUV6QyxJQUFJLE1BQU0sR0FBRztZQUNULFFBQVEsRUFBRyxRQUFRO1lBQ25CLFVBQVUsRUFBRyxRQUFRO1lBQ3JCLHNCQUFzQixFQUFHLENBQUM7WUFDMUIsZUFBZSxFQUFHLHFCQUFxQjtZQUN2QyxnQkFBZ0IsRUFBRyxDQUFDO1NBQ3ZCLENBQUE7UUFFRCxLQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUNuRCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBcEJELENBQXFDLHVCQUFVLEdBb0I5QztBQXBCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBcHBsb3ppY0NoYXQgfSBmcm9tICduYXRpdmVzY3JpcHQtYXBwbG96aWMtY2hhdCc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHJpdmF0ZSBhcHBsb3ppY0NoYXQ6IEFwcGxvemljQ2hhdDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5hcHBsb3ppY0NoYXQgPSBuZXcgQXBwbG96aWNDaGF0KCk7XG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5hcHBsb3ppY0NoYXQubWVzc2FnZTtcblxuICAgIHZhciBhbFVzZXIgPSB7XG4gICAgICAgICd1c2VySWQnIDogJ2RlYnVnNCcsICAgLy9SZXBsYWNlIGl0IHdpdGggdGhlIHVzZXJJZCBvZiB0aGUgbG9nZ2VkIGluIHVzZXJcbiAgICAgICAgJ3Bhc3N3b3JkJyA6ICdkZWJ1ZzQnLCAgLy9QdXQgcGFzc3dvcmQgaGVyZVxuICAgICAgICAnYXV0aGVudGljYXRpb25UeXBlSWQnIDogMSxcbiAgICAgICAgJ2FwcGxpY2F0aW9uSWQnIDogJ2FwcGxvemljLXNhbXBsZS1hcHAnLCAgLy9yZXBsYWNlIFwiYXBwbG96aWMtc2FtcGxlLWFwcFwiIHdpdGggQXBwbGljYXRpb24gS2V5IGZyb20gQXBwbG96aWMgRGFzaGJvYXJkXG4gICAgICAgICdkZXZpY2VBcG5zVHlwZScgOiAwICAgIC8vU2V0IDAgZm9yIERldmVsb3BtZW50IGFuZCAxIGZvciBEaXN0cmlidXRpb24gKFJlbGVhc2UpXG4gICAgfVxuICAgIC8vdGhpcy5hcHBsb3ppY0NoYXQubG9naW4oYWxVc2VyKTtcbiAgICB0aGlzLmFwcGxvemljQ2hhdC5sYXVuY2hDaGF0V2l0aFVzZXJJZChcImRlYnVnNFwiKTtcbiAgfVxufVxuIl19