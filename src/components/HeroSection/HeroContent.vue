<template>
    <article class="max-w-[660px] mx-auto lg:mx-0">
        <header class="text-white capitalize font-bold leading-[100px] mb-[10px] text-4xl md:text-5xl
        lg:mb-[10px] lg:leading-[75px] md:leading-[45px] text-center lg:text-start" ref="textFile">
            <span class="block text-primary">Hello,</span>
            <span class="matrix-text" data-text="I am STEVE">I am STEVE</span>
            <h2 class="text-secondary text-[32px] capitalize font-semibold leading-[39px] mb-[20px] lg:text-[28px]
            md:text-[22px] md:mb-[10px] text-center lg:text-start" ref="subTitle">FullStack Developer</h2>
            <p class="text-white text-[19px] capitalize font-normal leading-[33px] mb-[30px]" ref="textDescription">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </header>
        <footer class="flex justify-center lg:justify-start" ref="buttonContainer">
            <Button label="Hire Me!!!" />
            <button class="ml-4 rounded-full border-2 border-primary font-semibold py-3 px-6 transition-all
            duration-300 hover:scale-105 flex items-center gap-2 text-primary">
                <font-awesome-icon :icon="['fas', 'download']" />
                <span>Download</span>
            </button>
        </footer>
    </article>
</template>

<script setup>
import Button from "@components/reusable/Button.vue";
import "@assets/style.css";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { animateWavyText } from "@utils/animations";

const textFile = ref(null);
const subTitle = ref(null);
const textDescription = ref(null);
const buttonContainer = ref(null);
onMounted(() => {
    animateWavyText(textFile.value,0.3);
    animateWavyText(textFile.value,0.6);
    animateWavyText(textFile.value,1);
    gsap.from(buttonContainer.value, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power2.out",
        delay: 1.5,
    });
});
</script>