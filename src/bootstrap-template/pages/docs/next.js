import Breadcrumbs from "../../components/Breadcrumbs"
import PageHeader from "../../components/PageHeader"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import Link from "next/link"
export async function getStaticProps() {
  return {
    props: {
      title: "Next.js",
    },
  }
}
export default function directoryStructure(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs
        pages={[{ name: "Docs", link: "/docs/introduction" }]}
        title={props.title}
      />
      <PageHeader title={"Docs - " + props.title} />
      <section className="mb-5">
        <Row>
          <Col xl={10}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading"></h4>
              </Card.Header>
              <Card.Body>
                <div id="gettingstarted" className="docs-item">
                  <h5 className="text-uppercase mb-4">Getting started</h5>

                  <div className="docs-desc">
                    <p>
                      This theme uses zero configuration{" "}
                      <a href="https://nextjs.org/">Next.js</a> framework which
                      is based on React, Webpack and Babel. It allows you to
                      make blazing fast web applications with possibility of
                      server side rendering.
                    </p>
                  </div>
                  <div className="mt-5">
                    <h6 className="text-uppercase mb-4">Biggest advantages</h6>
                    <ul>
                      <li>
                        <strong>Pre-Rendering</strong> - Statically generated
                        and server-rendered React applications have never been
                        easier.
                      </li>
                      <li>
                        <strong>Static Exporting</strong> - Exporting a static
                        site with Next.js is as easy as a single command.
                      </li>
                      <li>
                        <strong>Zero Configuration</strong> - Automatic code
                        splitting, filesystem based routing, hot code reloading
                        and universal rendering.
                      </li>
                      <li>
                        <strong>Fully Extensible</strong> - Complete control
                        over Babel and Webpack. Customizable server, routing and
                        next-plugins.
                      </li>
                      <li>
                        <strong>Optimized & Ready for Production</strong> -
                        Optimized for a smaller build size, faster dev
                        compilation and dozens of other improvements.
                      </li>
                    </ul>
                    <p>
                      Find out more about Next.js at{" "}
                      <a href="https://nextjs.org/">its website</a>.
                    </p>
                  </div>

                  <hr className="my-5" />

                  <div>
                    <p className="mb-5">
                      To use this theme, all you need to do is to install Node,
                      theme's dependencies, and you're good to go.
                    </p>
                    <h6 className="text-uppercase mb-4">1. Install Node</h6>
                    <p className="text-muted mb-5">
                      If you don't have Node installed on your machine, head to{" "}
                      <a href="https://nodejs.org/en/download/">
                        its official site
                      </a>{" "}
                      and choose an appropriate installation for your system.
                    </p>
                    <h6 className="text-uppercase mb-4">
                      2. Install project's dependencies
                    </h6>
                    <p className="text-muted mb-4">
                      This will install dependencies from theme's{" "}
                      <code>package.json</code> file.
                    </p>
                    <SyntaxHighlighter
                      language="javascript"
                      style={tomorrow}
                      className="rounded shadow p-4 mb-5"
                    >
                      {`$ npm install`}
                    </SyntaxHighlighter>
                    <h6 className="text-uppercase mb-4">
                      3. Run development enviroment
                    </h6>
                    <p className="text-muted mb-4">
                      This will run a development task for Next.js. You're all
                      set.{" "}
                    </p>
                    <SyntaxHighlighter
                      language="javascript"
                      style={tomorrow}
                      className="rounded shadow p-4 mb-5"
                    >
                      {`$ npm run dev`}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div id="development" className="docs-item">
                  <h5 className="text-uppercase mb-4">Development</h5>
                  <div className="docs-desc">
                    <p>
                      Running <code>npm run dev</code> in the theme's folder
                      will start a local server instance on port 3000 to serve
                      and refresh your pages as you edit.
                    </p>
                  </div>
                </div>
                <div id="staticexport" className="docs-item">
                  <h5 className="text-uppercase mb-4">Static Export</h5>
                  <div className="docs-desc">
                    <p>
                      Running <code>npm run export</code> in the theme's folder
                      makes <code>/out</code> folder with a static export of
                      your website. Read more about Static HTML exports{" "}
                      <a href="https://nextjs.org/docs/advanced-features/static-html-export">
                        here
                      </a>
                      .
                    </p>
                    <div className="mt-2">
                      <p>
                        To setup your project for <code>static export</code>,
                        following configuration is needed.
                      </p>
                      <Card className="bg-gray-100 border-0">
                        <Card.Body>
                          <h6 className="text-muted text-uppercase font-weight-normal mb-3">
                            next.config.js
                          </h6>
                          <SyntaxHighlighter
                            language="javascript"
                            style={tomorrow}
                            className="rounded shadow p-4"
                          >
                            {highlightCode}
                          </SyntaxHighlighter>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
                <div id="deployment" className="docs-item">
                  <h5 className="text-uppercase mb-4">Deployment</h5>
                  <div className="docs-desc">
                    <p>
                      The easiest way to deploy your Next.js project is using{" "}
                      <a href="https://vercel.com/">Vercel platform</a>. More
                      about deploying Next.js and other hosting options{" "}
                      <a href="https://nextjs.org/docs/deployment">here</a>.
                    </p>
                  </div>
                </div>
                <div id="productionbuild" className="docs-item">
                  <h5 className="text-uppercase mb-4">Production build</h5>
                  <div className="docs-desc">
                    <p>
                      Running <code>npm run build</code> in the theme's folder
                      makes <code>/.next</code> folder with optimized production
                      build. Read more about production build{" "}
                      <a href="https://nextjs.org/docs/api-reference/cli#build">
                        here
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <div id="data" className="docs-item">
                  <h5 className="text-uppercase mb-4">Data + Data Fetching</h5>
                  <div className="docs-desc">
                    <p>
                      Theme uses static JSON files to feed data to the pages and
                      components. You can fetch your own data from headless CMS
                      or API. You can also simply edit sample JSON files located
                      at <code>/src/data</code> folder for easy content editing.
                    </p>
                    <p>
                      Find out more about data fetching{" "}
                      <a href="https://nextjs.org/docs/basic-features/data-fetching">
                        here
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <div id="static" className="docs-item">
                  <h5 className="text-uppercase mb-4">Routing</h5>
                  <div className="docs-desc">
                    <h6 className="text-dark">File-system Based Router</h6>
                    <p>
                      Next.js has a file-system based router built on the{" "}
                      <a href="https://nextjs.org/docs/basic-features/pages">
                        concept of pages
                      </a>
                      .
                    </p>
                    <p>
                      When a file is added to the pages directory it's
                      automatically available as a route.
                    </p>
                    <p className="mb-4">
                      The files inside the pages directory can be used to define
                      most common patterns.
                    </p>
                    <h6 className="text-dark">Dynamic Routing</h6>
                    <p>
                      Defining routes by using predefined paths is not always
                      enough for complex applications. In Next.js you can add
                      brackets to a page ([param]) to create a dynamic route
                      (a.k.a. url slugs, pretty urls, and others).
                    </p>

                    <p>
                      More about Dynamic Routes{" "}
                      <a href="https://nextjs.org/docs/routing/dynamic-routes">
                        here
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <div id="css_support" className="docs-item">
                  <h5 className="text-uppercase mb-4">Built-In CSS Support</h5>
                  <div className="docs-desc">
                    <p>
                      Next.js allows you to import CSS files from a JavaScript
                      file. This is possible because Next.js extends the concept
                      of import beyond JavaScript.
                    </p>
                    <p>
                      Find out more about working with CSS in Next.js{" "}
                      <a href="https://nextjs.org/docs/basic-features/built-in-css-support">
                        here
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}

const highlightCode = `...
{
  images: {
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    loader: "imgix", // needed for STATIC EXPORT
    path: "", // needed for STATIC EXPORT
  },
  env: {
    production_type: "server", // Change variable to "static" for STATIC EXPORT
  },
  trailingSlash: true // needed for STATIC EXPORT
},`
