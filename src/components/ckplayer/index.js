const PrimaryVideo = require('./primary/video');
const PrimaryPlay = require('./primary/play');
const ControlProgress = require('./controls/progress');
const ControlPlay = require('./controls/play');
const ControlTime = require('./controls/time');
const ControlVolume = require('./controls/volume');
const ControlPlaybackrate = require('./controls/playbackrate');
const ControlPIP = require('./controls/pip');
const ControlFullscreen = require('./controls/fullscreen');
const ControlQuality = require('./controls/quality');
const ControlSetting = require('./controls/setting/index');
const ControlLoop = require('./controls/setting/loop/index');

class ckplayer {
    constructor(props) {
        //视频容器的ID
        this.el = props.el;
        //视频地址
        this.url = props.url || '';
        // 播放器初始宽度
        this.width = props.width || 800;
        // 播放器高度
        this.height = props.height || 450;
        // 视频初始清晰度
        this.quality = 'SD';

        // hover锁
        this.isLock = true;
        this.dom = true;
    }

    init() {
        // 播放器布局
        this.createElm();

        new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            // 视频video窗口
            PrimaryVideo.default.init(this);
            // 播放窗口播放\暂停组件
            PrimaryPlay.default.init();

            // 进度条组件
            ControlProgress.default.init();
            // 控制器播放\暂停组件
            ControlPlay.default.init();
            // 当前时长与总时长组件
            ControlTime.default.init();
            // 视频清晰度
            ControlQuality.default.init(this);
            // 播放倍速
            ControlPlaybackrate.default.init();
            // 音量组件
            ControlVolume.default.init();
            // 更多设置按钮
            ControlSetting.default.init();
            // 画中画
            ControlPIP.default.init();
            // 全屏按钮
            ControlFullscreen.default.init();

            /**
             * 更多设置
             */
            // 洗脑循环播放
            ControlLoop.default.init();
        });

        /**
         * JS事件
         */
        $(this.el).on('mouseover', (e) => {
            this.onHover(e);
        });
        window.addEventListener('resize', () => {
            // 监听全屏
            this.onWatchFullscreen();
        });
    }

    // 播放器HTML布局
    createElm() {
        /**
         * 构建HTML
         */
        const primary = $utils.createElm('div', { class: 'el-player-primary-wrap' });
        const controls = $utils.createElm('div', { class: 'el-player-controls-wrap' });
        const bg = $utils.createElm('div', { class: 'el-player-controls-bg' });
        const top = $utils.createElm('div', { class: 'el-player-controls-top' });
        const bottom = $utils.createElm('div', { class: 'el-player-controls-bottom' });
        const bottomLeft = $utils.createElm('div', { class: 'el-player-controls-bottom-left' });
        const bottomRight = $utils.createElm('div', { class: 'el-player-controls-bottom-right' });
        bottom.append(bottomLeft, bottomRight);
        controls.append(top, bottom, bg);

        this.el.append(primary, controls);
    }

    onHover(e) {
        let that = this;
        let controls = $('.el-player-controls-wrap');
        let bottom = $('.el-player-controls-bottom');
        let $video = $('#video');
        let btnbox = $('.el-player-btn-box');

        if (e.target === bottom[0]) {
            this.dom = false;
        } else if (e.target === $video[0] || e.target === btnbox[0]) {
            this.dom = true;
        }

        this.el.onmousemove = function () {
            if (that.isLock) {
                that.isLock = false;
                controls.addClass('rotate');
                setTimeout(() => {
                    if (that.dom) controls.removeClass('rotate');
                    that.isLock = true;
                }, 3000);
            }
        };

        this.el.onmouseup = function () {
            that.el.onmousemove = null;
            that.el.onmouseup = null;
        };
    }
    // 监听全屏
    onWatchFullscreen() {
        console.warn('监听全屏');
        let flag =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullscreenElement ||
            document.msFullscreenElement;
        let width = document.documentElement.clientWidth || document.body.clientWidth;
        let $video = $('#video');
        let $prog = $('#progress');
        let drag = ControlProgress.default.data;

        if (flag) {
            $video.attr({ width: '100%', height: '100%' });
            $prog.attr({ width: width });
            $(drag.lineB).attr({ x2: width });
            drag.maxX = width;
        } else {
            $video.attr({ width: this.width, height: this.height });
            $prog.attr({ width: this.width });
            $(drag.lineB).attr({ x2: this.width });
            drag.maxX = this.width;
        }
    }
}

module.exports = ckplayer;
