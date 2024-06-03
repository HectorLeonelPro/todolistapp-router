import React from 'react';
import {useTodos} from '../useTodos'
import {TodoCounter} from '../../ui/TodoCounter';
import {TodoSearch} from '../../ui/TodoSearch';
import {TodoList} from '../../ui/TodoList';
import {TodoItem} from '../../ui/TodoItem';
import {TodosLoading} from '../../ui/TodosLoading';
import {TodosError} from '../../ui/TodosError';
import {EmptyTodos} from '../../ui/EmptyTodos';
import {CreateTodoButton} from '../../ui/CreateTodoButton';
import { TodoForm } from '../../ui/TodoForm';
import { Modal } from '../../ui/Modal';
import { TodoHeader } from '../../ui/TodoHeader';
import { ChangeAlert } from '../../ui/ChangeAlert';
import { useNavigate } from 'react-router-dom';

function HomePage(){
    const navigate = useNavigate()
	const {states, stateUpdaters} = useTodos()
    const {loading, error, totalTodos, completedTodos, searchValue, searchedTodos } = states
    // const {loading, error, totalTodos, completedTodos, searchValue, searchedTodos, openModal } = states
    const {setSearchValue, completeTodo, deleteTodo, sincronizeTodos} = stateUpdaters
    // const {setSearchValue, setOpenModal, completeTodo, deleteTodo, addTodo, sincronizeTodos} = stateUpdaters
    return (
		<>
            <TodoHeader loading={loading}>
                <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
                <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
            </TodoHeader>

            <TodoList 
                error={error}
                loading={loading}
                searchedTodos={searchedTodos}
                totalTodos={totalTodos}
                searchText={searchValue}
                onError={() => <TodosError />}
                onLoading={() => <TodosLoading />}
                onEmptyTodos={() => <EmptyTodos />}
                onEmptySearchResults={(searchText) => `${searchText} no fue encontrado en tu lista de TODO's.`}
            >
                {todo => (
                    <TodoItem 
                        key={todo.id} 
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.id)}
                        onEdit={() => navigate('/edit/' + todo.id, {state: {todo}})}
                        onDelete={() => deleteTodo(todo.id)}
                    />
                )}
            </TodoList>
			<CreateTodoButton onClick={() => navigate('/new')} />
			{/* <CreateTodoButton setOpenModal={setOpenModal} /> */}

            {/* {openModal && (
                <Modal>
                    <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
                </Modal>
            )} */}

            <ChangeAlert sincronize={sincronizeTodos} />

		</>
	);
}

export {HomePage};
