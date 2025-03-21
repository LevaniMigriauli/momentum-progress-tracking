import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import './CreateEmployeeModal.scss'
import CustomModal from '../ui/Modal.jsx'
import Input from '../ui/Input.jsx'
import Select from '../ui/Select.jsx'
import { useAppContext } from '../../context/appContext.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEmployees } from '../../api/employees.js'
import Icon from './Icon.jsx'
import Button from '../ui/Button.jsx'

const validationSchema = {
  firstName: {
    required: true,
    minLength: {
      value: 2,
      message: 'მინიმუმ 2 სიმბოლო',
    },
    maxLength: {
      value: 255,
      message: 'მაქსიმუმ 255 სიმბოლო',
    },
    pattern: {
      value: /^[a-zA-Z\u10A0-\u10FF]+$/,
      message: 'მხოლოდ ლათინური და ქართული სიმბოლოები',
    },
  },
  lastname: {
    required: true,
    minLength: {
      value: 2,
      message: 'მინიმუმ 2 სიმბოლო',
    },
    maxLength: {
      value: 255,
      message: 'მაქსიმუმ 255 სიმბოლო',
    },
    pattern: {
      value: /^[a-zA-Z\u10A0-\u10FF]+$/,
      message: 'მხოლოდ ლათინური და ქართული სიმბოლოები',
    },
  },
  employeeAvatar: {
    required: 'გთხოვთ ატვირთოთ სურათი',
    validate: {
      fileSize: (value) => {
        console.log(value)
        return value?.size < 600 * 1024 || 'მაქსიმუმ 600kb'
      },
    },
  },
  department: {
    required: true,
  },
}

const initialValues = {
  firstName: '',
  lastname: '',
  employeeAvatar: null,
  department: null,
}

const CreateEmployeeModal = ({ modalRef }) => {
  const fileInputRef = useRef(null)
  const { departmentsList } = useAppContext()
  const queryClient = useQueryClient()
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: initialValues,
  })

  const employeeMutation = useMutation({
    mutationFn: createEmployees,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'], exact: true })
      reset(initialValues)
      modalRef?.current?.handleCloseModal()
    },
  })

  const onSubmit = (data) => {
    const { firstName, lastname, employeeAvatar, department } = data
    const form = new FormData()
    console.log(data)
    form.append('name', firstName)
    form.append('surname', lastname)
    form.append('avatar', employeeAvatar)
    form.append('department_id', department.id)

    employeeMutation.mutate(form)
  }

  return (
    <CustomModal
      ref={modalRef}
      handleModalClose={reset}
      borderRadius={10}
      padding={'117px 50px 60px 50px'}
    >
      <div className="modal-content">
        <h2 className={'modal-title'}>თანამშრომლის დამატება</h2>
        <form
          className={'create-employee-modal'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register}
            name={'firstName'}
            label={'სახელი'}
            isRequired
            errors={errors}
            validation={validationSchema.firstName}
            isDirty={!!dirtyFields.firstName}
          />
          <Input
            register={register}
            name={'lastname'}
            label={'გვარი'}
            isRequired
            errors={errors}
            validation={validationSchema.lastname}
            isDirty={!!dirtyFields.lastname}
          />
          <Controller
            control={control}
            name={'employeeAvatar'}
            rules={validationSchema.employeeAvatar}
            render={({ formState: { errors }, field: { value, onChange } }) => {
              const handleFileChange = (e) => {
                const file = e.target.files[0]
                if (file) {
                  onChange(file)
                }
              }

              return (
                <>
                  <div
                    className={`image-picker ${!value ? 'pointer' : ''} ${errors.employeeAvatar ? 'invalid' : ''}`}
                    onClick={() =>
                      !value ? fileInputRef.current.click() : null
                    }
                  >
                    {!value && (
                      <div className={'upload-photo'}>
                        <Icon name={'upload-photo'} viewBox={'0 0 24 24'} />{' '}
                        <span>ატვირთე ფოტო</span>
                      </div>
                    )}
                    <input
                      type={'file'}
                      accept={'image/*'}
                      ref={fileInputRef}
                      hidden
                      onChange={handleFileChange}
                    />
                    {value && (
                      <div className={'po-r'}>
                        <img
                          className={'image-picker__image'}
                          src={URL.createObjectURL(value)}
                          alt="employee image"
                        />
                        <Icon
                          name={'delete'}
                          className={'delete-image'}
                          onClick={(e) => {
                            e.stopPropagation()
                            setValue('employeeAvatar', null)
                            if (fileInputRef.current) {
                              fileInputRef.current.value = ''
                            }
                          }}
                          viewBox={'0 0 26 26'}
                        />
                      </div>
                    )}
                    {errors.employeeAvatar && (
                      <span
                        className={'image-picker__error validation-message'}
                      >
                        {errors?.employeeAvatar.message}
                      </span>
                    )}
                  </div>
                </>
              )
            }}
          />
          <Select
            control={control}
            name={'department'}
            label={'დეპარტამენტი'}
            isRequired
            errors={errors}
            options={departmentsList}
            rules={validationSchema.department}
            menuPlacement={'top'}
          />
          <div className={'create-employee-btns'}>
            <Button
              onClick={() => {
                reset()
                modalRef?.current?.handleCloseModal()
              }}
            >
              გაუქმება
            </Button>
            <Button type={'submit'} isPurple>
              დაამატე თანამშრომელი
            </Button>
          </div>
        </form>
      </div>
    </CustomModal>
  )
}

export default CreateEmployeeModal
