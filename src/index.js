import ckplayer from '@/components/ckplayer';
import style from '@/style';
import { $video } from './local-data';

export default {
    init() {
        // 构建HTML
        const ELM = $utils.createElm('div', { id: 'app' });
        const CNTR = $utils.createElm('div', { class: 'el-container' });
        const PLAY = $utils.createElm('div', { class: 'el-player', id: 'ckplayer' });
        CNTR.appendChild(PLAY);
        ELM.appendChild(CNTR);

        // 初始化ckplayer
        new ckplayer({ el: PLAY, url: $video }).init();

        // CSS样式
        style.init();
        // ui样式
        style.elUI();

        return ELM;
    }
};
