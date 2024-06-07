import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
    if (window.confirm("Are you sure wnat to Edit?") == true) {
      alert(id);

    }
  }
  const handleAddButton = (id) => {
    if (window.confirm("Are you sure want to Add new data?")) {
      alert(id);

    }
  }
  return (
    <>
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
