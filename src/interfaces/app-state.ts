import { IPageData } from './page';
import { IAppSettings } from './settings';
import { IPatient } from './patient';
import { IPrediction } from './prediction';

export interface IAppState {
  pageData: IPageData;
  settings: IAppSettings,
  patients: IPatient[],
  predictions: IPrediction[]
}
