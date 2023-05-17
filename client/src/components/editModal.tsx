import React, { useEffect, useState} from 'react';
import { Button, Modal, Form, Input , Select} from 'antd';
import axios from 'axios';
import useStore from '../store';

const { Option } = Select;

const EditModalWindow = (props:any) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const updateData = useStore((state) => state.loadData)
    
    const showModal = () => {
        setOpen(true);
    };

      useEffect(()=> {
        if(props.openEditModal > 0) {
            showModal()
            form.setFieldsValue({ name: props.openEditModalData.name, email: props.openEditModalData.email, phone: props.openEditModalData.phone, gender: props.openEditModalData.gender, city: props.openEditModalData.address.city, street: props.openEditModalData.address.street,  });
        } 
      },[JSON.stringify(props.openEditModal)])
  
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    
    const handleOk = (data:any) => {
        console.log(data)
        console.log(props.openEditModalData.id)
        let editedData = {
            // considering it as a unique number id
            id:Math.random(),
            name:data.name,
            email:data.email,
            address:{"city":data.city, "street":data.street},
            phone:data.phone,
            gender:data.gender,
        }

        axios.put('/api/data/editElement',{id:props.openEditModalData.id,editedData})
            .then(res => {
                console.log(res)
                updateData(res.data.data)
                setOpen(false);
            })
            .catch(err => {
                console.log(err)
            })
        // setOpen(false);
    };

    return (
        <>
            <Modal
                title="დამატება"
                open={open}
                onOk={()=>{
                    handleOk(form.getFieldsValue())
                }}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="დამატება"
                cancelText="უკან დაბრუნება"
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                >

<Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="city"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="street"
                        name="street"
                        rules={[{ required: true, message: 'Please input your street!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>




                </Form>
            </Modal>
        </>
    );
};

export default EditModalWindow