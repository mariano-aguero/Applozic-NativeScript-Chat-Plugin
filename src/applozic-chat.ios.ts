import { Common } from './applozic-chat.common';

declare var ALUser: any;
declare var ALChatLauncher: any;
declare var ALRegisterUserClientService: any;
declare var ALPushAssist: any;
declare var ALUserDefaultsHandler: any;

export class ApplozicChat extends Common {

    public login(user: any) {
        var alUser = ALUser.alloc().init();
        alUser.userId = user.userId;
        alUser.applicationId = user.applicationId;
        alUser.authenticationTypeId = user.authenticationTypeId;
        alUser.deviceApnsType = user.deviceApnsType;

        var alChatLauncher = ALChatLauncher.alloc().initWithApplicationId(user.applicationId);
        var alRegisterUserClientService = ALRegisterUserClientService.alloc().init();
        var that = this;
        
        alRegisterUserClientService.initWithCompletionWithCompletion(alUser, function(response, error) {
            console.log("response: " + response);
            console.log(error);
            that.launchChat();
        });
    }

    public launchChat() {
        var alChatLauncher = ALChatLauncher.alloc().initWithApplicationId(ALUserDefaultsHandler.getApplicationKey());        
        var alPushAssist = ALPushAssist.alloc().init();
        alChatLauncher.launchChatListAndViewControllerObject("Conversations", alPushAssist.topViewController);
    }

    public launchChatWithUserId(userId: any) {        
        var alChatLauncher = ALChatLauncher.alloc().initWithApplicationId(ALUserDefaultsHandler.getApplicationKey());        
        var alPushAssist = ALPushAssist.alloc().init();

        alChatLauncher.launchIndividualChatWithGroupIdWithDisplayNameAndViewControllerObjectAndWithText(userId, null, null, alPushAssist.topViewController, null);       
    }
        
    public launchChatWithGroupId(groupId: number) {
                
    }
}
