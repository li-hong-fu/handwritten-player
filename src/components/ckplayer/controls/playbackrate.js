export default {
    data: {
        // 默认倍速
        cur: 1,
        list: [
            [0.5, '0.5x'],
            [1, '1.0x'],
            [1.5, '1.5x'],
            [2, '2.0x']
        ]
    },
    init() {
        /**
         * 构建HTML
         */
        const parentNode = $('.el-player-controls-bottom-right')[0];
        const btn = $utils.createElm('div', { class: 'el-player-controls-btn' });
        const span = $utils.createElm('span');
        const ul = $utils.createElm('ul', { class: 'controls-btn-list backrate' });
        const li = this.data.list
            .map((v) => {
                return `
            <li class="controls-btn-item" data-key="${v[0]}">${v[1]}</li>
            `;
            })
            .join('');

        span.innerHTML = '倍速';
        ul.innerHTML = li;
        btn.append(span, ul);
        parentNode.appendChild(btn);

        /**
         * JS事件
         */
        let that = this;
        // 初始化倍速
        let list = $(ul)[0].childNodes;
        for (let i = 0; i < list.length; i++) {
            if (list[i].nodeType == 1) {
                let item = $(list[i]);
                if (Number(item.data('key')) === that.data.cur) item.addClass('active');
            }
        }
        $(btn).on('mouseover', this.onMouse); // 鼠标移入
        $(btn).on('mouseout', this.onMouse); // 鼠标离开
        $(ul).on('mousedown', this.onClick); // 鼠标点击

        /**
         * CSS样式
         */
        $(btn).css({
            'font-size': '14px',
            'text-align': 'center',
            'z-index': 2,
            height: '22px',
            'line-height': '22px'
        });
        $(ul).css({
            width: '70px',
            padding: 0,
            margin: 0,
            'box-sizing': 'border-box',
            'text-align': 'center'
        });
    },

    // hover事件
    onMouse(e) {
        let list = $(this).find('controls-btn-list');
        $(this).toggleClass('rotate');
        $(this).hasClass('rotate') ? list.show() : list.hide();
    },
    // 点击事件
    onClick(e) {
        let $video = $('#video')[0];
        let item = $(e.target);
        if (this === e.target) return;
        item.addClass('active').siblings().removeClass('active');
        let number = Number(item.data('key'));
        $video.playbackRate = number;
    }
};
