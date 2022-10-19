import { MeasuredValue } from './Measuredvalue';
export interface MeasuringDevice {
  id: string,
  userId: string,
  location: string,
  name: string,
  keyNames: string[],
  values: MeasuredValue[]
}
