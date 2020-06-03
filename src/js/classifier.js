import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import catURL from '../assets/pet.jpg';

const MODEL_URL = '/model.json';
const IMAGE_SIZE = 224;
const THERESHOLD = 0.6;

const cat = document.getElementById('cat');
const label = document.querySelector('.label');
const LABELS = {
  0: "CAN",
  1: "PET",
}

export default async () => {
  const mobilenet = await loadGraphModel(MODEL_URL);

  // Warmup the model. This isn't necessary, but makes the first prediction
  // faster. Call `dispose` to release the WebGL memory allocated for the return
  // value of `predict`.
  mobilenet.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();

  const logits = tf.tidy(()=> {
    // tf.browser.fromPixels() returns a Tensor from an image element.
    const img = tf.browser.fromPixels(cat).toFloat();

    const offset = tf.scalar(127.5);
    // Normalize the image from [0, 255] to [-1, 1].
    const normalized = img.sub(offset).div(offset);

    // Reshape to a single-element batch so we can pass it to predict.
    const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);

    return mobilenet.predict(batched);
  })

  console.log(logits);
  const values = await logits.data();
  console.log(values);

  const valueArray = Array.from(values).map((value, index) => {
    console.log(value);
    return {
      "value": values[index],
      "label": LABELS[index],
    };
  })

  console.log(valueArray);

  const results = valueArray.filter((element) => element.value > THERESHOLD);
  
  const NO_RESULT = '¯\\_(ツ)_/¯';


  if(results.length) {
    label.innerHTML = results.map((result) => {
      return `I am ${result.value}% This could be a ${result.label}`
    }).join(', ')
  } else {
    label.innerHTML = NO_RESULT;
  }
};
