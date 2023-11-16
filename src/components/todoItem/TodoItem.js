import React from "react";
import "./TodoItem.css";

export default function TodoItem({
  iscompleted,
  title,
  description,
  updateHandler,
  deleteHandler,
  id
}) {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="todo-right">
        <input onChange={()=>updateHandler(id)} type="checkbox" className="checkbox" checked={iscompleted} />
        <button onClick={()=>deleteHandler(id)} className="dele-btn">Delete</button>
      </div>
    </div>
  );
}
