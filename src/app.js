import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import { buildSchema } from 'graphql'
import mongoose from 'mongoose'
const PORT = process.env.PORT || 5000

const events = []

//app init
const app = express()

app.use(bodyParser.json())

// schema
import Event from './models/Event'
import User from './models/User'

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`

        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        type User {
          _id: ID!
          email: String!
          password: String!
        }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        input UserInput {
          email: String!
          password: String!
        }

        type Query {
          events: [Event!]!
          users: [User!]!
        }

        type Mutation {
          createEvents(eventInut: EventInput): Event
          createUsers(userInput: UserInput): User
        }

        schema {
          query: Query,
          mutation: Mutation
        }
      `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(res => res)
          .catch(err => console.log(err))
      },
      users: () => {
        return User.find()
          .then(res => res)
          .catch(err => console.log(err))
      },
      createEvents: args => {
        const event = new Event({
          title: args.eventInut.title,
          description: args.eventInut.description,
          price: args.eventInut.price,
          date: new Date(args.eventInut.date)
        })
        return event
          .save()
          .then(res => res)
          .catch(err => {
            console.log(err)
          })
      },
      createUsers: args => {
        const user = new User({
          email: args.userInput.email,
          password: args.userInput.password
        })

        return user
          .save()
          .then(res => res)
          .catch(err => console.log(err))
      }
    },
    graphiql: true
  })
)

//server
app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`)
})

mongoose
  .connect('mongodb://localhost:27017/regraphql', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('db is connected')
  })
  .catch(err => {
    console.log(err)
  })
