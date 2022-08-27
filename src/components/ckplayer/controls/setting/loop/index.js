import _switch from '../../../../switch';

export default {
    init() {
        /**
         * 构建HTML
         */
        const parentNode = $('.setting-menu')[0];
        const li = $utils.createElm('li', { class: 'controls-btn-item bui setting-loop' });
        const span = $utils.createElm('span');
        span.innerHTML = '洗脑循环';
        li.append(span, _switch.init());
        parentNode.appendChild(li);

        /**
         * JS事件
         */
        $(li).on('mousedown', this.onClick);

        /**
         * CSS样式
         */
        $(span).css({
            'margin-right': '5px'
        });
    },

    onClick() {
        let state = $(this).find('el-switch').hasClass('is-checked');
        let $video = $('#video');
        if (state) {
            $(this).find('el-switch').removeClass('is-checked');
            $video.removeAttr({
                autoplay: false,
                loop: false
            });
        } else {
            $(this).find('el-switch').addClass('is-checked');
            $video.attr({
                autoplay: true,
                loop: true
            });
        }
    }
};
