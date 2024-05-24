import React, { useState } from 'react';
import {
  Table, Space, Button, Modal, Form, Input
} from 'antd';

import { useUsers } from '../../api/users';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

function UserList() {
  const { users, updateUserById, deleteUserById } = useUsers();
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Avatar',
      render: (avatarUrl) => <img src={avatarUrl} alt="avatar" />,
      key: 'avatar',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record.id)}>
            Edit
          </Button>
          <Modal title="Edit" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} name="dynamic_rule" style={{ maxWidth: 600 }}>
              <Form.Item
                {...formItemLayout}
                name="firstname"
                label="First Name"
                rules={[{ required: true, message: 'Please input your name' }]}
              >
                <Input placeholder="Please input your name" />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                name="lastname"
                label="Last Name"
                rules={[{ required: true, message: 'Please input your name' }]}
              >
                <Input placeholder="Please input your name" />
              </Form.Item>
            </Form>
          </Modal>
          <Button onClick={() => deleteUserById(record.id, record.data)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const showModal = (userId) => {
    setEditingUserId(userId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        const { firstname, lastname } = values;
        updateUserById(editingUserId, { first_name: firstname, last_name: lastname });
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validate Failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Table rowKey={(r) => r.id} columns={columns} dataSource={users} />
    </div>
  );
}

export default UserList;