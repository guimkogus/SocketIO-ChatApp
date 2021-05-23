import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { IP_MACHINE } from '../env';
import { GiftedChat } from 'react-native-gifted-chat';
import Join from './Join';

export default function Home() {
  const [recivedMessages, setRecivedMessages] = useState([]);
  const [hasJoined, setJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(`http://${IP_MACHINE}:4567`);

    socket.current.on('message', (message) => {
      setRecivedMessages((prevState) => GiftedChat.append(prevState, message));
    });
  }, []);

  const onSend = (messages) => {
    socket.current.emit('message', messages[0].text);

    setRecivedMessages((prevState) => GiftedChat.append(prevState, messages));
  };

  const joinChat = (username) => {
    socket.current.emit('join', username);

    setJoined(true);
  };

  return (
    <>
      {hasJoined ? (
        <GiftedChat
          renderUsernameOnMessage
          messages={recivedMessages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1
          }}
        />
      ) : (
        <Join joinChat={joinChat} />
      )}
    </>
  );
}
