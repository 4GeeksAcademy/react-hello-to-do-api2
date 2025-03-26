import React, {useState} from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [todolist, setTodolist] = useState([])
	return (
		<div className="container">
			<h1>My To Do List </h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) =>{
							if (e.key === "Enter") {
							setTodolist(todolist.concat(inputValue));
							setInputValue("");
							}
						}}
						placeholder="What are we doing today?">
					</input>
				</li>
				{todolist.map((item, index) => (
					<li>
						{item} <span onClick={() => setTodolist (todolist.filter((t, currentindex) => index !=currentindex))}>🚫</span> 
					</li>
				))}
			</ul>
            <div className="hehe">{todolist.length} Task(s) left to do</div>
		</div>
	);
};

export default Home;