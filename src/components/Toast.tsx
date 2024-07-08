import { View, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native';
interface ToastProps {
  visible: boolean;
  title: string;
}
export const Toast: React.FC<ToastProps> = ({ visible, title }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}>
      {title === '' ? (
        <View style={css.bg}>
          <View style={css.content}>
            <ActivityIndicator size="large" color="pink" />
          </View>
        </View>
      ) : (
        <View style={css.bg}>
          <View style={css.fontContent}>
            <Text style={{ color: '#fff' }}>{title}</Text>
          </View>
        </View>
      )}
    </Modal>
  );
};
const css = StyleSheet.create({
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },

  content: {
    width: 200,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -100 }, { translateY: -50 }],
    borderRadius: 10,
  },
  fontContent: {
    width: 200,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -100 }, { translateY: -50 }],
    borderRadius: 10,
  },
});
