import React, { useState } from 'react';
import { Loader } from './Loader';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import { addComments, deleteComments } from '../features/comments/comments';
import { selectSelectedPost } from '../features/selectors';

export const PostDetails: React.FC = () => {
  const { comments, loaded, hasError } = useAppSelector(state => state.comment);
  const post = useAppSelector(selectSelectedPost);

  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const addComment = async ({ name, email, body }: CommentData) => {
    if (post) {
      await dispatch(
        addComments({
          name,
          email,
          body,
          postId: post.id,
        }),
      );
    }
  };

  const deleteCommentFunction = async (commentId: number) => {
    await deleteComments(commentId);
    dispatch(deleteComments(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {!loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteCommentFunction(comment.id)}
                  ></button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
