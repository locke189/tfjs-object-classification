import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = '/model.json';
const IMAGE_SIZE = 224;
const THERESHOLD = 0.6;

const LABELS = {
  0: "CAN",
  1: "PET",
}

function predict(element, model) {

  const logits = tf.tidy(() => {

    console.log(element);
    //const img = tf.browser.fromPixels(element).toFloat();
    const img = element;
    console.log(img);
    const offset = tf.scalar(127.5);
    const normalized = img.sub(offset).div(offset);
    const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
    return model.predict(batched);
  })

  return logits;
}

const getLabels = async (rawLabels) => {
  
  const values = await rawLabels.data();
  const valueArray = Array.from(values).map((value, index) => {

    return {
      "value": values[index],
      "label": LABELS[index],
    };
  });
  return valueArray;
}


const setLabel = (values, thereshold) => {
  const label = document.querySelector('.label');
  const results = values.filter((element) => element.value > thereshold);
  const NO_RESULT = '¯\\_(ツ)_/¯';
  if(results.length) {
    label.innerHTML = results.map((result) => {
      return `I am ${result.value}% This could be a ${result.label}`
    }).join(', ')
  } else {
    label.innerHTML = NO_RESULT;
  }
}

export default async () => {
  const mobilenet = await loadGraphModel(MODEL_URL);

  // Warmup the model. This isn't necessary, but makes the first prediction
  // faster. Call `dispose` to release the WebGL memory allocated for the return
  // value of `predict`.
  mobilenet.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();

  const videoElement = document.createElement('video');

  // This allows us to create a tensor directly from the video feed.
  const cam = await tf.data.webcam(videoElement, {
    resizeWidth: 224,
    resizeHeight: 224
  });


  setInterval(async () => {
    const img = await cam.capture();
    const rawPrediction = predict(img, mobilenet);
    const labels = await getLabels(rawPrediction);
    setLabel(labels, THERESHOLD);
  }, 2000)
};
