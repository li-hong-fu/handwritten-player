export default {
    // 数据集
    data: {
        lineB: null,
        lineA: null,
        circle: null,
        dx: 0,
        maxX: 0,
        minX: 0,
        curCx: 0
    },
    init() {
        /**
         * 构建HTML
         */
        const parentNode = $('.el-player-controls-top')[0];
        const width = parentNode.clientWidth;
        const progress = $utils.createElm('div', { class: 'el-player-controls-progress' });
        const oSvg = $utils.createSvgElm('svg', { id: 'progress', width: width, height: 8 });
        const lineB = $utils.createSvgElm('line', {
            x1: 0,
            y1: 4,
            x2: width,
            y2: 4,
            fill: 'none',
            stroke: '#999',
            'stroke-width': 4,
            opacity: '0.5',
            id: 'progress-line-b'
        });
        const lineA = $utils.createSvgElm('line', {
            x1: 0,
            y1: 4,
            x2: 0,
            y2: 4,
            fill: 'none',
            stroke: '#2196f3',
            'stroke-width': 4,
            id: 'progress-line-a'
        });
        const circle = $utils.createSvgElm('circle', {
            cx: 0,
            cy: 4,
            r: 3,
            fill: 'none',
            stroke: '#2196f3',
            'stroke-width': 6,
            id: 'progress-line-circle'
        });

        oSvg.append(lineB, lineA, circle);
        progress.appendChild(oSvg);
        parentNode.appendChild(progress);

        // 赋值到data
        this.data = {
            lineB,
            lineA,
            circle,
            dx: 0,
            maxX: Number($(lineB).attr('x2')),
            minX: Number($(lineA).attr('x1')),
            curCx: Number($(circle).attr('cx'))
        };

        /**
         * js事件
         */
        let that = this;
        $(lineB).on('mousedown', function (e) {
            that.onSilder(e);
        });
        $(lineA).on('mousedown', function (e) {
            that.onSilder(e);
        });
        $(circle).on('mousedown', function (e) {
            that.onSilder(e);
        });
        // 监听视频播放位置发生改变
        $('#video').on('timeupdate', function (e) {
            let cx = (this.currentTime / this.duration) * (that.data.maxX + that.data.minX);
            if (isNaN(cx)) return;
            cx = Math.round(cx * 10) / 10;
            that.data.curCx = cx;

            $(that.data.circle).attr('cx', cx);
            $(that.data.lineA).attr('x2', cx);
        });
    },

    // 滑动
    onSilder(e) {
        e.preventDefault();
        let that = this;
        let target = e.target;
        let startX = e.pageX || window.event.pageX;
        let drag = this.data;

        if (target == drag.lineA || target == drag.lineB) {
            let rect = drag.circle.getBoundingClientRect();
            let center = (rect.left + rect.right) / 2.0;
            drag.dx = startX - center;
            this.onAnimate();
        }

        document.onmousemove = function (e) {
            e.preventDefault();
            let curX = e.pageX || window.event.pageX;
            drag.dx = curX - startX;
            startX = curX;
            that.onAnimate();
        };

        document.onmouseup = function () {
            if (drag.curCx < drag.minX) drag.curCx = drag.minX;
            if (drag.curCx > drag.maxX) drag.curCx = drag.maxX;
            // 取消鼠标移动事件
            document.onmousemove = null;
            // 取消鼠标抬起事件
            document.onmouseup = null;
        };
    },
    // 动画
    onAnimate() {
        let drag = this.data;
        drag.curCx += drag.dx;
        let cx = drag.curCx;
        let $vd = $('#video')[0];
        if (cx > drag.maxX) cx = drag.maxX;
        if (cx < drag.minX) cx = drag.minX;

        drag.circle.setAttribute('cx', cx);
        drag.lineA.setAttribute('x2', cx);

        let sound = (cx - drag.minX) / (drag.maxX - drag.minX);

        $vd.currentTime = $vd.duration * sound;
    }
};
