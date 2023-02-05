/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useCallback } from 'react'
import { Form, Input, Button } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';

export default function SignUpForm() {
  const navigate = useNavigate();

  // 로그인 토큰
  const token = localStorage.getItem('access-token')

  // submit 버튼
  const [isClick, setIsClick] = useState(false)

  // 이메일, 비밀번호
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 에러메세지
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)

  // 로그인 여부에 따른 리다이렉트 처리
  useEffect(() => {
    if (token) navigate('/todo')
  })

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailValue = e.target.value
    setEmail(emailValue)
    if (!emailValue.includes('@')) {
      setEmailError('이메일에는 @가 포함되어야 합니다.')
      setIsEmail(false)
    } else {
      setEmailError('')
      setIsEmail(true)
    }
  }, [])

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordValue = e.target.value
    setPassword(passwordValue)
    if (passwordValue.length < 8) {
      setPasswordError('비밀번호는 8자리 이상이여야 합니다.')
      setIsPassword(false)
    } else {
      setPasswordError('')
      setIsPassword(true)
    }
  }, [])

  // 버튼 활성화
  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    if (isEmail && isPassword) {
      setIsDisabled(false)
      return
    } else {
      setIsDisabled(true)
    }
  }, [isEmail, isPassword])

  // 회원가입
  const onSubmitForm = useCallback(() => {
    if (!isClick) {
      setIsClick(true)
      axios.post('https://pre-onboarding-selection-task.shop/auth/signup', { email, password })
        .then(() => {
          alert('회원가입을 성공했습니다.')
          navigate('/signin')
          setIsClick(false)
        })
        .catch(() => {
          alert('이미 가입된 아이디 입니다.')
        })
    }
  }, [email, password, navigate, isClick])

  return (
    <Form onFinish={onSubmitForm} css={css({ position: 'absolute', width: '350px', padding: '30px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' })}>
      <h1>회원가입</h1>
      <div>
        <label htmlFor='email'>이메일</label>
        <br />
        <Input
          data-testid="email-input"
          name='email'
          type='text'
          value={email}
          onChange={onChangeEmail}
          required
        />
        {
          !isEmail && (<div css={css({ color: 'red' })}>{emailError}</div>)
        }
      </div>

      <div>
        <label htmlFor='password'>비밀번호</label>
        <br />
        <Input name='password' value={password} onChange={onChangePassword} data-testid="password-input" required />
        {
          !isPassword && (<div css={css({ color: 'red' })}>{passwordError}</div>)
        }
      </div>

      <div style={{ marginTop: 10 }}>
        <Button type='primary' htmlType='submit' data-testid="signup-button" disabled={isDisabled || isClick}>
          {isClick ? '회원가입중' : '회원가입'}
        </Button>
      </div>
      <div css={css({ textAlign: 'right' })}>
        <Link to='/signin'>로그인하러가기</Link>
      </div>
      <div css={css({ textAlign: 'right' })}>
        <Link to='/'>메인으로가기</Link>
      </div>
    </Form>
  )
}