/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Input, Space } from 'antd';
import { useCallback } from 'react';
import { useState } from 'react';

export default function TodoList() {
  const [value, setValue] = useState('1')
  // 수정 버튼
  const [amendButton, setAmendbutton] = useState(true)
  const amendButtonChange = useCallback(() => {
    setAmendbutton(false)
  }, [])

  // 취소버튼
  const [cancelButton, setCancelButton] = useState(false)
  const cancelButtonChange = useCallback(() => {
    setAmendbutton(true)
    setCancelButton(true)
  }, [])

  const onChangeAmend = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const onSubmitForm = useCallback(() => {

  }, [])

  const removeTodo = useCallback(() => {

  }, [])

  return (
    <>
      <h3>내용</h3>
      <li>
        <Space>
          <input type="checkbox" css={css({ marginRight: '10px' })} />
        </Space>
        {
          amendButton ?
            <Space>
              <span>{value}</span>
              <Button onClick={amendButtonChange} data-testid="modify-button" disabled={cancelButton}>수정</Button>
              <Button onClick={removeTodo} data-testid="delete-button">삭제</Button>
            </Space>
            :
            <Space>
              <Input type='text' value={value} onChange={onChangeAmend} data-testid="modify-input" />
              <Button onSubmit={onSubmitForm} data-testid="submit-button">제출</Button>
              <Button onClick={cancelButtonChange} data-testid="cancel-button">취소</Button>
            </Space>
        }
      </li>
    </>
  )
}
