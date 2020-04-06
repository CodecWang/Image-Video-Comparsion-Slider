/* 
 * 视频&图片滑动对比组件
 * Author: codec.wang
 * Blog: https://codec.wang
 * 欢迎Star: https://github.com/ex2tron/Image-Video-Comparsion-Slider
 */

'use strict'

let data = {
    width: 0,       // 组件宽度
    start: false,   // 是否开始滑动
    reserve: 55,    // 左右预留不可滑动区域大小
}

/* 调整网页大小时，重置组件大小和滑块位置 */
window.onresize = () => {
    initPosition();
}

function initPosition() {
    const backVideo = document.getElementById("video-background"); // 下层视频
    const overlayVideo = document.getElementById("video-overlay"); // 上层视频
    const slider = document.getElementById("slider"); // 滑动条

    const { offsetWidth: width } = backVideo;
    data.width = width;
    overlayVideo.style.width = (width / 2) + "px";
    slider.style.left = (width / 2) - (slider.offsetWidth / 2) + "px";
}

function initCompare() {
    initPosition();

    const tipA = document.getElementById("tip-a");  // 标签A
    const tipB = document.getElementById("tip-b");  // 标签B
    const overlayVideo = document.getElementById("video-overlay"); // 上层视频
    const slider = document.getElementById("slider"); // 滑动条

    /* 添加鼠标&触控滑动事件 */
    slider.addEventListener("mousedown", startSlide);
    window.addEventListener("mouseup", endSlide);
    slider.addEventListener("touchstart", startSlide);
    window.addEventListener("touchstop", endSlide);

    function startSlide() {
        data.start = true;
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }

    function endSlide() {
        data.start = false;
    }

    function slideMove(e) {
        if (!data.start) return false;

        let videoPos, x;
        videoPos = overlayVideo.getBoundingClientRect(); // 组件坐标
        // 滑块相对坐标 = 当前滑动位置 - 组件坐标 (如果横向滚动，再减去横向滚动坐标)
        x = e.pageX - videoPos.left - window.pageXOffset;
        if (x < 0) x = 0;
        if (x > data.width) x = data.width;
        slide(x);
    }

    function slide(x) {
        // 左右留有一定的不可滑动区域
        if (x < data.reserve || x > (data.width - data.reserve)) return;

        // 设置上层视频(div)宽度和滑动条的位置
        overlayVideo.style.width = x + "px";
        slider.style.left = overlayVideo.offsetWidth - (slider.offsetWidth / 2) + "px";

        // 更改提示字符的透明度
        const ratio = x / data.width;
        tipA.style.opacity = ratio;
        tipB.style.opacity = 1 - ratio;
    }
}

initCompare();