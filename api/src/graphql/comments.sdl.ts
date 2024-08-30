export const schema = gql`
  type Comment {
    id: String!
    author: User!
    authorId: String!
    upgradeGuide: String!
    comment: String!
    parentComment: Comment
    parentCommentId: String
    visible: Boolean!
    flagged: Boolean!
    bookmarked: Boolean!
    editCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    Comments: [Comment]!
    Like: [Like]!
    SubscribeUserToComment: [SubscribeUserToComment]!
  }

  type Query {
    comments: [Comment!]! @requireAuth
    commentsByUpgrade(upgradeGuide: String!): [Comment!]! @skipAuth
    comment(id: String!): Comment @requireAuth
  }

  input CreateCommentInput {
    authorId: String!
    upgradeGuide: String!
    comment: String!
    parentCommentId: String
    visible: Boolean!
    flagged: Boolean!
    bookmarked: Boolean!
    editCount: Int!
  }

  input UpdateCommentInput {
    authorId: String
    upgradeGuide: String
    comment: String
    parentCommentId: String
    visible: Boolean
    flagged: Boolean
    bookmarked: Boolean
    editCount: Int
  }

  type Mutation {
    createComment(
      input: CreateCommentInput!
      subscribeToUpdates: Boolean
    ): Comment! @requireAuth
    updateComment(
      id: String!
      input: UpdateCommentInput!
      subscribeToUpdates: Boolean
    ): Comment! @requireAuth
    deleteComment(id: String!): Comment! @requireAuth
  }
`
