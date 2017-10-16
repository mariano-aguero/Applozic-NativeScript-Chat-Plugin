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
            console.log("onLoginSuccess: " + response);
            that.applozicChat.launchChatWithGroupId(3930445);
        }, function (error) {
            console.log("onLoginFailure: " + error);
        });
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELHlFQUEwRDtBQUUxRDtJQUFxQyxtQ0FBVTtJQUs3QztRQUFBLFlBQ0UsaUJBQU8sU0E0QlI7UUExQkMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHlDQUFZLEVBQUUsQ0FBQztRQUN2QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBRXpDLElBQUksTUFBTSxHQUFHO1lBQ1gsUUFBUSxFQUFHLFFBQVE7WUFDbkIsVUFBVSxFQUFHLFFBQVE7WUFDckIsc0JBQXNCLEVBQUcsQ0FBQztZQUMxQixlQUFlLEVBQUcscUJBQXFCO1lBQ3ZDLGdCQUFnQixFQUFHLENBQUM7U0FDckIsQ0FBQTtRQUVELElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQztRQVFoQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBUyxRQUFRO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxDQUFDLEVBQUUsVUFBUyxLQUFLO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQzs7SUFDUCxDQUFDO0lBRUgsc0JBQUM7QUFBRCxDQUFDLEFBcENELENBQXFDLHVCQUFVLEdBb0M5QztBQXBDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBcHBsb3ppY0NoYXQgfSBmcm9tICduYXRpdmVzY3JpcHQtYXBwbG96aWMtY2hhdCc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHJpdmF0ZSBhcHBsb3ppY0NoYXQ6IEFwcGxvemljQ2hhdDtcbiAgcHVibGljIG9uTG9naW5TdWNjZXNzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYXBwbG96aWNDaGF0ID0gbmV3IEFwcGxvemljQ2hhdCgpO1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuYXBwbG96aWNDaGF0Lm1lc3NhZ2U7XG5cbiAgICB2YXIgYWxVc2VyID0ge1xuICAgICAgJ3VzZXJJZCcgOiAnZGVidWc0JywgICAvL1JlcGxhY2UgaXQgd2l0aCB0aGUgdXNlcklkIG9mIHRoZSBsb2dnZWQgaW4gdXNlclxuICAgICAgJ3Bhc3N3b3JkJyA6ICdkZWJ1ZzQnLCAgLy9QdXQgcGFzc3dvcmQgaGVyZVxuICAgICAgJ2F1dGhlbnRpY2F0aW9uVHlwZUlkJyA6IDEsXG4gICAgICAnYXBwbGljYXRpb25JZCcgOiAnYXBwbG96aWMtc2FtcGxlLWFwcCcsICAvL3JlcGxhY2UgXCJhcHBsb3ppYy1zYW1wbGUtYXBwXCIgd2l0aCBBcHBsaWNhdGlvbiBLZXkgZnJvbSBBcHBsb3ppYyBEYXNoYm9hcmRcbiAgICAgICdkZXZpY2VBcG5zVHlwZScgOiAwICAgIC8vU2V0IDAgZm9yIERldmVsb3BtZW50IGFuZCAxIGZvciBEaXN0cmlidXRpb24gKFJlbGVhc2UpXG4gICAgfVxuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgLyp0aGlzLmFwcGxvemljQ2hhdC5sb2dvdXQoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibG9nb3V0IHN1Y2Nlc3M6IFwiICsgcmVzcG9uc2UpO1xuICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImxvZ291dCBlcnJvcjogXCIrIGVycm9yKTtcbiAgICB9KTsqL1xuICAgIFxuICAgIHRoaXMuYXBwbG96aWNDaGF0LmxvZ2luKGFsVXNlciwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkxvZ2luU3VjY2VzczogXCIgKyByZXNwb25zZSk7XG4gICAgICAgIC8vdGhhdC5hcHBsb3ppY0NoYXQubGF1bmNoQ2hhdCgpO1xuICAgICAgICB0aGF0LmFwcGxvemljQ2hhdC5sYXVuY2hDaGF0V2l0aEdyb3VwSWQoMzkzMDQ0NSk7XG4gICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uTG9naW5GYWlsdXJlOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==