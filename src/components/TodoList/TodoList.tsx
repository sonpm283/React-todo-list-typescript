import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList/TaskList'
import styles from './todoList.module.scss'
import todoType from '../../@types/todoType'

export default function TodoList() {
  const [todoList, setTodoList] = useState<todoType[]>([])
  const [currentTask, setCurrentTask] = useState<todoType | null>(null)

  const doneTaskList = todoList.filter((todo) => todo.isComplete === true)
  const notDoneTaskList = todoList.filter((todo) => todo.isComplete === false)

  useEffect(() => {
    const currentTodoList = localStorage.getItem('todos')
    const todoObject: todoType[] = JSON.parse(currentTodoList || '[]')

    setTodoList(todoObject)
  }, [])

  //use interface
  interface handleNewTodos {
    (todos: todoType[]): todoType[]
  }

  //use type
  // type handleNewTodos = (todos: todoType[]) => todoType[]

  const syncReactToLocal = (handleNewTodos: handleNewTodos) => {
    const currentTodoList = localStorage.getItem('todos')
    const todoObject: todoType[] = JSON.parse(currentTodoList || '[]')
    const newTodoObject = handleNewTodos(todoObject)

    localStorage.setItem('todos', JSON.stringify(newTodoObject))
  }

  const addTodo = (name: string) => {
    const newTodo: todoType = {
      id: new Date().toISOString(),
      name,
      isComplete: false
    }

    setTodoList((prevState) => [...prevState, newTodo])
    syncReactToLocal((todoObject) => [...todoObject, newTodo])
  }

  const handleDoneTask = (id: string, done: boolean) => {
    const handler = (todoObject: todoType[]) => {
      return todoObject.map((todo) => {
        if (todo.id === id) return { ...todo, isComplete: done }

        return todo
      })
    }

    setTodoList(handler)
    syncReactToLocal(handler)
  }

  const handleDeleteTask = (id: string) => {
    const handler = (todoObject: todoType[]) => {
      return todoObject.filter((todo) => todo.id !== id)
    }

    setTodoList(handler)
    syncReactToLocal(handler)
  }

  const startEditingTask = (id: string) => {
    const editingTask = todoList.find((todo) => todo.id === id)
    if (editingTask) {
      setCurrentTask(editingTask)
    }
  }

  const editingTask = (name: string) => {
    setCurrentTask((prevState) => prevState && { ...prevState, name })
  }

  const finshEditingTask = () => {
    const handler = (todoObject: todoType[]) => {
      return todoObject.map((todo) => {
        if (todo.id === currentTask?.id) return currentTask
        return todo
      })
    }

    setTodoList(handler)
    setCurrentTask(null)
    syncReactToLocal(handler)
  }

  return (
    <div className={styles.todoList}>
      <h2>TodoList Typescript</h2>
      <TaskInput
        addTodo={addTodo}
        editingTask={editingTask}
        currentTask={currentTask}
        finshEditingTask={finshEditingTask}
      />
      <TaskList
        todoList={notDoneTaskList}
        handleDoneTask={handleDoneTask}
        handleDeleteTask={handleDeleteTask}
        startEditingTask={startEditingTask}
      />
      <TaskList
        todoList={doneTaskList}
        handleDoneTask={handleDoneTask}
        handleDeleteTask={handleDeleteTask}
        startEditingTask={startEditingTask}
        isDone
      />
    </div>
  )
}
