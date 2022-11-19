import React from "react";
import { Row,Col } from "react-bootstrap";

class Footer extends React.Component{
  render(){
    return(
      <footer>
        <Row>
          <Col md={4}>
            <h4>&copy; Dylan Cabral 2022</h4>
          </Col>
          <Col md={{ span:3 , offset:5}}>
            <small>
              <a href="https://locationiq.com">location of parent API</a>
            </small>
          </Col>
        </Row>
      </footer>
    )
  }
}
export default Footer;

