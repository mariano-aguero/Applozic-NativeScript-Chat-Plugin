"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var restApi_service_1 = require("../../restApi.service");
var commonLib_1 = require("../../commonLib");
var ModalComponent = (function () {
    function ModalComponent(params, restApi) {
        this.params = params;
        this.restApi = restApi;
        this.users = [];
        this.dispName = [];
        this.profilePic = [];
        this.lastSeenAtTime = [];
        this.groupDetails = [];
    }
    ModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restApi.startNew().subscribe(function (res) {
            console.log("res");
            _this.users = res.users;
            commonLib_1.convoDetails(_this.users, _this.groupDetails);
            _this.dispName = commonLib_1.dispName;
            _this.profilePic = commonLib_1.profilePic;
            _this.lastSeenAtTime = commonLib_1.lastSeenAtTime;
        }, function (err) {
            console.log("err");
            console.log(err);
        });
    };
    ModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    return ModalComponent;
}());
ModalComponent = __decorate([
    core_1.Component({
        selector: "my-modal",
        templateUrl: "pages/modal/modal.html",
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, restApi_service_1.RestApiService])
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLG1FQUE0RTtBQUU1RSx5REFBdUQ7QUFDdkQsNkNBQTRHO0FBTTVHLElBQWEsY0FBYztJQVF2Qix3QkFBMkIsTUFBeUIsRUFBUyxPQUF1QjtRQUF6RCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTnBGLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztJQUlsQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUUsVUFBQSxHQUFHO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLHdCQUFZLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxvQkFBUSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxVQUFVLEdBQUksc0JBQVUsQ0FBQztZQUM5QixLQUFJLENBQUMsY0FBYyxHQUFHLDBCQUFjLENBQUM7UUFDekMsQ0FBQyxFQUVELFVBQUEsR0FBRztZQUNLLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSw4QkFBSyxHQUFaLFVBQWEsR0FBRztRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFoQ0QsSUFnQ0M7QUFoQ1ksY0FBYztJQUoxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsV0FBVyxFQUFFLHdCQUF3QjtLQUN4QyxDQUFDO3FDQVNxQywyQkFBaUIsRUFBa0IsZ0NBQWM7R0FSM0UsY0FBYyxDQWdDMUI7QUFoQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbmltcG9ydCB7IFJlc3RBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcmVzdEFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IGRpc3BOYW1lLCBwcm9maWxlUGljLCBncm91cERldGFpbHMsIGxhc3RTZWVuQXRUaW1lLCBjb252b0RldGFpbHMsIGdldFRpbWUgfSBmcm9tICcuLi8uLi9jb21tb25MaWInO1xuIFxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibXktbW9kYWxcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9tb2RhbC9tb2RhbC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IHtcbiBcbiAgICB1c2VycyA9IFtdO1xuICAgIGRpc3BOYW1lID0gW107XG4gICAgcHJvZmlsZVBpYyA9IFtdO1xuICAgIGxhc3RTZWVuQXRUaW1lID0gW107XG4gICAgZ3JvdXBEZXRhaWxzID0gW107XG4gXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHVibGljIHJlc3RBcGk6IFJlc3RBcGlTZXJ2aWNlKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG5nT25Jbml0KCl7XG4gICAgICAgIHRoaXMucmVzdEFwaS5zdGFydE5ldygpLnN1YnNjcmliZSggcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzXCIpO1xuICAgICAgICAgICAgdGhpcy51c2VycyA9IHJlcy51c2VycztcbiAgICAgICAgICAgIGNvbnZvRGV0YWlscyh0aGlzLnVzZXJzLCB0aGlzLmdyb3VwRGV0YWlscyk7XG4gICAgICAgICAgICB0aGlzLmRpc3BOYW1lID0gZGlzcE5hbWU7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVQaWMgPSAgcHJvZmlsZVBpYztcbiAgICAgICAgICAgIHRoaXMubGFzdFNlZW5BdFRpbWUgPSBsYXN0U2VlbkF0VGltZTtcbiAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG4gICAgfVxuIFxuICAgIHB1YmxpYyBjbG9zZShyZXMpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXMpO1xuICAgIH1cbiBcbn0iXX0=