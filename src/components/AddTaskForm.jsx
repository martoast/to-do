const AddTaskForm = ({ newTask, setNewTask, addTask, loading }) => {
    return(
      <>
        {/* Add Task */}
        <div className="row">
          <div className="col">
            <input 
              value={newTask}
              onChange={ (e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addTask()
                }
              }}
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-auto">
            <button
              onClick={addTask}
              disabled={loading}
              className="btn btn-lg btn-success"
            >Add Task</button>
          </div>
        </div>
        <br />
      </>
    )
  }
  
  export default AddTaskForm;