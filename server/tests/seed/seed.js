const jwt = require('jsonwebtoken')
const { ObjectID } = require('mongodb')
const { Todo } = require('../../models/todo')
const { User } = require('../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [
  {
    _id: userOneId,
    email: 'dan@test.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign(
            {
              _id: userOneId,
              access: 'auth'
            },
            'abc123'
          )
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'dan2@test.com',
    password: 'userTwoPass'
  }
]

const todos = [
  {
    _id: userOneId,
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
]

const populateTodos = done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos)
    })
    .then(() => done())
}

const populateUsers = done => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save()
      const userTwo = new User(users[1]).save()

      return Promise.all([userOne, userTwo])
    })
    .then(() => done())
}

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
