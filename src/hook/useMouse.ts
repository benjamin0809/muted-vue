const x = ref(0)
const y = ref(0)
window.addEventListener('mousemove', (e) => {
    x.value = e.clientX
    y.value = e.clientY
})
export default function() {
    return {
        x,
        y
    }
}