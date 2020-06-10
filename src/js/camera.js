// import a CSS module
import classes from '../styles/camera';

export default () => {
  console.log(classes);
  var videoElement = document.querySelector("#videoElement");

  videoElement.width = '224px';
  videoElement.height = '224px';

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
