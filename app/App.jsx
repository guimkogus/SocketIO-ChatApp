import React from 'react';
import AppContainer from './AppContainer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSocketIoMiddeware from 'redux-socket.io';
import io from 'socket.io-client';
import { IP_MACHINE } from './env';

const socket = io(`http://${IP_MACHINE}:4567`);
const socketIoMiddeware = createSocketIoMiddeware(socket, 'server/');

const reducer = (state = { conversations: {} }, action) => {
  switch (action.type) {
    case 'users_online':
      const conversations = { ...state.conversations };
      const usersOnline = action.payload;

      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId;

        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username
          };
        }
      }
      return { ...state, usersOnline, conversations };

    case 'private_message':
      const { message, conversationId } = action.payload;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [...state.conversations[conversationId].messages, message]
          }
        }
      };

    case 'self_user':
      return { ...state, selfUser: action.payload };

    default:
      return state;
  }
};

const store = applyMiddleware(socketIoMiddeware)(createStore)(reducer);

store.subscribe(() => {
  console.log('new state: ', store.getState());
});

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
