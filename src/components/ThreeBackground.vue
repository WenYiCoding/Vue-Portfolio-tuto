<template>
    <div ref="container" class="fixed top-0 left-0 w-screen h-screen -z-10"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

class CustomShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                time: { value: 0.0 },
                color1: { value: new THREE.Color('#1D2B53').multiplyScalar(1.2) },
                color2: { value: new THREE.Color('#006d99').multiplyScalar(1.1) },
                color3: { value: new THREE.Color('#ffe600').multiplyScalar(1.2) },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec2 resolution;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform vec3 color3;
                varying vec2 vUv;

                // Perlin noise function for smooth waves
                float hash(vec2 p) {
                    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
                }

                float noise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
                }

                float fbm(vec2 p) {
                    float value=0.0;
                    float amplitude = 0.5;
                    float frequency = 2.0;
                    for (int i = 0; i < 5; i++) {
                        value += amplitude * noise(p * frequency);
                        frequency *= 2.0;
                        amplitude *= 0.5;
                    }
                    return value;
                }

                void main() {
                    vec2 uv = vUv * 2.0 - 1.0;
                    uv.x *= resolution.x / resolution.y;

                    float movement = time * 0.2;
                    float wave = fbm(uv * 4.0 + movement) * 0.6 + fbm(uv * 8.0 - movement) * 0.4;

                    // Smooth transitions and dynamic flow
                    float dynamicWave = sin(uv.y * 8.0 + time * 1.5) * 0.1 + wave;
                    dynamicWave = smoothstep(0.2, 0.8, dynamicWave);

                    vec3 Colors = mix(color1, color2, dynamicWave);
                    float highlight = smoothstep(0.6, 1.0, dynamicWave);
                    vec3 finalColor = mix(Colors, color3, highlight * 0.5);

                    float Effect = smoothstep(1.5, 0.3, length(uv));
                    finalColor *= Effect;

                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
            transparent: true,
        });
    }
}

const container = ref(null);
let scene, camera, renderer, material, mesh, clock;
onMounted(() => {
    scene = new THREE.Scene();
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
    camera.position.z = 2;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.value.appendChild(renderer.domElement);

    material = new CustomShaderMaterial();

    const planeWidth = 20;
    const planeHeight = planeWidth / aspect;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    clock = new THREE.Clock();

    window.addEventListener('resize', onWindowResize);
    animate();
});

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
    renderer.dispose();
});

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const planeWidth = 20;
    const planeHeight = planeWidth / aspect;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += clock.getDelta();
    renderer.render(scene, camera);
}
</script>