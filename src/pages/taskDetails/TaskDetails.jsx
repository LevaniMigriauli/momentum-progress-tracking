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
import TaskPriority from '../../components/common/TaskPriority.jsx'
import TaskDepartment from '../../components/common/TaskDepartment.jsx'
import Icon from '../../components/common/Icon.jsx'

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
        <div className={'details-priority-department'}>
          <TaskPriority
            className={'fnt-16'}
            taskPriority={taskDetails?.priority || []}
          />
          <TaskDepartment
            className={'fnt-16'}
            taskDepartment={taskDetails?.department || []}
          />
        </div>
        <h2 className={'header-main'}>{taskDetails?.name}</h2>
        <p className={'details-description'}>{taskDetails?.description}</p>

        <div className={'task-details'}>
          <h3>დავალების დეტალები</h3>
          <div className={'task-details-grid'}>
            <p className={'details-container__label status'}>
              <Icon name={'pie-chart'} viewBox={'0 0 24 24'} />
              სტატუსი
            </p>
            <Select
              name={'priorities'}
              options={statusesList}
              value={taskStatus}
              onChange={handleStatusChange}
            />
            <p className={'details-container__label'}>
              <Icon name={'user'} viewBox={'0 0 24 24'} />
              თანამშრომელი
            </p>
            <div className={'details-container__employee'}>
              <p className={'details-container__employee-department'}>
                {taskDetails?.employee.department.name}
              </p>
              <div className={'details-container__employee-flex'}>
                <img
                  src={taskDetails?.employee.avatar}
                  alt={`${taskDetails?.employee.name} image`}
                />
                <p>
                  {taskDetails?.employee.name} {taskDetails?.employee.surname}
                </p>
              </div>
            </div>
            <p className={'details-container__label'}>
              <Icon name={'calendar'} viewBox={'0 0 24 24'} />
              დავალების ვადა
            </p>
            <p>{taskDetails?.due_date.split('T')[0].split('-').join('/')}</p>
          </div>
        </div>
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
