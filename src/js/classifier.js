import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = '../assets/model.json';
const model = await loadGraphModel(MODEL_URL);
const cat = document.getElementById('cat');


export default () => {
  console.log(model.execute(tf.browser.fromPixels(cat)));
};