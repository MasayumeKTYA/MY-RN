import { View, Text, StyleSheet } from 'react-native';
type headerRightProp = {
  onSearch: () => void;
};
const HeaderRight: React.FC<headerRightProp> = prop => {
  const { onSearch } = prop;
  return (
    <View style={css.box}>
      <Text onPress={onSearch} style={css.text}>
        搜索
      </Text>
    </View>
  );
};
const css = StyleSheet.create({
  box: {
    marginRight: 20,
  },
  text: {
    fontSize: 16,
  },
});
export default HeaderRight;
