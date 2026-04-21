import { useEffect, useState } from "react";
import axios from "axios";

export default function Developer() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  // 🔄 Fetch only assigned tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks/my",
        {
          headers: { authorization: token }
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching tasks");
    }
  };

  // 🔄 Update task status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status },
        { headers: { authorization: token } }
      );

      // ✅ instant UI update (no delay)
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status: status } : t
        )
      );
    } catch (err) {
      console.log(err);
      alert("Error updating status");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div style={styles.container}>
      <div style={styles.card}>
  
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <h2>My Tasks</h2>
  
          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.clear();
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        </div>
  
        {tasks.length === 0 ? (
          <p>No tasks assigned</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={styles.taskCard}>
              <div style={styles.header}>
                <h4>{task.title}</h4>
                <span style={getStatusStyle(task.status)}>
                  {task.status}
                </span>
              </div>
  
              <p style={styles.desc}>{task.description}</p>
  
              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(task._id, e.target.value)
                }
                style={styles.select}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
<button onClick={() => {
  localStorage.clear();
  window.location.replace("/");
}}>
  Logout
</button>
// 🎨 Status color
const getStatusStyle = (status) => {
  if (status === "Pending") return { color: "red" };
  if (status === "In Progress") return { color: "orange" };
  if (status === "Completed") return { color: "green" };
};

// 🎨 Inline CSS
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
  },
  card: {
    width: "500px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f4f4f4",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  taskCard: {
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  desc: {
    fontSize: "14px",
    color: "#555"
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  
  
  },
};


