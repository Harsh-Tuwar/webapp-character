import React, { useEffect } from 'react';
import './App.css';
import Character from './components/Character/Character';
import { AttributeCounter, CharacterItem, Skill } from './types';

const GH_USERNAME = "harsh-tuwar";
const API_URL = `https://recruiting.verylongdomaintotestwith.ca/api/{${GH_USERNAME}}/character`;

function App() {
  const [loading, setLoading] = React.useState(false);
  const [characters, setCharacters] = React.useState<CharacterItem[]>([]);

  useEffect(() => {
    setLoading(true);

    fetch(API_URL).then(async (resp) => {
      const data = await resp.json();

      setCharacters(data.body.characters);
    }).catch((e) => {
      console.log('Error', e);
    }).finally(() => {
      setLoading(false);
    });

    if (characters.length === 0) {
      addNewCharacter();
    }
  }, []);

  const addNewCharacter = () => {
    const attributeCounterState: AttributeCounter = {
      'Strength': {
        val: 10,
        mod: 0
      },
      'Dexterity': {
        val: 10,
        mod: 0
      },
      'Constitution': {
        val: 10,
        mod: 0
      },
      'Intelligence': {
        val: 10,
        mod: 0
      },
      'Wisdom': {
        val: 10,
        mod: 0
      },
      'Charisma': {
        val: 10,
        mod: 0
      }
    };

    const skillPointsState: Record<Skill, number> = {
      "Acrobatics": 0,
      "Animal Handling": 0,
      "Arcana": 0,
      "Athletics": 0,
      "Deception": 0,
      "History": 0,
      "Insight": 0,
      "Intimidation": 0,
      "Investigation": 0,
      "Medicine": 0,
      "Nature": 0,
      "Perception": 0,
      "Performance": 0,
      "Persuasion": 0,
      "Religion": 0,
      "Sleight of Hand": 0,
      "Stealth": 0,
      "Survival": 0
    };

    const newChar: CharacterItem = {
      attribute: attributeCounterState,
      skills: skillPointsState,
      ordinal: characters.length + 1
    }

    setCharacters([...characters, newChar]);
  };

  // Save the character(s) to an API so they can be retrieved when the app starts next time.
  const saveCharacter = (e: React.MouseEvent) => {
    e.preventDefault();

    setLoading(true);

    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ characters }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(() => {
      alert("Data Saved!");
    }).catch((e) => {
      console.log("Error", e);
      alert('Something went wrong!');
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

      {loading && <div className='d-flex f-1 justify-center'>🤪 L O A D I N G 🤪</div>}

      {!loading && <>
        <div className='d-flex f-1 justify-center character-buttons'>
          <button onClick={addNewCharacter}>Add new Character</button>
          <button>Reset all Character</button>
          <button type='submit' onClick={(e) => saveCharacter(e)}>Save all Character</button>
        </div>

        {/* 8. Add the ability to edit multiple characters simultaneously with the same rules above */}
        <section className="App-section">
          {characters.length && characters.sort((a, b) => a.ordinal - b.ordinal).map((char, index) =>
            <Character
              key={char.ordinal}
              name={(char.ordinal).toString()}
              attributeState={char.attribute}
              skillState={char.skills}
            />)
          }
        </section>
      </>}
    </div>
  );
}

export default App;
