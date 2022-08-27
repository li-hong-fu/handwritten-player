export default {
    data: {
        isSmall: false, // 是否小窗口
        width: 280, // 小窗口默认宽
        svg: {
            p1d: 'M852.95 43.06H370.11c-70.58 0-128 57.42-128 128V653.9c0 70.58 57.42 128 128 128h482.83c70.58 0 128-57.42 128-128V171.06c0.01-70.58-57.41-128-127.99-128z m42.66 610.84c0 23.54-19.15 42.67-42.67 42.67H370.11c-23.52 0-42.67-19.12-42.67-42.67V171.06c0-23.54 19.15-42.67 42.67-42.67h482.83c23.52 0 42.67 19.12 42.67 42.67V653.9z',
            p2d: 'M128.39 843.6V313.52H43.05V843.6c0 75.71 61.6 137.33 137.33 137.33H710.5V895.6H180.39c-28.67 0-52-23.33-52-52z'
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
        const path1 = $utils.createSvgElm('path', {
            d: this.data.svg.p1d
        });
        const path2 = $utils.createSvgElm('path', {
            d: this.data.svg.p2d
        });
        const hint = $utils.createElm('div', { class: 'hint' });
        hint.innerHTML = '开启画中画';
        oSvg.append(path1, path2);
        btn.append(oSvg, hint);
        parentNode.append(btn);

        /**
         * JS事件
         */
        let that = this;
        $(btn).on('mouseover', this.onMouse); // 鼠标移入
        $(btn).on('mouseout', this.onMouse); // 鼠标离开
        $(btn).on('mousedown', function () {
            that.onClick(this);
        }); // 鼠标点击

        /**
         * CSS样式
         */
        $(btn).css({
            height: '16px'
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
        let list = $(el).find('hint')[0];
        let $video = $('#video')[0];

        this.data.isSmall = !this.data.isSmall;

        if (this.data.isSmall) {
            list.innerHTML = '退出画中画';
            $video.requestPictureInPicture();
        } else {
            list.innerHTML = '开启画中画';
            document.exitPictureInPicture();
        }
    }
};
