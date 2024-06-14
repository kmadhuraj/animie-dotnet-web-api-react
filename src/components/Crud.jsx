import React, { Fragment, useEffect, useState } from 'react'

import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Crud() {

  const [animeData, setAnimeData] = useState([]);
  const [show, setShow] = useState(false);

  // this is for the adding the New data 
  const [animieName, setanimeName] = useState('');
  const [animieDesc, setanimeDesc] = useState('');
  const [animieRating, setanimeRating] = useState(0);

  //this is for editig the existing data
  const [editId, setEditId] = useState(0);

  const [editAnimieName, setEditAnimieName] = useState('');
  const [editAnimieDesc, setEditAnimieDesc] = useState('');
  const [editAnimieRating, setEditAnimieRating] = useState();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //for getting data from the get operation
  const getData = () => {
    axios.get('/api/Animie')
      .then((response) => {
        setAnimeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  useEffect(() => {
    // Fetch data from the API
    getData()
  }, []);

  const tableRows = animeData.map((anime) => (
    <tr key={anime.id}>
      <td>{anime.id}</td>
      <td>{anime.name}</td>
      <td>{anime.description}</td>
      <td>{anime.rating}</td>
      <div className=' mx-2 d-flex bg-info'>
        <button onClick={() => handleEditButton(anime.id)} className=' btn btn-primary border px-4 mx-2'>Edit</button>
        <button onClick={() => handleDelete(anime.id)} className='btn btn-danger border px-3'>Delete</button>
      </div>
    </tr>

  ));

  const handleEditButton = (id) => {

    axios.get(`https://localhost:7193/api/Animie/${id}`)
      .then((result) => {
        setEditAnimieName(result.data.name)
        console.log(result)

        setEditAnimieDesc(result.data.description)
        setEditAnimieRating(result.data.rating)
        setEditId(id)

        handleShow();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleAddButton = (id) => {
    handleShow();

  }
  const handleDelete = (id) => {
    axios.delete(`https://localhost:7193/api/Animie?id=${id}`)
      .then((result) => {
        if (result.status == 200) {
          toast.success('employee has deleted successfully');
          getData();
        }
      }).catch((error) => {
        toast.error(error);
      })
  }

  const handleUpdate = () => {
    const url = 'https://localhost:7193/api/Animie';
    const data = {
      "id": editId,
      "name": editAnimieName,
      "description": editAnimieDesc,
      "rating": editAnimieRating
    }
    axios.put(url, data)
      .then((result) => {
        setEditId(result.data.id)
        setEditAnimieName(result.data.editAnimieName)
        setEditAnimieDesc(result.data.editAnimieDesc)
        setEditAnimieRating(result.data.editAnimieRating)
      })
    getData()
    handleClose()


  }
  //to save the data from the api 
  const handleSave = () => {
    const url = 'https://localhost:7193/api/Animie'
    const data = {
      "name": animieName,
      "description": animieDesc,
      "rating": animieRating
    }
    axios.post(url, data)
      .then((result) => {
        //used for getting data from the get operation
        getData();//for getting the updated data from the get operation 
        Clear();
        toast.success('New Animie has been added successfully');
      })
  }
  //to clear the data
  const Clear = () => {
    setanimeName('');
    setanimeDesc('');
    setanimeRating('');
  }
  return (
    <>
      <div className='d-flex flex-column  bg-info '>
        <h2 className='text-center'>Animax</h2>
        <Fragment>
          <ToastContainer />
          <Container className='mt-5'>
            <Row>
              <Col><input type="text" className='form-control' placeholder='Enter the Animie' value={animieName} onChange={(e) => setanimeName(e.target.value)} /></Col>
              <Col><input type="text" className='form-control' placeholder='Enter the Description' value={animieDesc} onChange={(e) => setanimeDesc(e.target.value)} /></Col>
              <Col><input type="number" className='form-control' placeholder='Enter the Rating ' value={animieRating} onChange={(e) => setanimeRating(e.target.value)} /></Col>
            </Row>
            <button className='btn btn-primary mt-2' onClick={handleSave}>Add</button>


            <Table striped className='mt-5'>
              <thead >
                <tr style={{ width: '120px' }}>
                  <th>Id</th>
                  <th>Animie</th>
                  <th>Description</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>

            </Table>
          </Container>


          {/* model popup */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Animie Update/Add </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col><input type="text" className='form-control' placeholder='Name' value={editAnimieName} onChange={(e) => setEditAnimieName(e.target.value)} /></Col>
                <Col><input type="text" className='form-control' placeholder='Description' value={editAnimieDesc} onChange={(e) => setEditAnimieDesc(e.target.value)} /></Col>
                <Col><input type="number" className='form-control' placeholder='Rating' value={editAnimieRating} onChange={(e) => setEditAnimieRating(e.target.value)} /></Col>
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
  )
}
