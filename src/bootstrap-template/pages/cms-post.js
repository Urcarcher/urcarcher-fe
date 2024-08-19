import Link from "next/link"
import { Button, Card, Container } from "react-bootstrap"

import data from "../data/cms-post.json"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import LatestPosts from "../components/LatestPosts"

export async function getStaticProps() {
  return {
    props: {
      title: "Posts",
    },
  }
}
export default function CmsPost(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading">{props.title}</h1>
        <div>
          <Link href="/cms-post-new" passHref>
            <Button variant="primary" className="text-uppercase">
              <FontAwesomeIcon icon={faPlus} /> Add new
            </Button>
          </Link>
        </div>
      </div>
      <section className="mb-5">
        <Card className="card-table">
          <LatestPosts items={data} defaultPageSize={10} />
        </Card>
      </section>
    </Container>
  )
}
