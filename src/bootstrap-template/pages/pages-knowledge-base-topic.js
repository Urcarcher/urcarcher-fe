import { faFile } from "@fortawesome/free-regular-svg-icons"
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { Col, Container, Row, Button, Card } from "react-bootstrap"

import Breadcrumbs from "../components/Breadcrumbs"
import Icon from "../components/Icon"
import PageHeader from "../components/PageHeader"
import data from "../data/knowledge-base.json"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import SupportBlock from "../components/SupportBlock"
import ContactCard from "../components/ContactCard"
export async function getStaticProps() {
  return {
    props: {
      title: "Knowledge Base Topic",
    },
  }
}

export default function PagesKnowledgeBase(props) {
  const similarTopics = [
    { name: "Sint consequat aliquip?", link: "/pages-knowledge-base-topic" },
    {
      name: "Adipisicing voluptate magna quis sunt dolor velit.",
      link: "/pages-knowledge-base-topic",
    },
    { name: "Ad pariatur anim magna?", link: "/pages-knowledge-base-topic" },
    { name: "officia aliqua fugiat ex?", link: "/pages-knowledge-base-topic" },
    { name: "Sint consequat aliquip?", link: "/pages-knowledge-base-topic" },
    {
      name: "Adipisicing voluptate magna quis sunt dolor velit.",
      link: "/pages-knowledge-base-topic",
    },
    { name: "Ad pariatur anim magna?", link: "/pages-knowledge-base-topic" },
    { name: "officia aliqua fugiat ex?", link: "/pages-knowledge-base-topic" },
  ]
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs
        title={props.title}
        pages={[{ name: "Knowledge Base", link: "/pages-knowledge-base" }]}
      />
      <PageHeader title={props.title} />
      <Row className="mb-3">
        <Col lg={9} xl={8}>
          <Card className="mb-5">
            <Card.Body className="p-5">
              <div className="text-content">
                <p>
                  <strong>Pellentesque habitant morbi tristique</strong>{" "}
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
                  sit amet, ante. Donec eu libero sit amet quam egestas semper.{" "}
                  <em>Aenean ultricies mi vitae est.</em> Mauris placerat
                  eleifend leo. Quisque sit amet est et sapien ullamcorper
                  pharetra. Vestibulum erat wisi, condimentum sed,{" "}
                  <code>commodo vitae</code>, ornare sit amet, wisi. Aenean
                  fermentum, elit eget tincidunt condimentum, eros ipsum rutrum
                  orci, sagittis tempus lacus enim ac dui.{" "}
                  <a href="#">Donec non enim</a> in turpis pulvinar facilisis.
                  Ut felis.
                </p>
                <p>
                  One morning, when Gregor Samsa woke from troubled dreams, he
                  found himself transformed in his bed into a horrible vermin.
                  He lay on his armour-like back, and if he lifted his head a
                  little he could see his brown belly, slightly domed and
                  divided by arches into stiff sections
                </p>
                <h2>Header Level 2</h2>
                <ol>
                  <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  </li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                </ol>
                <SyntaxHighlighter
                  language="javascript"
                  style={tomorrow}
                  className="rounded shadow p-4 mb-5"
                >
                  {highlightCode}
                </SyntaxHighlighter>

                <blockquote className="blockquote blockquote-primary bg-gray-100 p-5">
                  The bedding was hardly able to cover it and seemed ready to
                  slide off any moment. His many legs, pitifully thin compared
                  with the size of the rest of him, waved about helplessly as he
                  looked. "What's happened to me?" he thought. It wasn't a
                  dream.
                </blockquote>
                <h3>Header Level 3</h3>
                <p>
                  His room, a proper human room although a little too small, lay
                  peacefully between its four familiar walls. A collection of
                  textile samples lay spread out on the table.
                </p>
                <p>
                  Samsa was a travelling salesman - and above it there hung a
                  picture that he had recently cut out of an illustrated
                  magazine and housed in a nice, gilded frame.
                </p>
                <p className="card-text">
                  He must have tried it a hundred times, shut his eyes so that
                  he wouldn't have to look at the floundering legs, and only
                  stopped when he began to feel a mild, dull pain there that he
                  had never felt before. One morning, when Gregor Samsa woke
                  from troubled dreams, he found himself transformed in his bed
                  into a horrible vermin. He lay on his armour-like back, and if
                  he lifted his head a little he could see his brown belly,
                  slightly domed and divided by arches into stiff sections
                </p>
              </div>
            </Card.Body>
            <Card.Footer className="text-center py-5">
              <h6>Was this article helpful?</h6>
              <Button variant="success" className="text-white me-1">
                <FontAwesomeIcon icon={faThumbsUp} className="me-2" />
                Yes
              </Button>
              <Button variant="danger">
                <FontAwesomeIcon icon={faThumbsDown} className="me-2" />
                No
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={3} xl={4} xxl={3}>
          <Card className="mb-5">
            <Card.Header className="bg-primary-100 py-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="subtitle text-primary">Need more help?</p>
                  <h5 className="mb-0">Similar Topics</h5>
                </div>
                <Icon
                  icon="screwdriver-1"
                  className=" svg-icon-light w-3rem h-3rem ms-3 text-primary flex-shrink-0"
                />
              </div>
            </Card.Header>
            <div className="list-group list-group-flush rounded-0 text-sm my-3">
              {similarTopics.map((item, index) => (
                <Link href={item.link} key={index}>
                  <a className="list-group-item list-group-item-action text-muted">
                    <i className="far fa-file me-2"></i>
                    <FontAwesomeIcon icon={faFile} className="me-2" />
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Card>
          {data.blocks.map(
            (block, index) =>
              index < 3 && (
                <Card className="hover-animate text-center mb-4" key={index}>
                  <Card.Body>
                    <div
                      className={`icon icon-xl mx-auto mb-4 bg-${block.color}-light`}
                    >
                      <Icon
                        icon={block.icon}
                        className={`text-${block.color}`}
                      />
                    </div>

                    <h3 className="h5">{block.name}</h3>
                    <Card.Text className="text-muted text-sm">
                      {block.content}
                    </Card.Text>
                    <Link href="/pages-knowledge-base-topic">
                      <a className="stretched-link">
                        <span className="sr-only">See Topic </span>
                      </a>
                    </Link>
                  </Card.Body>
                </Card>
              )
          )}
        </Col>
      </Row>

      <Row className="bg-white py-5 mx-n3 mx-lg-n4 mx-xl-n5 px-3 px-lg-4 px-xl-5">
        <Col lg={10} xl={8} className="mx-auto text-center py-5">
          <SupportBlock />
        </Col>
      </Row>

      <Row>
        <Col md={8} lg={6} xxl={4} className="mx-auto">
          <ContactCard />
        </Col>
      </Row>
    </Container>
  )
}

const highlightCode = `// Create an example category map
createListingsMap({
    mapId: 'categoryMap',
    markerPath: 'img/marker.svg',
    markerPathHighlight: 'img/marker-hover.svg',
    jsonFile: 'js/restaurants-geojson.json',
    imgBasePath: 'img/photo/'
});`
