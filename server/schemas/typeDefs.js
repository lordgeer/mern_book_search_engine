const { gql } = require ('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        bookId: ID!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(_id: String, username: String): User
    }

    input BookInput {
            authors: [String]
            description: String!
            title: String!
            bookId: String!
            image: String
            link: String
        }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username:String!, email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
        removeBook (bookId: String!): User


    }
    
`;


module.exports = typeDefs;