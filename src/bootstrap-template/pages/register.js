import Link from "next/link"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Image from "../components/CustomImage"

export async function getStaticProps() {
  return {
    props: {
      title: "Register",
      pageHolderClass: "page-holder align-items-center py-4 bg-gray-100 vh-100",
      hideHeader: true,
      hideFooter: true,
      hideSidebar: true,
    },
  }
}
export default function Register() {
  return (
    <Container>
      <Row className="align-items-center">
        <Col lg={6} className="px-lg-4">
          <Card>
            <Card.Header className="px-lg-5">
              <div className="card-heading text-primary">Bubbly Dashboard</div>
            </Card.Header>
            <Card.Body className="p-lg-5">
              <h3 className="mb-4">Get started with Bubbly</h3>
              <p className="text-muted text-sm mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
              <Form id="registerForm" action="/">
                <div className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    type="text"
                    placeholder="name@example.com"
                  />
                  <Form.Label htmlFor="username">Username</Form.Label>
                </div>
                <div className="form-floating mb-3">
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                  <Form.Label htmlFor="email">Email address</Form.Label>
                </div>
                <div className="form-floating mb-4">
                  <Form.Control
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                  <Form.Label htmlFor="password">Password</Form.Label>
                </div>
                <Form.Check id="agree" type="checkbox" className="mb-3">
                  <Form.Check.Input />
                  <Form.Check.Label>
                    &nbsp;I agree with the{" "}
                    <a href="#">Terms &amp; Conditions</a>
                  </Form.Check.Label>
                </Form.Check>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="px-lg-5 py-lg-4">
              <div className="text-sm text-muted">
                Already have an account?{" "}
                <Link href="/login">
                  <a>Login</a>
                </Link>
                .
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col
          lg={6}
          xl={5}
          className="ms-xl-auto px-lg-4 text-center text-primary"
        >
          <div style={{ transform: "rotate(10deg)" }}>
            <Image
              src="/img/drawkit-illustration.svg"
              alt="..."
              width={475}
              height={356}
            />
          </div>
          <h1 className="mb-4">
            Start saving <br className="d-none d-lg-inline" />
            your time & money
          </h1>
          <p className="lead text-muted">
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed in
          </p>
        </Col>
      </Row>
    </Container>
  )
}
