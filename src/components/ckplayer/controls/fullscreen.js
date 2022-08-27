export default {
    data: {
        isSmall: false,
        svg: {
            off: 'M358.4 768H426.666667v85.333333H213.333333v-213.333333h85.333334v68.266667l128-128 59.733333 59.733333-128 128z m345.6 0l-128-128 59.733333-59.733333 132.266667 132.266666V640h85.333333v213.333333h-213.333333v-85.333333h64zM358.4 298.666667l128 128-59.733333 59.733333-128-128V426.666667H213.333333V213.333333h213.333334v85.333334H358.4z m345.6 0H640V213.333333h213.333333v213.333334h-85.333333V354.133333l-132.266667 132.266667-59.733333-59.733333 128-128z',
            no: 'M298.666667 631.466667H226.133333v-81.066667h217.6v204.8h-85.333333v-68.266667l-128 128L170.666667 759.466667l128-128z m422.4 0l128 128-59.733334 59.733333-128-128v68.266667h-85.333333V554.666667h217.6v81.066666h-72.533333zM298.666667 341.333333L187.733333 230.4 243.2 170.666667l115.2 115.2V217.6h85.333333v204.8H226.133333V341.333333H298.666667z m430.933333 0h64v81.066667h-217.6V217.6h85.333333v72.533333L780.8 170.666667l59.733333 59.733333L729.6 341.333333z'
        }
    },
    init() {
        /**
         * 构建HTML
         */
        const parentNode = $('.el-player-controls-bottom-right')[0];
        const btn = $utils.createElm('div', { class: 'el-player-controls-btn' });
        const oSvg = $utils.createSvgElm('svg', {
            width: '100%',
            height: '100%',
            viewBox: '0 0 1024 1024'
        });
        const path = $utils.createSvgElm('path', {
            id: 'fullscreen_icon',
            d: this.data.svg.off
        });
        const hint = $utils.createElm('div', { class: 'hint' });

        hint.innerHTML = '进入全屏';
        oSvg.appendChild(path);
        btn.append(oSvg, hint);
        parentNode.append(btn);

        /**
         * JS事件
         */
        let that = this;
        $(btn).on('mouseover', this.onMouse); // 鼠标移入
        $(btn).on('mouseout', this.onMouse); // 鼠标离开
        // 鼠标点击
        $(btn).on('mousedown', function () {
            that.onClick(this);
        });

        /**
         * CSS样式
         */
        $(btn).css({
            height: '22px'
        });
    },

    // hover事件
    onMouse() {
        let list = $(this).find('hint');
        $(this).toggleClass('rotate');
        $(this).hasClass('rotate') ? list.show() : list.hide();
    },
    // 点击事件
    onClick(el) {
        let icon = $('#fullscreen_icon');
        let list = $(el).find('hint');
        let player = $('#ckplayer')[0];
        let flag =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullscreenElement ||
            document.msFullscreenElement;

        if (flag) {
            // 兼容处理
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                // 火狐
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                // 谷歌
                document.webkitCancelFullScreen();
            } else if (document.msCancelFullScreen) {
                // ie
                document.msCancelFullScreen();
            }

            icon.attr({ d: this.data.svg.off });
            list[0].innerHTML = '进入全屏';
        } else {
            // 兼容处理
            if (player.requestFullscreen) {
                player.requestFullscreen();
            } else if (player.mozRequestFullScreen) {
                // 火狐
                player.mozRequestFullScreen();
            } else if (player.webkitRequestFullScren) {
                // 谷歌
                player.webkitRequestFullScren();
            } else if (player.msRequestFullScreen) {
                // ie
                player.msRequestFullScreen();
            }

            icon.attr({ d: this.data.svg.no });
            list[0].innerHTML = '退出全屏';
        }
    }
};
