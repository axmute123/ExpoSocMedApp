import { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, Pressable, Linking, Modal, TouchableOpacity, TextInput, Picker } from 'react-native';
import { retrieveVideos, deleteVideos, updateVideos, createVideos } from '../../api/videos'; 
import { retrieveUser } from '../../api/user';  

const Video = () => {
  const [videos, setVideos] = useState([]);  
  const [users, setUsers] = useState([]);    
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [postId, setPostId] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false); 

  useEffect(() => {
    retrieveUser()
      .then((res) => {
        setUsers(res.data);  
        if (res.data.length > 0) {
          setPostId(res.data[0].id);  
        }
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

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.log('Error opening URL', err));
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedVideo(null); 
    setIsUpdating(false); 
    
    setTitle('');
    setDescription('');
    setUrl('');
    setThumbnail('');
  };

  const createVideo = () => {
    const data = {
      title,
      description,
      url,
      thumbnail,
      post_id: postId,
    };

    createVideos(data)
      .then((res) => {
        console.log('Video created successfully:', res);
        setVideos((prevVideos) => [res.data, ...prevVideos]);
        handleModalClose();
      })
      .catch((err) => {
        console.error('Error creating video:', err);
      });
  };

  const updateVideo = () => {
    const videoData = {
        title,
        description,
        url,
        thumbnail,
        post_id: postId,
        id: selectedVideo.id  
    };

    console.log('Updating video with data:', videoData); 

    updateVideos(videoData)  
        .then((res) => {
            console.log('Video updated successfully:', res);
            const updatedVideos = videos.map((video) => 
                video.id === selectedVideo.id ? { ...video, ...videoData } : video
            );
            setVideos(updatedVideos);
            handleModalClose();
        })
        .catch((err) => {
            console.error('Error updating video:', err);
        });
  };

  const handleDelete = (id) => {
    deleteVideos(id)  
      .then((res) => {
        console.log('Video deleted successfully:', res);
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));  
        setConfirmationModalVisible(false);  
      })
      .catch((err) => {
        console.error('Error deleting video:', err);
      });
  };

  const openConfirmationModal = (video) => {
    setSelectedVideo(video);
    setConfirmationModalVisible(true);  
  };

  const closeConfirmationModal = () => {
    setConfirmationModalVisible(false);
    setSelectedVideo(null);  
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
                Owner: {item.post && item.post.created_by ? item.post.created_by: 'Unknown'} 
              </Text>

            
              <View className="flex-row justify-between">
                <Pressable 
                  onPress={() => {
                    setSelectedVideo(item);
                    setTitle(item.title);
                    setDescription(item.description);
                    setUrl(item.url);
                    setThumbnail(item.thumbnail);
                    setPostId(item.post_id);
                    setIsUpdating(true);
                    setModalVisible(true); 
                  }}
                >
                  <Text className="text-blue-500 mt-2">Update</Text>
                </Pressable>

                
                <TouchableOpacity 
                  onPress={() => openConfirmationModal(item)}
                >
                  <Text className="text-red-500 mt-2">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setIsUpdating(false); 
        }}
        className="absolute bottom-5 right-5 bg-blue-500 rounded-full p-5 shadow-lg"
      >
        <Text className="text-white text-3xl font-bold">+</Text>
      </TouchableOpacity>

    
      {modalVisible && (
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={handleModalClose}
        >
          <View className="flex-1 justify-center items-center bg-gray-900 bg-opacity-60">
            <View className="bg-gray-800 p-5 rounded-lg w-80">
              <Text className="text-white text-xl mb-4">{isUpdating ? 'Update Video' : 'Create a New Video'}</Text>

              <TextInput
                placeholder="Title"
                className="h-12 border border-gray-300 rounded-md p-2 mb-4 text-white"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                placeholder="Description"
                className="h-12 border border-gray-300 rounded-md p-2 mb-4 text-white"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                placeholder="URL"
                className="h-12 border border-gray-300 rounded-md p-2 mb-4 text-white"
                value={url}
                onChangeText={setUrl}
              />
              <TextInput
                placeholder="Thumbnail URL"
                className="h-12 border border-gray-300 rounded-md p-2 mb-4 text-white"
                value={thumbnail}
                onChangeText={setThumbnail}
              />

              {/* This section picker picker will be updated when I have my auth and also the controller/model in my backend */}

              <Picker
                selectedValue={postId}
                onValueChange={(itemValue) => setPostId(itemValue)}
                style={{ height: 50, width: '100%', marginBottom: 10 }}
              >
                {users.map((user) => (
                  <Picker.Item key={user.id} label={user.username} value={user.id} />
                ))}
              </Picker>

              <TouchableOpacity onPress={isUpdating ? updateVideo : createVideo} className="mb-3">
                <Text className="text-blue-500 font-bold text-lg text-center">{isUpdating ? 'Update' : 'Create'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleModalClose}>
                <Text className="text-red-500 font-bold text-lg text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

     
      {selectedVideo && confirmationModalVisible && (
        <Modal
          visible={confirmationModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={closeConfirmationModal}
        >
          <View className="flex-1 justify-center items-center bg-gray-900 bg-opacity-60">
            <View className="bg-gray-800 p-5 rounded-lg w-80">
              <Text className="text-white text-xl mb-4">Are you sure you want to delete this video?</Text>
              <TouchableOpacity onPress={() => handleDelete(selectedVideo.id)} className="text-red-500 text-lg mb-2">
                <Text className="text-red-500 text-lg mb-2">Yes, Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeConfirmationModal}>
                <Text className="text-gray-500 text-lg">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Video;
