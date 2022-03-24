import Mock from 'mockjs'

Mock.mock('/getBlogs', () => {
  return Mock.mock({
    code: 'S',
    'data|10': [
      {
        'name|+1': [
          'Hello',
          'Mock.js',
          '!'
        ],
        src: Mock.Random.image('300x200', '@color', '#FFF', 'png', '@title')
      }
    ]
  })
})
