export default {
    data: {
        play: false,
        svg: {
            path: 'M 11 10 L 17 10 L 17 26 L 11 26 M 20 10 L 26 10 L 26 26 L 20 26',
            pause: "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
            play: "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26",
        }

    },
    // 初始化
    init() {
        /**
         * 构建HTML
         */
        const parentNode = $('.el-player-controls-bottom-left')[0];
        const btn = $utils.createElm('div', { 'class': 'el-player-controls-btn' });
        const oSvg = $utils.createSvgElm('svg', {
            'width': '100%',
            'height': '100%',
            'viewBox': '0 0 36 36',
            'version': '1.1',
        });
        const defs = $utils.createSvgElm('defs', {});
        const path = $utils.createSvgElm('path', {
            'id': 'ytp-12',
            'd': this.data.svg.path
        });
        const animate = $utils.createSvgElm('animate', {
            'id': 'animation',
            'begin': 'indefinite',
            'attributeType': 'XML',
            'attributeName': 'd',
            'fill': 'freeze',
            'from': this.data.svg.play,
            'to': this.data.svg.pause,
            'dur': '0.1s',
            'keySplines': '.4 0 1 1',
            'repeatCount': '1'
        });
        const use1 = $utils.createSvgElm('use', {
            'href': '#ytp-12',
        });
        const use2 = $utils.createSvgElm('use', {
            'href': '#ytp-12',
        });

        path.appendChild(animate);
        defs.appendChild(path);
        oSvg.append(defs, use1, use2);
        btn.appendChild(oSvg);
        parentNode.appendChild(btn)

        /**
         * JS事件
         */
        let that = this;
        that.onPlayOrPause()
        // 点击播放\暂停
        $(btn).on('click', function () {
            that.data.play = !that.data.play;
            that.onPlayOrPause();
        })
        // 监听播放
        $('#video').on('play', function () {
            that.data.play = true;
            that.onPlayOrPause();
        });
        // 监听暂停
        $('#video').on('pause', function () {
            that.data.play = false;
            that.onPlayOrPause();
        })

        /**
         * CSS
         */
        $(btn).css({
            width: '20px',
            height: '20px'
        })
    },

    // 播放\暂停
    onPlayOrPause() {
        let $animation = $('#animation'),
            $video = $('#video')[0],
            drag = this.data;

        $animation.attr({
            "from": drag.play ? drag.svg.pause : drag.svg.play,
            "to": drag.play ? drag.svg.play : drag.svg.pause
        }).get(0).beginElement();

        drag.play ? $video.play() : $video.pause();
    }
}