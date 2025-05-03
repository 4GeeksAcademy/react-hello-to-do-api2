import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todolist, setTodolist] = useState([]);

  const fetchTodolist = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/todo/users/dani.mudd9"
    );
    const data = await response.json();
    
	if (!response.ok){
		const resp = await fetch(
			"https://playground.4geeks.com/todo/users/dani.mudd9",{
				method:"POST",
				headers: {"Content-type": "application/json"},
				body: JSON.stringify({
				name:"dani.mudd9"
				})
			}
		  );
		  console.log("attempting to create user") 
		return "https://playground.4geeks.com/todo/users/dani.mudd9"
	} else{
		setTodolist(data.todos);
	}
  };

  useEffect(() => {
    fetchTodolist();
  }, []);

  const removeTodolist = async (id) => {
    let response = await fetch(
      `https://playground.4geeks.com/todo/todos/${id}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }
    );
    fetchTodolist();
  };

  return (
    <div className="container">
      <h1>My To Do List </h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={async (e) => {
              console.log(e.key);
              if (e.key === "Enter") {
                const response = await fetch(
                  "https://playground.4geeks.com/todo/todos/dani.mudd9",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      label: inputValue,
                      is_done: false,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                const data = await response.json();
                setTodolist([...todolist, data]);
                setInputValue("");
              }
            }}
            placeholder="What are we doing today?"
          ></input>
        </li>
        {todolist.map((item, index) => (
          <li>
            {item.label} <span onClick={() => removeTodolist(item.id)}>🚫</span>
          </li>
        ))}
      </ul>
      <div className="hehe">{todolist.length} Task(s) left to do</div>
    </div>
  );
};

export default Home;
