import { useState, useEffect } from "react";

interface IRepositories {
  full_name: string;
  description: string;
  id: number;
  favorite: boolean;
}

export default function App() {
  const [repos, setRepositories] = useState<IRepositories[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/jeremarques/repos');
      const data = await response.json();

      setRepositories(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let numFavorites = 0
    repos.forEach(repo => {
      repo.favorite && numFavorites++;
    });
    document.title = `Você tem ${numFavorites} repositórios favoritos.`;
  }, [repos])

  function handleFavorite(id: number) {
    const newFavorite = repos.map(repo => {
      return (
        id === repo.id ? { ...repo, favorite: !repo.favorite } : repo
      );
    });
    setRepositories(newFavorite);
  };

  return (
    <div className="App">
      <ul>
        {
          repos.map(repo => {
            return (
              <li>
                <strong>{ repo.full_name }</strong>
                <p>{ repo.description }</p>
                { repo.favorite && <span>(Favorito)</span> }
                <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};
