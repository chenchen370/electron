
export default {
    // 指令的定义
    inserted: function (el) {
        el.onmousedown = function (e) {
            let l = e.clientX - el.offsetLeft;
            let t = e.clientY - el.offsetTop;
            document.onmousemove = function (e) {
                el.style.left = e.clientX - l + 'px';
                el.style.top = e.clientY - t + 'px';
            };
            el.onmouseup = function () {
                document.onmousemove = null;
                el.onmouseup = null;
            };
        };
    },
}