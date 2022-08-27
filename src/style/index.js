module.exports = {
    /* 全局样式 */
    init() {
        const style = $utils.createElm('style', { type: 'text/css' });

        // 全局样式
        const global = `
            html,
            body {
                margin: 0;
                padding: 0;
                height: 100%;
                font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
                    Microsoft YaHei, SimSun, sans-serif;
                font-size: 14px;
                -webkit-font-smoothing: antialiased;
            }

            #app {
                height: 100%;
            }

            button, input, select, textarea {
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                color: inherit;
            }

            svg {
                fill: #fff;
            }

            ul,li {
                list-style: none;
            }

            .el-container {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .el-player {
                background: #000;
                position: relative;
            }

            .volElem {
                fill: none;
                stroke-width: 5;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 10;
            }

            .bui {
                display: flex;
                align-items: center;
                justify-content: center;
                white-space:nowrap;
                height: 32px !important;
            }
            .bui:hover {
                background: none !important;
                color: #2196f3;
            }
        `;
        // 播放器主体样式
        const primary = `
            .el-player-primary-wrap {
                position: relative;
            }

            .el-player-video-box {
                display: flex;
            }

            .el-player-btn-box {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                opacity: 0.5;
            }

            .el-player-btn {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                cursor: pointer;
            }
        `;
        // 控制器样式
        const controls = `
            .el-player-controls-wrap {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
            }

            .el-player-controls-bg {
                position: absolute;
                bottom: 0;
                width: 100%;
                padding-top: 100px;
                background-image: linear-gradient(-180deg,rgba(0,0,0,0) 0%,#000 100%);
                display:none;
            }

            .el-player-controls-top {
                cursor: pointer;
                z-index: 99;
                height: 11px;
            }

            .el-player-controls-bottom {
                height: 40px;
                display: none;
                justify-content: space-between;
                align-items: center;
                padding: 0 12px;
                z-index: 99;
            }

            .el-player-controls-wrap.rotate .el-player-controls-bottom {
                display: flex;
            }
            .el-player-controls-wrap.rotate .el-player-controls-bg {
                display:block;
            }

            .el-player-controls-bottom-left {
                display: flex;
                align-items: center;
            }

            .el-player-controls-bottom-right {
                display: flex;
                align-items: center;
            }

            .el-player-controls-btn {
                position: relative;
                cursor: pointer;
                padding: 0 8px;
                margin-right: 5px;
                font-size: 13px;
                color: #fff;
            }

            .el-player-controls-btn.rotate .controls-btn-list.quality::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 20px;
                left: 0;
            }
            .el-player-controls-btn.rotate .controls-btn-list.backrate::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 20px;
                left: 0;
            }
            .el-player-controls-btn.rotate .controls-btn-list.volume::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 20px;
                left: 0;
                top: 20px;
            }
            .el-player-controls-btn.rotate .controls-btn-list.setting::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 28px;
                left: 0;
                bottom: -28px;
            }

            .controls-btn-list {
                position: absolute;
                bottom: 35px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(21, 21, 21, .9);
                border-radius: 2px;
                display: none;
            }

            .controls-btn-item {
                height: 36px;
                line-height: 36px;
                cursor: pointer;
            }

            .controls-btn-item:hover {
                background: hsla(0, 0%, 100%, .1);
            }

            .controls-btn-item.active {
                background: hsla(0, 0%, 100%, .1);
            }
            .el-player-controls-btn .hint {
                position: absolute;
                bottom: 35px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(21, 21, 21, .9);
                border-radius: 2px;
                white-space: nowrap;
                padding: 5px;
                font-size: 13px;
                text-align: center;
                display: none;
            }
        `;

        style.innerHTML = global + primary + controls;

        $('head')[0].appendChild(style);
    },

    elUI() {
        const style = $utils.createElm('style', { type: 'text/css' });

        const global = `
            input {
                cursor: pointer;
            }

            .el-switch {
                display: inline-flex;
                align-items: center;
                position: relative;
                font-size: 14px;
                line-height: 20px;
                height: 20px;
                vertical-align: middle;
            }
            .el-switch_input {
                position: absolute;
                width: 0;
                height: 0;
                opacity: 0;
                margin: 0;
            }
            .el-switch__core {
                margin: 0;
                display: inline-block;
                position: relative;
                width: 25px;
                height: 15px;
                border: 1px solid #b1b2b3;
                outline: none;
                border-radius: 10px;
                box-sizing: border-box;
                background: #b1b2b3;
                cursor: pointer;
                transition: border-color .3s,background-color .3s;
                vertical-align: middle;
            }
            .el-switch.is-checked .el-switch__core:after {
                left: 100%;
                margin-left: -12px;
            }
            .el-switch__core:after {
                content: "";
                position: absolute;
                top: 1px;
                left: 1px;
                border-radius: 100%;
                transition: all .3s;
                width: 11px;
                height: 11px;
                background-color: #fff;
            }
            .el-switch.is-checked .el-switch__core {
                border-color: #2196f3;
                background-color: #2196f3;
            }
        `;

        style.innerHTML = global;

        $('head')[0].appendChild(style);
    }
};
