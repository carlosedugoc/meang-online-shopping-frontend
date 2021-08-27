import gql from 'graphql-tag'
import { GENRE_FRAGMENT } from '../fragment/genre';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info'

export const GENRES_LIST = gql`
  query genres($page:Int, $itemsPage:Int){
    genres(page:$page, itemsPage:$itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      genres {
        ...GenreObject
      }
    }
  }
  ${RESULT_INFO_FRAGMENT}
  ${GENRE_FRAGMENT}
`


export const GENRE_INFO = gql`
  query genre($id:Int){
    genres(id:$id) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
`
