import React, { useState, useEffect } from 'react';
const { data } = require('../data/Mock');

const MultiCheckbox = (props) => {

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    setPermissions(data);
  }, []);

  const handleChange = (event) => {
    const { name, checked } = event.target;

    if(name.split(" ")[0] === "controller") {
      console.log('CONTROLLER:', name.split(" ")[0] === "controller");
      console.log('CONTROLLER NAME:', name.split(" ")[1]);

      let tempPermissions = permissions.map(
          permission => 
          permission.controller_name === name.split(" ")[1] 
            ? { ...permission, isChecked: checked } 
            : permission)
      setPermissions(tempPermissions);

    } else if(name.split(" ")[0] === "action") {
      console.log('ACTION:', name.split(" ")[0] === "action");
      console.log('ACTION NAME:', name.split(" ")[1]);
      
      let tempPermissions = permissions.map(
          permission => 
          permission.actions.map(action => action.action_name === name 
          ? { 
              ...permission, 
              actions: [ ...permission.actions.map(action => 
                          action.action_name === name.split(" ")[1] 
                            ? { ...action, isChecked: checked } 
                            : action)] 
            } : { ...permission }));
      setPermissions(tempPermissions);  
    }
  }

  // console.log('PERMISSIONS:', permissions.map(permission => permission.actions.map(action => ({ ...action, isChecked: true }))));
  console.log('PERMISSIONS:', permissions);

  return (
    <div className="container my-4" style={{ width: 400 }}>
      <form className="form">
        <h3>Select Users</h3>
        {
          permissions.map((permission, index) => {
            return (
              <React.Fragment  key={index}>
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input"
                    name={`controller ${permission.controller_name}`}
                    checked={false}
                    onChange={handleChange} />
                  <label className="form-check-label ms-2">{permission.controller_name}</label>
                </div>

                  {
                    permission.actions.map((action, index) => {
                      return (
                        <span className="form-check" key={index}>
                          <input 
                            type="checkbox" 
                            className="form-check-input" 
                            name={`action ${action.action_name}`}
                            onChange={handleChange}
                            checked={action.isChecked || false} />
                          <label className="form-check-label ms-2">{action.action_name}</label>
                        </span>
                      );
                    })
                  }
                </React.Fragment>
              );
          })
        }

      </form>
    </div>
  );
}

export default MultiCheckbox;
