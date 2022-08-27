export default {
    init() {
        const primary = $('.el-player-primary-wrap')[0];
        const btnBox = $utils.createElm('div', { 'class': 'el-player-btn-box' });
        const btn = $utils.createElm('div', { 'class': 'el-player-btn' });
        const oSvg = $utils.createSvgElm('svg', {
            'width': '50',
            'height': '50',
            'viewBox': '-10 -10 50 50',
        });
        const polygon = $utils.createSvgElm('polygon', {
            'stroke-linejoin': 'round',
            'points': '0,0 0,30 25,15',
            'stroke': '#fff',
            'stroke-width': 8
        });
        oSvg.appendChild(polygon);
        btn.appendChild(oSvg);
        btnBox.appendChild(btn);
        primary.append(btnBox);


        /**
         * js事件
         */
        $(btn).on('click', function () {
            // 点击播放
            $('#video')[0].play()
        });
        $('.el-player-video-box').on('click', function () {
            // 点击暂停
            $('#video')[0].pause()
        });
        // 监听播放
        $('#video').on('play', function () {
            $(btnBox).hide()
        });
        // 监听暂停
        $('#video').on('pause', function () {
            $(btnBox).show()
        })
    },

}

