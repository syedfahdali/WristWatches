import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  const getFullYear = new Date().getFullYear();

  return (
    <footer>
      <div className="bg-dark text-white p-4 text-center">
        <Row>
          <Container>
            <Col>&copy; copyRights@wristWorks-{getFullYear}</Col>
          </Container>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
