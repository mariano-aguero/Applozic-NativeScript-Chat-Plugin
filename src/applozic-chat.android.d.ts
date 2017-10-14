import { Common } from './applozic-chat.common';
export declare class ApplozicChat extends Common {
    login(alUser: any): void;
    launchChat(): void;
    launchChatWithUserId(userId: any): void;
    launchChatWithGroupId(groupId: number): void;
}
