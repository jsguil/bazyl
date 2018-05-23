import { Chart } from 'react-google-charts';
import React from 'react';

class BlockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      options: null
    };
  }
  render() {
    return (
      <Chart
        chartType="ColumnChart"
        data={this.props.data}
        options={this.props.options}
        width="100%"
        height="260px"
        legend_toggle
      />
    );
  }
}
export default BlockChart;
