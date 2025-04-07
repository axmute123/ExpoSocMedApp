import { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, Pressable, Linking } from 'react-native';
import { retrieveVideos } from '../../api/videos'; 
import { retrieveUser } from '../../api/user';  

const Video = () => {
  const [videos, setVideos] = useState([]);  
  const [users, setUsers] = useState([]);    
  useEffect(() => {
   
    retrieveUser()
      .then((res) => {
        setUsers(res.data);  
      })
      .catch((err) => console.log('Error fetching users:', err));
  }, []); 

  useEffect(() => {
   
    if (users.length > 0) {
      retrieveVideos()
        .then((res) => {
          const updatedVideos = res.data.map((video) => {
            const username = users.find((user) => user.id === video.post.created_by)?.username || 'Unknown';
            return {
              ...video,
              post: {
                ...video.post,
                created_by: username,
              },
            };
          });
          setVideos(updatedVideos);
        })
        .catch((err) => console.log('Error fetching videos:', err));
    }
  }, [users]); 
  console.log('fetched', videos);
  console.log('fetched', users); 

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.log('Error opening URL', err));
  };

  return (
    <View className="flex-1 bg-black p-2">
      <FlatList
        data={videos}  
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-gray-800 rounded-lg overflow-hidden m-4">
            <Pressable onPress={() => handlePress(item.url)}>
              <Image
                className="w-full h-[200px] bg-gray-500 p-4"
                source={{ uri: item.thumbnail }} 
              />
            </Pressable>

            <View className="p-3">
              <Text className="text-white text-lg font-semibold">{item.title}</Text>
              <Text className="text-gray-300 text-sm mt-1">{item.description}</Text>
              <Text className="text-gray-300 text-sm mt-1">
                Owner: {item.post.created_by} 
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Video;
