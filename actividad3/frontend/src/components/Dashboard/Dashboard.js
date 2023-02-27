import { useCookies } from 'react-cookie';
import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  ListGroup,
} from 'react-bootstrap';

const Dashboard = () => {
  const [cookies] = useCookies(['auth_token']);
  const descriptionRef = useRef();
  const nameRef = useRef();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [userCategories, setUserCategories] = useState([]);

  const getCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/category`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const categories = await response.json();
    return categories;
  };

  const createCategory = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/category`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        body: JSON.stringify(body),
      }
    );
    await response.json();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const description = descriptionRef.current.value;
    const name = nameRef.current.value;
    if (description === '' || name === '') return;
    setDisableSubmit(true);
    try {
      await createCategory({ description, name });
      const categories = await getCategories();
      setUserCategories(categories.data);
    } catch (error) {
      console.log(error);
    }
    setDisableSubmit(false);
    descriptionRef.current.value = '';
    nameRef.current.value = '';
  };

  useEffect(() => {
    const getAllUserCategories = async () => {
      const categories = await getCategories();
      console.log(categories);
      setUserCategories(categories.data);
    };
    getAllUserCategories();
  }, []);

  const userCategoriesList = userCategories.map((category) => {
    return (
      <ListGroup.Item key={category.category} action>
        <Card>
          <Card.Body>
            <Card.Title>{category.name}</Card.Title>
            <Card.Text>{category.description}</Card.Text>
          </Card.Body>
        </Card>
      </ListGroup.Item>
    );
  });

  return (
    <Container fluid className="mt-5">
      <Row className="align-items-center justify-content-center">
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center"
        >
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control placeholder="..." ref={nameRef} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Category Description</Form.Label>
                    <Form.Control
                      placeholder="..."
                      as="textarea"
                      rows={3}
                      ref={descriptionRef}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 justify-content-end">
                  <Col className="d-flex justify-content-end">
                    <Button
                      disabled={disableSubmit}
                      variant="outline-success"
                      type="submit"
                      style={{ width: '100%' }}
                    >
                      {disableSubmit && (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      Create category
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="d-flex align-items-start justify-content-center">
          <ListGroup>{userCategoriesList}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
