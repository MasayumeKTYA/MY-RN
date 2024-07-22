import { MusicDataType } from '@/type';
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PlatformPressable } from '@react-navigation/elements';
type ListsItemProps = {
  data: MusicDataType;
  index: number;
  onPress: (id: string, index: number) => void;
  onEdit: (data: string) => void;
};
const SongBox: React.FC<ListsItemProps> = ({
  data,
  index,
  onPress,
  onEdit,
}) => {
  return (
    <PlatformPressable
      style={itemStyle.box}
      onPress={() => onPress(data.id, index)}>
      <View style={itemStyle.outer}>
        <Text style={itemStyle.index}>{index + 1}</Text>
        <View style={itemStyle.fontBox}>
          <Text style={itemStyle.title} numberOfLines={1}>
            {data.title}
          </Text>
          <Text style={itemStyle.subtitle} numberOfLines={1}>
            {data.artist}
          </Text>
        </View>
      </View>
      <PlatformPressable
        style={itemStyle.outerPic}
        onPress={() => onEdit(data.id)}>
        <Ionicons
          name="ellipsis-vertical-sharp"
          size={20}
          style={itemStyle.pic}
          color="#000"
        />
      </PlatformPressable>
    </PlatformPressable>
  );
};
const itemStyle = StyleSheet.create({
  box: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  outer: {
    flexDirection: 'row',
  },
  outerPic: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  index: {
    marginLeft: 20,
  },
  fontBox: {
    marginLeft: 30,
    width: 190,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 10,
    marginTop: 5,
  },
  pic: {},
});
export default memo<ListsItemProps>(
  ({ data, index, onPress, onEdit }) => (
    <SongBox data={data} index={index} onPress={onPress} onEdit={onEdit} />
  ),
  () => true,
);
