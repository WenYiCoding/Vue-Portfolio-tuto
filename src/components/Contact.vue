<template>
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden" id="contact">
        <!-- Contact Form -->
        <div class="relative z-10 bg-ocean bg-opacity-40 backdrop-blur-md rounded-lg shadow-2xl p-8 
        w-11/12 md:w-1/2">
            <Title text="Contact Me" class="text-center"></Title>
            <form class="space-y-6">
                <!-- Name Field -->
                <div class="relative">
                    <input type="text" id="name" 
                    class="w-full px-4 py-2 bg-transparent border-b-2 border-gray-600 focus:border-primary 
                    focus:outline-none text-white placeholder-transparent" required />
                    <label for="name" 
                    class="absolute left-0 top-2 text-gray-400 transition-all duration-300 pointer-events-none">
                        Name
                    </label>
                </div>

                <!-- Email Field -->
                <div class="relative">
                    <input type="email" id="email" 
                    class="w-full px-4 py-2 bg-transparent border-b-2 border-gray-600 focus:border-primary 
                    focus:outline-none text-white placeholder-transparent" required />
                    <label for="email" 
                    class="absolute left-0 top-2 text-gray-400 transition-all duration-300 pointer-events-none">
                        Email
                    </label>
                </div>

                
                <!-- Message Field -->
                <div class="relative">
                    <textarea id="message" 
                    class="w-full px-4 py-2 bg-transparent border-b-2 border-gray-600 focus:border-primary 
                    focus:outline-none text-white placeholder-transparent" required rows="4"></textarea>
                    <label for="message" 
                    class="absolute left-0 top-2 text-gray-400 transition-all duration-300 pointer-events-none">
                        Message
                    </label>
                </div>

                <!-- Submit Button -->
                <Button label="Send Message"></Button>
            </form>
        </div>
    </section>
</template>

<script setup>
import Title from "@components/reusable/Title.vue"
import Button from "@components/reusable/Button.vue"

import { onMounted } from 'vue'
import { gsap } from "gsap"

onMounted(() => {
    const inputs = document.querySelectorAll('input , textarea');
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            const label = input.nextElementSibling;
            gsap.to(label, {
                top: '-12px',
                fontSize: '12px',
                color: '#a78bfa',
                duration: 0.3,
            });
        });

        input.addEventListener('blur', () => {
            const label = input.nextElementSibling;
            if (!input.value) {
                gsap.to(label, {
                    top: '8px',
                    fontSize: '16px',
                    color: '#9ca3af',
                    duration: 0.3,
                });
            }
        });
    });
});
</script>