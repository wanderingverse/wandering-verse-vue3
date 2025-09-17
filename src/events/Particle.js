import confetti from "canvas-confetti";
import {GOLDEN_RATIO, PARTICLE_COUNT} from "@/config/CommonConfig.js";


/**
 * 粒子效果点击时事件
 * @param e
 */
export const handleParticleClickEvent = (e) => {
    confetti(
        {
            gravity: GOLDEN_RATIO / 100,
            particleCount: PARTICLE_COUNT,
            spread: 360,
            ticks: 60,
            startVelocity: 12,
            origin: {x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight},
        }
    );
}

/**
 * 粒子效果输入时事件
 */
export const handleParticleInputEvent = () => {
    confetti({})
}