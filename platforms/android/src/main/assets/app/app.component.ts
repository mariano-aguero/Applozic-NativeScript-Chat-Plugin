import { Component } from "@angular/core";

@Component({
  selector: "main",
  template: '<page-router-outlet xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:chatView="nativescript-chatview" navigatingTo="onNavigatingTo"></page-router-outlet>'
})
export class AppComponent {}