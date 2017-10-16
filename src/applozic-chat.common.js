"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var app = require("tns-core-modules/application");
var dialogs = require("tns-core-modules/ui/dialogs");
var Common = (function (_super) {
    __extends(Common, _super);
    function Common() {
        var _this = _super.call(this) || this;
        _this.message = Utils.SUCCESS_MSG();
        return _this;
    }
    Common.prototype.login = function (alUser, successCallback, errorCallback) {
    };
    Common.prototype.launchChat = function () {
    };
    Common.prototype.launchChatWithUserId = function (userId) {
    };
    Common.prototype.launchChatWithGroupId = function (groupId) {
    };
    Common.prototype.logout = function (successCallback, errorCallback) {
    };
    return Common;
}(observable_1.Observable));
exports.Common = Common;
var Utils = (function () {
    function Utils() {
    }
    Utils.SUCCESS_MSG = function () {
        var msg = "Your plugin is working on " + (app.android ? 'Android' : 'iOS') + ".";
        setTimeout(function () {
            dialogs.alert(msg + " For real. It's really working :)").then(function () { return console.log("Dialog closed."); });
        }, 2000);
        return msg;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbG96aWMtY2hhdC5jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBsb3ppYy1jaGF0LmNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQUM5RCxrREFBb0Q7QUFDcEQscURBQXVEO0FBRXZEO0lBQTRCLDBCQUFVO0lBR3BDO1FBQUEsWUFDRSxpQkFBTyxTQUVSO1FBREMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O0lBQ3JDLENBQUM7SUFFTSxzQkFBSyxHQUFaLFVBQWEsTUFBVyxFQUFFLGVBQW9CLEVBQUUsYUFBa0I7SUFFbEUsQ0FBQztJQUVNLDJCQUFVLEdBQWpCO0lBRUEsQ0FBQztJQUVNLHFDQUFvQixHQUEzQixVQUE0QixNQUFXO0lBRXZDLENBQUM7SUFFTSxzQ0FBcUIsR0FBNUIsVUFBNkIsT0FBZTtJQUU1QyxDQUFDO0lBR00sdUJBQU0sR0FBYixVQUFjLGVBQW9CLEVBQUUsYUFBa0I7SUFFdEQsQ0FBQztJQUVILGFBQUM7QUFBRCxDQUFDLEFBN0JELENBQTRCLHVCQUFVLEdBNkJyQztBQTdCWSx3QkFBTTtBQStCbkI7SUFBQTtJQVVBLENBQUM7SUFUZSxpQkFBVyxHQUF6QjtRQUNFLElBQUksR0FBRyxHQUFHLGdDQUE2QixHQUFHLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxLQUFLLE9BQUcsQ0FBQztRQUUxRSxVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsS0FBSyxDQUFJLEdBQUcsc0NBQW1DLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1FBQ3JHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVULE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0gsWUFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUnO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xuXG5leHBvcnQgY2xhc3MgQ29tbW9uIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBVdGlscy5TVUNDRVNTX01TRygpO1xuICB9XG5cbiAgcHVibGljIGxvZ2luKGFsVXNlcjogYW55LCBzdWNjZXNzQ2FsbGJhY2s6IGFueSwgZXJyb3JDYWxsYmFjazogYW55KSB7XG4gICAgXG4gIH1cblxuICBwdWJsaWMgbGF1bmNoQ2hhdCgpIHtcblxuICB9XG5cbiAgcHVibGljIGxhdW5jaENoYXRXaXRoVXNlcklkKHVzZXJJZDogYW55KSB7XG5cbiAgfVxuXG4gIHB1YmxpYyBsYXVuY2hDaGF0V2l0aEdyb3VwSWQoZ3JvdXBJZDogbnVtYmVyKSB7XG4gICAgXG4gIH1cblxuXG4gIHB1YmxpYyBsb2dvdXQoc3VjY2Vzc0NhbGxiYWNrOiBhbnksIGVycm9yQ2FsbGJhY2s6IGFueSkge1xuICAgIFxuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgcHVibGljIHN0YXRpYyBTVUNDRVNTX01TRygpOiBzdHJpbmcge1xuICAgIGxldCBtc2cgPSBgWW91ciBwbHVnaW4gaXMgd29ya2luZyBvbiAke2FwcC5hbmRyb2lkID8gJ0FuZHJvaWQnIDogJ2lPUyd9LmA7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRpYWxvZ3MuYWxlcnQoYCR7bXNnfSBGb3IgcmVhbC4gSXQncyByZWFsbHkgd29ya2luZyA6KWApLnRoZW4oKCkgPT4gY29uc29sZS5sb2coYERpYWxvZyBjbG9zZWQuYCkpO1xuICAgIH0sIDIwMDApO1xuXG4gICAgcmV0dXJuIG1zZztcbiAgfVxufVxuIl19