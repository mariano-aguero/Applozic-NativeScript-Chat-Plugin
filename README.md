# Applozic-NativeScript-Chat-Plugin
NativeScript chat plugin


### Add Chat to your nativescript application
Copy the following into your project:
  - Folder: 
    - /app/pages 
    - /app/images
  - Files:
    - /app/restApi.service.ts
    - /app/commonLib.ts
    - /app/app.routing.js
  


### Structure
Go to /app/pages folder:
  - login               : Login screen
  - conversations       : Conversation list showing the top conversations with contacts and groups
  - chatWith            : Individual chat conversation with specific user or group
  - startNew            : Contact list
  - info                : Group info
  - modal               : Group add member modal
  
  
 Take reference from login.ts and call the same function from your app's login screen.
 
 
 ### Dependencies
 
```
	"dependencies": {
		"@angular/animations": "~4.1.0",
		"@angular/common": "~4.1.0",
		"@angular/compiler": "~4.1.0",
		"@angular/core": "~4.1.0",
		"@angular/forms": "~4.1.0",
		"@angular/http": "~4.1.0",
		"@angular/platform-browser": "~4.1.0",
		"@angular/router": "~4.1.0",
		"nativescript-angular": "~3.1.0",
		"nativescript-chatview": "^1.0.3",
		"nativescript-floatingactionbutton": "^3.0.1",
		"nativescript-image-cache": "^1.0.8",
		"nativescript-mapbox": "^3.1.2",
		"nativescript-mqtt": "0.0.1",
		"nativescript-pulltorefresh": "^2.0.2",
		"nativescript-theme-core": "~1.0.2",
		"nativescript-videoplayer": "^3.0.9",
		"nativescript-websockets": "^1.3.3",
		"reflect-metadata": "~0.1.8",
		"rxjs": "~5.3.0",
		"tns-core-modules": "~3.1.0",
		"zone.js": "~0.8.2"
	},
	"devDependencies": {
		"babel-traverse": "6.25.0",
		"babel-types": "6.25.0",
		"babylon": "6.17.4",
		"lazy": "1.0.11",
		"nativescript-dev-typescript": "~0.5.0",
		"typescript": "~2.2.1"
	}
```
