
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../redux/patients/actions';

import { IAppState } from '../interfaces/app-state';
import { IPrediction } from '../interfaces/prediction';

export function usePredictions() {
  const dispatch = useDispatch();
  const predictions = useSelector<IAppState, IPrediction[]>((state) => state.predictions);


  return { predictions};
}
