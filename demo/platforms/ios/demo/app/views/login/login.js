var nativescript_applozic_chat = require("nativescript-applozic-chat");
var observableModule = require("data/observable");

var page;
var applicationKey;
var userId;
var password;

exports.loaded = function(args) {
    page = args.object;
};

exports.login = function() {
    var applozicChat = new nativescript_applozic_chat.ApplozicChat();
    applicationKey = page.getViewById("applicationKey").text;
    userId = page.getViewById("userId").text;
    password = page.getViewById("password").text;

    var alUser = {
      'userId' : userId,   //Replace it with the userId of the logged in user
      'password' : password,  //Put password here
      'authenticationTypeId' : 1,
      'applicationId' :  applicationKey,  //replace "applozic-sample-app" with Application Key from Applozic Dashboard
      'deviceApnsType' : 0    //Set 0 for Development and 1 for Distribution (Release)
    }
    
    applozicChat.login(alUser, function(response) {
        console.log("onLoginSuccess: " + response);
        applozicChat.showAllRegisteredUsers(false);
        applozicChat.launchChat();
        //that.applozicChat.launchChatWithGroupId(3930445);
      }, function(error) {
        console.log("onLoginFailure: " + error);
      });
};

exports.logout = function() {
    var applozicChat = new nativescript_applozic_chat.ApplozicChat();    
    applozicChat.logout(function(response) {
      console.log("logout success: " + response);
    }, function(error) {
      console.log("logout error: "+ error);
    });
}