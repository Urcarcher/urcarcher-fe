import {
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap"

import Image from "../components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faSkype,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import profile from "../data/profile.json"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

import Messages from "../components/Messages"
import EditProfile from "../components/Forms/EditProfile"
import PageHeader from "../components/PageHeader"
import Breadcrumbs from "../components/Breadcrumbs"
import Avatar from "../components/Avatar"
export async function getStaticProps() {
  return {
    props: {
      title: "Profile",
    },
  }
}
export default function PagesProfile(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Row>
          <Col lg={4}>
            <Card className="card-profile mb-4">
              <Card.Header
                className="overflow-hidden"
                style={{ backgroundImage: `url(${profile.backgroundImg})` }}
              ></Card.Header>
              <Card.Body className="text-center">
                <div
                  className="card-profile-img mx-auto d-flex align-center"
                  style={{ maxHeight: "8rem" }}
                >
                  <div className="position-relative overflow-hidden rounded-circle">
                    <Image
                      src={profile.img}
                      layout="fixed"
                      width={122}
                      height={122}
                      priority
                      alt={profile.name}
                    />
                  </div>
                </div>

                <h3 className="mb-3">{profile.name}</h3>
                <p className="mb-4">{profile.description}</p>
                <Button variant="outline-dark" size="sm">
                  <FontAwesomeIcon icon={faTwitter} /> Follow
                </Button>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Avatar
                      image={profile.img}
                      alt={profile.name}
                      priority
                      size="lg"
                      border
                    />
                  </div>

                  <div className="flex-grow-1 ps-3">
                    <h4>{profile.name}</h4>
                    <p className="text-muted mb-0">{profile.position}</p>
                    <ul className="social-links list-inline mb-0 mt-2">
                      {profile.social.map((item) => {
                        let icon
                        switch (item.type) {
                          case "twitter":
                            icon = faTwitter
                            break
                          case "phone":
                            icon = faPhone
                            break
                          case "skype":
                            icon = faSkype
                            break
                          default:
                            icon = faFacebook
                        }
                        return (
                          <li className="list-inline-item" key={item.type}>
                            <OverlayTrigger
                              overlay={<Tooltip>{item.content}</Tooltip>}
                            >
                              <a href={item.link}>
                                <FontAwesomeIcon icon={icon} />
                              </a>
                            </OverlayTrigger>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Form>
                <Card.Header>
                  <h4 className="card-heading">My Profile</h4>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col xs="auto" className="d-flex align-items-center">
                      <Avatar
                        image={profile.img}
                        alt={profile.name}
                        size="lg"
                        border
                      />
                    </Col>
                    <Col>
                      <Form.Label>Name</Form.Label>
                      <Form.Control placeholder="Your name" type="text" />
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      defaultValue="The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. &quot;What's happened to me?&quot; he thought. It wasn't a dream."
                      as="textarea"
                      rows={8}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="you@domain.com" type="text" />
                  </div>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="you@domain.com"
                    type="password"
                    defaultValue="password"
                  />
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button variant="primary">Save</Button>
                </Card.Footer>
              </Form>
            </Card>
          </Col>
          <Col lg={8}>
            {profile.messages && <Messages profile={profile} />}
            {profile.editProfile && <EditProfile data={profile.editProfile} />}
          </Col>
        </Row>
      </section>
    </Container>
  )
}
