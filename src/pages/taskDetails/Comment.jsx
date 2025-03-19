import { useState } from 'react'
import './Comment.scss'
import CommentTextarea from './CommentTextarea.jsx'

const CommentItem = ({
  authorAvatar,
  authorNickname,
  authorComment,
  children,
  hasResponse,
  isParent = false,
}) => {
  return (
    <article
      className={`comment-wrapper ${hasResponse && isParent ? 'mb-58' : isParent ? 'mb-38' : ''}`}
    >
      <img src={authorAvatar} alt={`${authorNickname} image`} />
      <div>
        <h5 className="author-name">{authorNickname}</h5>
        <p className={`comment ${hasResponse ? 'mb-20' : 'mb-10'}`}>
          {authorComment}
        </p>
        {children}
      </div>
    </article>
  )
}

const Comment = ({
  authorAvatar,
  authorNickname,
  authorComment,
  isParent,
  id,
  handleCreateComment,
  subComment,
}) => {
  const [showResponseTextarea, setShowResponseTextarea] = useState(false)
  const hasResponse = subComment?.length > 0

  return (
    <>
      <CommentItem
        hasResponse={hasResponse}
        authorAvatar={authorAvatar}
        authorNickname={authorNickname}
        authorComment={authorComment}
        isParent
      >
        {isParent && !hasResponse && !showResponseTextarea && (
          <button
            className="action-answer"
            onClick={() => setShowResponseTextarea(true)}
          >
            უპასუხე
          </button>
        )}

        {showResponseTextarea && !hasResponse && (
          <CommentTextarea
            handleCreateComment={(text) => handleCreateComment(text, id)}
            isReply
          />
        )}
        {hasResponse && (
          <CommentItem
            authorAvatar={subComment[0].author_avatar}
            authorNickname={subComment[0].author_nickname}
            authorComment={subComment[0].text}
          />
        )}
      </CommentItem>
    </>
  )
}

export default Comment
