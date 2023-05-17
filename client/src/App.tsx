import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import useStore from './store';
import DataList from './components/list';

function App() {
  
  const data = useStore((state) => state.data)
  const saveServerData = useStore((state) => state.loadData)

  useEffect(()=> {
    getData()
  },[])


  axios.post('api/data',data)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })


  const onDataChange = () => {
  // console.log('data changed')
  // console.log(data)
  }

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
      <DataList onDataChange = {onDataChange} />
    </>

  );
}

export default App;


