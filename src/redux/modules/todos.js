// Action value
const ADD_TODO = "ADD_TODO";
const GET_TODO_BY_ID = "GET_TODO_BY_ID";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_STATUS_TODO = "TOGGLE_STATUS_TODO";

// Action Creator
// Todo를 추가하는 action creator
export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

// Todo를 지우는 action creator
export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

// Todo를 isDone를 변경하는 action creator
export const toggleStatusTodo = (id) => {
  return {
    type: TOGGLE_STATUS_TODO,
    payload: id,
  };
};

// 상세 페이지에서 특정 Todo만 조회하는 action creator
export const getTodoByID = (payload) => {
  return {
    type: GET_TODO_BY_ID,
    payload,
  };
};

// initial state
const initialState = {
  todos: [
    {
      id: "1",
      title: "리액트",
      body: "리액트를 배워봅시다",
      isDone: false,
    },
  ],
  // 주석처리
  // todo: {
  //   id: "0",
  //   title: "",
  //   body: "",
  //   isDone: false,
  // },

  todo: null
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        // 기존 코드
        // ...state,
        // todos: [action.payload],

        // 수정코드
        // 여기서 새로운 할일이 추가 되는것이 아닌 새로운 배열을 생성함
        // 추가할 때  이전의 목록이 사라진다.
        // todos배열을 전개 연산자 ...를 사용하여 새로운 배열을 복사한다.
        // 그리고 action.payload를 추가하면 오류 해결 된다.
        ...state,
        todos: [...state.todos, action.payload]
      };

    case TOGGLE_STATUS_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        }),
      };

    case GET_TODO_BY_ID:
      return {
        ...state,
        todo: state.todos.find((todo) => {
          return todo.id === action.payload;
        }),
      };

    // 추가
    case DELETE_TODO:
      // filter를 건 값을 덮어씌운다.
      const deleteTodos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
      return {
        ...state,
        todos: deleteTodos,
      };

    default:
      return state;
  }
};

export default todos;
