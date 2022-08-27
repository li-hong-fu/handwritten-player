/**
 * 公共函数
 */
export default {
    /**
     * 创建标签函数
     * @param {string} tag 标签
     * @param {object} objAttr 属性对象
     * @returns
     */
    createElm(tag, objAttr) {
        let el = document.createElement(tag);
        for (let attr in objAttr) {
            el.setAttribute(attr, objAttr[attr]);
        }
        return el;
    },
    /**
     * 创建svg标签函数
     * @param {string} tag 标签
     * @param {object} objAttr 属性对象
     */
    createSvgElm(tag, objAttr) {
        const ns = 'http://www.w3.org/2000/svg';
        const xlinkns = 'https://www.w3.org/1999/xlink';

        let el = document.createElementNS(ns, tag);
        if (tag === 'svg') {
            el.setAttribute('xmlns', ns);
            el.setAttribute('xmlns:xlink', xlinkns);
        }

        for (let k in objAttr) {
            if (k === 'xlink:href') {
                el.setAttributeNS(xlinkns, k, objAttr[k]);
            } else {
                el.setAttribute(k, objAttr[k]);
            }
        }

        return el;
    }
};
