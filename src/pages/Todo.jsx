/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Todo() {
  const navigator = useNavigate();

  // 로그인 토큰
  const token = localStorage.getItem('access-token')

  // 투두 데이터
  const [data, setData] = useState([])

  // useEffect 렌더를 위한 state
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (token !== null) {
      axios.get('http://localhost:8000/todos', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setData(res.data)
          console.log(res.data)
        })
        .catch(() => {
          console.log('실패')
        })
    } else {
      alert('로그인후 이용가능 합니다.')
      navigator('/signin')
    }
  }, [token, navigator, render])

  return (
    <div css={css({ position: 'absolute', width: '400px', padding: '30px', left: '50%', top: '5%', transform: 'translate(-50%, 0)' })}>
      <TodoForm token={token} render={render} setRender={setRender} />
      <h3>내용</h3>
      {
        data.map((data) => <TodoList key={data.id} data={data} token={token} render={render} setRender={setRender} />)
      }
    </div>
  )
}
