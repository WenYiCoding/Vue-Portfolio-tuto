<template>
    <section class="min-h-screen relative z-1 overflow-hidden" ref="section" id="home">
        <div class="px-16 flex justify-center">
            <article class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full py-20">
                <!-- Left Column - Text Content -->
                <header class="flex flex-col justify-center text-center md:text-left">
                    <HeroContent />
                </header>

                <!-- Right Column - Image -->
                <figure class="relative flex items-center justify-center">
                    <HeroImage />
                </figure>
            </article>
        </div>
    </section>
</template>

<script setup>
import HeroContent from '@components/HeroSection/HeroContent.vue';
import HeroImage from '@components/HeroSection/HeroImage.vue';
</script>