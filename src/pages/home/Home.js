import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import toast from "react-hot-toast";
import TodoItem from "../../components/todoItem/TodoItem";
import { Context, server } from "../../index";
import { Navigate } from "react-router-dom";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const response = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      setRefresh((prev) => !prev);
    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      setRefresh((prev) => !prev);
    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  };

  async function handleTask(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      setRefresh((prev) => !prev);
      setLoading(false);
      toast.success(response?.data?.message);
      setTitle("");
      setDescription("");
    } catch (err) {
      setLoading(false);
      toast.error(e.response?.message);
    }
  }

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="Task">
        <div className="task-box">
          <h2>Add Task</h2>
          <form onSubmit={handleTask}>
            <input
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} className="task-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
      </div>
      <section className="todosContainer">
        {tasks?.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
}
