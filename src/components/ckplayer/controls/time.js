
export default {
    init() {
        /**
         * 构建HTML
         */
        const parentNode = $('.el-player-controls-bottom-left')[0];
        const btn = $utils.createElm('div', { 'class': 'el-player-controls-btn' });
        const curTime = $utils.createElm('span');
        const divide = $utils.createElm('span');
        const totalTime = $utils.createElm('span');

        curTime.innerHTML = formatTime();
        divide.innerHTML = '/';
        totalTime.innerHTML = formatTime();

        btn.append(curTime, divide, totalTime);
        parentNode.appendChild(btn)



        /**
         * JS事件
         */
        // 监听视频是否可播放
        $('#video').on('canplay', function (e) {
            totalTime.innerHTML = formatTime(this.duration);
        });
        // 监听视频播放位置发生改变
        $('#video').on('timeupdate', function (e) {
            curTime.innerHTML = formatTime(this.currentTime);
        });


        /**
         * CSS
         */
        $(btn).css({
            cursor: 'auto'
        })
        $(divide).css({
            padding: '0 5px'
        })
    }
}