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
            console.log(error);
        });
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELHlFQUEwRDtBQUUxRDtJQUFxQyxtQ0FBVTtJQUs3QztRQUFBLFlBQ0UsaUJBQU8sU0EyQlI7UUF6QkMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHlDQUFZLEVBQUUsQ0FBQztRQUN2QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBRXpDLElBQUksTUFBTSxHQUFHO1lBQ1gsUUFBUSxFQUFHLFFBQVE7WUFDbkIsVUFBVSxFQUFHLFFBQVE7WUFDckIsc0JBQXNCLEVBQUcsQ0FBQztZQUMxQixlQUFlLEVBQUcscUJBQXFCO1lBQ3ZDLGdCQUFnQixFQUFHLENBQUM7U0FDckIsQ0FBQTtRQUVELElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQztRQUVoQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBUyxRQUFRO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUUsVUFBUyxLQUFLO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQzs7SUFPUCxDQUFDO0lBRUgsc0JBQUM7QUFBRCxDQUFDLEFBbkNELENBQXFDLHVCQUFVLEdBbUM5QztBQW5DWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBcHBsb3ppY0NoYXQgfSBmcm9tICduYXRpdmVzY3JpcHQtYXBwbG96aWMtY2hhdCc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHJpdmF0ZSBhcHBsb3ppY0NoYXQ6IEFwcGxvemljQ2hhdDtcbiAgcHVibGljIG9uTG9naW5TdWNjZXNzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYXBwbG96aWNDaGF0ID0gbmV3IEFwcGxvemljQ2hhdCgpO1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuYXBwbG96aWNDaGF0Lm1lc3NhZ2U7XG5cbiAgICB2YXIgYWxVc2VyID0ge1xuICAgICAgJ3VzZXJJZCcgOiAnZGVidWc0JywgICAvL1JlcGxhY2UgaXQgd2l0aCB0aGUgdXNlcklkIG9mIHRoZSBsb2dnZWQgaW4gdXNlclxuICAgICAgJ3Bhc3N3b3JkJyA6ICdkZWJ1ZzQnLCAgLy9QdXQgcGFzc3dvcmQgaGVyZVxuICAgICAgJ2F1dGhlbnRpY2F0aW9uVHlwZUlkJyA6IDEsXG4gICAgICAnYXBwbGljYXRpb25JZCcgOiAnYXBwbG96aWMtc2FtcGxlLWFwcCcsICAvL3JlcGxhY2UgXCJhcHBsb3ppYy1zYW1wbGUtYXBwXCIgd2l0aCBBcHBsaWNhdGlvbiBLZXkgZnJvbSBBcHBsb3ppYyBEYXNoYm9hcmRcbiAgICAgICdkZXZpY2VBcG5zVHlwZScgOiAwICAgIC8vU2V0IDAgZm9yIERldmVsb3BtZW50IGFuZCAxIGZvciBEaXN0cmlidXRpb24gKFJlbGVhc2UpXG4gICAgfVxuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgIHRoaXMuYXBwbG96aWNDaGF0LmxvZ2luKGFsVXNlciwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIjIyNvbkxvZ2luU3VjY2Vzcy5yZXNwb25zZTogXCIgKyByZXNwb25zZSk7XG4gICAgICAgIHRoYXQuYXBwbG96aWNDaGF0LmxhdW5jaENoYXQoKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgLypcbiAgICB0aGlzLm9uTG9naW5TdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIiMjI29uTG9naW5TdWNjZXNzLnJlc3BvbnNlOiBcIik7XG4gICAgICB0aGF0LmFwcGxvemljQ2hhdC5sYXVuY2hDaGF0KCk7XG4gICAgfSAqL1xuICB9XG5cbn1cbiJdfQ==