import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useStore from '../store';
import {PlusCircleOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'

interface DataType {
  id: number;
  name: string;
  address: string;
  email: string;
  gender: string;
  phone:string;
  key:number | string;
}

function DataList (props:any) {

  const data: DataType[] = useStore((state) => state.data)
  const deleteElement = useStore((state) => state.deleteElement)

  const deleteRow = (id:string) => {
    deleteElement(id)
    props.onDataChange()
  } 

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'address',
    dataIndex: 'address',
    key: 'address',
    render:(address) => {
      return (
        <div>
           <span>{address.city + ' /'}</span>
           <span>{' ' + address.street}</span>
        </div>
      )
    }
  },
  {
    title: 'gender',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: 'phone',
    key: 'phone',
    dataIndex:'phone'
  },
  {
    title: 'delete',
    key: 'id',
    dataIndex:'id',
    render : (id) => {
      return (
        <div>
          <EditOutlined className='icon'/>
          <DeleteOutlined
          className='icon'
          style={{color:'red',marginLeft:12}}
          onClick={() => {
          deleteRow(id)
        }} />
          </div>
      )
    }
  },
];

  return (
    <>
      <div className='addNewElementDiv'>
        <PlusCircleOutlined className='icon' style={{ fontSize: '250%',margin:20}} />
        <span className='add'>დამატება</span>
      </div>
      <Table columns={columns} dataSource={data} />
    </>

  )
}

export default DataList;