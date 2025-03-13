import {useForm} from "react-hook-form";
import './CreateTask.scss'
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

const CreateTask = () => {

  const {
    register, handleSubmit, formState: {
      errors, dirtyFields
    }
  } = useForm({
    mode: 'onChange',
  })

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
    }
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
      <div className={'create-task'}>
        <h1 className={'header-main'}>შექმენი ახალი დავალება</h1>
        <form className={'create-task-form'} onSubmit={handleSubmit(onSubmit)}>

          <Input register={register} name={'title'} label={'სათაური'} isRequired errors={errors}
                 validation={validationSchema.title} isDirty={!!dirtyFields.title}/>
          <Button isPurple type={'submit'}>დავალების შექმნა</Button>
        </form>
      </div>
  )
}

export default CreateTask;