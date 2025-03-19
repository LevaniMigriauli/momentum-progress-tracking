import './CommentTextarea.scss'
import Button from '../../components/ui/Button.jsx'
import { useState } from 'react'

const CommentTextarea = ({
  comment,
  handleCommentChange,
  handleCreateComment,
  isReply = false,
}) => {
  const [commentResponse, setCommentResponse] = useState('')

  const textAreaIsValid = (value) => value && value.trim().length > 0

  const handleChange = (e) => {
    if (isReply) {
      setCommentResponse(e.target.value)
    } else {
      handleCommentChange(e)
    }
  }

  const handleSubmit = () => {
    const text = isReply ? commentResponse : comment

    if (textAreaIsValid(text)) {
      handleCreateComment(text)
      if (isReply) setCommentResponse('')
    }
  }

  return (
    <div className={'comment-container'}>
      <textarea
        className={'main-comment'}
        id={'main-comment'}
        name={'main-comment'}
        placeholder={'დაწერე კომენტარი'}
        value={isReply ? commentResponse : comment}
        onChange={handleChange}
      />
      <Button
        className={'btn-comment'}
        isPurple
        type={'button'}
        onClick={handleSubmit}
      >
        დააკომენტარე
      </Button>
    </div>
  )
}

export default CommentTextarea
