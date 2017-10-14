import { Observable } from 'tns-core-modules/data/observable';
export declare class Common extends Observable {
    message: string;
    constructor();
    login(alUser: any): void;
    launchChat(): void;
}
export declare class Utils {
    static SUCCESS_MSG(): string;
}
