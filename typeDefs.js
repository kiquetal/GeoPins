const { gql } = require("apollo-server");

module.exports = gql`

type User {

 _id: ID,
 name: String,
 email: String,
 picture: String

}

type Pin {
  _id: ID,
  content: String,
  createdAt: String,
  title: String,
  image: String,
  latitude: Float,
  longitude: Float,
  author: User,
  comments : [Comment]
}

type Comment {

  text: String,
  created: String,
  author: User
}

type Query {
  me:User
}

`;
