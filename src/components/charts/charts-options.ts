export const chartData = [
    {
      color: "#002e92",
      name: "Turmas",
      data: [
        { x: "1º A Fund. I", y: 50 },
        { x: "1º B Fund. I", y: 28 },
        { x: "2º Fund. I", y: 36 },
        { x: "3º Fund. I", y: 26 },
        { x: "4º Fund. I", y: 27 },
        { x: "5º Fund. I", y: 42 },
        { x: "6º Fund. II", y: 45 },
        { x: "7º Fund. II", y: 41 },
        { x: "8º Fund. II", y: 40 },
        { x: "9º Fund. II", y: 36 },
      ],
    },
  ];

export const chartOptions = {
    chart: {
      type: "bar",
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