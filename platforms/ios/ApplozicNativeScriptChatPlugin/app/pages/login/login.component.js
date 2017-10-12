"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var restApi_service_1 = require("../../restApi.service");
var application_settings_1 = require("application-settings");
var Login = (function () {
    function Login(_router, restApi) {
        this._router = _router;
        this.restApi = restApi;
        this.account = {
            "appId": '',
            "userId": '',
            "pwd": '',
            "deviceKey": ''
        };
    }
    Login.prototype.ngOnInit = function () {
        this.isTurnedOn = application_settings_1.getBoolean("isTurnedOn");
        if (this.isTurnedOn) {
            this.account = JSON.parse(application_settings_1.getString("account"));
            this._router.navigate(["/conversation", this.account.deviceKey]);
        }
    };
    Login.prototype.submit = function () {
        var _this = this;
        console.log("AppId:" + this.appId + "userId:" + this.userId + "pwd:" + this.pwd);
        var data = {
            appId: this.appId,
            userId: this.userId,
            pwd: this.pwd
        };
        this.restApi.login(data).subscribe(function (res) {
            console.log("res");
            // res = res.json();
            _this.account.deviceKey = res.deviceKey;
            _this.account.appId = _this.appId;
            _this.account.userId = _this.userId;
            _this.account.pwd = _this.pwd;
            // >> app-settings-bool-code
            application_settings_1.setBoolean("isTurnedOn", true);
            console.log(res.token);
            // >> app-settings-string-code
            application_settings_1.setString("account", JSON.stringify(_this.account));
            application_settings_1.setString("userKey", res.token);
            _this._router.navigate(["/conversation", res.deviceKey]);
            console.dir(res);
        }, function (err) {
            console.log("err");
            console.log(err);
        });
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/login/login.html",
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, restApi_service_1.RestApiService])
], Login);
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDBDQUF5QztBQUN6Qyx5REFBdUQ7QUFFdkQsNkRBVThCO0FBUTlCLElBQWEsS0FBSztJQXVCZixlQUFvQixPQUFlLEVBQVMsT0FBdUI7UUFBL0MsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBZjVELFlBQU8sR0FBRztZQUNiLE9BQU8sRUFBRyxFQUFFO1lBQ1osUUFBUSxFQUFFLEVBQUU7WUFDWixLQUFLLEVBQUUsRUFBRTtZQUNULFdBQVcsRUFBRSxFQUFFO1NBQ2xCLENBQUE7SUFVcUUsQ0FBQztJQVJ2RSx3QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxpQ0FBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBR0Qsc0JBQU0sR0FBTjtRQUFBLGlCQStCQTtRQTlCQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFHbkUsSUFBSSxJQUFJLEdBQUc7WUFDQyxLQUFLLEVBQUcsSUFBSSxDQUFDLEtBQUs7WUFDbEIsTUFBTSxFQUFHLElBQUksQ0FBQyxNQUFNO1lBQ3BCLEdBQUcsRUFBRyxJQUFJLENBQUMsR0FBRztTQUNqQixDQUFBO1FBRVQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFFLFVBQUEsR0FBRztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLG9CQUFvQjtZQUNwQixLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDaEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQztZQUNsQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDO1lBQzVCLDRCQUE0QjtZQUM1QixpQ0FBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV2Qiw4QkFBOEI7WUFDOUIsZ0NBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuRCxnQ0FBUyxDQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFFLENBQUE7WUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQ0QsVUFBQSxHQUFHO1lBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBeERELElBd0RDO0FBeERZLEtBQUs7SUFOakIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSx3QkFBd0I7UUFDckMsU0FBUyxFQUFFLENBQUMsOEJBQThCLEVBQUUsdUJBQXVCLENBQUM7S0FFckUsQ0FBQztxQ0F3QjhCLGVBQU0sRUFBa0IsZ0NBQWM7R0F2QnpELEtBQUssQ0F3RGpCO0FBeERZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJlc3RBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcmVzdEFwaS5zZXJ2aWNlJztcblxuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbG9naW4vbG9naW4uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9sb2dpbi9sb2dpbi5jc3NcIl1cbiAgXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luIHtcbiAgIGFwcElkOiBzdHJpbmc7XG4gICB1c2VySWQ6IHN0cmluZztcbiAgIHB3ZDogc3RyaW5nO1xuXG4gICBwdWJsaWMgaXNUdXJuZWRPbjogYm9vbGVhbjtcbiAgIHB1YmxpYyB1c2VyS2V5OiBzdHJpbmc7XG5cbiAgIHB1YmxpYyBhY2NvdW50ID0ge1xuICAgICAgIFwiYXBwSWRcIiA6ICcnLFxuICAgICAgIFwidXNlcklkXCI6ICcnLFxuICAgICAgIFwicHdkXCI6ICcnLFxuICAgICAgIFwiZGV2aWNlS2V5XCI6ICcnXG4gICB9XG4gICBcbiAgIG5nT25Jbml0KCl7XG4gICAgICAgdGhpcy5pc1R1cm5lZE9uID0gZ2V0Qm9vbGVhbihcImlzVHVybmVkT25cIik7XG4gICAgICAgaWYodGhpcy5pc1R1cm5lZE9uKXtcbiAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJhY2NvdW50XCIpKTtcbiAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2NvbnZlcnNhdGlvblwiLHRoaXMuYWNjb3VudC5kZXZpY2VLZXldKVxuICAgICAgIH1cbiAgIH1cblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyByZXN0QXBpOiBSZXN0QXBpU2VydmljZSkge31cbiAgIHN1Ym1pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkFwcElkOlwiK3RoaXMuYXBwSWQrXCJ1c2VySWQ6XCIrdGhpcy51c2VySWQrXCJwd2Q6XCIrdGhpcy5wd2QpO1xuICAgIFxuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBhcHBJZCA6IHRoaXMuYXBwSWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCA6IHRoaXMudXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBwd2QgOiB0aGlzLnB3ZCAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzdEFwaS5sb2dpbihkYXRhKS5zdWJzY3JpYmUoIHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc1wiKTtcbiAgICAgICAgICAgIC8vIHJlcyA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQuZGV2aWNlS2V5ID0gcmVzLmRldmljZUtleTtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudC5hcHBJZCA9IHRoaXMuYXBwSWQ7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQudXNlcklkID0gdGhpcy51c2VySWQ7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQucHdkID0gdGhpcy5wd2Q7XG4gICAgICAgICAgICAvLyA+PiBhcHAtc2V0dGluZ3MtYm9vbC1jb2RlXG4gICAgICAgICAgICBzZXRCb29sZWFuKFwiaXNUdXJuZWRPblwiLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50b2tlbik7XG5cbiAgICAgICAgICAgIC8vID4+IGFwcC1zZXR0aW5ncy1zdHJpbmctY29kZVxuICAgICAgICAgICAgc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFjY291bnQpKTtcbiAgICAgICAgICAgIHNldFN0cmluZyhcInVzZXJLZXlcIixyZXMudG9rZW4pO1xuICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvY29udmVyc2F0aW9uXCIscmVzLmRldmljZUtleV0gKVxuICAgICAgICAgICAgY29uc29sZS5kaXIocmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSlcbiAgfVxufVxuIl19