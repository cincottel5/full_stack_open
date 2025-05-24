import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      name
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author
      genres
      id  
    }
  }
`

export const EDIT_AUTHOR_BIRTHDATE = gql`
  mutation editAuthorBirthdate($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      name
      id
    }
  }
`