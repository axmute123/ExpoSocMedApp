import React from 'react';
import { View, Text, Pressable } from 'react-native';

const AddPost = () => {
  return (
    <View className="flex-1 bg-gray-200 justify-center items-center">
       <Pressable>
        <Text className="text-white text-xl font-semibold">Add Post</Text>
        </Pressable>
    </View>
  );
};

export default AddPost;
