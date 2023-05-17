import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import useStore from './store';
import DataList from './components/list';
import ModalWindow from './components/addModal';

function App() {
  
  const data = useStore((state) => state.data)
  const saveServerData = useStore((state) => state.loadData)

  useEffect(()=> {
    getData()
  },[])

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
      <ModalWindow />
      <DataList />
    </>
  );
}

export default App;


