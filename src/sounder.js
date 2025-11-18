import { LogMessage, log } from "./enums/logInfo.js";

/**
 * Sound Effects Error Move
 */
export const playErrorSound = () => {
    const audio = document.getElementById('error-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(e => log(LogMessage.AUDIO_PLAY_FAILED, e));
    }
};