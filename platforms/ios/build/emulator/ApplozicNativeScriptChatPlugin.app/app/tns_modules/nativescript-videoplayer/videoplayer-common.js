"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var videoSource = require("./video-source/video-source");
var utils_1 = require("tns-core-modules/utils/utils");
var types_1 = require("tns-core-modules/utils/types");
var view_1 = require("tns-core-modules/ui/core/view");
function onSrcPropertyChanged(view, oldValue, newValue) {
    var video = view;
    var value = newValue;
    if (types_1.isString(value)) {
        value = value.trim();
        video.videoSource = null;
        video["_url"] = value;
        video.isLoadingProperty = true;
        if (utils_1.isFileOrResourcePath(value)) {
            video.videoSource = videoSource.fromFileOrResource(value);
            video.isLoadingProperty = false;
        }
        else {
            if (video["_url"] === value) {
                video.videoSource = videoSource.fromUrl(value);
                video.isLoadingProperty = false;
            }
        }
    }
    else if (value instanceof videoSource.VideoSource) {
        video.videoSource = value;
    }
    else {
        video.videoSource = videoSource.fromNativeSource(value);
    }
}
var Video = (function (_super) {
    __extends(Video, _super);
    function Video() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoplay = false;
        _this.controls = true;
        _this.loop = false;
        _this.muted = false;
        _this.fill = false;
        return _this;
    }
    Video.finishedEvent = "finished";
    Video.playbackReadyEvent = "playbackReady";
    Video.playbackStartEvent = "playbackStart";
    Video.seekToTimeCompleteEvent = "seekToTimeComplete";
    Video.currentTimeUpdatedEvent = "currentTimeUpdated";
    return Video;
}(view_1.View));
exports.Video = Video;
exports.srcProperty = new view_1.Property({
    name: "src",
    valueChanged: onSrcPropertyChanged
});
exports.srcProperty.register(Video);
exports.videoSourceProperty = new view_1.Property({
    name: "videoSource"
});
exports.videoSourceProperty.register(Video);
exports.isLoadingProperty = new view_1.Property({
    name: "isLoading",
    valueConverter: view_1.booleanConverter
});
exports.isLoadingProperty.register(Video);
exports.observeCurrentTimeProperty = new view_1.Property({
    name: "observeCurrentTime",
    valueConverter: view_1.booleanConverter
});
exports.observeCurrentTimeProperty.register(Video);
exports.autoplayProperty = new view_1.Property({
    name: "autoplay",
    valueConverter: view_1.booleanConverter
});
exports.autoplayProperty.register(Video);
exports.controlsProperty = new view_1.Property({
    name: "controls",
    valueConverter: view_1.booleanConverter
});
exports.controlsProperty.register(Video);
exports.loopProperty = new view_1.Property({
    name: "loop",
    valueConverter: view_1.booleanConverter
});
exports.loopProperty.register(Video);
exports.mutedProperty = new view_1.Property({
    name: "muted",
    valueConverter: view_1.booleanConverter
});
exports.mutedProperty.register(Video);
exports.fillProperty = new view_1.Property({
    name: "fill",
    valueConverter: view_1.booleanConverter
});
exports.fillProperty.register(Video);
