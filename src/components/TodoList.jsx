/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Form, Input, Space } from "antd";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";

export default function TodoList({ token, data, render, setRender }) {
  // submit 버튼
  const [isClick, setIsClick] = useState(false);

  // 체크 박스
  const [checkBox, setCheckBox] = useState(data.isCompleted);
  const checkBoxChange = useCallback((e) => {
    setCheckBox(!checkBox)
  }, [checkBox])

  // 수정 버튼
  const [amendButton, setAmendbutton] = useState(true);
  const amendButtonChange = useCallback(() => {
    setAmendbutton(false);
  }, []);

  // 글 수정
  const [todo, setTodo] = useState(data.todo);
  const onChangeAmend = useCallback((e) => {
    setTodo(e.target.value);
  }, []);

  // 체크 박스 클릭
  const onCheckBoxClick = useCallback(() => {
    if (token) {
      axios
        .put(
          `https://pre-onboarding-selection-task.shop/todos/${data.id}`,
          {
            todo,
            isCompleted: !checkBox,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setRender(!render)
        })
        .catch(() => {
          alert("저장중에 오류가 발생했습니다. 다시 시도해 주세요.");
        });
    } else {
      alert("로그인이 필요합니다.");
    }
  }, [data.id, token, todo, render, setRender, checkBox]);

  // 글 수정 폼
  const onSubmitForm = useCallback(() => {
    if (token) {
      if (!isClick) {
        setIsClick(true);
        axios
          .put(
            `https://pre-onboarding-selection-task.shop/${data.id}`,
            { todo, isCompleted: !checkBox },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            alert("수정되었습니다.");
            setAmendbutton(true);
            setTodo(todo);
            setRender(!render);
            setIsClick(false);
          })
          .catch(() => {
            alert("수정중에 오류가 발생했습니다. 다시 시도해 주세요.");
          });
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  }, [data.id, todo, token, render, setRender, isClick, checkBox]);

  // 취소 버튼
  const [cancelButton, setCancelButton] = useState(false);
  const cancelButtonChange = useCallback(() => {
    setAmendbutton(true);
    setCancelButton(true);
  }, []);

  // TODO 삭제
  const removeTodo = useCallback(() => {
    if (token) {
      if (!isClick) {
        setIsClick(true);
        axios
          .delete(`https://pre-onboarding-selection-task.shop/${data.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            alert("삭제되었습니다.");
            setRender(!render);
            setIsClick(false);
          })
          .catch(() => {
            alert("삭제중에 오류가 발생했습니다. 다시 시도해 주세요.");
          });
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  }, [data.id, token, render, setRender, isClick]);

  return (
    <li>
      <Space>
        <input
          type="checkbox"
          css={css({ marginRight: "10px" })}
          checked={checkBox}
          onChange={checkBoxChange}
          onClick={onCheckBoxClick}
        />
      </Space>
      {amendButton ? (
        <Space>
          <span>{todo}</span>
          <Button
            onClick={amendButtonChange}
            data-testid="modify-button"
            disabled={cancelButton}
          >
            수정
          </Button>
          <Button
            onClick={removeTodo}
            data-testid="delete-button"
            disabled={isClick}
          >
            {isClick ? "삭제중" : "삭제"}
          </Button>
        </Space>
      ) : (
        <Form style={{ display: "inline-block" }} onFinish={onSubmitForm}>
          <Space>
            <Input
              type="text"
              value={todo}
              onChange={onChangeAmend}
              data-testid="modify-input"
              required
            />
            <Button
              htmlType="submit"
              data-testid="submit-button"
              disabled={isClick}
            >
              {isClick ? "제출중" : "제출"}
            </Button>
            <Button onClick={cancelButtonChange} data-testid="cancel-button">
              취소
            </Button>
          </Space>
        </Form>
      )}
    </li>
  );
}
