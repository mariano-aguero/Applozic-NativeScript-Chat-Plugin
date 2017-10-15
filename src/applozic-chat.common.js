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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbG96aWMtY2hhdC5jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBsb3ppYy1jaGF0LmNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQUM5RCxrREFBb0Q7QUFDcEQscURBQXVEO0FBRXZEO0lBQTRCLDBCQUFVO0lBR3BDO1FBQUEsWUFDRSxpQkFBTyxTQUVSO1FBREMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O0lBQ3JDLENBQUM7SUFFTSxzQkFBSyxHQUFaLFVBQWEsTUFBVyxFQUFFLGVBQW9CLEVBQUUsYUFBa0I7SUFFbEUsQ0FBQztJQUVNLDJCQUFVLEdBQWpCO0lBRUEsQ0FBQztJQUVNLHFDQUFvQixHQUEzQixVQUE0QixNQUFXO0lBRXZDLENBQUM7SUFFTSxzQ0FBcUIsR0FBNUIsVUFBNkIsT0FBZTtJQUU1QyxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUF2QkQsQ0FBNEIsdUJBQVUsR0F1QnJDO0FBdkJZLHdCQUFNO0FBeUJuQjtJQUFBO0lBVUEsQ0FBQztJQVRlLGlCQUFXLEdBQXpCO1FBQ0UsSUFBSSxHQUFHLEdBQUcsZ0NBQTZCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLEtBQUssT0FBRyxDQUFDO1FBRTFFLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUksR0FBRyxzQ0FBbUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7UUFDckcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5cbmV4cG9ydCBjbGFzcyBDb21tb24gZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWVzc2FnZSA9IFV0aWxzLlNVQ0NFU1NfTVNHKCk7XG4gIH1cblxuICBwdWJsaWMgbG9naW4oYWxVc2VyOiBhbnksIHN1Y2Nlc3NDYWxsYmFjazogYW55LCBlcnJvckNhbGxiYWNrOiBhbnkpIHtcbiAgICBcbiAgfVxuXG4gIHB1YmxpYyBsYXVuY2hDaGF0KCkge1xuXG4gIH1cblxuICBwdWJsaWMgbGF1bmNoQ2hhdFdpdGhVc2VySWQodXNlcklkOiBhbnkpIHtcblxuICB9XG5cbiAgcHVibGljIGxhdW5jaENoYXRXaXRoR3JvdXBJZChncm91cElkOiBudW1iZXIpIHtcbiAgICBcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICBwdWJsaWMgc3RhdGljIFNVQ0NFU1NfTVNHKCk6IHN0cmluZyB7XG4gICAgbGV0IG1zZyA9IGBZb3VyIHBsdWdpbiBpcyB3b3JraW5nIG9uICR7YXBwLmFuZHJvaWQgPyAnQW5kcm9pZCcgOiAnaU9TJ30uYDtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGlhbG9ncy5hbGVydChgJHttc2d9IEZvciByZWFsLiBJdCdzIHJlYWxseSB3b3JraW5nIDopYCkudGhlbigoKSA9PiBjb25zb2xlLmxvZyhgRGlhbG9nIGNsb3NlZC5gKSk7XG4gICAgfSwgMjAwMCk7XG5cbiAgICByZXR1cm4gbXNnO1xuICB9XG59XG4iXX0=