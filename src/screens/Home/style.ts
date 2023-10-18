import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imageStyle: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
});
