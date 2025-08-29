<script setup>
import {reactive} from "vue";

const splashValue = reactive({
    visible: true
})
</script>

<template>
    <ParticleWhirlpoolBg v-if=splashValue.visible :blur="2" class="" particle-count="1000">
        <BlurReveal
                :delay="0.3"
                :duration="1.2"
                :y-offset="36"
                blur="3px"
                class="p-8">
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl leading-snug">WanderingVerse</h2>
            <span class="text-pretty text-xl sm:text-3xl xl:text-4xl mt-1 inline-block tracking-wider">风起涟漪</span>
        </BlurReveal>
    </ParticleWhirlpoolBg>
    <slot v-else/>
</template>

<style scoped>
</style>