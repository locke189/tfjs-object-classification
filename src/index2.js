import '@babel/polyfill';
import 'regenerator-runtime/runtime'

// import another component
import main from './js/main';
import camera from './js/camera';
import classifier2 from './js/classifier2'

// parcel hot module replacement
if (module.hot) {
  module.hot.accept();
}

main();
camera();
classifier2();
