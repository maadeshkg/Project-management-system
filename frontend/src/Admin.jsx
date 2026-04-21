import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // 🔄 Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: { authorization: token }
      });
      setProjects(res.data);
    } catch (err) {
      alert("Error fetching projects");
    }
  };

  // ➕ Add Project
  const addProject = async () => {
    if (!title) return alert("Enter project title");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/projects",
        { title },
        { headers: { authorization: token } }
      );

      setProjects((prev) => [...prev, res.data]);
      setTitle("");
    } catch (err) {
      alert("Add failed");
    }
  };

  // ✏️ Edit
  const handleEdit = (project) => {
    setTitle(project.title);
    setEditId(project._id);
  };

  // 🔄 Update
  const updateProject = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/${editId}`,
        { title },
        { headers: { authorization: token } }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p._id === editId ? { ...p, title } : p
        )
      );

      setEditId(null);
      setTitle("");
    } catch (err) {
      alert("Update failed");
    }
  };

  // ❌ Delete
  const deleteProject = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${id}`,
        { headers: { authorization: token } }
      );

      setProjects((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.replace("/");
    } else {
      fetchProjects();
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* 🔥 Logout Button (TOP RIGHT) */}
        <div style={styles.topBar}>
          <h2>Admin Dashboard</h2>
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

        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project"
        />

        {editId ? (
          <button style={styles.updateBtn} onClick={updateProject}>
            Update
          </button>
        ) : (
          <button style={styles.addBtn} onClick={addProject}>
            Add
          </button>
        )}

        {/* 📋 Project List */}
        <div style={{ marginTop: "20px" }}>
          {projects.length === 0 ? (
            <p>No projects</p>
          ) : (
            projects.map((p) => (
              <div key={p._id} style={styles.item}>
                <span>{p.title}</span>

                <div>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteProject(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
  },
  card: {
    width: "400px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoutBtn: {
    background: "black",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  addBtn: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  },
  updateBtn: {
    width: "100%",
    padding: "10px",
    background: "orange",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#fff",
    marginTop: "10px",
    borderRadius: "5px"
  },
  editBtn: {
    marginRight: "5px",
    background: "blue",
    color: "#fff",
    border: "none",
    padding: "5px"
  },
  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px"
  }
};