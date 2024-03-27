// import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../scss/App.scss';
import characterInfo from "../services/characterInfo";
import CharacterList from "./CharacterList";
import Logo from "../images/logo.png";
import Filters from './Filters/Filters';


const App = () => {

  const [characters, setCharacters]= useState([]);
  const [namefilter, setNamefilter]= useState('');
  const [specieFilter, setSpecieFilter]= useState();

  useEffect(() => {
    characterInfo().then((dataCharacter)=> {
      setCharacters(dataCharacter);
    });
  }, [])

  const handleChangeName = (value) => {
    setNamefilter(value);
  };

  const handleChangeSpecies = (value) => {
    setSpecieFilter(value);
  }

  const filteredCharacters = characters.filter((character)=> {
   return character.name.toLowerCase().includes(namefilter.toLowerCase());
  })
  .filter((character) => {
    return specieFilter ? specieFilter === character.species : true;
  });


  return (
    <div>
      <header>
      <h1>Rick and Morty</h1>
      <img src={Logo} alt={Logo}/>
      </header>
      <main>
        <Filters onChangeName={handleChangeName} namefilter={namefilter} onChangeSpecies={handleChangeSpecies} specieFilter={specieFilter}/>
        <CharacterList characters={filteredCharacters}/>
        
      </main>
    </div>
  );
};

export default App;