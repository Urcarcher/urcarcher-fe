import { Container, Row, Col } from "react-bootstrap"

import posts from "../data/cms-post.json"
import people from "../data/contacts.json"

import widgetsStats from "../data/widgets-stats.json"
import Stats11 from "../components/Widgets/Stats11"
import QuickDraft from "../components/QuickDraft"
import LatestPosts from "../components/LatestPosts"
import People from "../components/People"
import AtGlance from "../components/AtGlance"
import CardBlock from "../components/CardBlock"
export async function getStaticProps() {
  return {
    props: {
      title: "Bubbly",
    },
  }
}
export default function IndexCms() {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading">CMS Dashboard</h1>
      </div>
      <section className="mb-3 mb-lg-5">
        {/* Top Widgets */}
        <Row className="mb-3">
          {widgetsStats.group9.map((item, index) => (
            <Col sm={6} lg={3} key={index} className="mb-4">
              <Stats11 {...item} />
            </Col>
          ))}
        </Row>

        <Row className="mb-3">
          <Col lg={5}>
            {/* At Glance */}
            <AtGlance />

            {/* Site Health Status */}
            <CardBlock
              {...{
                title: "Site health status",
                icon: "first-aid-kit-1",
                iconColor: "text-orange",
                content: `<p class="card-text">
              Your site has critical issues that should be addressed as soon as
              possible to improve its performance and security.
            </p>
            <p class="card-text">
              Take a look at the 8 items on the 
              <a href="#!">Site Health screen</a>.
            </p>`,
              }}
            />
          </Col>
          <Col lg={7} className="mb-5">
            {/* Quick Draft */}
            <QuickDraft />
          </Col>
          <Col lg={8}>
            {/* Latest Posts */}
            <LatestPosts items={posts} header="Latest Posts" />
          </Col>
          <Col lg={4}>
            {/* Popular Authors */}
            <People data={people.contacts.slice(0, 8)} />
          </Col>
        </Row>
      </section>
    </Container>
  )
}
