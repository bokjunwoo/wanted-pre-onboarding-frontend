/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Todo() {
  const navigate = useNavigate();

  // 로그인 토큰
  const token = localStorage.getItem('access-token')

  // 투두 데이터
  const [data, setData] = useState([])

  // useEffect 렌더를 위한 state
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8000/todos', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (res.data.length !== 0) {
            setData(res.data)
          } else {
            setData([undefined])
          }
        })
        .catch(() => {
          alert('데이터를 불러오는 중에 오류가 발생했습니다. 다시 시도해 주세요.')
        })
    } else {
      alert('로그인이 필요합니다.')
      navigate('/signin')
    }
  }, [token, render, navigate])

  if (data.length === 0) {
    return (
      <div css={css({ position: 'absolute', width: '400px', padding: '30px', left: '50%', top: '5%', transform: 'translate(-50%, 0)' })}>
        <TodoForm token={token} render={render} setRender={setRender} />
        <h3>데이터 로딩중 입니다...</h3>
      </div>
    )
  }

  return (
    <div css={css({ position: 'absolute', width: '400px', padding: '30px', left: '50%', top: '5%', transform: 'translate(-50%, 0)' })}>
      <TodoForm token={token} render={render} setRender={setRender} />
      <h3>내용</h3>
      {
        data[0] !== undefined ? data.map((data) => <TodoList key={data.id} data={data} token={token} render={render} setRender={setRender} />) : <span>저장된 TODO가 없습니다.</span>
      }
    </div>
  )
}
