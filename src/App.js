import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";


function App() {
  const [repos, setRepos] = useState([]);
  useEffect(()=>{
    api.get('repositories').then((response) => {
      setRepos(response.data)  
    })
  },[])
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio Reactjs${Date.now()}`, 
      url: "http://github.com/...", 
      techs: ["Node.js", "..."]
    });
    setRepos([...repos, response.data]) 
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repositoryIndex = repos.findIndex(repo => repo.id === id);
    repos.splice(repositoryIndex,1)
    setRepos([...repos]) 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo)=>(
          <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
