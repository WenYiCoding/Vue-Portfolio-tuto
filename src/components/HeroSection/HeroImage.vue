<template>
    <figure
    class="relative w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] md:w-[400px] md:h-[400px] flex justify-center
    items-center rounded-full mt-20 lg:mt-0"
    ref="imageContainer">
        <div class="absolute w-full h-full rounded-full bg-primary blur-2xl scale-[0.95] z-[-10]"
        ref="glowBackground"></div>
        <img
        src="/HeroPic.webp"
        alt="Hero Image"
        class="rounded-full w-full h-full object-cover relative z-20 border border-primary"
        ref="heroImage" />
    </figure>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const imageContainer = ref(null);
const glowBackground = ref(null);
const heroImage = ref(null);

onMounted(() => {
    gsap.fromTo(imageContainer.value, {
        opacity: 0,
        scale: 0.8,
        y: 50,
    }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
        delay: 1,
    });

    gsap.to(heroImage.value, {
        boxShadow: "0 0 20px 10px #17bbab",
        repeat: -1,
        yoyo: true,
        duration: 2,
        delay: 4,
        onRepeat: () => {
            gsap.to(heroImage.value, {
                boxShadow: "0 0 20px 10px #ffe600",
                repeat: 1,
                yoyo: true,
                duration: 1,
            });
        }
    });
});
</script>