export default {
  name: 'react-flipcard-2',

  webpack: {
    libraryTarget: 'umd',
  },

  build: {
    directory: 'dist',
  },

  babel: {
    plugins: ['transform-class-properties'],
    presets: [
      'stage-0',
      [
        'env',
        {
          modules: false,
        },
      ],
      'react',
    ],
    env: {
      test: {
        plugins: ['istanbul'],
        sourceMaps: 'inline',
      },
    },
  },
};
