import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router'

const Index = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logged in with', userName, password);
    router.push('/Home');
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      <Text className="text-4xl font-bold text-gray-800 mb-10">Login</Text>

      <TextInput
        className="w-full h-12 bg-white p-4 mb-5 border border-gray-300 rounded-md"
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
        keyboardType="Username"
        autoCapitalize="none"
      />

      <TextInput
        className="w-full h-12 bg-white p-4 mb-5 border border-gray-300 rounded-md"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full h-12 bg-green-500 justify-center items-center rounded-md mt-5"
      >
        <Text className="text-white text-lg font-bold">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-blue-500 text-sm">Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
