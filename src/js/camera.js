// import a CSS module
import classes from '../styles/camera';

export default () => {
  console.log(classes);
  var videoElement = document.querySelector("#videoElement");

  videoElement.width = videoElement.videoWidth;
  videoElement.height = videoElement.videoHeight;

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        videoElement.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }
};
