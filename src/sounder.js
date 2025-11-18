/**
 * Sound Effects Error Move
 */
export const playErrorSound = () => {
    const audio = document.getElementById('error-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
};