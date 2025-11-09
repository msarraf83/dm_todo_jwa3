import {useEffect, useState} from "react";
import cate1 from "../../assets/cate-1.png";
import cate2 from "../../assets/cate-2.png";
import cate3 from "../../assets/cate-3.png";
import cate4 from "../../assets/cate-4.png";
import cate5 from "../../assets/cate-5.png";
import cate6 from "../../assets/cate-6.png";

const categories = [
    {title: 'Personal', image: cate1},
    {title: 'Work', image: cate2},
    {title: 'Shopping', image: cate3},
    {title: 'Coding', image: cate4},
    {title: 'Health', image: cate5},
    {title: 'Fitness', image: cate6},
]

function Index() {
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
    const [showAddTask, setShowAddTask] = useState(false);
    const [inputTask, setInputTask] = useState('');
    const [taskCategory, setTaskCategory] = useState('Personal');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [showConfirmModel, setShowConfirmModel] = useState(false);
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString();
    };
    const handleAddTask = () => {
        if (!inputTask.trim()) return;
        const today = new Date();
        const newTask = {
            text: inputTask.trim(),
            category: taskCategory,
            date: today.toISOString(),
        };
        setTasks([...tasks, newTask]);
        setInputTask('');
        setShowAddTask(false);
    };
    const confirmDeleteTask = (index) => {
        setTaskToDelete(index);
        setShowConfirmModel(true);
    };
    const handleDeleteTask = () => {
        if (taskToDelete !== null) {
            const updated = [...tasks];
            updated.splice(taskToDelete, 1);
            setTasks(updated);
        }
        setTaskToDelete(null);
        setShowConfirmModel(false);
    };
    const countByCategory = (cat) => tasks.filter((t) => t.category === cat).length;
    const filteredTask = selectedCategory === 'All' ? tasks : tasks.filter((t) => t.category === selectedCategory);
    return (
        <main className="main-container">
            <div className="row g-4">
                {
                    categories.map((cat) => (
                        <div className="col-sm-6 col-lg-4"
                             key={cat.title}
                             onClick={() => setSelectedCategory(cat.title)}
                             style={{cursor: 'pointer'}}>
                            <div className="d-flex align-items-center p-3 shadow-sm bg-white rounded">
                                <img src={cat.image}
                                     alt={cat.title}
                                     width={60}
                                     height={60}
                                     className='me-3'/>
                                <div>
                                    <h5 className="mb-0">{cat.title}</h5>
                                    <small className="text-muted">{countByCategory(cat.title)}Task</small>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="mt-5 bg-white shadow rounded">
                <div className="d-flex justify-content-between align-items-center p-3 bg-warning rounded-top">
                    <h5 className="mb-0">{selectedCategory}Task({filteredTask.length})</h5>
                    <div>
                        <button className="btn btn-sm btn-outline-dark me-2"
                                onClick={() => setSelectedCategory('All')}>
                            All Task
                        </button>
                        <button className="btn btn-sm btn-dark"
                                onClick={() => setShowAddTask(true)}>
                            <i className="ri-add-line"></i>Add
                        </button>
                    </div>
                </div>
                <ui className="list-group list-group-flush task-list-container">
                    {filteredTask.length === 0 ? (
                        <li className="p-3 m-2 text-center text-muted alert alert-danger">No Task Available.</li>
                    ) : (filteredTask.map((task, idx) => (
                            <li className="list-group-item d-flex justify-content-between align-items-start py-2 px-3 my-3 mx-2 rounded mb-2 shadow-sm task-item"
                                key={idx}>
                                <div>
                                <span className="fw-semibold">
                                    {task.text}
                                </span>
                                    <br/>
                                    <small className="text-muted">Added On:
                                        {formatDate(task.date)}
                                    </small>
                                </div>
                                <i className="ri-delete-bin-line text-danger fs-5"
                                   style={{cursor: 'pointer'}}
                                   onClick={() => confirmDeleteTask(tasks.indexOf(task))}>
                                </i>
                            </li>
                        ))
                    )}
                </ui>
            </div>
            {showAddTask && (
                <>
                    <div className="position-fixed top-0 start-0 w-100 h-100"
                         style={{
                             backgroundColor: 'rgba(0,0,0,.5)', zIndex: 1000,
                         }}
                         onClick={() => setShowAddTask(false)}>
                    </div>
                    <div className="position-fixed top-50 start-50 translate-middle bg-light p-4 rounded shadow"
                         style={{
                             width: '90%', maxWidth: '400px', zIndex: 1001,
                         }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Add Task</h5>
                            <i className="ri-close-line fs-4"
                               style={{
                                   cursor: 'pointer'
                               }}
                               onClick={() => setShowAddTask(false)}>
                            </i>
                        </div>
                        <input type="text"
                               className="form-control mb-3"
                               placeholder="Enter task..."
                               value={inputTask}
                               onChange={(e) => setInputTask(e.target.value)}
                               onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                               autoFocu/>
                        <select
                            className="form-select mb-3"
                            value={taskCategory}
                            onChange={(e) => setTaskCategory(e.target.value)}>
                            {categories.map((cat) => (
                                <option key={cat.title} value={cat.title}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-warning w-100" onClick={handleAddTask}>
                            Add Task
                        </button>
                    </div>
                </>
            )}
            {showConfirmModel && (
                <>
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{backgroundColor: 'rgba(0,0,0,.5)', zIndex: 1050}}
                        onClick={() => setShowConfirmModel(false)}>
                        <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 rounded shadow"
                             style={{width: '90%', maxWidth: '320px', zIndex: 1051, textAlign: 'center'}}>
                            <p className="modal-text my-3">Are you sure you want to delete this task?</p>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-danger"
                                        onClick={handleDeleteTask}>
                                    Delete
                                </button>
                                <button className="btn btn-secondary"
                                        onClick={() => setShowConfirmModel(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}

export default Index