import Link from "next/link"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Image from "../components/CustomImage"

export async function getStaticProps() {
  return {
    props: {
      title: "Register v2",
      pageHolderClass: "p-0",
      hideHeader: true,
      hideFooter: true,
      hideSidebar: true,
    },
  }
}
export default function Register2() {
  return (
    <Container fluid className="px-0 overflow-hidden">
      <Row className="gx-0 min-vh-100">
        <Col
          md={9}
          lg={6}
          xl={4}
          className="px-5 d-flex align-items-center shadow"
        >
          <div className="w-100 py-5">
            <div className="text-center">
              <img
                className="img-fluid mb-4"
                src="img/brand/brand-1.svg"
                alt="..."
                style={{ maxWidth: "6rem" }}
              />
              <h1 className="h4 text-uppercase mb-3">Register</h1>
            </div>
            <p className="text-muted text-sm mb-4">
              The bedding was hardly able to cover it and seemed ready to slide
              off any moment. His many legs, pitifully thin compared with the
              size of the rest of him, waved about helplessly as he looked.
              "What's happened to me?" he thought. It wasn't a dream.
            </p>
            <Form method="get" action="/">
              <div className="mb-3">
                <Form.Label className="form-label" htmlFor="registerUsername">
                  Username
                </Form.Label>
                <Form.Control
                  name="registerUsername"
                  id="registerUsername"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <Form.Label className="form-label" htmlFor="registerEmail">
                  Email Address
                </Form.Label>
                <Form.Control
                  name="registerEmail"
                  id="registerEmail"
                  type="email"
                  required
                />
              </div>
              <div className="mb-4">
                <Form.Label className="form-label" htmlFor="registerPassword">
                  Password
                </Form.Label>
                <Form.Control
                  name="registerUsername"
                  id="registerPassword"
                  type="password"
                />
              </div>
              <Form.Check id="registerAgree" type="checkbox" className="mb-4">
                <Form.Check.Input />
                <Form.Check.Label>
                  &nbsp;I agree with the <a href="#">Terms &amp; policy</a>
                </Form.Check.Label>
              </Form.Check>
              <div className="d-grid mb-5">
                <Button variant="primary" className="text-uppercase">
                  Sign in
                </Button>
              </div>
              <p className="text-sm text-muted text-center">
                Already have an account?{" "}
                <Link href="/login-2">
                  <a>Log in</a>
                </Link>
                .
              </p>
            </Form>
          </div>
        </Col>
        <Col md={3} lg={6} xl={8} className="d-none d-md-block">
          <div className="bg-cover h-100 me-n3 position-relative">
            <Image
              src="/img/photos/victor-ene-1301123-unsplash.jpg"
              alt="..."
              layout="fill"
              objectFit="cover"
              sizes="75vw"
              priority
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
