<template>
    <div class="bg-cover bg-center h-full relative group overflow-hidden rounded-xl shadow-2xl transform
    transition-all duration-500 ease-in-out hover:scale-105"
    :style="{backgroundImage: `url(${image})`}">
        <div class="absolute inset-0 bg-ocean/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0
        group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-500">
            <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
            <p class="text-sm mb-4">{{ description }}</p>
            <Button label="View Project" buttonStyle="text-sm"></Button>
        </div>
    </div>
</template>

<script setup>
import Button from "@components/reusable/Button.vue";
const props = defineProps({
    title: String,
    description: String,
    image: String,
    link: String,
});
</script>