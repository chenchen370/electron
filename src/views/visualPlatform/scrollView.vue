<template>
    <div ref="scrollRef" class="out-box" @wheel="handleScroll($event)" @mousedown="handleMoseDown($event)"
        @mouseup="handleMouseUp($event)" @mouseleave="($event) => { handleMouseUp($event); startAutoScroll(); }"
        @mousemove="handleMouseMove($event)">
        <slot></slot>
    </div>
</template>
<script setup lang="jsx">
let timer = null;
let scrollDirection = 'left';
const minScrollLeft = 0;
const maxScrollLeft = 250;


const isMouseDown = ref(true);
const startX = ref(0);
const scrollLeft = ref(0);
const scrollRef = ref(null);

onMounted(() => {
    startAutoScroll();
})

const startAutoScroll = () => {
    timer = setInterval(() => {
        let l = scrollDirection == 'left' ? scrollLeft.value + 3 : scrollLeft.value - 3;
        if (l >= maxScrollLeft) {
            scrollDirection = 'right'
        }
        if (l <= 0) {
            scrollDirection = 'left'
        }
        scrollLeft.value = l;
        if(scrollRef.value.scrollLeft) scrollRef.value.scrollLeft = l;
    }, 100)
}
const stopAutoScroll = () => {
    clearInterval(timer);
}
//鼠标滚动左右移动
const handleScroll = (e) => {
    // e.wheelDelta或者e.detail判断滚轮方向
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail))
    // 控制左右滚动的距离
    e.currentTarget.scrollLeft -= delta * 100
    e.preventDefault()
}

const handleMouseUp = () => {
    isMouseDown.value = false
}
const handleMoseDown = (event) => {
    isMouseDown.value = true
    startX.value = event.clientX;
    scrollLeft.value = scrollRef.value.scrollLeft;
}
//鼠标移动
const handleMouseMove = (event) => {
    stopAutoScroll();
    if (isMouseDown.value) {
        let moveX = event.clientX;
        let scrollX = moveX - startX.value;
        scrollRef.value.scrollLeft = scrollLeft.value - scrollX
    }
}
</script>
<style lang="scss" scoped>
.out-box {
    width: 150px;
    overflow-x: auto;
    -ms-overflow-style: none;
    /* 隐藏滚动条 */
    scrollbar-width: none;

    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
        display: none;
        /* 隐藏滚动条 */
    }
}
</style>