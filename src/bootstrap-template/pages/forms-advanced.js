import { Card, Col, Container, Row, Form } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"
import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"
import { ChoicesSelect, Choices } from "../components/Choices"
import Datepicker from "../components/Datepicker"
import { IMaskInput } from "react-imask"

import ExampleCode from "../components/ExampleCode"
export async function getStaticProps() {
  return {
    props: {
      title: "Advanced Forms",
    },
  }
}

export default function FormsAdvanced(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Row>
          <Col lg={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">No UI Slider</h4>
              </Card.Header>
              <Card.Body className="text-muted">
                <p>
                  noUiSlider is a lightweight range slider with multi-touch
                  support and a ton of features. It supports non-linear ranges,
                  requires no external dependencies, has keyboard support, and
                  it works great in responsive designs.{" "}
                </p>
                <p>
                  Read more about this component at{" "}
                  <a href="https://refreshless.com/nouislider/">
                    https://refreshless.com/nouislider/
                  </a>{" "}
                  & react wrapper{" "}
                  <a href="https://github.com/mmarkelov/react-nouislider">
                    https://github.com/mmarkelov/react-nouislider
                  </a>
                  .
                </p>
                <ExampleCode highlightCode={NOUIhighlightCode} bottomMargin />
                <form>
                  <div className="nouislider text-primary">
                    <Nouislider
                      start={[20, 80]}
                      snap={false}
                      connect={true}
                      range={{
                        min: 0,
                        max: 100,
                      }}
                    />
                  </div>

                  <div className="nouislider mt-5">
                    <Nouislider
                      start={[200, 1000]}
                      connect={true}
                      step={100}
                      tooltips={true}
                      range={{
                        min: 0,
                        max: 1800,
                      }}
                    />
                  </div>
                </form>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">Choices.js</h4>
              </Card.Header>
              <Card.Body className="text-muted">
                <p>
                  A vanilla, lightweight, configurable select box/text input
                  plugin. Similar to Select2 and Selectize but without the
                  jQuery dependency.
                </p>

                <p>
                  Read more about Choices.js at{" "}
                  <a href="https://github.com/jshjohnson/Choices">
                    https://github.com/jshjohnson/Choices
                  </a>
                  .
                </p>
                <p>
                  Theme has built in React wrapper which you can find in{" "}
                  <code>src/components/Choices</code>.
                </p>
                <ExampleCode
                  highlightCode={ChoicesHighlightCode}
                  bottomMargin
                />
                <form className="mt-4">
                  <Row className="mb-4">
                    <Col sm={3}>
                      <Form.Label>Select with search field</Form.Label>
                    </Col>
                    <Col sm={9}>
                      <ChoicesSelect
                        options={[
                          {
                            value: "mustard",
                            label: "Mustard",
                          },
                          {
                            value: "ketchup",
                            label: "Ketchup",
                          },
                          {
                            value: "relish",
                            label: "Relish",
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={3}>
                      <Form.Label>Text Tags</Form.Label>
                    </Col>
                    <Col sm={9}>
                      <Choices
                        defaultValue={["preset-1", "preset-2"]}
                        placeholder="Enter something"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={3}>
                      <Form.Label>
                        Select displayed as tags - multiple choice
                      </Form.Label>
                    </Col>
                    <Col sm={9}>
                      <ChoicesSelect
                        options={[
                          {
                            value: "choice1",
                            label: "Choice 1",
                          },
                          {
                            value: "choice2",
                            label: "Choice 2",
                          },
                          {
                            value: "choice3",
                            label: "Choice 3",
                          },
                          {
                            value: "choice4",
                            label: "Choice 4",
                          },
                        ]}
                        selected={["choice1"]}
                        multiple
                      />
                    </Col>
                  </Row>
                </form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">Datepicker</h4>
              </Card.Header>
              <Card.Body className="text-muted">
                <p>
                  VanillaJS Datepicker is a vanilla JavaScript remake of
                  bootstrap-datepicker.
                </p>
                <p className="mb-4">
                  Read more about VanillaJS Datepicker at{" "}
                  <a href="https://github.com/mymth/vanillajs-datepicker">
                    https://github.com/mymth/vanillajs-datepicker
                  </a>
                  .
                </p>
                <p>
                  Theme has built in React wrapper which you can find in{" "}
                  <code>src/components/Datepicker</code>.
                </p>
                <ExampleCode
                  highlightCode={DatepickerHighlightCode}
                  bottomMargin
                />
                <form>
                  <div className="mb-3">
                    <Form.Label>Variant 1 - Date</Form.Label>
                    <Datepicker defaultValue="10/20/2017" />
                  </div>
                  <div className="mb-3">
                    <Form.Label>Variant 2 - Autoclose</Form.Label>
                    <Datepicker defaultValue="10/20/2017" autohide={true} />
                  </div>
                  <div className="mb-3">
                    <Form.Label>Variant 3 - Multiple dates</Form.Label>
                    <Datepicker maxNumberOfDates={3} />
                  </div>
                  <div className="mb-3">
                    <Form.Label>Variant 4 - DateRange</Form.Label>
                    <Datepicker range />
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Card className="mb-4">
          <Card.Header>
            <h4 className="card-heading">imask Input maps</h4>
          </Card.Header>
          <Card.Body>
            <p className="text-muted">
              Input masks can be used to force the user to enter data conform a
              specific format. Unlike validation, the user can't enter any other
              key than the ones specified by the mask.
            </p>
            <p className="text-muted mb-4">
              Read more about imask at{" "}
              <a href="https://imask.js.org/">https://imask.js.org/</a> & react
              wrapper{" "}
              <a href="https://github.com/uNmAnNeR/imaskjs/tree/master/packages/react-imask">
                https://github.com/uNmAnNeR/imaskjs/tree/master/packages/react-imask
              </a>
              .
            </p>
            <ExampleCode highlightCode={ImaskHighlightCode} bottomMargin />
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label>ISBN 1</Form.Label>
                  <IMaskInput
                    mask={"000-00-000-0000-0"}
                    className="form-control"
                  />

                  <small className="help-block-none">
                    e.g &quot;999-99-999-9999-9&quot;
                  </small>
                </div>
                <div className="mb-3">
                  <Form.Label>ISBN 2</Form.Label>
                  <IMaskInput
                    mask={"000 00 000 0000 0"}
                    className="form-control"
                  />
                  <small className="help-block-none">999 99 999 9999 9</small>
                </div>
                <div className="mb-3">
                  <Form.Label>ISBN 3</Form.Label>
                  <IMaskInput
                    mask={"000/00/000/0000/0"}
                    className="form-control"
                  />
                  <small className="help-block-none">999/99/999/9999/9</small>
                </div>
                <div className="mb-3">
                  <Form.Label>IPV4</Form.Label>
                  <IMaskInput
                    mask={"000.000.000.000"}
                    className="form-control"
                  />
                  <small className="help-block-none">192.168.110.310</small>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label>Tax ID</Form.Label>
                  <IMaskInput mask={"00-000000"} className="form-control" />
                  <small className="font-13 text-muted">99-123456</small>
                </div>
                <div className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <IMaskInput
                    mask={"+{1}-000-000-0000"}
                    className="form-control"
                  />
                  <small className="font-13 text-muted">+1-907-555-0165</small>
                </div>
                <div className="mb-3">
                  <Form.Label>Currency</Form.Label>
                  <IMaskInput
                    mask={"$ num"}
                    blocks={{
                      num: {
                        // nested masks are available!
                        mask: Number,
                        thousandsSeparator: ",",
                        radix: ".",
                      },
                    }}
                    className="form-control"
                  />
                  <small className="font-13 text-muted">999,999,999.99</small>
                </div>
                <div className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <IMaskInput
                    mask={Date}
                    pattern="Y-m-d"
                    blocks={{
                      d: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31,
                        maxLength: 2,
                      },
                      m: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                      },
                      Y: {
                        mask: IMask.MaskedRange,
                        from: 1900,
                        to: 9999,
                      },
                    }}
                    format={function (date) {
                      var day = date.getDate()
                      var month = date.getMonth() + 1
                      var year = date.getFullYear()

                      if (day < 10) day = "0" + day
                      if (month < 10) month = "0" + month

                      return [year, month, day].join("-")
                    }}
                    parse={function (str) {
                      var yearMonthDay = str.split("-")
                      return new Date(
                        yearMonthDay[0],
                        yearMonthDay[1] - 1,
                        yearMonthDay[2]
                      )
                    }}
                    className="form-control"
                  />
                  <small className="font-13 text-muted">1980-06-22</small>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}

const NOUIhighlightCode = `import Nouislider from "nouislider-react"

export default function page(props) {
  return(
    <div className="nouislider text-primary">
      <Nouislider
        start={[20, 80]}
        snap={false}
        connect={true}
        range={{
          min: 0,
          max: 100,
        }}
      />
    </div>
  )
}`

const ChoicesHighlightCode = `import { ChoicesSelect, Choices } from "../components/Choices"

export default function page(props) {
  return(
    <div>
      <ChoicesSelect
        options={[
          {
            value: "mustard",
            label: "Mustard",
          },
          {
            value: "ketchup",
            label: "Ketchup",
          },
          {
            value: "relish",
            label: "Relish",
          },
        ]}
      />
      <Choices
        defaultValue={["preset-1", "preset-2"]}
        placeholder="Enter something"
      />
    </div>
  )
}`

const DatepickerHighlightCode = `import Datepicker from "../components/Datepicker"

export default function page(props) {
  return(
    <Datepicker 
      defaultValue="10/20/2017" 
      autohide={true} 
      maxNumberOfDates={3} 
      range 
    />
  )
}`

const ImaskHighlightCode = `import { IMaskInput } from "react-imask"

export default function page(props) {
  return(
    <IMaskInput
      mask={Number}
      radix="."
      value="123"
      unmask={true} // true|false|'typed'
      inputRef={el => this.input = el}  // access to nested input
      // DO NOT USE onChange TO HANDLE CHANGES!
      // USE onAccept INSTEAD
      onAccept={
        // depending on prop above first argument is
        // 'value' if 'unmask=false',
        // 'unmaskedValue' if 'unmask=true',
        // 'typedValue' if 'unmask="typed"'
        (value, mask) => console.log(value)
      }
      // ...and more mask props in a guide

      // input props also available
      placeholder='Enter number here'
    />
  )
}`
