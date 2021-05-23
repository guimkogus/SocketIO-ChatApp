import React, {useEffect} from 'react';
import io from 'socket.io-client';
import { IP_MACHINE } from './env';
import Home from './screens/Home';

export default function App() {
  useEffect(() => {
    io(`http://${IP_MACHINE}:4567`);
  }, [])

  return (
    <Home />
  );
}
