var ApplozicChat = require("nativescript-applozic-chat").ApplozicChat;
var applozicChat = new ApplozicChat();

describe("greet function", function() {
    it("exists", function() {
        expect(applozicChat.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(applozicChat.greet()).toEqual("Hello, NS");
    });
});