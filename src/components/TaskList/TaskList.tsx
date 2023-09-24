import todoType from '../../@types/todoType'
import styles from './taskList.module.scss'

interface taskListProps {
  isDone?: boolean
  todoList: todoType[]
  handleDoneTask: (id: string, done: boolean) => void
  handleDeleteTask: (id: string) => void
  startEditingTask: (id: string) => void
}

export default function TaskList(props: taskListProps) {
  const { isDone, todoList, handleDoneTask, handleDeleteTask, startEditingTask } = props

  const handleChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    handleDoneTask(id, checked)
  }

  return (
    <div>
      <h3>{isDone ? 'Hoàn thành' : 'Chưa hoàn thành'}</h3>
      <ul className={styles.taskList}>
        {todoList.map((todo) => (
          <li className={styles.taskItem} key={todo.id}>
            <div className={styles.taskGroup}>
              <input type='checkbox' checked={todo.isComplete} onChange={handleChange(todo.id)} />
              <span>{todo.name}</span>

              <div className={styles.btnBox}>
                <button onClick={() => startEditingTask(todo.id)}>Sửa</button>
                <button onClick={() => handleDeleteTask(todo.id)}>Xoá</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
