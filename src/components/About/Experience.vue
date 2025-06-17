<template>
    <div>
        <h3 class="text-2xl font-bold mb-4">Experience</h3>
        <ul class="space-y-4">
            <li v-for="(job, index) in experience" :key="index" class="text-lg relative">
                <div
                class="bg-ocean bg-opacity-20 backdrop-blur-md rounded-lg shadow-2xl p-8 hover:scale-105
                transform transition-all duration-300 border-2 border-transparent hover:border-primary">
                    <h3 class="text-xl font-bold text-primary relative z-10">
                        {{ job.role }} - {{ job.company }}
                    </h3>
                    <span class="block text-sm text-white">
                        {{ job.duration }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const experience = ref([
    {
        role: 'Support Engineer',
        company: 'WESS',
        duration: '2015 - 2019',
    },
    {
        role: 'QA Automation Engineer',
        company: 'SNSoft',
        duration: '2015 - 2019',
    },
]);
</script>