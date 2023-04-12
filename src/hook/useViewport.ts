import { ref } from 'vue';

const vw = ref(document.documentElement.clientWidth)
const vh = ref(document.documentElement.clientHeight)
window.addEventListener('resize', (e) => {
    // console.log(e)
    vw.value = document.documentElement.clientWidth
    vh.value = document.documentElement.clientHeight
})
export default function () {
    return {
        vw,
        vh
    }
}