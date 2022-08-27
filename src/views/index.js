import ckplayer from "@/components/ckplayer";

export default {
    init() {
        const el = $utils.createElm('div', { 'class': 'el-player', 'id': 'ckplayer' });

        new ckplayer({ el, ...this.data() }).init()

        return el;
    },

    // 数据集
    data() {
        return {
            video: 'https://vd3.bdstatic.com/mda-necdpkcmkn9cwhdi/cae_h264/1652437613223589886/mda-necdpkcmkn9cwhdi.mp4?v_from_s=hkapp-haokan-hnb&auth_key=1652512379-0-0-aed25e73ffa632c8152b0288be2fd1d7&bcevod_channel=searchbox_feed&pd=1&cd=0&pt=3&logid=2579787462&vid=10977182931375161957&abtest=101830_1-102133_2-17451_1&klogid=2579787462'
        }
    }
}