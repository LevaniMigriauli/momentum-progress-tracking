import {Controller, useForm} from "react-hook-form";
import './CreateTask.scss'
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import Select from "../../components/ui/Select.jsx";
import CustomModal from "../../components/ui/Modal.jsx";
import React, {useRef} from "react";
import {useAppContext} from "../../context/appContext.jsx";
import InputLabel from "../../components/ui/InputLabel.jsx";
import EmployeesSelect from "./EmployeesSelect.jsx";
import PrioritiesSelect from "./PrioritiesSelect.jsx";
import {useQuery} from "@tanstack/react-query";
import {getStatuses} from "../../api/statuses.js";

const CreateTask = () => {
  const modalRef = useRef(null);
  const {departmentsList} = useAppContext()

  const {
    register, control, handleSubmit, getValues, formState: {
      errors, dirtyFields
    }
  } = useForm({
    mode: 'onChange',
  })

  const {data: statuses} = useQuery({
    queryKey: ['statuses'],
    queryFn: getStatuses,
  })

  const statusesList = statuses?.map((status) => ({
    id: status.id,
    value: status.id,
    label: status.name
  })) || []

  const descriptionValidationMessage = 'მინიმუმ 4 სიტყვა'

  const validationSchema = {
    title: {
      required: 'მინიმუმ 3 სიმბოლო',
      minLength: {
        value: 3,
        message: 'მინიმუმ 3 სიმბოლო'
      },
      maxLength: {
        value: 255,
        message: 'მაქსიმუმ 255 სიმბოლო'
      }
    },
    department: {
      required: true
    },
    description: {
      validate: (value) => {
        if (!value || !value.trim()) return true
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 4 || descriptionValidationMessage
      },
      maxLength: {
        value: 255,
        message: 'მაქსიმუმ 255 სიმბოლო'
      }
    },
    employee: {
      required: true
    },
    priority: {
      required: true
    },
    status: {
      required: true
    }
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
      <div className={'create-task'}>
        <h1 className={'header-main'}>შექმენი ახალი დავალება</h1>
        <form className={'form'} onSubmit={handleSubmit(onSubmit)}>

          <Input register={register} name={'title'} label={'სათაური'} isRequired errors={errors}
                 validation={validationSchema.title} isDirty={!!dirtyFields.title}/>
          <Select control={control} name={'department'} label={'დეპარტამენტი'} isRequired errors={errors}
                  rules={validationSchema.department} options={departmentsList}
          />
          <div className={'form-group'}>
            <InputLabel label={'აღწერა'} htmlFor={'description'}/>
            <Controller name={'description'} id={'description'} control={control} rules={validationSchema.description}
                        render={({field, formState: {dirtyFields, errors}}) => {

                          const isDirty = !!dirtyFields.description && field.value.trim() !== ''
                          const minLengthError = errors?.description?.type === 'validate' && isDirty
                          const maxLengthError = errors?.description?.type === 'maxLength'
                          const hasError = minLengthError || maxLengthError

                          const minLengthIsValid = isDirty && !minLengthError
                          const maxLengthIsValid = isDirty && !maxLengthError
                          return (
                              <>
                                <textarea
                                    className={`form-description ${hasError ? 'invalid-border' : ''}`} {...field}/>
                                <span
                                    className={`validation-message ${minLengthError ? 'invalid' : minLengthIsValid ? 'valid' : ''}`}>
                                  {descriptionValidationMessage}
                                </span>
                                <span
                                    className={`validation-message ${maxLengthError ? 'invalid' : maxLengthIsValid ? 'valid' : ''}`}>
                                  {validationSchema.description.maxLength.message}
                                </span>
                              </>
                          )
                        }}/>
          </div>
          <EmployeesSelect control={control} name={'employee'} label={'პასუხისმგებელი თანამშრომელი'} isRequired
                           errors={errors}
                           rules={validationSchema.employee}
                           isDisabled={!getValues('department')} modalRef={modalRef}/>

          <div className={'form__priority-status'}>
            <PrioritiesSelect control={control} name={'priority'} label={'პრიორიტეტი'} isRequired errors={errors}
                              rules={validationSchema.priority}/>

            <Select control={control} name={'status'} label={'სტატუსი'} isRequired errors={errors}
                    rules={validationSchema.status} options={statusesList}
            />
          </div>

          <Button isPurple type={'submit'}>დავალების შექმნა</Button>
        </form>
        <CustomModal ref={modalRef}>
          <h2>Custom Modal</h2>
          <button onClick={() => modalRef?.current?.handleCloseModal()}>Close</button>
        </CustomModal>
      </div>
  )
}

export default CreateTask;