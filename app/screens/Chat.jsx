import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';

Chat.navigationOptions = (screeenProps) => ({
  title: screeenProps.navigation.getParam('name')
});

export default function Chat({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const selfUser = state?.selfUser;
  const conversations = state?.conversations;

  const userId = navigation.state.params.userId;
  const messages = conversations[userId].messages;

  return (
    <GiftedChat
      renderUsernameOnMessage
      messages={messages}
      onSend={(messages) => {
        dispatch({
          type: 'private_message',
          payload: {
            message: messages[0],
            conversationId: userId
          }
        });

        dispatch({
          type: 'server/private_message',
          payload: {
            message: messages[0],
            conversationId: userId
          }
        });
      }}
      user={{
        _id: selfUser?.userId
      }}
    />
  );
}
