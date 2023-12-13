const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const fullscreenButton = document.getElementById("fullscreenButton");
const localVideo = document.getElementById("localVideo");
let localStream;

startButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then((stream) => {
      localStream = stream;
      localVideo.srcObject = stream;

      // Enable buttons
      startButton.disabled = true;
      stopButton.disabled = false;
      fullscreenButton.disabled = false;
    })
    .catch((error) => {
      console.error("Error accessing display media:", error);
    });
});

stopButton.addEventListener("click", () => {
  // Stop the screen sharing
  localStream.getTracks().forEach((track) => track.stop());

  // Reset the video element
  localVideo.srcObject = null;

  // Disable buttons
  startButton.disabled = false;
  stopButton.disabled = true;
  fullscreenButton.disabled = true;
});

fullscreenButton.addEventListener("click", () => {
  // Toggle fullscreen mode within the browser window
  if (!document.fullscreenElement) {
    if (localVideo.requestFullscreen) {
      localVideo.requestFullscreen();
    } else if (localVideo.mozRequestFullScreen) {
      /* Firefox */
      localVideo.mozRequestFullScreen();
    } else if (localVideo.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      localVideo.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (localVideo.msRequestFullscreen) {
      /* IE/Edge */
      localVideo.msRequestFullscreen();
    }
  } else {
    document.exitFullscreen();
  }
});
