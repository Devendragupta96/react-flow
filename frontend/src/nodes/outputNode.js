// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import "../css/node.css";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div className="container">
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
      <div>
        <span style={{fontWeight:"700"}}>Output</span>
        <hr />
      </div>
      <div>
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
                rows="1"
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
                value={outputType}
                onChange={handleTypeChange}
              >
                <option value="Text">Text</option>
                <option value="File">Image</option>
              </select>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
