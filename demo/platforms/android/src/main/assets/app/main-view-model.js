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
            that.applozicChat.showAllRegisteredUsers(false);
            that.applozicChat.launchChat();
        }, function (error) {
            console.log("onLoginFailure: " + error);
        });
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELHlFQUEwRDtBQUUxRDtJQUFxQyxtQ0FBVTtJQUs3QztRQUFBLFlBQ0UsaUJBQU8sU0E2QlI7UUEzQkMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHlDQUFZLEVBQUUsQ0FBQztRQUN2QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBRXpDLElBQUksTUFBTSxHQUFHO1lBQ1gsUUFBUSxFQUFHLFFBQVE7WUFDbkIsVUFBVSxFQUFHLFFBQVE7WUFDckIsc0JBQXNCLEVBQUcsQ0FBQztZQUMxQixlQUFlLEVBQUcscUJBQXFCO1lBQ3ZDLGdCQUFnQixFQUFHLENBQUM7U0FDckIsQ0FBQTtRQUVELElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQztRQVFoQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBUyxRQUFRO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWpDLENBQUMsRUFBRSxVQUFTLEtBQUs7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDOztJQUNQLENBQUM7SUFFSCxzQkFBQztBQUFELENBQUMsQUFyQ0QsQ0FBcUMsdUJBQVUsR0FxQzlDO0FBckNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IEFwcGxvemljQ2hhdCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hcHBsb3ppYy1jaGF0JztcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICBwcml2YXRlIGFwcGxvemljQ2hhdDogQXBwbG96aWNDaGF0O1xuICBwdWJsaWMgb25Mb2dpblN1Y2Nlc3M6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5hcHBsb3ppY0NoYXQgPSBuZXcgQXBwbG96aWNDaGF0KCk7XG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5hcHBsb3ppY0NoYXQubWVzc2FnZTtcblxuICAgIHZhciBhbFVzZXIgPSB7XG4gICAgICAndXNlcklkJyA6ICdkZWJ1ZzQnLCAgIC8vUmVwbGFjZSBpdCB3aXRoIHRoZSB1c2VySWQgb2YgdGhlIGxvZ2dlZCBpbiB1c2VyXG4gICAgICAncGFzc3dvcmQnIDogJ2RlYnVnNCcsICAvL1B1dCBwYXNzd29yZCBoZXJlXG4gICAgICAnYXV0aGVudGljYXRpb25UeXBlSWQnIDogMSxcbiAgICAgICdhcHBsaWNhdGlvbklkJyA6ICdhcHBsb3ppYy1zYW1wbGUtYXBwJywgIC8vcmVwbGFjZSBcImFwcGxvemljLXNhbXBsZS1hcHBcIiB3aXRoIEFwcGxpY2F0aW9uIEtleSBmcm9tIEFwcGxvemljIERhc2hib2FyZFxuICAgICAgJ2RldmljZUFwbnNUeXBlJyA6IDAgICAgLy9TZXQgMCBmb3IgRGV2ZWxvcG1lbnQgYW5kIDEgZm9yIERpc3RyaWJ1dGlvbiAoUmVsZWFzZSlcbiAgICB9XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAvKnRoaXMuYXBwbG96aWNDaGF0LmxvZ291dChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJsb2dvdXQgc3VjY2VzczogXCIgKyByZXNwb25zZSk7XG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibG9nb3V0IGVycm9yOiBcIisgZXJyb3IpO1xuICAgIH0pOyovXG4gICAgXG4gICAgdGhpcy5hcHBsb3ppY0NoYXQubG9naW4oYWxVc2VyLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uTG9naW5TdWNjZXNzOiBcIiArIHJlc3BvbnNlKTtcbiAgICAgICAgdGhhdC5hcHBsb3ppY0NoYXQuc2hvd0FsbFJlZ2lzdGVyZWRVc2VycyhmYWxzZSk7XG4gICAgICAgIHRoYXQuYXBwbG96aWNDaGF0LmxhdW5jaENoYXQoKTtcbiAgICAgICAgLy90aGF0LmFwcGxvemljQ2hhdC5sYXVuY2hDaGF0V2l0aEdyb3VwSWQoMzkzMDQ0NSk7XG4gICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uTG9naW5GYWlsdXJlOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==