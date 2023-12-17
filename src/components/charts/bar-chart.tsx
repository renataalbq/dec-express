import { ITurma } from '@/model/ITurma';
import Chart from 'react-apexcharts';
import { prepareChartData } from './charts-options';
import {ApexOptions} from 'apexcharts'
interface BarChartProps {
    classes: ITurma[];
}

const chartType: "bar" | "line" | "area" = "bar";

function BarChart(props: BarChartProps) {
  const chartData = prepareChartData(props.classes);

  const chartOptions: ApexOptions = {
    chart: {
      type: chartType,
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: chartData[0].data.map((item) => item.x),
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

    return (
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
  
  export default BarChart;