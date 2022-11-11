const UpdateForm = ({ updateData, changeTask, updateTask, cancelUpdate, loading }) => {
    return(
      <>
        {/* Update Task */}
        <div className="row">
          <div className="col">
            <input 
              value={ updateData && updateData.title }
              onChange={ (e) => changeTask(e)}
              onKeyDown={ (e) => {
                if (e.key === "Enter") {
                    updateTask()
                }
              }}
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-auto">
            <button
              onClick={updateTask}
              disabled={loading}
              className="btn btn-lg btn-success mr-20"
            >Update</button>
            <button
              onClick={cancelUpdate}
              disabled={loading}
              className="btn btn-lg btn-warning"
            >Cancel</button>
          </div>
        </div>
        <br />  
      </>
    )
  }
  
  export default UpdateForm;