<template>
    <button class="relative overflow-visible outline-none border-none rounded-full px-4 py-1 md:px-8
    md:py-3 bg-gradient-to-r from-secondary to-primary text-white font-bold text-lg transition-all
    duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_#1D2B53,0_0_40px_#FFE600] min-w-[100px]"
    @mouseenter="animateButton">
        <!-- Button Text -->
        <span :class="`${buttonStyle} relative z-10 text-shadow-[0_0_5px_rgba(255,255,255,0.8)
        ,0_0_10px_rgba(255,255,255,0.6),0_0_20px_rgba(255,255,255,0.4)]`">
            {{ label }}
        </span>

        <!-- Wave -->
        <svg
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            class="absolute top-1/2 left-[15%] w-[70%] transform -translate-y-1/2 z-0 overflow-visible">
            <polyline
                ref="wibble"
                stroke="rgba(255, 255, 255, 0.3)"
                fill="none"
                stroke-width="40"
                stroke-linecap="round"
                stroke-linejoin="round">
            </polyline>
        </svg>
    </button>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';

const wibble = ref(null);
const pointsArray = ref([]);
const isAnimating = ref(false);

// Initialize SVG points
const initializePoints = () => {
    const svg = wibble.value.ownerSVGElement;
    const width = 100;
    const points = 30;
    const spacing = width / points;

    for (let i = 0; i <= points; i++) {
        const point = svg.createSVGPoint();
        point.x = i * spacing;
        point.y = 25;
        wibble.value.points.appendItem(point);
        pointsArray.value.push(point);
    }
};

// Animate button on hover
const animateButton = () => {
    if (isAnimating.value) return;
    isAnimating.value = true;
    pointsArray.value.forEach((point, index) => {
        const mapper = gsap.utils.mapRange(0, pointsArray.value.length,0,0.4);
        if (index === 0 ) {
            gsap
            .to(point, {
                keyframes: [
                    { y: "+=6", ease: 'Sine.easeInOut' },
                    { y: "-=12", ease: 'Sine.easeInOut' },
                    { y: "+=6", ease: 'Sine.easeInOut' },
                ],
                yoyo: true,
                duration: 0.6,
                onComplete: () => {
                    isAnimating.value = false;
                }
            })
            .progress(mapper(index));
        } else {
            gsap
            .to(point, {
                keyframes: [
                    { y: "+=6", ease: 'Sine.easeInOut' },
                    { y: "-=12", ease: 'Sine.easeInOut' },
                    { y: "+=6", ease: 'Sine.easeInOut' },
                ],
                yoyo: true,
                duration: 0.6,
            })
            .progress(mapper(index));
        }
    });
};

onMounted(() => {
    initializePoints();
});

const props = defineProps({
    label: String,
    buttonStyle: {
        type: String,
        default: ''
    }
});
</script>