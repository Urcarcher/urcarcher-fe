import { Row, Col, Card, Container, Form, Button } from "react-bootstrap"

import PageHeader from "../components/PageHeader"
import Editor from "../components/Editor"
import { Choices } from "../components/Choices"
import data from "../data/cms-post-new.json"
import PublishBlock from "../components/PublishBlock"

export async function getStaticProps() {
  return {
    props: {
      title: "Add new post",
    },
  }
}
export default function CmsPost(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <PageHeader title={props.title} />
      <section>
        <Row className="mb-5">
          <Col lg={8} xxl={9} className="mb-4 mb-lg-0">
            <Card>
              <Card.Body>
                <Form.Label htmlFor="postTitle">Title</Form.Label>
                <Form.Control id="postTitle" type="text" className="mb-4" />
                <Button variant="outline-primary" className="mb-4">
                  Add Media
                </Button>
                <Editor withEditor text={data.text} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} xxl={3}>
            <PublishBlock />

            {data.formatBlock && (
              <Card className="shadow-sm mb-4">
                <Card.Header className="py-4">
                  <h4 className="card-heading">{data.formatBlock.name}</h4>
                </Card.Header>
                <Card.Body>
                  {data.formatBlock.items.map((item) => (
                    <Form.Check {...item} type="radio" key={item.id} />
                  ))}
                </Card.Body>
              </Card>
            )}
            {data.categoriesBlock && (
              <Card className="shadow-sm mb-4">
                <Card.Header className="py-4">
                  <h4 className="card-heading">{data.categoriesBlock.name}</h4>
                </Card.Header>
                <Card.Body>
                  <div className="mb-4">
                    {data.categoriesBlock.items.map((item) => (
                      <Form.Check {...item} type="checkbox" key={item.id} />
                    ))}
                  </div>
                  <Button variant="link" href="#">
                    + Add New Category
                  </Button>
                </Card.Body>
              </Card>
            )}
            {data.tags && (
              <Card className="shadow-sm mb-4">
                <Card.Header className="py-4">
                  <h4 className="card-heading">{data.tags.name}</h4>
                </Card.Header>
                <Card.Body>
                  <Choices
                    defaultValue={data.tags.items}
                    placeholder="Enter something"
                    id="tags"
                  />
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </section>
    </Container>
  )
}
