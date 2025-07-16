export function inicializarAudio() {
    const audioBtn = document.getElementById("audio-toggle");
    const audioIcon = document.getElementById("audio-icon");
    const audioPlayer = document.getElementById("audio-player");
    let isPlaying = false;

    if (audioBtn && audioPlayer && audioIcon) {
        audioBtn.addEventListener("click", () => {
            if (isPlaying) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }
        });

        audioPlayer.addEventListener("pause", () => {
            audioIcon.setAttribute("name", "volume-mute-outline");
            isPlaying = false;
        });

        audioPlayer.addEventListener("play", () => {
            audioIcon.setAttribute("name", "volume-high-outline");
            isPlaying = true;
        });
    }
}
