// import another component
import main from './js/main';
import camera from './js/camera';

// parcel hot module replacement
if (module.hot) {
  module.hot.accept();
}

main();
camera();