import React, { useState } from 'react';
import { View, Button, TextInput, Image } from 'react-native';

const Join = ({ joinChat }) => {
  const [username, setUsername] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require('../assets/chat-icon.png')}
      />

      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <TextInput
          value={username}
          onChangeText={(name) => setUsername(name)}
          style={{ fontSize: 30, textAlign: 'center' }}
          placeholder="Seu nome"
        />
        <Button title="Entrar" onPress={() => joinChat(username)} />
      </View>
    </View>
  );
};

export default Join;
