<template>
    <section class="py-16 text-white relative overflow-hidden" id="projects">
        <div class="max-w-screen-xl mx-auto px-6 text-center">
            <Title text="My Projects"></Title>
            <!-- Next & Previous Buttons -->
            <nav id="nav">
                <button class="rounded-full border-2 border-primary text-primary font-semibold py-3
                px-6 transition-all duration-300 hover:scale-105" id="prev" @click="rotate('prev')">
                    <font-awesome-icon :icon="['fas', 'angles-left']"></font-awesome-icon>
                </button>
                <button class="ml-2 rounded-full border-2 border-primary text-primary font-semibold py-3
                px-6 transition-all duration-300 hover:scale-105" id="next" @click="rotate('next')">
                    <font-awesome-icon :icon="['fas', 'angles-right']"></font-awesome-icon>
                </button>
            </nav>

            <div class="relative flex justify-end">
                <!-- Carousel Container -->
                <div ref="stage" class="w-1/2 h-[400px] relative flex justify-center items-center [transform-style:preserve-3d] mx-auto">
                    <div 
                    v-for="(project, index) in projects"
                    :key="index"
                    class="box absolute w-[200px] h-[250px] transition-transform duration-500 ease-[ease]
                    [transform-origin:50%_50%_-420px]"
                    :style="getCardStyle(index)">
                        <projectCard :title="project.title" :description="project.description" :image="project.image" :link="project.link"></projectCard>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Title from "@components/reusable/Title.vue";
import projectCard from "@components/Projects/projectCard.vue";
import { onMounted, ref } from 'vue';
import { transform } from "@vue/compiler-core";

const projects = ref([
    {
        title: 'project 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/project1.jpg',
        link: '#',
    },
    {
        title: 'project 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/project2.jpg',
        link: '#',
    },
    {
        title: 'project 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/project3.jpg',
        link: '#',
    },
]);

const stage = ref(null);
const anglesStep = 360/projects.value.length;
const radius = 250;

const initializeCarousel = () => {
    const boxes = document.querySelectorAll('.box');
    const perspective = 1100;

    // Set perspective and 3D transform
    stage.value.style.perspective = `${perspective}px`;
    stage.value.style.transformStyle = 'preserve-3d';

    boxes.forEach((box, index) => {
        const angle = index * anglesStep;
        box.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        box.dataset.rotationY = angle;
    })
}

const getCardStyle = (index) => {
    const angle = anglesStep * index;

    return {
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`
    }
}

const rotate = (direction) => {
    const boxes = document.querySelectorAll(".box");
    const rotationChange = direction === 'next' ? anglesStep : -anglesStep;
    boxes.forEach((box) => {
        const currentRotationY = parseFloat(box.dataset.rotationY);
        const newRotationY = currentRotationY + rotationChange;
        box.dataset.rotationY = newRotationY;
        box.style.transform = `rotateY(${newRotationY}deg) translateZ(${radius}px)`
    });
}

onMounted(() => {
    initializeCarousel();
});
</script>

<style>
#nav {
    text-align: center;
    margin-top: 20px;
}
</style>