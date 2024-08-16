import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../components/common/BackButton";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
export default function Crud({ getDatafun }) {
  const [show, setShow] = useState(false);
  //for getting the data
  const [animeData, setAnimeData] = useState([]);

  // this is for the adding the New data
  const [animieName, setanimeName] = useState("");
  const [animieDesc, setanimeDesc] = useState("");
  const [animieRating, setanimeRating] = useState(0);
  //this is for editig the existing data
  const [editId, setEditId] = useState(0);
  const [editAnimieName, setEditAnimieName] = useState("");
  const [editAnimieDesc, setEditAnimieDesc] = useState("");
  const [editAnimieRating, setEditAnimieRating] = useState(0);
  // Appi url
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  //for authentication token 
  const authHeader = useAuthHeader();
  const headers={'Authorization':authHeader}

  // for showing the  model pop up window
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//to get the data 
  const getData = () => {
    axios
      .get(apiUrl,{headers})
      .then((response) => {
        setAnimeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    // Fetch data from the API
    getData();
  }, []);

  
  // for displaying the get data in the page
  const tableRows = animeData.map((anime) => (
    <tr key={anime.id}>
      <td>{anime.id}</td>
      <td>{anime.name}</td>
      <td>{anime.description}</td>
      <td>{anime.rating}</td>
      <div className=" mx-2 d-flex bg-dark flex-column ">
        <button
          onClick={() => handleEditButton(anime.id)}
          className="btn btn-primary border"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(anime.id)}
          className="btn btn-danger border"
        >
          Delete
        </button>
      </div>
    </tr>
  ));


  const handleEditButton = (id) => {
    axios
      .get(apiUrl, id)
      .then((result) => {
        if (result.data.length === 1) {
          setEditAnimieName(result.data.at(0).name);
          setEditAnimieDesc(result.data.at(0).description);
          setEditAnimieRating(result.data.at(0).rating);
          setEditId(id);
          handleShow();
        } else {
          toast.error("undefined data");
        }
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}?id=${id}`)
      .then((result) => {
        if (result.status == 200) {
          toast.success("employee has deleted successfully");
          // getData operation perfomed
          getDatafun();
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  //to save the data from the api
  const handleSave = () => {
    const url = apiUrl;
    const data = {
      name: animieName,
      description: animieDesc,
      rating: animieRating,
    };
    axios.post(url, data).then(() => {
      //used for getting data from the get operation
      getDatafun(); //for getting the updated data from the get operation
      Clear();
      toast.success("New Animie has been added successfully");
    });
  };

  // to perform update operation
  const handleUpdate = () => {
    const url = apiUrl;
    const data = {
      id: editId,
      name: editAnimieName,
      description: editAnimieDesc,
      rating: editAnimieRating,
    };
    axios.put(url, data).then((result) => {
      setEditId(result.data.id);
      console.log(result.data.name);
      setEditAnimieName(result.data.name);
      setEditAnimieDesc(result.data.description);
      setEditAnimieRating(result.data.rating);
    });
    getDatafun();
    handleClose();
  };

  //to clear the data
  const Clear = () => {
    setanimeName("");
    setanimeDesc("");
    setanimeRating("");
  };

  return (
    <>
      <div className="d-flex flex-column bg-dark ">
        <h2 className="text-center">Animax</h2>
        <BackButton />
        <Fragment>
          <ToastContainer />
          <Container className="mt-5">
            <Row>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Animie"
                  value={animieName}
                  onChange={(e) => setanimeName(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Description"
                  value={animieDesc}
                  onChange={(e) => setanimeDesc(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter the Rating "
                  value={animieRating}
                  onChange={(e) => setanimeRating(e.target.value)}
                />
              </Col>
            </Row>
            <button className="btn btn-warning mt-2" onClick={handleSave}>
              Add
            </button>

            <Table striped className="mt-5">
              <thead>
                <tr style={{ width: "120px" }}>
                  <th>Id</th>
                  <th>Animie</th>
                  <th>Description</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </Container>

          {/* model popup */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Animie Update/Add </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={editAnimieName}
                    onChange={(e) => setEditAnimieName(e.target.value)}
                  />
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={editAnimieDesc}
                    onChange={(e) => setEditAnimieDesc(e.target.value)}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Rating"
                    value={editAnimieRating}
                    onChange={(e) => setEditAnimieRating(e.target.value)}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      </div>
    </>
  );
}
