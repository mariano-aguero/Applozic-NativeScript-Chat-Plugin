import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { AppComponent } from "./app.component";
import { ModalComponent } from "./pages/modal/modal.component";

import { RestApiService } from "./restApi.service";
import { routes, navigatableComponents } from "./app.routing";

@NgModule({
  declarations: [
                  AppComponent,
                  ...navigatableComponents,
                   ModalComponent],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent],
  imports: [
            NativeScriptModule,
            NativeScriptFormsModule,
            NativeScriptHttpModule,
            NativeScriptRouterModule,
            NativeScriptRouterModule.forRoot(routes) ],
  schemas: [NO_ERRORS_SCHEMA],
  providers :[
              RestApiService,
              ModalDialogService  ]
})
export class AppModule {}
