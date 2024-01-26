import { Gauge as GaugeComponent } from './Gauge.component';
import * as css from './Gauge.css';

export type { IGauge } from './types';

export const Gauge = Object.assign(GaugeComponent, { css });
