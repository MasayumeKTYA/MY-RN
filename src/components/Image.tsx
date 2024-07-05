import { Image, ImageStyle, StyleProp } from 'react-native';
import { useEffect, useState } from 'react';
interface ImgProps {
  uri: string | null;
  style: StyleProp<ImageStyle>;
}
const Img: React.FC<ImgProps> = ({ uri, style }) => {
  let [myComponents, setMyComponents] = useState<React.ReactNode | null>(null);
  useEffect(() => {
    if (uri !== null) {
      let url = uri;
      const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
      if (!Expression.test(uri)) {
        url = 'file://' + url;
      }
      setMyComponents(<Image source={{ uri: url }} style={style} />);
    } else {
      setMyComponents(
        <Image source={require('../assest/text.jpg')} style={style} />,
      );
    }
  }, [uri]);
  return <>{myComponents}</>;
};
export default Img;
