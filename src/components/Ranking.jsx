import { Bar } from 'react-chartjs-2';
import { useRef } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);


const Ranking = ({currentQuestion}) => {
    const ref = useRef();

    const dataTemplate = {
      datasetIdKey:'id',
      labels: currentQuestion.mentiOptions.map((option) => (option.name)),
      datasets: [
          {
            label: 'Votos',
            data: currentQuestion.mentiOptions.map((option) => (option.score)),  
            backgroundColor: [
              'rgba(141,211,199)',
              'rgba(255,255,179)',
              'rgba(190,186,218)',
              'rgba(251,128,114)',
              'rgba(128,177,211)',
              'rgba(253,180,98)',
              'rgba(179,222,105)',
              'rgba(252,205,229)',
              'rgba(217,217,217)',
              'rgba(188,128,189)',
              'rgba(204,235,197)',
              'rgba(255,237,111)',
            ],
            borderColor: [
              'rgba(141,211,199)',
              'rgba(255,255,179)',
              'rgba(190,186,218)',
              'rgba(251,128,114)',
              'rgba(128,177,211)',
              'rgba(253,180,98)',
              'rgba(179,222,105)',
              'rgba(252,205,229)',
              'rgba(217,217,217)',
              'rgba(188,128,189)',
              'rgba(204,235,197)',
              'rgba(255,237,111)',
            ],
            borderWidth: 4,
          },
      ],
  };

    return (<Bar ref={ref} width={600} height={600} data={dataTemplate} />)

};

export default Ranking;