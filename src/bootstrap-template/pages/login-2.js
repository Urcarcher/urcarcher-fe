import Link from "next/link"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Image from "../components/CustomImage"

export async function getStaticProps() {
  return {
    props: {
      title: "Login v2",
      pageHolderClass: "p-0",
      hideHeader: true,
      hideFooter: true,
      hideSidebar: true,
    },
  }
}
export default function Login2() {
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
              <h1 className="h4 text-uppercase mb-5">Welcome Back</h1>
            </div>
            <Form method="get" action="/">
              <div className="mb-3">
                <Form.Label className="form-label">Email Address</Form.Label>
                <Form.Control
                  name="loginUsername"
                  type="email"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4">
                <Row>
                  <Col>
                    <Form.Label className="form-label">Password</Form.Label>
                  </Col>
                  <Col xs="auto">
                    <a className="form-text small text-muted" href="#">
                      Forgot your password?
                    </a>
                  </Col>
                </Row>
                <Form.Control name="loginPassword" type="password" />
              </div>
              <Form.Check
                className="mb-4"
                id="remember"
                label="Remember this device"
              />
              <div className="d-grid mb-5">
                <Button variant="primary" className="text-uppercase">
                  Sign in
                </Button>
              </div>
              <p className="text-sm text-muted text-center">
                Don't have an account yet?{" "}
                <Link href="/register-2">
                  <a>Register</a>
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
