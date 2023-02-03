/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Form, Input, Space } from 'antd';
import { useCallback } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function TodoList({ token, data, render, setRender }) {
  // 수정 버튼
  const [amendButton, setAmendbutton] = useState(true)
  const amendButtonChange = useCallback(() => {
    setAmendbutton(false)
  }, [])

  // 글 수정
  const [todo, setTodo] = useState(data.todo)
  const onChangeAmend = useCallback((e) => {
    setTodo(e.target.value)
  }, [])

  // 글 수정 폼
  const onSubmitForm = useCallback(() => {
    axios.put(`http://localhost:8000/todos/${data.id}`, { todo, isCompleted: true }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert('수정되었습니다.')
        setAmendbutton(true)
        setTodo(todo)
        setRender(!render)
      })
      .catch(() => {
        alert('로그인이 필요합니다.')
      })
  }, [data.id, todo, token, render, setRender])

  // 취소 버튼
  const [cancelButton, setCancelButton] = useState(false)
  const cancelButtonChange = useCallback(() => {
    setAmendbutton(true)
    setCancelButton(true)
  }, [])

  // TODO 삭제
  const removeTodo = useCallback(() => {
    axios.delete(`http://localhost:8000/todos/${data.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert('삭제되었습니다.')
        setRender(!render)
      })
      .catch(() => {
        alert('로그인이 필요합니다.')
      })
  }, [data.id, token, render, setRender])

  return (
    <li>
      <Space>
        <input type="checkbox" css={css({ marginRight: '10px' })} />
      </Space>
      {
        amendButton ?
          <Space>
            <span>{todo} {data.isCompleted && '(수정됨)'}</span>
            <Button onClick={amendButtonChange} data-testid="modify-button" disabled={cancelButton}>수정</Button>
            <Button onClick={removeTodo} data-testid="delete-button">삭제</Button>
          </Space>
          :
          <Form style={{ display: 'inline-block' }} onFinish={onSubmitForm}>
            <Space>
              <Input type='text' value={todo} onChange={onChangeAmend} data-testid="modify-input" required />
              <Button htmlType='submit' data-testid="submit-button">제출</Button>
              <Button onClick={cancelButtonChange} data-testid="cancel-button">취소</Button>
            </Space>
          </Form>
      }
    </li>
  )
}
