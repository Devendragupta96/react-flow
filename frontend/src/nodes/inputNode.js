// inputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import "../css/node.css";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="container">
      <div>
        <span style={{fontWeight:"700"}}>Input</span>
        <hr />
      </div>
      <table>
        <tbody>
        <tr>
          <td style={{ paddingRight: "5px", fontWeight:"600" }}>
            <label>Name:</label>
          </td>
          <td>
            <textarea
              value={currName}
              onChange={handleNameChange}
              className="dynamic-textarea"
              rows="1" // Start as single-line
            />
          </td>
        </tr>
        <tr>
          <td style={{ paddingRight: "5px", fontWeight:"600" }}>
            <label>Type:</label>
          </td>
          <td>
            <select
              className="select"
              value={inputType}
              onChange={handleTypeChange}
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </td>
        </tr>
        </tbody>
      </table>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </div>
  );
};
