export default {
    init(props) {
        /**
         * 构建HTML
         */
        const parentNode = $('.el-player-controls-bottom-right')[0];
        const btn = $utils.createElm('div', { class: 'el-player-controls-btn' });
        const span = $utils.createElm('span');
        const ul = $utils.createElm('ul', { class: 'controls-btn-list quality' });
        const li = props.url
            .map((v) => {
                return `
            <li class="controls-btn-item" data-key="${v.id}">${v.title}</li>
            `;
            })
            .join('');
        ul.innerHTML = li;
        btn.append(span, ul);
        parentNode.appendChild(btn);

        /**
         * JS
         */
        // 初始化
        let list = $(ul)[0].childNodes;
        for (let i = 0; i < list.length; i++) {
            if (list[i].nodeType == 1) {
                let item = $(list[i]);
                if (item.data('key') === props.quality) {
                    span.innerHTML = list[i].innerHTML;
                    item.addClass('active');
                }
            }
        }
        $(btn).on('mouseover', this.onMouse); // 鼠标移入
        $(btn).on('mouseout', this.onMouse); // 鼠标离开
        $(ul).on('mousedown', this.onClick); // 鼠标点击

        /**
         * CSS
         */
        $(ul).css({
            width: '70px',
            padding: 0,
            margin: 0,
            'box-sizing': 'border-box',
            'text-align': 'center'
        });
    },

    // hover事件
    onMouse() {
        let list = $(this).find('controls-btn-list');
        $(this).toggleClass('rotate');
        $(this).hasClass('rotate') ? list.show() : list.hide();
    },
    // 点击切换清晰度
    onClick(e) {
        let $video = $('#video')[0];
        let item = $(e.target);
        let url = $video.currentSrc; // 当前播放资源地址
        let nowsTime = $video.currentTime; // 当前播放位置
        let nowsPlaybackRate = $video.playbackRate; // 当前播放倍速
        let nowsVolume = $video.volume;

        if (this === e.target) return;

        item.addClass('active').siblings().removeClass('active');
        url = url.substring(0, url.length - 7) + '_' + item.data('key') + '.mp4';

        $($video).find('source').attr('src', url); // 替换播放资源地址
        $video.load(); // 重新加载视频
        $video.play();
        $video.currentTime = nowsTime; // 定位播放位置
        $video.playbackRate = nowsPlaybackRate; // 定位播放倍速
        $video.volume = nowsVolume; // 定位音量
    }
};
