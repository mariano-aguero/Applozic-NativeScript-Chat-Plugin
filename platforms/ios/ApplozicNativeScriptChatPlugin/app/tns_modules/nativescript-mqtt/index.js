"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var MQTT = require('./mqttws31');
var MQTTClient = (function () {
    function MQTTClient(options) {
        this.connectionSuccess = new common_1.EventHandler();
        this.connectionFailure = new common_1.EventHandler();
        this.connectionLost = new common_1.EventHandler();
        this.messageArrived = new common_1.EventHandler();
        /* options
          host: string
          port: int - default 80 | useSSL 443
          path: string - default empty
          useSSL: bool - default false
          clientId: string - default UUID
          retryOnDisconnect: bool - default false
        */
        this.connected = false;
        this.host = options.host || 'localhost';
        this.useSSL = options.useSSL || false;
        if (options.port)
            this.port = options.port;
        else
            this.port = this.useSSL ? 443 : 80;
        this.path = options.path || '';
        this.clientId = options.clientId || common_1.guid();
        this.retryOnDisconnect = options.retryOnDisconnect || false;
        this.mqttClient = new MQTT.Client(this.host, this.port, this.path, this.clientId);
        this.mqttClient.useSSL = this.useSSL;
    }
    ;
    Object.defineProperty(MQTTClient.prototype, "onConnectionSuccess", {
        //events for the MQTT Client
        get: function () { return this.connectionSuccess; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onConnectionFailure", {
        get: function () { return this.connectionFailure; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onConnectionLost", {
        get: function () { return this.connectionLost; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onMessageArrived", {
        get: function () { return this.messageArrived; },
        enumerable: true,
        configurable: true
    });
    MQTTClient.prototype.connect = function (username, password) {
        var _this = this;
        if (this.connected) {
            return;
        }
        ;
        var connectOptions = {
            userName: username,
            password: password,
            useSSL: this.useSSL,
            onSuccess: function () {
                _this.connectionSuccess.trigger();
                _this.connected = true;
            },
            onFailure: function (err) {
                _this.connectionFailure.trigger(err);
            }
        };
        this.mqttClient.onConnectionLost = function (err) {
            _this.connectionLost.trigger(err.errorMessage);
            _this.connected = false;
        };
        this.mqttClient.onMessageArrived = function (message) {
            _this.messageArrived.trigger(new common_1.Message(message));
        };
        this.mqttClient.connect(connectOptions);
    };
    MQTTClient.prototype.subscribe = function (topic) {
        this.mqttClient.subscribe(topic);
    };
    MQTTClient.prototype.unsubscribe = function (topic) {
        this.mqttClient.unsubscribe(topic);
    };
    MQTTClient.prototype.publish = function (message) {
        this.mqttClient.send(message);
    };
    return MQTTClient;
}());
exports.MQTTClient = MQTTClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUErRDtBQUMvRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFakM7SUFjRSxvQkFBWSxPQUFXO1FBTGYsc0JBQWlCLEdBQUcsSUFBSSxxQkFBWSxFQUFRLENBQUM7UUFDN0Msc0JBQWlCLEdBQUcsSUFBSSxxQkFBWSxFQUFVLENBQUM7UUFDL0MsbUJBQWMsR0FBRyxJQUFJLHFCQUFZLEVBQVUsQ0FBQztRQUM1QyxtQkFBYyxHQUFHLElBQUkscUJBQVksRUFBVyxDQUFDO1FBR25EOzs7Ozs7O1VBT0U7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDdEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQyxJQUFJO1lBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFDLEdBQUcsR0FBQyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksYUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUM7UUFHNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFdkMsQ0FBQztJQUFBLENBQUM7SUFHRixzQkFBVywyQ0FBbUI7UUFEOUIsNEJBQTRCO2FBQzVCLGNBQWlELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNqRixzQkFBVywyQ0FBbUI7YUFBOUIsY0FBbUQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ25GLHNCQUFXLHdDQUFnQjthQUEzQixjQUFnRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzdFLHNCQUFXLHdDQUFnQjthQUEzQixjQUFpRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXZFLDRCQUFPLEdBQWQsVUFBZSxRQUFRLEVBQUUsUUFBUTtRQUFqQyxpQkE0QkM7UUEzQkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUFBLENBQUM7UUFFRixJQUFJLGNBQWMsR0FBRztZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsU0FBUyxFQUFFO2dCQUNULEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQztZQUNELFNBQVMsRUFBRSxVQUFDLEdBQVE7Z0JBQ2xCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQztTQUNGLENBQUE7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixHQUFHLFVBQUMsR0FBRztZQUNuQyxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFDLE9BQVc7WUFDM0MsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLDhCQUFTLEdBQWhCLFVBQWlCLEtBQVk7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLGdDQUFXLEdBQWxCLFVBQW1CLEtBQVk7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLDRCQUFPLEdBQWQsVUFBZSxPQUFnQjtRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUgsaUJBQUM7QUFBRCxDQUFDLEFBdEZELElBc0ZDO0FBRVEsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRXZlbnQsIEV2ZW50SGFuZGxlciwgZ3VpZCwgTWVzc2FnZSB9IGZyb20gJy4vY29tbW9uJztcbmxldCBNUVRUID0gcmVxdWlyZSgnLi9tcXR0d3MzMScpO1xuXG5jbGFzcyBNUVRUQ2xpZW50IHtcbiAgcHJpdmF0ZSBtcXR0Q2xpZW50O1xuICBwcml2YXRlIGhvc3Q6IHN0cmluZztcbiAgcHJpdmF0ZSBwb3J0OiBudW1iZXI7XG4gIHByaXZhdGUgcGF0aDogc3RyaW5nO1xuICBwcml2YXRlIHVzZVNTTDogYm9vbGVhbjtcbiAgcHVibGljIGNsaWVudElkOiBzdHJpbmc7XG4gIHB1YmxpYyBjb25uZWN0ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgcmV0cnlPbkRpc2Nvbm5lY3Q6IGJvb2xlYW47XG4gIHByaXZhdGUgY29ubmVjdGlvblN1Y2Nlc3MgPSBuZXcgRXZlbnRIYW5kbGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgY29ubmVjdGlvbkZhaWx1cmUgPSBuZXcgRXZlbnRIYW5kbGVyPHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBjb25uZWN0aW9uTG9zdCA9IG5ldyBFdmVudEhhbmRsZXI8c3RyaW5nPigpO1xuICBwcml2YXRlIG1lc3NhZ2VBcnJpdmVkID0gbmV3IEV2ZW50SGFuZGxlcjxNZXNzYWdlPigpO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6YW55KXtcbiAgICAvKiBvcHRpb25zXG4gICAgICBob3N0OiBzdHJpbmdcbiAgICAgIHBvcnQ6IGludCAtIGRlZmF1bHQgODAgfCB1c2VTU0wgNDQzXG4gICAgICBwYXRoOiBzdHJpbmcgLSBkZWZhdWx0IGVtcHR5XG4gICAgICB1c2VTU0w6IGJvb2wgLSBkZWZhdWx0IGZhbHNlXG4gICAgICBjbGllbnRJZDogc3RyaW5nIC0gZGVmYXVsdCBVVUlEXG4gICAgICByZXRyeU9uRGlzY29ubmVjdDogYm9vbCAtIGRlZmF1bHQgZmFsc2VcbiAgICAqL1xuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0IHx8ICdsb2NhbGhvc3QnO1xuICAgIHRoaXMudXNlU1NMID0gb3B0aW9ucy51c2VTU0wgfHwgZmFsc2U7XG4gICAgaWYob3B0aW9ucy5wb3J0KSB0aGlzLnBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgZWxzZSB0aGlzLnBvcnQgPSB0aGlzLnVzZVNTTD80NDM6ODA7XG4gICAgdGhpcy5wYXRoID0gb3B0aW9ucy5wYXRoIHx8ICcnO1xuICAgIHRoaXMuY2xpZW50SWQgPSBvcHRpb25zLmNsaWVudElkIHx8IGd1aWQoKTtcbiAgICB0aGlzLnJldHJ5T25EaXNjb25uZWN0ID0gb3B0aW9ucy5yZXRyeU9uRGlzY29ubmVjdCB8fCBmYWxzZTtcblxuXG4gICAgdGhpcy5tcXR0Q2xpZW50ID0gbmV3IE1RVFQuQ2xpZW50KHRoaXMuaG9zdCwgdGhpcy5wb3J0LCB0aGlzLnBhdGgsIHRoaXMuY2xpZW50SWQpO1xuICAgIHRoaXMubXF0dENsaWVudC51c2VTU0wgPSB0aGlzLnVzZVNTTDtcblxuICB9O1xuXG4gIC8vZXZlbnRzIGZvciB0aGUgTVFUVCBDbGllbnRcbiAgcHVibGljIGdldCBvbkNvbm5lY3Rpb25TdWNjZXNzKCk6IElFdmVudDx2b2lkPiB7IHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdWNjZXNzOyB9XG4gIHB1YmxpYyBnZXQgb25Db25uZWN0aW9uRmFpbHVyZSgpOiBJRXZlbnQ8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbm5lY3Rpb25GYWlsdXJlOyB9XG4gIHB1YmxpYyBnZXQgb25Db25uZWN0aW9uTG9zdCgpOiBJRXZlbnQ8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbm5lY3Rpb25Mb3N0OyB9XG4gIHB1YmxpYyBnZXQgb25NZXNzYWdlQXJyaXZlZCgpOiBJRXZlbnQ8TWVzc2FnZT4geyByZXR1cm4gdGhpcy5tZXNzYWdlQXJyaXZlZDsgfVxuXG4gIHB1YmxpYyBjb25uZWN0KHVzZXJuYW1lLCBwYXNzd29yZCl7XG4gICAgaWYodGhpcy5jb25uZWN0ZWQpe1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBsZXQgY29ubmVjdE9wdGlvbnMgPSB7XG4gICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICB1c2VTU0w6IHRoaXMudXNlU1NMLFxuICAgICAgb25TdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN1Y2Nlc3MudHJpZ2dlcigpO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICB9LFxuICAgICAgb25GYWlsdXJlOiAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uRmFpbHVyZS50cmlnZ2VyKGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tcXR0Q2xpZW50Lm9uQ29ubmVjdGlvbkxvc3QgPSAoZXJyKSA9PiB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbkxvc3QudHJpZ2dlcihlcnIuZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLm1xdHRDbGllbnQub25NZXNzYWdlQXJyaXZlZCA9IChtZXNzYWdlOmFueSkgPT4ge1xuICAgICAgICB0aGlzLm1lc3NhZ2VBcnJpdmVkLnRyaWdnZXIobmV3IE1lc3NhZ2UobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIHRoaXMubXF0dENsaWVudC5jb25uZWN0KGNvbm5lY3RPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUodG9waWM6c3RyaW5nKXtcbiAgICB0aGlzLm1xdHRDbGllbnQuc3Vic2NyaWJlKHRvcGljKTtcbiAgfVxuXG4gIHB1YmxpYyB1bnN1YnNjcmliZSh0b3BpYzpzdHJpbmcpe1xuICAgIHRoaXMubXF0dENsaWVudC51bnN1YnNjcmliZSh0b3BpYyk7XG4gIH1cblxuICBwdWJsaWMgcHVibGlzaChtZXNzYWdlOiBNZXNzYWdlKXtcbiAgICB0aGlzLm1xdHRDbGllbnQuc2VuZChtZXNzYWdlKTtcbiAgfVxuXG59XG5cbmV4cG9ydCB7IE1RVFRDbGllbnQgfVxuIl19