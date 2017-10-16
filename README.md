# Applozic NativeScript Chat Plugin


## Installation

```javascript
tns plugin add nativescript-applozic-chat
```

## Usage 

#### Login/Register User
```js
    var alUser = {
            'userId' : userId,   //Replace it with the userId of the logged in user
            'password' : password,  //Put password here
            'authenticationTypeId' : 1,
            'applicationId' : 'applozic-sample-app',  //replace "applozic-sample-app" with Application Key from Applozic Dashboard
            'deviceApnsType' : 0    //Set 0 for Development and 1 for Distribution (Release)
        };
	
    applozicChat.login(alUser, function(response) {
        applozicChat.launchChat(); //launch chat
      }, function(error) {
        console.log("onLoginFailure: " + error);
      });
```


#### Launch Chat


##### Main Chat screen

```
        applozicChat.launchChat();
```

##### Launch Chat with a specific User

```
        applozicChat.launchChatWithUserId(userId);
```

##### Launch Chat with specific Group 

```
        applozicChat.launchChatWithGroupId(groupId);
```


#### Logout

```
applozicChat.logout(function(response) {
      console.log("logout success: " + response);
    }, function(error) {
      console.log("logout error: "+ error);
    });```
