<template>
    <section class="py-16 relative overflow-hidden" ref="servicesSection" id="services">
        <div class="max-w-screen-xl mx-auto px-6 text-center">
            <!-- Title -->
            <Title text="Transform Your Digital Experience" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <!-- Service Cards -->
                <div
                v-for="(service, index) in services"
                :key="index"
                :ref="(el) => (serviceCards[index] = el)"
                class="relative"
                >
                    <div class="bg-ocean bg-opacity-20 backdrop-blur-md rounded-lg shadow-2xl p-8 hover:scale-105 transform
                    transition-all duration-300 border-2 border-transparent hover:border-primary">
                        <div class="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/20 rounded-full
                        relative z-10">
                            <font-awesome-icon :icon="service.icon" class="text-3xl text-primary" />
                        </div>
                        <h3 class="text-3xl font-bold text-primary relative z-10"> {{ service.title }} </h3>
                        <p class="text-white opacity-80 mt-4 relative z-10"> {{ service.description }} </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import Title from '@components/reusable/Title.vue';

const services = [
    {
        icon: ['fas', 'code'],
        title: 'Web Development',
        description: 'Crafting responsive and engaging websites tailored to your business needs.',
    },
    {
        icon: ['fas', 'mobile-alt'],
        title: 'Mobile App Development',
        description: 'Building intuitive and user-friendly mobile applications for iOS and Android platforms.',
    },
    {
        icon: ['fas', 'computer'],
        title: 'Custom Software Development',
        description: 'Creating bespoke software solutions that streamline your business processes and enhance productivity.',
    },
];

const serviceCards = ref([]);
const servicesSection = ref(null);

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            gsap.fromTo(servicesSection.value, {opacity: 0}, {opacity: 1, duration: 2});
            gsap.fromTo(serviceCards.value, 
                {opacity: 0, y: 50, rotation: -15},
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    stagger: 0.3,
                    duration: 2,
                    ease: 'power3.out',
                }
            );

            observer.unobserve(entry.target);
        }
    });
};

onMounted(() => {
    const observer = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 0.1,
    });

    if (servicesSection.value) {
        observer.observe(servicesSection.value);
    }
});
</script>