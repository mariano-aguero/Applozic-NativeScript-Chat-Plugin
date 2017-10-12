"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var router_1 = require("@angular/router");
var restApi_service_1 = require("../../restApi.service");
var modal_component_1 = require("../modal/modal.component");
var commonLib_1 = require("../../commonLib");
var Info = (function () {
    function Info(route, _router, restApi, modal, vcRef) {
        this.route = route;
        this._router = _router;
        this.restApi = restApi;
        this.modal = modal;
        this.vcRef = vcRef;
        this.users = [];
        this.dispName = [];
        this.profilePic = [];
        this.groupDetails = [];
        this.lastSeenAtTime = [];
        this.members = [];
        this.whose = '';
        this.defaultGroupIcon = "~/images/singleUser.jpg";
        this.account = {
            "appId": '',
            "userId": '',
            "pwd": ''
        };
    }
    Info.prototype.ngOnInit = function () {
        this.whose = this.route.snapshot.params['whose'];
        this.dispName = commonLib_1.dispName;
        this.profilePic = commonLib_1.profilePic;
        this.groupDetails = commonLib_1.groupDetails;
        this.lastSeenAtTime = commonLib_1.lastSeenAtTime;
        this.members = this.groupDetails[this.whose].membersId;
    };
    Info.prototype.showModal = function () {
        var _this = this;
        var options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(modal_component_1.ModalComponent, options).then(function (res) {
            console.dir(res);
            // this.account = JSON.parse(getString("account"));
            // let data = {
            //   clientGroupId: this.groupDetails[this.whose].clientGroupId,
            //   adminId: this.account.userId
            // }
            // this.restApi.addMember(data).subscribe( res => {
            // console.log("added");
            // },
            // err => {
            //     console.log("err");
            //     console.log(err);
            // })            
            _this.members.push(res.userId);
        });
    };
    Info.prototype.timeSince = function (timeStamp) {
        if (timeStamp != null) {
            return "Last seen at " + commonLib_1.getTime(timeStamp);
        }
        return "";
    };
    Info.prototype.remove = function (member) {
        var index = this.members.indexOf(member);
        this.members.splice(index, 1);
        //    this.account = JSON.parse(getString("account"));
        //           let data = {
        //             clientGroupId: this.groupDetails[this.whose].clientGroupId,
        //             adminId: this.account.userId
        //           }
        //           this.restApi.removeMember(data).subscribe( res => {
        //           console.log("removed");
        //           },
        //           err => {
        //               console.log("err");
        //               console.log(err);
        //           });
    };
    return Info;
}());
Info = __decorate([
    core_1.Component({
        selector: "info",
        templateUrl: "pages/info/info.html",
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, restApi_service_1.RestApiService, dialogs_1.ModalDialogService, core_1.ViewContainerRef])
], Info);
exports.Info = Info;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0RDtBQUM1RCxtRUFBNkU7QUFFN0UsMENBQXVFO0FBQ3ZFLHlEQUF1RDtBQUN2RCw0REFBMEQ7QUFDMUQsNkNBQTRHO0FBb0I1RyxJQUFhLElBQUk7SUFnQmQsY0FBb0IsS0FBcUIsRUFBVSxPQUFlLEVBQVMsT0FBdUIsRUFBUyxLQUF5QixFQUFVLEtBQXVCO1FBQWpKLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQWZySyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxxQkFBZ0IsR0FBRyx5QkFBeUIsQ0FBQztRQUM3QyxZQUFPLEdBQUc7WUFDUCxPQUFPLEVBQUcsRUFBRTtZQUNaLFFBQVEsRUFBRSxFQUFFO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFBO0lBSUEsQ0FBQztJQUVELHVCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBSSxzQkFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsd0JBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLDBCQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekQsQ0FBQztJQUVELHdCQUFTLEdBQVQ7UUFBQSxpQkF3QkU7UUF2QkcsSUFBSSxPQUFPLEdBQUc7WUFDVixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQy9CLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxnQ0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQixtREFBbUQ7WUFDbkQsZUFBZTtZQUNmLGdFQUFnRTtZQUNoRSxpQ0FBaUM7WUFDakMsSUFBSTtZQUNKLG1EQUFtRDtZQUNuRCx3QkFBd0I7WUFDeEIsS0FBSztZQUVMLFdBQVc7WUFDWCwwQkFBMEI7WUFDMUIsd0JBQXdCO1lBQ3hCLGlCQUFpQjtZQUNqQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUYsd0JBQVMsR0FBVCxVQUFVLFNBQVM7UUFDaEIsRUFBRSxDQUFBLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDcEIsTUFBTSxDQUFDLGVBQWUsR0FBRyxtQkFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVELHFCQUFNLEdBQU4sVUFBTyxNQUFNO1FBQ1gsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2hDLHNEQUFzRDtRQUN0RCx5QkFBeUI7UUFDekIsMEVBQTBFO1FBQzFFLDJDQUEyQztRQUMzQyxjQUFjO1FBQ2QsZ0VBQWdFO1FBQ2hFLG9DQUFvQztRQUNwQyxlQUFlO1FBRWYscUJBQXFCO1FBQ3JCLG9DQUFvQztRQUNwQyxrQ0FBa0M7UUFDbEMsZ0JBQWdCO0lBQ2YsQ0FBQztJQUVKLFdBQUM7QUFBRCxDQUFDLEFBL0VELElBK0VDO0FBL0VZLElBQUk7SUFOaEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFdBQVcsRUFBRSxzQkFBc0I7S0FHcEMsQ0FBQztxQ0FpQjRCLHVCQUFjLEVBQW1CLGVBQU0sRUFBa0IsZ0NBQWMsRUFBZ0IsNEJBQWtCLEVBQWlCLHVCQUFnQjtHQWhCM0osSUFBSSxDQStFaEI7QUEvRVksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zLCBEYXRhIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUmVzdEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9yZXN0QXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBkaXNwTmFtZSwgcHJvZmlsZVBpYywgZ3JvdXBEZXRhaWxzLCBsYXN0U2VlbkF0VGltZSwgY29udm9EZXRhaWxzLCBnZXRUaW1lIH0gZnJvbSAnLi4vLi4vY29tbW9uTGliJztcblxuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJpbmZvXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2luZm8vaW5mby5odG1sXCIsXG4vLyAgIHN0eWxlVXJsczogW1wicGFnZXMvc3RhcnROZXcvc3RhcnROZXctY29tbW9uLmNzc1wiLCBcInBhZ2VzL3N0YXJ0TmV3L3N0YXJ0TmV3LmNzc1wiXVxuICBcbn0pXG5leHBvcnQgY2xhc3MgSW5mbyB7XG4gICB1c2VycyA9IFtdO1xuICAgZGlzcE5hbWUgPSBbXTtcbiAgIHByb2ZpbGVQaWMgPSBbXTtcbiAgIGdyb3VwRGV0YWlscyA9IFtdO1xuICAgbGFzdFNlZW5BdFRpbWUgPSBbXTtcbiAgIG1lbWJlcnMgPSBbXTtcbiAgIHdob3NlID0gJyc7XG4gICBkZWZhdWx0R3JvdXBJY29uID0gXCJ+L2ltYWdlcy9zaW5nbGVVc2VyLmpwZ1wiO1xuICAgYWNjb3VudCA9IHtcbiAgICAgIFwiYXBwSWRcIiA6ICcnLFxuICAgICAgXCJ1c2VySWRcIjogJycsXG4gICAgICBcInB3ZFwiOiAnJ1xuICB9XG5cblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwdWJsaWMgcmVzdEFwaTogUmVzdEFwaVNlcnZpY2UscHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICB9XG4gICBcbiAgIG5nT25Jbml0KCl7XG4gICAgIHRoaXMud2hvc2UgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snd2hvc2UnXTtcbiAgICAgdGhpcy5kaXNwTmFtZSA9IGRpc3BOYW1lO1xuICAgICB0aGlzLnByb2ZpbGVQaWMgPSAgcHJvZmlsZVBpYztcbiAgICAgdGhpcy5ncm91cERldGFpbHMgPSBncm91cERldGFpbHM7XG4gICAgIHRoaXMubGFzdFNlZW5BdFRpbWUgPSBsYXN0U2VlbkF0VGltZTtcbiAgICAgdGhpcy5tZW1iZXJzID0gdGhpcy5ncm91cERldGFpbHNbdGhpcy53aG9zZV0ubWVtYmVyc0lkO1xuICAgfVxuXG4gICBzaG93TW9kYWwoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChNb2RhbENvbXBvbmVudCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5kaXIocmVzKTtcblxuICAgICAgICAgICAgLy8gdGhpcy5hY2NvdW50ID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJhY2NvdW50XCIpKTtcbiAgICAgICAgICAgIC8vIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgLy8gICBjbGllbnRHcm91cElkOiB0aGlzLmdyb3VwRGV0YWlsc1t0aGlzLndob3NlXS5jbGllbnRHcm91cElkLFxuICAgICAgICAgICAgLy8gICBhZG1pbklkOiB0aGlzLmFjY291bnQudXNlcklkXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyB0aGlzLnJlc3RBcGkuYWRkTWVtYmVyKGRhdGEpLnN1YnNjcmliZSggcmVzID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWRkZWRcIik7XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBlcnIgPT4ge1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyXCIpO1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAvLyB9KSAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5tZW1iZXJzLnB1c2gocmVzLnVzZXJJZClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICB0aW1lU2luY2UodGltZVN0YW1wKXtcbiAgICAgIGlmKHRpbWVTdGFtcCAhPSBudWxsKXtcbiAgICAgICAgcmV0dXJuIFwiTGFzdCBzZWVuIGF0IFwiICsgZ2V0VGltZSh0aW1lU3RhbXApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFwiXCI7XG4gICB9XG5cbiAgIHJlbW92ZShtZW1iZXIpe1xuICAgICBsZXQgaW5kZXggPSB0aGlzLm1lbWJlcnMuaW5kZXhPZihtZW1iZXIpO1xuICAgICB0aGlzLm1lbWJlcnMuc3BsaWNlKGluZGV4LCAxKVxuICAvLyAgICB0aGlzLmFjY291bnQgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcImFjY291bnRcIikpO1xuICAvLyAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gIC8vICAgICAgICAgICAgIGNsaWVudEdyb3VwSWQ6IHRoaXMuZ3JvdXBEZXRhaWxzW3RoaXMud2hvc2VdLmNsaWVudEdyb3VwSWQsXG4gIC8vICAgICAgICAgICAgIGFkbWluSWQ6IHRoaXMuYWNjb3VudC51c2VySWRcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIHRoaXMucmVzdEFwaS5yZW1vdmVNZW1iZXIoZGF0YSkuc3Vic2NyaWJlKCByZXMgPT4ge1xuICAvLyAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmVkXCIpO1xuICAvLyAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAvLyAgICAgICAgICAgZXJyID0+IHtcbiAgLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAvLyAgICAgICAgICAgfSk7XG4gICB9XG4gICBcbn0iXX0=