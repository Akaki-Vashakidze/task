import React, { useEffect, useState } from 'react';
import { Button, Modal, Checkbox, Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

const EditModalWindow: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setOpen(true);
    };

    // useEffect(()=>{
    //     form.setFieldValue({
    //         Username:'asfas'
    //     },form)
    // },[])
  
  
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    
    const handleOk = (res:any) => {
        console.log(res)
        // setOpen(false);
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
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default EditModalWindow;