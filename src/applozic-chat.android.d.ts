import { Common } from './applozic-chat.common';
export declare class ApplozicChat extends Common {
    login(alUser: any, successCallback: any, errorCallback: any): void;
    launchChat(): void;
    launchChatWithUserId(userId: any): void;
    launchChatWithGroupId(groupId: number): void;
    logout(successCallback: any, errorCallback: any): void;
}
