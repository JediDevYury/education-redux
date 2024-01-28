import {reactionAdded, TPost} from "../../store/features/posts/postsSlice.ts";
import {useAppDispatch} from "../../store/hooks.ts";

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }: {
  post: TPost
}) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
     <button
      key={name}
      type="button"
      className="muted-button reaction-button"
      onClick={() => dispatch(reactionAdded({
        postId: post.id,
        reaction: name
      }))}
     >
       {emoji} {post.reactions[name]}
     </button>
    )
  })

  return <div>{reactionButtons}</div>
}
