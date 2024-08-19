import { Card, Col, Container, Row } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import CustomLineChart from "../components/charts/CustomLineChart"
import CustomLineChart2 from "../components/charts/CustomLineChart2"
import BarChart from "../components/charts/BarChart"
import DonutChart from "../components/charts/DonutChart"
import CustomDonutChart from "../components/charts/CustomDonutChart"
import PieChart from "../components/charts/PieChart"
import PageHeader from "../components/PageHeader"
import data from "../data/charts.json"
import ExampleCode from "../components/ExampleCode"
export async function getStaticProps() {
  return {
    props: {
      title: "Charts",
    },
  }
}

export default function ComponentsPreloader(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        {data.map((rowBlock, rowIndex) => (
          <Row className="mb-4" key={rowIndex}>
            {rowBlock.columns.map((column, index) => (
              <Col
                {...column.size}
                className={column.className ? column.className : ""}
                key={index}
              >
                {column.charts.map((chart, index) => (
                  <Card
                    className={chart.cardClassName ? chart.cardClassName : ""}
                    key={index}
                  >
                    <Card.Header>
                      <h4 className="card-heading">{chart.name}</h4>
                    </Card.Header>
                    <Card.Body>
                      {chart.text && (
                        <div dangerouslySetInnerHTML={{ __html: chart.text }} />
                      )}
                      {chart.exampleCode && (
                        <div className="mb-2">
                          <ExampleCode
                            highlightCode={exampleCodes[chart.exampleCode]}
                            bottomMargin
                          />
                        </div>
                      )}
                      <div className={chart.className ? chart.className : ""}>
                        {chart.component === "CustomLineChart" && (
                          <CustomLineChart className="w-100" {...chart.data} />
                        )}
                        {chart.component === "CustomLineChart2" && (
                          <CustomLineChart2 className="w-100" {...chart.data} />
                        )}
                        {chart.component === "BarChart" && (
                          <BarChart className="w-100" {...chart.data} />
                        )}
                        {chart.component === "DoughnutChart" && (
                          <DonutChart className="w-100" {...chart.data} />
                        )}
                        {chart.component === "CustomDoughnutChart" && (
                          <CustomDonutChart className="w-100" {...chart.data} />
                        )}
                        {chart.component === "PieChart" && (
                          <PieChart className="w-100" {...chart.data} />
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            ))}
          </Row>
        ))}
      </section>
    </Container>
  )
}

const exampleCodes = {
  mainChartCode: `import CustomLineChart from "../components/charts/CustomLineChart"

  export default function page(props) {
    const data = {
      color: "blue",
      ticksColor: "blue",
      grid: true,
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ],
      label: "Data Set One",
      label2: "Data Set Two",
      values: [30, 50, 40, 61, 42, 35, 40],
      values2: [50, 40, 50, 40, 45, 40, 30],
      min: 30,
      max: 65,
    }
    return(
      <CustomLineChart className="w-100" {...data} />
    )
  }
  `,
  donutChartCode: `import DonutChart from "../components/charts/DonutChart"

export default function page(props) {
  const data = {
    "color": "cyan",
    "cutout": "70%",
    "labels": ["Tasks Done", "Remaining"],
    "values": [250, 200]
  },
  return(
    <CustomLineChart className="w-100" {...data} />
  )
}
`,
  donutChartCode2: `import DonutChart from "../components/charts/DonutChart"

export default function page(props) {
  const data = {
    "color": "blue",
    "hideLegend": true,
    "labels": ["First", "Second"],
    "values": [300, 50]
  },
  return(
    <CustomLineChart className="w-100" {...data} />
  )
}
`,
  barChartCode2: `import BarChart from "../components/charts/BarChart"

export default function page(props) {
  const data = {
    "ticksColor": "primary",
    "label": "Sunny Days",
    "grid": false,
    "gradient": "pinkBlue",
    "labels": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14"
    ],
    "values": [
      65, 59, 80, 81, 56, 55, 40, 30, 45, 80, 44, 36, 66, 58
    ],
    "min": 20,
    "max": 100,
    "hideLegend": true
  },
  return(
    <BarChart className="w-100" {...data} />
  )
}
`,

  customDonutCode: `import CustomDonutChart from "../components/charts/CustomDonutChart"

export default function page(props) {
  const data = {
    "cutout": "70%",
    "color": ["#0d6efd", "#3d8bfd", "#6ea8fe", "#9ec5fe"],
    "labels": ["Sandra", "Becky", "Julie", "Danny"],
    "values": [250, 50, 100, 40]
  },
  return(
    <CustomDonutChart className="w-100" {...data} />
  )
}
`,

  pieChartCode: `import PieChart from "../components/charts/PieChart"

export default function page(props) {
  const data = {
    "color": ["#6610f2", "#8540f5", "#a370f7", "#c29ffa"],
    "labels": ["John", "Mark", "Frank", "Danny"],
    "values": [300, 50, 100, 80]
  },
  return(
    <PieChart className="w-100" {...data} />
  )
}
`,
}
