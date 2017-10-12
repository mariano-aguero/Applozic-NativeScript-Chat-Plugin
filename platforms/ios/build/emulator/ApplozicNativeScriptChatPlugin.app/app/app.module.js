"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var app_component_1 = require("./app.component");
var modal_component_1 = require("./pages/modal/modal.component");
var restApi_service_1 = require("./restApi.service");
var app_routing_1 = require("./app.routing");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent
        ].concat(app_routing_1.navigatableComponents, [
            modal_component_1.ModalComponent
        ]),
        entryComponents: [modal_component_1.ModalComponent],
        bootstrap: [app_component_1.AppComponent],
        imports: [
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
        ],
        schemas: [core_1.NO_ERRORS_SCHEMA],
        providers: [
            restApi_service_1.RestApiService,
            modal_dialog_1.ModalDialogService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLGtFQUF1RTtBQUV2RSxpREFBK0M7QUFDL0MsaUVBQStEO0FBRS9ELHFEQUFtRDtBQUNuRCw2Q0FBOEQ7QUFvQjlELElBQWEsU0FBUztJQUF0QjtJQUF3QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQXpCLElBQXlCO0FBQVosU0FBUztJQWxCckIsZUFBUSxDQUFDO1FBQ1IsWUFBWTtZQUNJLDRCQUFZO2lCQUNULG1DQUFxQjtZQUN2QixnQ0FBYztVQUFDO1FBQ2hDLGVBQWUsRUFBRSxDQUFDLGdDQUFjLENBQUM7UUFDakMsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN6QixPQUFPLEVBQUU7WUFDQyx3Q0FBa0I7WUFDbEIsK0JBQXVCO1lBQ3ZCLDZCQUFzQjtZQUN0QixpQ0FBd0I7WUFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7U0FBRTtRQUNwRCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixTQUFTLEVBQUU7WUFDQyxnQ0FBYztZQUNkLGlDQUFrQjtTQUFHO0tBQ2xDLENBQUM7R0FDVyxTQUFTLENBQUc7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IFJlc3RBcGlTZXJ2aWNlIH0gZnJvbSBcIi4vcmVzdEFwaS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgICAgICAgICAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzLFxuICAgICAgICAgICAgICAgICAgIE1vZGFsQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTW9kYWxDb21wb25lbnRdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbiAgcHJvdmlkZXJzIDpbXG4gICAgICAgICAgICAgIFJlc3RBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iXX0=