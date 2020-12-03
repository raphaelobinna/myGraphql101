const { gql } = require('apollo-server')
const { prisma } = require('./db')

const typeDefs = gql`
  type Books {
    id: ID!
    Title: String!
    Author_Name: String!
    Comments: [Comment!]!
  }

  type Comment {
      id: ID!
      comment: String!
      published: Boolean!
      author_name: Books
  }

  type Query {
    feed: [Books!]!
    book(id: ID!): Books
    comment(id: ID!): Comment 
  }

  type Mutation {
    createBooks(data: CreatemyBooks!): Books
    createComment( authorName: String, comment: String): Comment!
    publish(id: ID!): Comment!
  }

  input CreatemyBooks {
      Title: String!
      Author_Name: String!
      Comments: [CreatemyCommentswithoutAuthorname!]
  }

  input CreatemyCommentswithoutAuthorname {
      comment: String!
      published: Boolean
  }
`

const resolvers = {
  Query: {
    feed: (parent, args) => {
      return  prisma.books.findMany()
    },
    book: (parent, args) => {
      return prisma.books.findUnique({
        where: { id: Number(args.id) },
      })
    }
  },
  Mutation: {
    createComment: (parent, args) => {
      return prisma.comment.create({
        data: {
          comment: args.comment,
          published: true,
          author_name: args.authorName && {
              connect: {Author_Name: args.authorName}
          }
        },
      })
    },
    createBooks: (parent, args) => {
        return prisma.books.create({
            data: {
                Title: args.data.Title,
                Author_Name: args.data.Author_Name,
                Comments: {
                    create: args.data.Comments
                }
            }
        })
    }
  },
  Books: {
     
      Comments: (parent, args) => { 
          return prisma.comment
              .findMany({
                where : {author_name: { Author_Name: parent.Author_Name}}
              })
         
          }
    }
}

module.exports = {
  resolvers,
  typeDefs,
}
