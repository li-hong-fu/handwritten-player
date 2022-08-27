export default {
    data: {
        circle: null, // 圆dom
        lineA: null, // 线1dom
        lineB: null, // 线2dom
        volume: 0.5, //默认音量，范围0-1
        dx: 0, // 滑动偏移值
        maxX: 0, // 最大偏移值
        minX: 0, // 最小便宜值
        curCx: 0, // 当前偏移位置
        interact: false,

        memory: {
            flag: true,
            last: 0
        },
        svg: {
            off: 'M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m146.793334 296.2a21.333333 21.333333 0 0 0-3.526667 29.96 127.366667 127.366667 0 0 1 0 158.346666 21.333333 21.333333 0 0 0 33.493333 26.433334 170.733333 170.733333 0 0 0 0-211.213334 21.333333 21.333333 0 0 0-29.966666-3.526666z m212.213333-19.3A339.393333 339.393333 0 0 0 753.333333 270.666667a346.585333 346.585333 0 0 0-22.046666-20.213334 21.333333 21.333333 0 1 0-27.446667 32.666667c6.666667 5.586667 13.146667 11.553333 19.333333 17.726667C779.6 357.22 810.666667 432.22 810.666667 512s-31.066667 154.78-87.48 211.186667c-6.173333 6.173333-12.666667 12.14-19.333334 17.726666a21.333333 21.333333 0 1 0 27.446667 32.666667 346.585333 346.585333 0 0 0 22.046667-20.213333 341.706667 341.706667 0 0 0 74.98-369.793334z',
            no: 'M0.002433 672V352a53.393333 53.393333 0 0 1 53.333334-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.335767 106.666667v189.413333L41.435767 724A53.42 53.42 0 0 1 0.002433 672z m633.753334-452.42a21.333333 21.333333 0 0 0-30.173334 0l-597.333333 597.333333a21.333333 21.333333 0 0 0 30.173333 30.173334L158.1691 725.333333h67.666667l207.08 207.086667A21.333333 21.333333 0 0 0 469.335767 917.333333V414.166667l164.42-164.413334a21.333333 21.333333 0 0 0 0-30.173333z'
        }
    },
    init() {
        /**
         * 构建HTML
         */
        const parentNode = $('.el-player-controls-bottom-right')[0];
        const btn = $utils.createElm('div', { class: 'el-player-controls-btn' });
        const icon = $utils.createSvgElm('svg', {
            width: '18',
            height: '18',
            viewBox: '0 0 1024 1024'
        });
        const icon_path = $utils.createSvgElm('path', { id: 'volume', d: this.data.svg.off });
        const slide = $utils.createElm('div', { class: 'controls-btn-list volume' });
        const slideSvg = $utils.createSvgElm('svg', { width: 110, height: 18 });
        const slidelineB = $utils.createSvgElm('line', {
            id: 'volume-line-b',
            class: 'volElem',
            stroke: '#fff',
            x1: 10,
            y1: 10,
            x2: 100,
            y2: 10
        });
        const slidelineA = $utils.createSvgElm('line', {
            id: 'volume-line-a',
            class: 'volElem',
            stroke: '#2196f3',
            x1: 10,
            y1: 10,
            x2: 100,
            y2: 10
        });
        const slideCircle = $utils.createSvgElm('circle', {
            id: 'volume-line-circle',
            cx: 100,
            cy: 10,
            r: 6,
            fill: '#2196f3'
        });
        icon.appendChild(icon_path);
        slideSvg.append(slidelineB, slidelineA, slideCircle);
        slide.appendChild(slideSvg);
        btn.append(icon, slide);
        parentNode.appendChild(btn);

        this.data = {
            ...this.data,
            circle: slideCircle, // 圆dom
            lineA: slidelineA, // 线1dom
            lineB: slidelineB, // 线2dom
            maxX: Number($(slideCircle).attr('cx')),
            minX: Number($(slidelineA).attr('x1')),
            curCx: Number($(slideCircle).attr('cx'))
        };

        /**
         * JS事件
         */
        let that = this;
        // 初始化音量条
        this.volume = that.data.volume;
        that.data.curCx = this.volume * 100;
        that.onAnimate();

        $(btn).on('mouseover', this.onMouse); // 鼠标移入
        $(btn).on('mouseout', this.onMouse); // 鼠标离开
        $(icon).on('mousedown', (e) => {
            this.onClick(e);
        });
        $(slidelineB).on('mousedown', (e) => {
            this.onDrag(e);
        });
        $(slidelineA).on('mousedown', (e) => {
            this.onDrag(e);
        });
        $(slideCircle).on('mousedown', (e) => {
            this.onDrag(e);
        });

        /**
         * CSS样式
         */
        $(btn).css({
            display: 'flex',
            'align-items': 'center'
        });
    },

    // hover事件
    onMouse(e) {
        let list = $(this).find('controls-btn-list');
        $(this).toggleClass('rotate');
        $(this).hasClass('rotate') ? list.show() : list.hide();
    },
    // 点击图标
    onClick(e) {
        e.preventDefault();
        let drag = this.data;
        drag.dx = 0;

        if (drag.memory.flag) {
            drag.memory.flag = false;
            drag.memory.last = drag.curCx;
            drag.curCx = 0;
            this.onAnimate();
        } else {
            drag.memory.flag = true;
            drag.curCx = drag.memory.last;
            this.onAnimate();
        }
    },
    // 拖动滑动条
    onDrag(e) {
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

    onAnimate() {
        let drag = this.data;
        drag.curCx += drag.dx;

        let cx = drag.curCx;
        let $video = $('#video')[0];
        let icon = $('#volume');

        if (cx > drag.maxX) cx = drag.maxX;
        if (cx < drag.minX) cx = drag.minX;

        $(drag.circle).attr('cx', cx);
        $(drag.lineA).attr('x2', cx);

        // 修改音量
        let sound = (cx - drag.minX) / (drag.maxX - drag.minX);
        $video.volume = sound;

        if ($video.volume === 0) {
            $video.muted = true;
            icon.attr({
                d: this.data.svg.no
            });
        } else {
            $video.muted = false;
            icon.attr({
                d: this.data.svg.off
            });
        }
    }
};
