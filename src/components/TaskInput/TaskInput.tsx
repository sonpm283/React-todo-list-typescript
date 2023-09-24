import { useState } from 'react'
import styles from './taskInput.module.scss'
import todoType from '../../@types/todoType'

interface taskInputProps {
  addTodo: (name: string) => void
  editingTask: (name: string) => void
  currentTask: todoType | null
  finshEditingTask: () => void
}

export default function TaskInput(props: taskInputProps) {
  const [name, setName] = useState<string>('')
  const { addTodo, editingTask, currentTask, finshEditingTask } = props

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (currentTask) {
      finshEditingTask()
    } else {
      addTodo(name)
    }

    setName('')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (currentTask) {
      editingTask(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className={styles.taskInput}>
      <form className={styles.taskInputForm} onSubmit={handleSubmit}>
        <div className={styles.taskInputBox}>
          <input
            type='text'
            placeholder='what are you going todo...'
            value={currentTask ? currentTask.name : name}
            onChange={(event) => handleChange(event)}
          />
          <button type='submit'>{currentTask ? 'Edit' : 'Add'}</button>
        </div>
      </form>
    </div>
  )
}
