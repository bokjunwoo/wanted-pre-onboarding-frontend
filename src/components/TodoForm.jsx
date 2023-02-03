import React from 'react'
import { Form, Button, Input, Space } from 'antd';
import { useCallback } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function TodoForm({ token, render, setRender }) {
  // submit 버튼
  const [isClick, setIsClick] = useState(false)

  // 투두
  const [todo, setTodo] = useState('')
  const onChangeTodo = useCallback((e) => {
    setTodo(e.target.value)
  }, [])

  // 투두 작성 폼
  const onSubmitTodoFrom = useCallback(() => {
    if (token) {
      if (!isClick) {
        setIsClick(true)
        axios.post('http://localhost:8000/todos', { todo }, { headers: { Authorization: `Bearer ${token}` } })
          .then(() => {
            alert('새로운 TODO가 입력되었습니다.')
            setTodo('')
            setRender(!render)
            setIsClick(false)
          }).catch(() => {
            alert('저장중에 오류가 발생했습니다. 다시 시도해 주세요.')
          })
      }
    } else {
      alert('로그인이 필요합니다.')
    }
  }, [todo, token, render, setRender, isClick])

  return (
    <Form onFinish={onSubmitTodoFrom}>
      <h3>TODO를 적어주세요</h3>
      <Space>
        <Input type='text' data-testid="new-todo-input" value={todo} onChange={onChangeTodo} required />
        <Button htmlType='submit' type='primary' data-testid="new-todo-add-button" disabled={isClick}>{isClick ? '저장중' : '저장'}</Button>
      </Space>
    </Form>
  )
}
