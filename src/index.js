// import another component
import main from './js/main';
import camera from './js/camera';
import classifier from './js/classifier'

// parcel hot module replacement
if (module.hot) {
  module.hot.accept();
}

main();
camera();
classifier();