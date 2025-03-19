import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './TaskDetails.scss'
import { changeTaskStatus, retrieveTask } from '../../api/tasks.js'
import Select from '../../components/ui/Select.jsx'
import { useAppContext } from '../../context/appContext.jsx'
import { createComment, getComments } from '../../api/comments.js'
import Comment from './Comment.jsx'
import CommentTextarea from './CommentTextarea.jsx'

const TaskDetails = () => {
  const queryClient = useQueryClient()
  const location = useLocation()
  const { statusesList } = useAppContext()
  const [taskStatus, setTaskStatus] = useState(null)
  const [parentComment, setParentComment] = useState('')

  const taskId = +location.pathname.split('/').at(-1)
  const isValidTaskId = !isNaN(taskId) && taskId > 0

  const { data: taskDetails } = useQuery({
    queryKey: ['TaskDetails'],
    queryFn: () => retrieveTask(taskId),
    enabled: isValidTaskId,
  })
  const mutateStatus = useMutation({
    mutationFn: ({ id, statusBody }) => changeTaskStatus(id, statusBody),
  })

  const { data: comments } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(taskId),
  })
  const mutateComment = useMutation({
    mutationFn: (commentBody) => createComment(taskId, commentBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'], exact: true })
      setParentComment('')
    },
  })

  useEffect(() => {
    if (taskDetails && statusesList?.length) {
      setTaskStatus(
        statusesList.find(
          (taskStatus) => taskStatus.id === taskDetails.status?.id,
        ),
      )
    }
  }, [taskDetails, statusesList])

  const handleStatusChange = (selectedOption) => {
    setTaskStatus(selectedOption)
    mutateStatus.mutate({
      id: taskId,
      statusBody: { status_id: selectedOption.id },
    })
  }

  const handleCommentChange = (e) => {
    setParentComment(e.target.value)
  }

  const handleCreateComment = (text, parentId = null) => {
    const commentBody = {
      text,
      parent_id: parentId,
    }
    mutateComment.mutate(commentBody)
  }

  return (
    <div className={'page-task-details'}>
      <section className={'section-task-details'}>
        <h1>Task Details</h1>
        <Select
          name={'priorities'}
          options={statusesList}
          value={taskStatus}
          onChange={handleStatusChange}
        />
      </section>
      <section className="section-comments">
        <CommentTextarea
          comment={parentComment}
          handleCommentChange={handleCommentChange}
          handleCreateComment={handleCreateComment}
        />

        <h4 className={'comments-header'}>
          კომენტარები <span> {comments?.length} </span>
        </h4>

        {comments
          // ?.slice()
          // .reverse()
          ?.map(
            ({ author_avatar, author_nickname, text, id, sub_comments }) => {
              return (
                <>
                  <Comment
                    key={id}
                    id={id}
                    authorComment={text}
                    authorNickname={author_nickname}
                    authorAvatar={author_avatar}
                    subComment={sub_comments}
                    handleCreateComment={handleCreateComment}
                    isParent
                  />
                </>
              )
            },
          )}
      </section>
    </div>
  )
}

export default TaskDetails
