const { gql } = require ('apollo-server-express');

const typeDefs = gql`
    type Book {
        authors: [String]
        description: String!
        bookId: String!
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
        user: [User]
    }

    type Query {
        me: [User]
        book: [Book]
        user(_id:String): [User]
    }

    input saveBookInput {
            authors: [String]
            description: String!
            title: String
            bookId: String!
            image: String
            link: String
        }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username:String!, email: String!, password: String!): Auth
        saveBook(input: saveBookInput): User
        removeBook (bookId: String!): User


    }
    
`;


module.exports = typeDefs;