import React from 'react'
import { Form, Button, Input, Space } from 'antd';

export default function TodoForm() {
  return (
    <Form>
      <h3>TODO를 적어주세요</h3>
      <Space>
        <Input type='text' data-testid="new-todo-input" />
        <Button data-testid="new-todo-add-button">추가</Button>
      </Space>
    </Form>
  )
}
