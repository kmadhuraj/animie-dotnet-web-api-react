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
  const [animieRating, setanimeRating] = useState();

  //this is for editig the existing data
  const [editId, setEditId] = useState();

  const [editAnimieName, setEditAnimieName] = useState('');
  const [editAnimieDesc, setEditAnimieDesc] = useState('');
  const [editAnimieRating, setEditAnimieRating] = useState();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //for getting data from the get operation
  const getData=()=>{
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
      <td>
        <button onClick={() => handleEditButton(anime.id)} className='bg-primary'>Edit</button>
        {/* <button onClick={() => handleAddButton(anime.id)} className='bg-success'>Add</button> */}
        <button onClick={() => handleDelete(anime.id)} className='bg-danger'>Delete</button>
      </td>
    </tr>
  ));

  const handleEditButton = (id) => {
    handleShow();
    axios.get(`https://localhost:7193/api/Animie/${id}`)
    .then((result)=>{
      setEditAnimieName(result.data.animieName)
      // console.log(result.data.animieName)
      
      setEditAnimieDesc(result.data.animieDesc)
      setEditAnimieRating(result.data.animieRating)
      setEditId(id)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

 
  const handleAddButton = (id) => {
    handleShow();
    
  }
  const handleDelete=(id)=>{
    axios.delete(`https://localhost:7193/api/Animie?id=${id}`)
    .then((result)=>{
      if(result.status==200)
      {
        toast.success('employee has deleted successfully');
        getData();
      }     
    }).catch((error)=>
    {
      toast.error(error);
    })
  }
  
  const handleUpdate = () => {
    const url=`https://localhost:7193/api/Animie/${editId}`;
    const data= {
      "id":editId,
      "name": editAnimieName,
      "description": editAnimieDesc,
      "rating": editAnimieRating
    }
    axios.put(url,data)
    .then((result)=>{
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
      <Fragment>
        <ToastContainer />
        <Container>
          <Row>
            <Col><input type="text" className='form-control' placeholder='Enter the Animie' value={animieName} onChange={(e) => setanimeName(e.target.value)} /></Col>
            <Col><input type="text" className='form-control' placeholder='Enter the Description' value={animieDesc} onChange={(e) => setanimeDesc(e.target.value)} /></Col>
            <Col><input type="number" className='form-control' placeholder='Enter the Rating ' value={animieRating} onChange={(e) => setanimeRating(e.target.value)} /></Col>
          </Row>
          <button className='btn btn-primary' onClick={handleSave}>Add</button>
          
        </Container>
        <Table striped>
          <thead>
            <tr>
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
    </>
  )
}
