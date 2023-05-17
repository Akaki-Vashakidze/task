import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import useStore from '../store';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

interface DataType {
  id: number;
  name: string;
  address: string;
  email: string;
  gender: string;
  phone: string;
  key: number | string;
}

function DataList() {

  const data: DataType[] = useStore((state) => state.data)
  const updateData = useStore((state) => state.loadData)

  const deleteRow = async (id: string) => {
    console.log(id)
    axios.delete('/api/data/delete/' + id)
      .then(res => {
        console.log(res)
        updateData(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
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
      render: (address) => {
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
      dataIndex: 'phone'
    },
    {
      title: 'delete',
      key: 'id',
      dataIndex: 'id',
      render: (id) => {
        return (
          <div>
            <EditOutlined className='icon' />
            <DeleteOutlined
              className='icon'
              style={{ color: 'red', marginLeft: 12 }}
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
      <Table       
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              console.log(record)
              // setActiveRecord(record);
              // setIsModalVisible(true);
            },
          };
        }}
 columns={columns} dataSource={data} />
    </>
  )
}

export default DataList;