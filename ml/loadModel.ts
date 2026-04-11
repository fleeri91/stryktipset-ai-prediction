import * as tf from '@tensorflow/tfjs-node'
import path from 'path'

// Ladda sparad TensorFlow-modell
export async function loadModel(modelPath?: string): Promise<tf.LayersModel> {
  const filePath = modelPath || path.join(__dirname, 'model')
  const model = await tf.loadLayersModel(`file://${filePath}/model.json`)
  return model
}
