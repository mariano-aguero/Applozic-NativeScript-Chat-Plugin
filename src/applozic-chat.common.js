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
    Common.prototype.login = function (alUser) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbG96aWMtY2hhdC5jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBsb3ppYy1jaGF0LmNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQUM5RCxrREFBb0Q7QUFDcEQscURBQXVEO0FBRXZEO0lBQTRCLDBCQUFVO0lBR3BDO1FBQUEsWUFDRSxpQkFBTyxTQUVSO1FBREMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O0lBQ3JDLENBQUM7SUFFTSxzQkFBSyxHQUFaLFVBQWEsTUFBVztJQUV4QixDQUFDO0lBRU0sMkJBQVUsR0FBakI7SUFFQSxDQUFDO0lBRU0scUNBQW9CLEdBQTNCLFVBQTRCLE1BQVc7SUFFdkMsQ0FBQztJQUVNLHNDQUFxQixHQUE1QixVQUE2QixPQUFlO0lBRTVDLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQXZCRCxDQUE0Qix1QkFBVSxHQXVCckM7QUF2Qlksd0JBQU07QUF5Qm5CO0lBQUE7SUFVQSxDQUFDO0lBVGUsaUJBQVcsR0FBekI7UUFDRSxJQUFJLEdBQUcsR0FBRyxnQ0FBNkIsR0FBRyxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUcsS0FBSyxPQUFHLENBQUM7UUFFMUUsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBSSxHQUFHLHNDQUFtQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUNyRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCAqIGFzIGFwcCBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzJztcblxuZXhwb3J0IGNsYXNzIENvbW1vbiBleHRlbmRzIE9ic2VydmFibGUge1xuICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tZXNzYWdlID0gVXRpbHMuU1VDQ0VTU19NU0coKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2dpbihhbFVzZXI6IGFueSkge1xuICAgIFxuICB9XG5cbiAgcHVibGljIGxhdW5jaENoYXQoKSB7XG5cbiAgfVxuXG4gIHB1YmxpYyBsYXVuY2hDaGF0V2l0aFVzZXJJZCh1c2VySWQ6IGFueSkge1xuXG4gIH1cblxuICBwdWJsaWMgbGF1bmNoQ2hhdFdpdGhHcm91cElkKGdyb3VwSWQ6IG51bWJlcikge1xuICAgIFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gIHB1YmxpYyBzdGF0aWMgU1VDQ0VTU19NU0coKTogc3RyaW5nIHtcbiAgICBsZXQgbXNnID0gYFlvdXIgcGx1Z2luIGlzIHdvcmtpbmcgb24gJHthcHAuYW5kcm9pZCA/ICdBbmRyb2lkJyA6ICdpT1MnfS5gO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkaWFsb2dzLmFsZXJ0KGAke21zZ30gRm9yIHJlYWwuIEl0J3MgcmVhbGx5IHdvcmtpbmcgOilgKS50aGVuKCgpID0+IGNvbnNvbGUubG9nKGBEaWFsb2cgY2xvc2VkLmApKTtcbiAgICB9LCAyMDAwKTtcblxuICAgIHJldHVybiBtc2c7XG4gIH1cbn1cbiJdfQ==