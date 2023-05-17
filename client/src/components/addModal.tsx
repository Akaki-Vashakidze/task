import React, { useEffect, useState } from 'react';
import { Select, Button, Modal, Checkbox, Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import axios from 'axios';
import useStore from '../store';

const { Option } = Select;

function AddModalWindow() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const updateData = useStore((state) => state.loadData)

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = (formValue: any) => {
        console.log(formValue)
        let newData = {
            // considering it as a unique number id
            id: Math.random(),
            name: formValue.name,
            email: formValue.email,
            address: { "city": formValue.city, "street": formValue.street },
            phone: formValue.phone,
            gender: formValue.gender,
        }

        axios.put('/api/data/addElement', newData)
            .then(res => {
                console.log(res)
                updateData(res.data.data)
                setOpen(false);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className='addNewElementDiv'>
                <PlusCircleOutlined onClick={showModal} className='icon' style={{ fontSize: '250%', margin: 20 }} />
                <span onClick={showModal} className='add'>დამატება</span>
            </div>
            <Modal
                title="დამატება"
                open={open}
                onOk={() => {
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
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
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

export default AddModalWindow;