import React, { Fragment, useEffect, useState } from 'react'

import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function Crud() {
  //   const animeData = [
  //     { id: 1, name: 'Naruto', description: 'Ninja anime', rating: 9.1 },
  //     { id: 2, name: 'One Piece', description: 'Pirate anime', rating: 9.0 },
  //     // Add more anime data as needed
  // ];
  // const [animeData, setAnimeData] = useState([]);                  
  // useEffect(()=>{
  //   axios.get('https://localhost:7193/api/Animie').then((response)=>{
  //     setAnimeData(response.data);
  //   }).catch((error)=>{
  //     console.error('Error fetching data:',error);
  //   });
  // },[]);
  
  const [animeData, setAnimeData] = useState([]);

  const [show, setShow] = useState(false);

  // this is for the adding the New data 
  const[animieName,setanimeName]=useState();
  const[animieDesc,setanimeDesc]=useState();
  const[animieRating,setanimeRating]=useState();
  
  //this is for editig the existing data
  const[editId,setEditId]=useState('');

  const[editAnimieName,setEditAnimieName]=useState();
  const[editAnimieDesc,setEditAnimieDesc]=useState();
  const[editAnimieRating,setEditAnimieRating]=useState();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {  
    // Fetch data from the API
    axios.get('/api/Animie')
      .then((response) => {
        setAnimeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const tableRows = animeData.map((anime) => (
    <tr key={anime.id}>
      <td>{anime.id}</td>
      <td>{anime.name}</td>
      <td>{anime.description}</td>
      <td>{anime.rating}</td>
      <td>
        <button onClick={() => handleEditButton(anime.id)} className='bg-primary'>Edit</button>
        <button onClick={() => handleAddButton(anime.id)} className='bg-success'>Add</button>
      </td>
    </tr>
  ));

  const handleEditButton = (id) => {
    //if (window.confirm("Are you sure what to Edit?") == true) {
      handleShow();
      //alert(id);

    //}
  }
  const handleAddButton = (id) => {
    //if (window.confirm("Are you sure want to Add new data?")) {
      //alert(id);
      handleShow();
    //}
  }
  const handleUpdate = () => {

    
  }
  //to save the data from the api 
  const handleSave=()=>{
    const url='https://localhost:7193/api/Animie'
    const data={
      "name": animieName,
      "description": animieDesc,
      "rating": animieRating
    }
    axios.post(url,data)
    .then((result)=>{
      animeData();
    })

  }

  //to clear the data
const Clear=()=>{
  setanimeName('');
  setanimeDesc('');
  setanimeRating('');
}

  return (
    <>
      <Fragment>
        <Container>
          <Row>
            <Col><input type="text" className='form-control' placeholder='Enter the Animie Name' value={animieName} onChange={(e)=>setanimeName(e.target.value)}/></Col>
            <Col><input type="text" className='form-control' placeholder='Enter the Description of the Animie' value={animieDesc} onChange={(e)=>setanimeDesc(e.target.value)}/></Col>
            <Col><input type="number" className='form-control' placeholder='Enter the Rating of the Animie' value={animieRating} onChange={(e)=>setanimeRating(e.target.value)} /></Col>
          </Row>
          <button className='btn btn-primary'onClick={handleSave}>Submit</button>
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
              <Col><input type="text" className='form-control' placeholder='Enter the Animie Name' value={editAnimieName} onChange={(e)=>setEditAnimieName(e.target.value)}/></Col>
              <Col><input type="text" className='form-control' placeholder='Enter the Description of the Animie' value={editAnimieDesc} onChange={(e)=>setEditAnimieDesc(e.target.value)}/></Col>
              <Col><input type="number" className='form-control' placeholder='Enter the Rating of the Animie' value={editAnimieRating} onChange={(e)=>setEditAnimieRating(e.target.value)}/></Col>
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
