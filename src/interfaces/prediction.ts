export interface IPrediction {
    _id?: string;
    patient: string;
    doctor_id?: string;
    desease: string;
    result?: number;
    image_path?: string;
    symptoms?: string[];
    d_report?: string;
    prediction_status?: string;
  }