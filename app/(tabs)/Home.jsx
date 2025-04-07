import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { retrievePosts } from '../../api/posts';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    retrievePosts()
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []); 

  return (
    <View className="flex-1 bg-gray-200">
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-300">
            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: item.user.profile_picture }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <Text className="font-bold text-lg ">{item.user.username}</Text>
            </View>

            <Text className="mb-4">{item.description}</Text>

            <TouchableOpacity className="w-full h-48 rounded-lg pointer">
              <Image
                source={{ uri: item.media_link }}
                className="w-full h-full rounded-lg"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
