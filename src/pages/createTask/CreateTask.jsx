import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import './CreateTask.scss'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import Select from '../../components/ui/Select.jsx'
import { useAppContext } from '../../context/appContext.jsx'
import InputLabel from '../../components/ui/InputLabel.jsx'
import EmployeesSelect from './EmployeesSelect.jsx'
import PrioritiesSelect from './PrioritiesSelect.jsx'
import DatePicker from '../../components/ui/DatePicker.jsx'
import { createTask } from '../../api/tasks.js'
import CreateEmplyeeModal from '../../components/common/CreateEmployeeModal.jsx'

const descriptionValidationMessage = 'მინიმუმ 4 სიტყვა'

const validationSchema = {
  title: {
    required: 'მინიმუმ 3 სიმბოლო',
    minLength: {
      value: 3,
      message: 'მინიმუმ 3 სიმბოლო',
    },
    maxLength: {
      value: 255,
      message: 'მაქსიმუმ 255 სიმბოლო',
    },
  },
  department: {
    required: true,
  },
  description: {
    validate: (value) => {
      if (!value || !value.trim()) return true
      const wordCount = value.trim().split(/\s+/).length
      return wordCount >= 4 || descriptionValidationMessage
    },
    maxLength: {
      value: 255,
      message: 'მაქსიმუმ 255 სიმბოლო',
    },
  },
  employee: {
    required: true,
  },
  priority: {
    required: true,
  },
  status: {
    required: true,
  },
  deadline: {
    required: true,
  },
}

const today = new Date()
const nextDay = new Date(today)
nextDay.setDate(nextDay.getDate() + 1)

const handleInitialState = (defaultPriority) => ({
  title: '',
  department: null,
  description: '',
  employee: null,
  priority: defaultPriority,
  status: null,
  dueDate: nextDay,
})

const loadFormData = (defaultPriority) => {
  const savedData = localStorage.getItem('createTaskFormData')
  return savedData ? JSON.parse(savedData) : handleInitialState(defaultPriority)
}

const CreateTask = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const modalRef = useRef(null)
  const { departmentsList, defaultPriority, statusesList } = useAppContext()

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'onChange',
    defaultValues: loadFormData(defaultPriority),
  })

  useEffect(() => {
    if (defaultPriority) {
      setValue('priority', defaultPriority)
    }
  }, [defaultPriority, setValue])

  useEffect(() => {
    const formValues = watch((data) => {
      localStorage.setItem('createTaskFormData', JSON.stringify(data))
    })
    return () => formValues?.unsubscribe()
  }, [watch])

  const taskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      navigate('/')
      localStorage.removeItem('createTaskFormData')
      queryClient.invalidateQueries({ queryKey: ['tasks'], exact: true })
    },
  })

  const onSubmit = (data) => {
    const requestBody = {
      name: data.title,
      description: data.description,
      due_date: data.dueDate,
      status_id: data.status.id,
      employee_id: data.employee.id,
      priority_id: data.priority.id,
    }

    taskMutation.mutate(requestBody)
  }

  return (
    <div className={'create-task'}>
      <h1 className={'header-main'}>შექმენი ახალი დავალება</h1>
      <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name={'title'}
          label={'სათაური'}
          isRequired
          errors={errors}
          validation={validationSchema.title}
          isDirty={!!dirtyFields.title}
        />
        <Select
          control={control}
          name={'department'}
          label={'დეპარტამენტი'}
          isRequired
          errors={errors}
          rules={validationSchema.department}
          options={departmentsList}
        />
        <div className={'form-group'}>
          <InputLabel label={'აღწერა'} htmlFor={'description'} />
          <Controller
            name={'description'}
            id={'description'}
            control={control}
            rules={validationSchema.description}
            render={({ field, formState: { dirtyFields, errors } }) => {
              const isDirty =
                !!dirtyFields.description && field.value.trim() !== ''
              const minLengthError =
                errors?.description?.type === 'validate' && isDirty
              const maxLengthError = errors?.description?.type === 'maxLength'
              const hasError = minLengthError || maxLengthError

              const minLengthIsValid = isDirty && !minLengthError
              const maxLengthIsValid = isDirty && !maxLengthError
              return (
                <>
                  <textarea
                    className={`form-description ${hasError ? 'invalid-border' : ''}`}
                    {...field}
                  />
                  <span
                    className={`validation-message ${minLengthError ? 'invalid' : minLengthIsValid ? 'valid' : ''}`}
                  >
                    {descriptionValidationMessage}
                  </span>
                  <span
                    className={`validation-message ${maxLengthError ? 'invalid' : maxLengthIsValid ? 'valid' : ''}`}
                  >
                    {validationSchema.description.maxLength.message}
                  </span>
                </>
              )
            }}
          />
        </div>
        <EmployeesSelect
          control={control}
          name={'employee'}
          label={'პასუხისმგებელი თანამშრომელი'}
          isRequired
          errors={errors}
          rules={validationSchema.employee}
          isDisabled={!getValues('department')}
          modalRef={modalRef}
        />

        <div className={'form__priority-status'}>
          <PrioritiesSelect
            control={control}
            name={'priority'}
            label={'პრიორიტეტი'}
            isRequired
            errors={errors}
            rules={validationSchema.priority}
          />

          <Select
            control={control}
            name={'status'}
            label={'სტატუსი'}
            isRequired
            errors={errors}
            rules={validationSchema.status}
            options={statusesList}
          />
        </div>

        <DatePicker
          className={'mw-318'}
          name={'dueDate'}
          control={control}
          label={'დედლაინი'}
          isRequired
          errors={errors}
          nextDay={nextDay}
        />
        <Button className={'button-submit'} isPurple type={'submit'}>
          დავალების შექმნა
        </Button>
      </form>
      <CreateEmplyeeModal modalRef={modalRef} />
    </div>
  )
}

export default CreateTask
