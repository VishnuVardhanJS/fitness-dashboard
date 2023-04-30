import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { setLabels } from 'react-chartjs-2/dist/utils';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};



function ChartComp() {

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [Lables, setLabels] = useState([]);
  const [Values, setValues] = useState([]);

  useEffect(() => {

    axios.get("http://127.0.0.1:5000/pair_heart").then(function (response) {
      console.log(response);
    })
  }, []);

  // console.log(Sleep["sleep"][0])

  const data = {
    Lables,
    datasets: [
      {
        label: 'Dataset 1',
        data: Lables.map(() => Values),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return <Line options={options} data={data} />;
}


export default ChartComp;