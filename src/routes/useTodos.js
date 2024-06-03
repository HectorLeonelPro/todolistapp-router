import React from 'react'
import { useLocalStorage } from './useLocalStorage';

function useTodos(){
    const {item: todos, saveItem: saveTodos, loading, error, sincronizeItem: sincronizeTodos} = useLocalStorage('TODOS_V2', []);
	
	const [searchValue, setSearchValue] = React.useState('');

	const [openModal, setOpenModal] = React.useState(false);

	const completedTodos = todos.filter(todo => !!todo.completed).length;

	const totalTodos = todos.length;
	
	const searchedTodos = todos.filter(todo => {
		const todoText = todo.text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		const searchText = searchValue.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		return todoText.includes(searchText)
	});

	const getTodo = (id) => {
		const todoIndex = todos.findIndex((todo) => todo.id === id)
		return todos[todoIndex]
	}

	const addTodo = (text) => {
		const id = newTodoId(todos)
		const newTodos = [...todos]
		newTodos.push({text, completed: false, id})
		saveTodos(newTodos)
	}
	
	const completeTodo = (id) => {
		const newItem = [...todos]
		const todoIndex = newItem.findIndex((todo) => todo.id === id)
		newItem[todoIndex].completed === false ? newItem[todoIndex].completed = true : newItem[todoIndex].completed = false
		saveTodos(newItem)
	}

	const editTodo = (id, newText) => {
		const newItem = [...todos]
		const todoIndex = newItem.findIndex((todo) => todo.id === id)
		newItem[todoIndex].text = newText
		saveTodos(newItem)
	}

	const deleteTodo = (id) => {
		const newItem = [...todos]
		const todoIndex = newItem.findIndex((todo) => todo.id === id)
		newItem.splice(todoIndex,1)
		saveTodos(newItem)
	}

    const states = {
        loading, 
        error,
        totalTodos, 
        completedTodos, 
        searchValue, 
        searchedTodos, 
		getTodo,
    }

    const stateUpdaters = {
        setSearchValue, 
        editTodo,
        completeTodo, 
        deleteTodo, 
        addTodo,
        sincronizeTodos
    }

    return {states, stateUpdaters}
}

function newTodoId(todoList){
	if(!todoList.length){
		return 1
	}
    const idList = todoList.map(todo => todo.id)
    const idMax = Math.max(...idList)
    return idMax + 1
}

export {useTodos}
