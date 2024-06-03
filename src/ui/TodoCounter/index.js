import React from 'react'
import './TodoCounter.css'

function TodoCounter({totalTodos, completedTodos, loading}) {
	return (

		<div>
			{(totalTodos === completedTodos && totalTodos >= 1) && 
				<h1 className='TodoCounter'>
					Has completado todos los TODO's 🥳
				</h1>
			}
			{((totalTodos !== completedTodos || totalTodos === 0)) &&
				<h1 className={`TodoCounter ${!!loading && "TodoCounter--loading"}`}>
					Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> TODO's
				</h1>
			}
		</div>
	)
} 

export {TodoCounter}