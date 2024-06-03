import './TodosLoading.css'

function TodosLoading({total, completed}) {
	return (
        <div className="LoadingTodo-container">
          <span className="LoadingTodo-completeIcon"></span>
          <p className="LoadingTodo-text">Cargando TODO's...</p>
          <span className="LoadingTodo-deleteIcon"></span>
        </div>
    );
} 

export {TodosLoading}