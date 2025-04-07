import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

const Account = () => {

  const [username, setUsername] = useState([]);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);

  const handleLogOut = () => { 
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
    
      <Pressable 
        onPress={handleLogOut}
        className="absolute bottom-4 left-4 bg-gray-300 p-3 rounded-md"
        
      >
        <Text className="text-black text-lg">Sign-Out</Text>
      </Pressable>

    </View>
  );
};

export default Account;
