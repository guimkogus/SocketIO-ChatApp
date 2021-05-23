import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';

const FriendList = ({ navigation }) => {
  const usersOnline = useSelector((state) => state?.usersOnline);

  return (
    <View style={styles.container}>
      <FlatList
        data={usersOnline}
        renderItem={({ item: user }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', {
                name: user.username,
                userId: user.userId
              })
            }
          >
            <View style={styles.itemContainer}>
              <Image style={styles.itemImage} source={{ uri: user.avatar }} />
              <Text style={styles.itemText}>{user.username}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10
  },
  itemText: {
    fontSize: 18
  }
});

export default FriendList;
