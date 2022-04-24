import { gql } from "@apollo/client";
import {
  REPOSITORY_FIELDS,
  REVIEW_FIELDS,
  PAGE_INFO_FIELDS,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String!
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryFields
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
        pageInfo {
          ...PageInfoFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query ($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
            repository {
              id
              fullName
            }
          }
          cursor
        }
        pageInfo {
          ...PageInfoFields
        }
      }
    }
  }
  ${REVIEW_FIELDS}
  ${PAGE_INFO_FIELDS}
`;
