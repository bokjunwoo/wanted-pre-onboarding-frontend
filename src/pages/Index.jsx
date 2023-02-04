import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export default function Index() {
  const ParentBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
  const Box = styled.div`
    width: 200px;
    height: 100px;
    border: 2px solid black;
    text-align: center;
    font-size: 50px;
    line-height: 100px;
    margin: 10px;
    box-sizing: border-box;
    border-radius: 10px;
  `
  const LinkTo = styled(Link)`
    text-decoration: none;
    color: black;
  `
  return (
    <ParentBox>
      <LinkTo to='/signin'><Box>로그인</Box></LinkTo>
      <LinkTo to='/signup'><Box>회원가입</Box></LinkTo>
      <LinkTo to='/todo'><Box>TODO</Box></LinkTo>
    </ParentBox>
  )
}