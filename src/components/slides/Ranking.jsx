import { Bar } from "react-chartjs-2"
import { useRef } from "react"
import { Chart as ChartJS, registerables } from "chart.js"
import { Flex, Text } from "@chakra-ui/react"
ChartJS.register(...registerables)

const Ranking = ({ question }) => {
  const ref = useRef()

  const compareOptions = (a, b) => {
    if (a.score > b.score) return -1

    if (a.score < b.score) return 1

    return 0
  }

  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        position: "right",
      },
    },
  }
  const dataTemplate = {
    datasetIdKey: "id",
    labels: question.mentiOptions.sort(compareOptions).map((opt) => opt.name),
    datasets: [
      {
        label: "Votos",
        data: question.mentiOptions
          .sort(compareOptions)
          .map((opt) => opt.score),
        backgroundColor: [
          "rgba(141,211,199)",
          "rgba(255,255,179)",
          "rgba(190,186,218)",
          "rgba(251,128,114)",
          "rgba(128,177,211)",
          "rgba(253,180,98)",
          "rgba(179,222,105)",
          "rgba(252,205,229)",
          "rgba(217,217,217)",
          "rgba(188,128,189)",
          "rgba(204,235,197)",
          "rgba(255,237,111)",
        ],
        borderColor: [
          "rgba(141,211,199)",
          "rgba(255,255,179)",
          "rgba(190,186,218)",
          "rgba(251,128,114)",
          "rgba(128,177,211)",
          "rgba(253,180,98)",
          "rgba(179,222,105)",
          "rgba(252,205,229)",
          "rgba(217,217,217)",
          "rgba(188,128,189)",
          "rgba(204,235,197)",
          "rgba(255,237,111)",
        ],
        borderWidth: 4,
      },
    ],
  }

  return (
    <Flex flexDir="column" paddingLeft={"10px"}>
      <Text fontSize="5xl" as="b">
        {question.question}
      </Text>
      <Bar
        ref={ref}
        width={600}
        height={600}
        data={dataTemplate}
        options={options}
      />
    </Flex>
  )
}

export default Ranking
