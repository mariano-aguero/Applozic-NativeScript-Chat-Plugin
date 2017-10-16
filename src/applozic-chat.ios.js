"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var applozic_chat_common_1 = require("./applozic-chat.common");
var ApplozicChat = (function (_super) {
    __extends(ApplozicChat, _super);
    function ApplozicChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplozicChat.prototype.login = function (user, successCallback, errorCallback) {
        var alUser = ALUser.alloc().init();
        alUser.userId = user.userId;
        alUser.password = user.password;
        alUser.applicationId = user.applicationId;
        alUser.authenticationTypeId = user.authenticationTypeId;
        alUser.deviceApnsType = user.deviceApnsType;
        var alChatLauncher = ALChatLauncher.alloc().initWithApplicationId(user.applicationId);
        var alRegisterUserClientService = ALRegisterUserClientService.alloc().init();
        var that = this;
        alRegisterUserClientService.initWithCompletionWithCompletion(alUser, function (response, error) {
            successCallback(response);
        });
    };
    ApplozicChat.prototype.launchChat = function () {
        var alChatLauncher = ALChatLauncher.alloc().initWithApplicationId(ALUserDefaultsHandler.getApplicationKey());
        var alPushAssist = ALPushAssist.alloc().init();
        alChatLauncher.launchChatListAndViewControllerObject("Conversations", alPushAssist.topViewController);
    };
    ApplozicChat.prototype.launchChatWithUserId = function (userId) {
        var alChatLauncher = ALChatLauncher.alloc().initWithApplicationId(ALUserDefaultsHandler.getApplicationKey());
        var alPushAssist = ALPushAssist.alloc().init();
        alChatLauncher.launchIndividualChatWithGroupIdWithDisplayNameAndViewControllerObjectAndWithText(userId, null, null, alPushAssist.topViewController, null);
    };
    ApplozicChat.prototype.launchChatWithGroupId = function (groupId) {
        var alChatLauncher = ALChatLauncher.alloc().initWithApplicationId(ALUserDefaultsHandler.getApplicationKey());
        var alPushAssist = ALPushAssist.alloc().init();
        alChatLauncher.launchIndividualChatWithGroupIdWithDisplayNameAndViewControllerObjectAndWithText(null, groupId, null, alPushAssist.topViewController, null);
    };
    ApplozicChat.prototype.logout = function (successCallback, errorCallback) {
        var alRegisterUserClientService = ALRegisterUserClientService.alloc().init();
        alRegisterUserClientService.logoutWithCompletionHandler(function (response, error) {
            if (!error && response.status === "success") {
                console.log("Logout successful");
                successCallback(response);
            }
            else {
                console.log("Logout failed: " + response.response);
                successCallback(error);
            }
        });
    };
    ApplozicChat.prototype.showAllRegisteredUsers = function (showAll) {
        ALApplozicSettings.setFilterContactsStatus(showAll);
    };
    return ApplozicChat;
}(applozic_chat_common_1.Common));
exports.ApplozicChat = ApplozicChat;
//# sourceMappingURL=applozic-chat.ios.js.map