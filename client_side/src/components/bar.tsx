import React from "react";
import { useState } from "react";

function Bar() {

    let [displaySearch, setSearch] = useState(false);
    let [parameter, setParameter] = useState<string>();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

    };

    function Form() {
        return (
            <div>
                <form onSubmit={(handleSubmit)}>
                    <input type='search' placeholder='Type to search' />
                    <input type='radio' id='genre' name='searchParameter' value='genre' onClick={(e) => { setParameter((e.target as any).value) }} />
                    <label htmlFor='genre'>Genre</label>
                    <input type='radio' id='cast' name='searchParameter' value='cast' onClick={(e) => { setParameter((e.target as any).value) }} />
                    <label htmlFor='cast'>Cast</label>
                    <input type='radio' id='text' name='searchParameter' value='text' onClick={(e) => { setParameter((e.target as any).value) }}/>
                    <label htmlFor='text'>Text</label>
                    <input type='submit' value='Submit' />
                    <p></p>
                </form>
            </div>
        );
    };

    return (
        <div>
            <button onClick={() => { setSearch(!displaySearch) }}>Search</button>
            {displaySearch ? (<Form />) : null}
            <img src='../favicon.ico' alt='mflix' />
            <label>Mflix</label>
        </div>
    );
};

export default Bar;