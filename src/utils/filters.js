/* 时间格式化 */
export function formatTime(time) {
    if (typeof time !== 'number') return '00:00:00';

    // 获取小时
    let hour = parseInt(time / (60 * 60));
    hour = hour < 10 ? '0' + hour : hour;
    // 获取分钟
    let minute = parseInt((time % (60 * 60)) / 60);
    minute = minute < 10 ? '0' + minute : minute;
    // 获取秒钟
    let second = Math.ceil(time % 60);
    second = second < 10 ? '0' + second : second;

    return `${hour}:${minute}:${second}`;
}
