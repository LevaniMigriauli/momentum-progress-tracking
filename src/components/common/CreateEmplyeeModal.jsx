import { useForm } from 'react-hook-form'
import './CreateEmployeeModal.scss'
import CustomModal from '../ui/Modal.jsx'
import Input from '../ui/Input.jsx'

const validationSchema = {
  firstName: {
    required: true,
    minLength: {
      value: 2,
      message: 'მინიმუმ 2 სიმბოლო'
    },
    maxLength: {
      value: 255,
      message: 'მაქსიმუმ 255 სიმბოლო'
    },
    pattern: {
      value: /^[a-zA-Z\u10A0-\u10FF]+$/,
      message: 'მხოლოდ ლათინური და ქართული სიმბოლოები'
    }
  },
  lastname: {
    required: true,
    minLength: {
      value: 2,
      message: 'მინიმუმ 2 სიმბოლო'
    },
    maxLength: {
      value: 255,
      message: 'მაქსიმუმ 255 სიმბოლო'
    },
    pattern: {
      value: /^[a-zA-Z\u10A0-\u10FF]+$/,
      message: 'მხოლოდ ლათინური და ქართული სიმბოლოები'
    }
  }
}

const CreateEmployeeModal = ({ modalRef }) => {
  const { register, reset, formState: { errors, dirtyFields } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      firstName: '',
      lastname: ''
    }
  })

  return (
    <CustomModal ref={modalRef}
                 handleModalClose={reset}
                 borderRadius={10}
                 padding={'117px 50px 60px 50px'}>
      <div className="modal-content">
        <h2 className={'modal-title'}>თანამშრომლის დამატება</h2>
        <form className={'create-employee-modal'}>
          <Input register={register} name={'firstName'} label={'სახელი'}
                 isRequired
                 errors={errors}
                 validation={validationSchema.firstName}
                 isDirty={!!dirtyFields.firstName}
          />
          <Input register={register} name={'lastname'} label={'გვარი'}
                 isRequired
                 errors={errors}
                 validation={validationSchema.lastname}
                 isDirty={!!dirtyFields.lastname}
          />
          {/*<input type={'file'} accept={'image/*'}/>*/}
          <button onClick={() => {
            reset()
            modalRef?.current?.handleCloseModal()
          }}>გაუქმება
          </button>
          <button type={'submit'}>დაამატე თანამშრომელი</button>
        </form>
      </div>
    </CustomModal>
  )
}

export default CreateEmployeeModal