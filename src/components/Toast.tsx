import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';
interface ToastProps {
  visible: boolean;
}
export const Toast: React.FC<ToastProps> = ({ visible }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={css.content}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    </Modal>
  );
};

const css = StyleSheet.create({
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 11,
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
});
