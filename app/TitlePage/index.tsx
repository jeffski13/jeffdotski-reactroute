import TitleImg from "./TitleImg";
import { Container, Row, Col, Image } from "react-bootstrap";
import './styles.css';

export default function TitlePage() {
    // return (
    //     <div>TitlePage</div>
    // );
  return (
      <div className="TitlePage" >
          <TitleImg />
          <Container fluid>
              <Row className="TitlePage_aboutJeff">
                  <Col xs={12} sm={0} className="TitlePage_aboutJeff-name">
                      <h2><span className="TitlePage_aboutJeff-name-websiteName">JEFF</span> <span className="TitlePage_aboutJeff-name-nonwebsitename">SZCIN</span><span className="TitlePage_aboutJeff-name-websiteName">SKI</span></h2>
                  </Col>
                  <Col xs={12} sm={12} md={5} className="TitlePage_aboutJeff-image">
                      <Image src="https://s3.us-east-2.amazonaws.com/jeff.ski/title/titlePage-info1-md.jpg" roundedCircle fluid />
                  </Col>
                  <Col xs={12} sm={12} md={7} className="TitlePage_aboutJeff-text">
                      <div className="TitlePage_aboutJeff-text-container">
                          <h3>Who Is This Jeff Guy?</h3>
                          <ul>
                              <li><strong>Software Engineer:</strong> Web Developer and Android Native Applications</li>
                              <li><strong>Traveler</strong> Tokyo, Japan <span>&nbsp;&bull;&nbsp;</span> Chile Coast <span>&nbsp;&bull;&nbsp;</span> Next Germany? </li>
                              <li><strong>Entrepreneur:</strong> Developing a travel blog platform </li>
                              <li><strong>Passion for Personal Finance:</strong> FI Meetup lead and on the road FI!</li>
                              <li><strong>A Believer of the Arts:</strong> Taking piano lessons, and always singing in the car</li>
                          </ul>
                          {/* <li><strong>AWS Serverless Officionado: </strong> Goodbye server management, hello microservices!</li> */}
                      </div>
                  </Col>
              </Row>
          </Container>
      </div>
  );
}