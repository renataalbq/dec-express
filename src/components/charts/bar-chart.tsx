import Chart from 'react-apexcharts';

interface BarChartProps {
    chartData: any;
    chartOptions: any
}

function BarChart(props: BarChartProps) {
    const chartDataState = {
      series: props.chartData,
      options: props.chartOptions,
    };
  
    return (
      <Chart
        options={chartDataState.options}
        series={chartDataState.series}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
  
  export default BarChart;