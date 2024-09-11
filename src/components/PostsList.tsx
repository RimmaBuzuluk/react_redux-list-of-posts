/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Post } from '../types/Post';

import { PostComponent } from './Post';
type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostComponent key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
