<template>
  <div>
    <Suspense>
      <template #default>
        <div>
          <ThreeBackground />
          <NavBar></NavBar>
          <HeroSection></HeroSection>
          <Services></Services>
          <Skills></Skills>
          <About></About>
          <Projects></Projects>
          <Contact></Contact>
          <Footer></Footer>
          <ToTop></ToTop>
        </div>
      </template>
      <template #fallback>
        <LoadingSpinner></LoadingSpinner>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, onUnmounted } from 'vue';
import LoadingSpinner from '@components/LoadingSpinner.vue';
const ThreeBackground = defineAsyncComponent(() => import('@components/ThreeBackground.vue'));
const NavBar = defineAsyncComponent(() => import('@components/NavBar.vue'));
const HeroSection = defineAsyncComponent(() => import('@components/HeroSection/HeroSection.vue'));
const Services = defineAsyncComponent(() => import('@components/Services.vue'));
const Skills = defineAsyncComponent(() => import('@components/Skills.vue'));
const About = defineAsyncComponent(() => import('@components/About/About.vue'));
const Projects = defineAsyncComponent(() => import('@components/Projects/Project.vue'));
const Contact = defineAsyncComponent(() => import('@components/Contact.vue'));
const Footer = defineAsyncComponent(() => import('@components/Footer.vue'));
const ToTop = defineAsyncComponent(() => import('@components/ToTop.vue'));

// Create observer
let observer;
const sectionTitles = [
  { selector: '#home .matrix-text', title: 'WYSomething', favicon: '/favicon/home/home-512x512.png' },
  { selector: '#services .matrix-text, #services .text-3xl.font-bold', title: 'Services', favicon: '/favicon/services/services-512x512.png' },
  { selector: '#skills .matrix-text, #skills .text-3xl.font-bold', title: 'My Skills', favicon: '/favicon/skills/skills-512x512.png' },
  { selector: '#about .matrix-text, #about .text-3xl.font-bold', title: 'About Me', favicon: '/favicon/about/about-512x512.png' },
  { selector: '#projects .matrix-text, #projects .text-3xl.font-bold', title: 'My Projects', favicon: '/favicon/projects/projects-512x512.png' },
  { selector: '#contact .matrix-text, #contact .text-3xl.font-bold', title: 'Contact Me', favicon: '/favicon/contact/contact-512x512.png' },
];

function updateTitle(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const matched = sectionTitles.find(s => s.selector && entry.target.matches(s.selector));
      if (matched) {
        document.title = matched.title;

        const icon16 = document.querySelector("link[rel='icon'][href*='16x16']");
        const icon32 = document.querySelector("link[rel='icon'][href*='32x32']");
        const icon192 = document.querySelector("link[rel='icon'][href*='192x192']");
        const icon512 = document.querySelector("link[rel='icon'][href*='512x512']");
        const iconApple = document.querySelector("link[rel='icon'][href*='apple']");

        if (icon16) icon16.href = matched.favicon.replace('512x512.png', '16x16.png');
        if (icon32) icon32.href = matched.favicon.replace('512x512.png', '32x32.png');
        if (icon192) icon192.href = matched.favicon.replace('512x512.png', '192x192.png');
        if (icon512) icon512.href = matched.favicon.replace('512x512.png', '512x512.png');
        if (iconApple) iconApple.href = matched.favicon.replace('512x512.png', 'apple.png');
      }
    }
  });
}

onMounted(() => {
  observer = new IntersectionObserver(updateTitle, {
    root: null,
    threshold: 0,
    rootMargin: '-20% 0px -80% 0px'
  });
  // Wait for DOM to render
  setTimeout(() => {
    sectionTitles.forEach(s => {
      document.querySelectorAll(s.selector).forEach(el => observer.observe(el));
    });
  }, 1000);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>