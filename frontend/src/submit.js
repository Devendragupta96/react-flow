// submit.js
import React from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const SubmitButton = () => {

    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }), shallow);

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        const payload = {
            nodes,
            edges
        };
    
        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success(`
                    Nodes: ${data.num_nodes}
                    Edges: ${data.num_edges}
                    Is DAG: ${data.is_dag ? 'Yes' : 'No'}
                `,{
                    autoClose:5000
                });
            } else {
                toast.error("An error occurred while processing the pipeline data.",{
                    autoClose:3000
                });
            }
        } catch (error) {
            toast.error("An error occurred while processing the pipeline data.",{
                autoClose:3000
            });
        }

    }

    return (
        <div className="submit__button">
            <button className="button" type="submit" onClick={handleSubmit}>Submit</button>
            <ToastContainer />
        </div>
    );
}
