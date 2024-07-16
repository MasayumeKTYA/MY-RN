// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
  
// };
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
      [
          'module-resolver',
          {
              root: ['./'],
              alias: {
                  '^@/(.+)': './src/\\1',
              },
          },
      ],
      'react-native-reanimated/plugin',
  ],
};