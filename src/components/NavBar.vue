<template>
    <div class="relative z-30 p-5">
        <!-- Open menu button -->
        <button
        ref="openMenuButton"
        class="bg-gradient-to-r from-secondary to-primary w-12 h-12 rounded-full p-2 cursor-pointer
        text-white"
        @click="toggleMenu">
            <font-awesome-icon :icon="['fas','bars']" class="font-bold text-xl"/>
        </button>

        <!-- Navigation menu -->
        <nav 
        ref="nav"
        class="fixed top-0 right-[-200vw] w-full bg-[#060b18] flex justify-center items-center
        h-screen transition-all duration-1000 ease-in-out"
        @click="closeMenu">
            <button
            ref="closeButton"
            class="bg-gradient-to-r from-secondary to-primary w-12 h-12 rounded-full p-2 cursor-pointer
            text-white absolute top-5 left-5 opacity-0 pointer-events-none">
                <font-awesome-icon :icon="['fas','xmark']" class="font-bold text-xl"/>
            </button>

            <!-- Links -->
            <ul class="list-none">
                <li class="my-12" v-for="(item, index) in menuItems" :key="index">
                    <a 
                    :href="`#${item.toLocaleLowerCase()}`"
                    class="text-white text-2xl font-medium opacity-0 pointer-events-none transition-opacity"
                    :style="{ transitionDelay: `${index * 0.2}s` }"
                    ref="menuLinks"
                    @click="closeMenu">
                        {{ item }}
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
const menuItems = ['Home', 'Services', 'Skills', 'About', 'Projects', 'Contact'];

// Refs for DOM elements
const nav = ref(null);
const openMenuButton = ref(null);
const closeButton = ref(null);
const menuLinks = ref(null);

// GSAP timeline for animations
const tl = gsap.timeline({ defaults: { duration:1, ease: 'expo.inOut' } }).pause();

// Animation setup
onMounted(() => {
    // Open menu animation
    tl.to(nav.value, { right: 0 })
      .to(nav.value, { height: "100vh" }, '-=.1')
      .to(menuLinks.value, { opacity: 1, pointerEvents: 'all', stagger: 0.2 }, '-=.8')
      .to(closeButton.value, { opacity: 1, pointerEvents: 'all' }, '-=.8');
});

// Toggle menu functionality
    const toggleMenu = () => {
        if (tl.reversed()) {
            tl.play();
        } else {
            tl.restart();
        }
    };

// Close menu functionality
const closeMenu = () => {
    tl.reverse();
};
</script>