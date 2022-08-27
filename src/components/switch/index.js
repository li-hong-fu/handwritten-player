export default {
    init() {
        const onSwitch = $utils.createElm('div', { class: 'el-switch' });
        const input = $utils.createElm('input', { class: 'el-switch_input', type: 'checkbox' });
        const core = $utils.createElm('span', { class: 'el-switch__core' });
        onSwitch.append(input, core);

        return onSwitch;
    }
};
