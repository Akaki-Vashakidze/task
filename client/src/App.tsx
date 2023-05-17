import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import useStore from './store';
import DataList from './components/list';
import AddModalWindow from './components/addModal';
import EditModalWindow from './components/editModal';

function App() {

  const data = useStore((state) => state.data)
  const saveServerData = useStore((state) => state.loadData)
  const [openEditModal, setOpenEditModal] = useState(0)
  const [openEditModalData, setOpenEditModalData] = useState('')


  const triggerEditModal = (data: any) => {
    setOpenEditModalData(data)
    setOpenEditModal(openEditModal + 1)
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get('api/data')
      .then(res => {
        saveServerData(res.data.data)
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <EditModalWindow openEditModalData={openEditModalData} openEditModal={openEditModal} />
      <AddModalWindow />
      <DataList triggerEditModal={triggerEditModal} />
    </>
  );
}

export default App;


