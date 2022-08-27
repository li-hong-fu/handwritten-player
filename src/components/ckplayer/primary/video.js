export default {
    init(props) {
        /**
         * 构建HTML
         */
        const primary = $('.el-player-primary-wrap')[0];
        const videoBox = $utils.createElm('div', { class: 'el-player-video-box' });
        const video = $utils.createElm('video', { id: 'video' });
        const source = $utils.createElm('source', { class: 'source', type: 'video/mp4' });
        video.appendChild(source);
        videoBox.appendChild(video);
        primary.appendChild(videoBox);

        /**
         * JS
         */
        let url = null;
        props.url.forEach((v) => {
            if (v.id === props.quality) url = v.url;
        });
        $(video).find('source').attr('src', url);

        /**
         * CSS
         */
        $(video).attr({ width: props.width, height: props.height });
    }
};
