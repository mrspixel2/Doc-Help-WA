import { useEffect, useState } from 'react';

import { IPrediction } from '../interfaces/prediction';
import axios from 'axios';

async function getPredictions(url: string) {
  const result = await axios.get(url);
  return result.data as IPrediction[];
}

export function useGetPredictions(url: string): IPrediction[] {
  const [predictions, setPredictions] = useState<IPrediction[]>([]);

  useEffect(() => {
    getPredictions(url).then((data) => {
        setPredictions(data);
    });
  }, []);

  return predictions;
}