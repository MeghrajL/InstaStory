import {
  Animated,
  Button,
  FlatList,
  Image,
  LogBox,
  Modal,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  YellowBox,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import useTheme from '@/hooks/useTheme';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
LogBox.ignoreAllLogs();
const IGNORED_LOGS = ['Animated'];

LogBox.ignoreLogs(IGNORED_LOGS);
// const alert = requireNativeComponent(RNBridgePlugin);

const Home = () => {
  console.log('r');
  const [seenUsers, setSeenUsers] = useState([]);
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();

  const [content, setContent] = useState([
    {
      id: 1,
      username: 'Meghraj',
      profile:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/1.jpg?alt=media&token=63304587-513b-436d-a228-a6dc0680a16a',
      stories: [
        {
          storyId: 1,
          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/1.jpg?alt=media&token=63304587-513b-436d-a228-a6dc0680a16a',
          type: 'image',
          seen: false,
        },
        {
          storyId: 2,

          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/2.mp4?alt=media&token=fcd41460-a441-4841-98da-d8f9a714dd4d',
          type: 'video',
          seen: false,
        },
        {
          storyId: 3,

          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/3.jpg?alt=media&token=326c1809-adc2-4a23-b9c3-8995df7fcccd',
          type: 'image',
          seen: false,
        },
      ],
    },
    {
      id: 2,
      username: 'Vrunal',
      profile:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/1.jpg?alt=media&token=63304587-513b-436d-a228-a6dc0680a16a',
      stories: [
        {
          storyId: 4,

          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/4.jpg?alt=media&token=e9c5bead-4d9f-40d9-b9fa-c6bc12dd6134',
          type: 'image',
          seen: false,
        },
        {
          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/5.jpg?alt=media&token=7dcb6c3a-8080-4448-bb2c-c9594e70e572',
          type: 'image',
          seen: false,
        },
        {
          storyId: 5,

          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/6.jpg?alt=media&token=1121dc71-927d-4517-9a53-23ede1e1b386',
          type: 'image',
          seen: false,
        },
        {
          storyId: 6,

          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/7.jpg?alt=media&token=7e92782a-cd84-43b6-aba6-6fe6269eded6',
          type: 'image',
          seen: false,
        },
      ],
    },
    {
      id: 3,
      username: 'Swapnil',
      profile:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/1.jpg?alt=media&token=63304587-513b-436d-a228-a6dc0680a16a',
      stories: [
        {
          storyId: 7,

          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/8.mp4?alt=media&token=5b6af212-045b-4195-9d65-d1cab613bd7f',
          type: 'video',
          seen: false,
        },
        {
          storyId: 8,

          content:
            'https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/9.jpg?alt=media&token=0a382e94-6f3f-4d4e-932f-e3c3f085ebc3',
          type: 'image',
          seen: false,
        },
      ],
    },
  ]);

  const seenStoryIds = useRef(new Set());

  const [usersWithAllStoriesSeen, setUsersWithAllStoriesSeen] = useState(
    new Set(),
  );

  // Function to check if all stories of a user are seen and add them to usersWithAllStoriesSeen
  const checkAllStoriesSeen = userId => {
    const user = content.find(item => item.id === userId);

    if (user) {
      const allStoriesSeen = user.stories.every(story =>
        seenStoryIds.current.has(story.storyId),
      );
      console.log(allStoriesSeen);
      if (allStoriesSeen) {
        // usersWithAllStoriesSeen.add(userId);
        const updatedSet = new Set(usersWithAllStoriesSeen);
        updatedSet.add(userId);
        setUsersWithAllStoriesSeen(updatedSet);
      }
    }
    console.log('?', usersWithAllStoriesSeen);
  };
  // Function to mark a story as seen
  const markStoryAsSeen = storyId => {
    seenStoryIds.current.add(storyId);
    console.log(seenStoryIds);
  };

  const [isFullscreenVisible, setFullscreenVisible] = useState(false);
  const currentUser = useRef(1);
  const FullscreenView = ({ isVisible, onClose, data }) => {
    const [currUser, setCurrUser] = useState(currentUser.current);
    const [dragY] = useState(new Animated.Value(0));

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: dragY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // You can adjust the threshold for closing the modal
          Animated.timing(dragY, {
            toValue: 1000,
            duration: 700,
            useNativeDriver: false,
          }).start(() => {
            onClose();
            dragY.setValue(0);
          });
        } else {
          // Animate the modal back to its original position
          Animated.spring(dragY, {
            toValue: 0,
            tension: 10,
            friction: 6,
            useNativeDriver: false,
          }).start();
        }
      },
    });

    const translateY = dragY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 200],
    });

    // console.log(currUser);
    const currUserData = data.filter(item => item.id === currUser);
    // console.log(currUserData);
    const { username, stories, id } = currUserData[0];
    const [currStory, setCurrStory] = useState(stories[0].storyId);
    // useEffect(() => {
    //   markStoryAsSeen(stories[0].storyId);
    // }, [stories[0].storyId]);
    // console.log(
    //   currUser,
    //   currUserData,
    //   currStory,
    //   username,
    //   stories,
    //   '>',
    //   stories[0].storyId,
    // );
    const currStoryData = stories.filter(item => currStory === item.storyId);

    // console.log(stories, currStoryData, currStory);
    // const makeStorySeen=(storyId) =>{
    //   storyId = true
    // }
    return (
      <Modal transparent={true} animationType="slide" visible={isVisible}>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            transform: [{ translateY }],
          }}
          {...panResponder.panHandlers}
        >
          <View style={styles.content}>
            {currUser > 0 && currUser <= data.length && (
              <Text style={{ color: 'black' }}>{username}</Text>
            )}
            <Button title="Close" onPress={onClose} />
            <Button
              title="Next"
              onPress={() => {
                if (currUser < data.length) {
                  setCurrUser(currUser + 1);
                  const nextUser = data.filter(
                    item => item.id === currUser + 1,
                  );
                  setCurrStory(nextUser[0].stories[0].storyId);
                  markStoryAsSeen(nextUser[0].stories[0].storyId);
                } else {
                  onClose();
                }
              }}
            />
            <Button
              title="Prev"
              onPress={() => {
                if (currUser > 1) {
                  setCurrUser(currUser - 1);

                  const prevUser = data.filter(
                    item => item.id === currUser - 1,
                  );
                  setCurrStory(prevUser[0].stories[0].storyId);
                  markStoryAsSeen(prevUser[0].stories[0].storyId);
                  setContent({ ...content });
                } else {
                  onClose();
                }
              }}
            />
            <Image
              style={{
                width: 75,
                height: 75,
                borderRadius: 75 / 2,
                alignSelf: 'center',
                // borderColor: '#fff',
                borderWidth: 3,
              }}
              source={{ uri: currStoryData[0].content }}
            />
            <Text>
              {currStory}
              {seenStoryIds.current}
            </Text>
            <Button
              title="+"
              onPress={() => {
                if (currStory < stories[stories.length - 1].storyId) {
                  setCurrStory(currStory + 1);
                  markStoryAsSeen(currStory + 1);
                } else if (currUser < data.length) {
                  setCurrUser(currUser + 1);
                  // setCurrStory(1);
                  const nextUser = data.filter(
                    item => item.id === currUser + 1,
                  );
                  setCurrStory(nextUser[0].stories[0].storyId);
                  markStoryAsSeen(nextUser[0].stories[0].storyId);
                } else {
                  onClose();
                }
              }}
            />
            <Button
              title="-"
              onPress={() => {
                if (currStory > stories[0].storyId) {
                  setCurrStory(currStory - 1);
                  markStoryAsSeen(currStory - 1);
                } else if (currUser > 1) {
                  setCurrUser(currUser - 1);
                  const prevUser = data.filter(
                    item => item.id === currUser - 1,
                  );

                  setCurrStory(
                    prevUser[0].stories[prevUser[0].stories.length - 1].storyId,
                  );
                  markStoryAsSeen(
                    prevUser[0].stories[prevUser[0].stories.length - 1].storyId,
                  );
                } else {
                  onClose();
                }
              }}
            />
          </View>
        </Animated.View>
      </Modal>
    );
  };

  const UserItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setFullscreenVisible(true);
          // setCurrentUser(item.id);
          currentUser.current = item.id;
          markStoryAsSeen(item.stories[0].storyId);
        }}
        style={{
          height: 100,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LinearGradient
          colors={[
            '#405DE6',
            '#5B51D8',
            '#833AB4',
            '#C13584',
            '#E1306C',
            '#F56040',
            '#FCAF45',
          ]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            height: 82,
            width: 82,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 82 / 2,
          }}
        >
          <Image
            style={{
              width: 75,
              height: 75,
              borderRadius: 75 / 2,
              alignSelf: 'center',
              // borderColor: '#fff',
              borderWidth: 3,
            }}
            source={{ uri: item.profile }}
          />
        </LinearGradient>
        <Text style={{ color: 'white', fontSize: 16 }}>{item.username}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={content}
        renderItem={({ item }) => <UserItem item={item} />}
        horizontal
        contentContainerStyle={{ gap: 10, margin: 10 }}
      />

      <FullscreenView
        isVisible={isFullscreenVisible}
        onClose={() => {
          setFullscreenVisible(false);
          checkAllStoriesSeen(1);
        }}
        data={content}
      />
    </SafeAreaView>
  );
};

export default Home;
