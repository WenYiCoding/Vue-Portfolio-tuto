<template>
    <section class="py-16 text-white relative" ref="aboutSection" id="about">
        <div class="max-w-screen-xl mx-auto px-6 text-center">
            <Title text="About Me"></Title>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                <!-- Education -->
                <div ref="educationSection" class="opacity-0 transform -translate-x-10">
                    <Education></Education>
                </div>
                <!-- Experience -->
                <div ref="experienceSection" class="opacity-0 transform translate-x-10">
                    <Experience></Experience>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import Title from '@components/reusable/Title.vue';
import Education from '@components/About/Education.vue';
import Experience from '@components/About/Experience.vue';

const educationSection = ref(null);
const experienceSection = ref(null);

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const target = entry.target;

            gsap.to(target, {opacity:1, x:0, duration: 1, ease: 'power3.out'});
            observer.unobserve(target);
        }
    });
}

onMounted(() => {
    const observer = new IntersectionObserver(observerCallback, {root: null, threshold: 0.1});
    if (educationSection.value) {
        observer.observe(educationSection.value)
    }
    if (experienceSection.value) {
        observer.observe(experienceSection.value)
    }
})
</script>