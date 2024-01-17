import { useEffect, useRef, useState } from 'react';
import '../App.css';
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";

function App() {

	const [todoList, setTodoList] = useState([])
	const [sequance, setSequance] = useState(null)
	const refTodoItem = useRef()

	useEffect(()=>{
		let sequance = window.localStorage.getItem("sequance")
		if(sequance === null){
			window.localStorage.setItem("sequance", "0")
			sequance = 0
		}
		const handleSetInit = () =>{
			window.localStorage.setItem("todolist", "[]")
			return "[]"
		}
		let todo = JSON.parse(window.localStorage.getItem("todolist")??handleSetInit());

		setTodoList(todo)
		setSequance(Number(sequance))
	})

	const handleTodoAdd = (item) => {
		if(sequance === null){
			return
		}
		let todo = [...todoList]

		todo.push({tf:false, id:sequance+1, text:item})

		window.localStorage.setItem("todolist", JSON.stringify(todo));
		window.localStorage.setItem("sequance", String(sequance+1));

		setTodoList(todo)
		setSequance(sequance+1)
		refTodoItem.current.value=''
	}

	const handleTodoCheck = (tf, idx) => {
		let todo = [...todoList]
		todo[idx].tf = !tf

		window.localStorage.setItem("todolist", JSON.stringify(todo));
		setTodoList(todo)
	}

	const handleTodoDelete = (id) => {
		let todo = [...todoList]
		todo = todo.filter((val)=>val.id !== id);

		window.localStorage.setItem("todolist", JSON.stringify(todo));
		setTodoList(todo);
	}

	return (
		<div className="mainLayout">
			<div className='todoLayout'>
				<div className='todoTop'>
					<div className="todoTitle">
						To DO List
					</div>
					<div className='todoAdd'>
						<input type='text' placeholder='할 일을 입력하세요'
							ref={refTodoItem} />
						<div onClick={() => handleTodoAdd(refTodoItem.current.value)}>
							<IoMdAdd />
						</div>
					</div>
				</div>
				<div className='listLayout'>
					{todoList.map((val, idx) =>
						<div className='todoItem' key={idx}>
							<div className='todoCheckBox' onClick={()=>handleTodoCheck(val.tf,idx)}>
								<div className='checkIcon'>
									{val.tf?<FaCheck />:''}
								</div>
								<span>{val.text}</span>
							</div>
							<div className='deleteBox' onClick={()=>handleTodoDelete(val.id)}>
							<TiDelete />
							</div>
						</div>
					)}
                <div className='text-end'>
                    <Link to={"/home"}><button className="post-view-go-list-btn"><IoArrowBack /></button></Link>
                </div>
				</div>
			</div>
		</div>
	);
}

export default App;
