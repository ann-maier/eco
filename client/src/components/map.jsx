import React from 'react';
import { Chart } from 'react-google-charts';

import { MAP_API_KEY } from '../utils/constants';

export const Map = () => (
  <Chart
    width="100%"
    height="100%"
    chartType="GeoChart"
    data={[
      ['Country'],
      ['Ukraine'],
    ]}
    options={{
      region: 'UA',
    }}
    mapsApiKey={MAP_API_KEY}
  />
)