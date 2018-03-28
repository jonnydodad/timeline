import React from 'react';
import {AbstractSeries} from 'react-vis';
// import AbstractSeries from './AbstractSeries.js';
 import BarSeries from './BarSeries';


export default class HorizontalBarSeries extends AbstractSeries {

  static displayName = 'HorizontalBarSeries';
  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = attr === 'y';
    const zeroBaseValue = attr === 'x';
    return {
      isDomainAdjustmentNeeded,
      zeroBaseValue
    };
  }

  render() {
    return (
      <BarSeries
        {...this.props}
        linePosAttr="y"
        valuePosAttr="x"
        lineSizeAttr="height"
        valueSizeAttr="width"
      />
    );
  }
}

HorizontalBarSeries.displayName = 'HorizontalBarSeries';


