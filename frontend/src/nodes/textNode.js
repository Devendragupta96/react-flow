// textNode.js

import { useState, useEffect, useCallback } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import "../css/node.css";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const { edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges
}), shallow);
  const updateNodeInternals = useUpdateNodeInternals();
  const randomizeHandleCount = useCallback(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);


  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const extractVariables = (text) => {
    const regex = /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g;
    let match;
    const vars = [];
    
    while ((match = regex.exec(text)) !== null) {
      vars.push(match[1]);
    }

    return vars;
  };

  const handleVariableText = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    const extractedVariables = extractVariables(newText);
    setVariables(extractedVariables);
  };

  useEffect(() => {
    // Update variables when initial data is set
    const initialVariables = extractVariables(currText);
    setVariables(initialVariables);
    randomizeHandleCount()
  }, [currText, randomizeHandleCount, edges]);

  return (
    <div className="container">
      <div>
        <span style={{fontWeight:"700"}}>Text</span>
        <hr />
      </div>
      <div>
        <table>
          <tbody>
          <tr>
            <td style={{ paddingRight: "5px", fontWeight:"600" }}>
              <label>Text:</label>
            </td>
            <td>
              <textarea
                value={currText}
                onInput={handleTextChange}
                onChange={handleVariableText}
                className="dynamic-textarea"
                rows="1"
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-text_input_${index+1}`}
          style={{ top: `${(index + 1) * 20}px` }} // Adjusting position with index
        />
      ))}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
};
