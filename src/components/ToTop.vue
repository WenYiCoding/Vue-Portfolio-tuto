<template>
    <button
    v-if="showButton"
    @click="scrollToTop"
    class="bg-gradient-to-r from-secondary to-primary fixed bottom-8 right-8 text-white rounded-full 
    shadow-lg hover:bg-primary w-12 h-12 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'angles-up']"></font-awesome-icon>
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const showButton = ref(false);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

const checkScrollPosition = () => {
    showButton.value = window.scrollY > 300;
}

onMounted(() => {
    window.addEventListener('scroll', checkScrollPosition);
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkScrollPosition);
});
</script>