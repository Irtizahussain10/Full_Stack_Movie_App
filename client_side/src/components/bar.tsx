import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Bar() {

    let [displaySearch, setSearch] = useState(false);
    let [parameter, setParameter] = useState<string>('genre');
    let [searchText, setText] = useState<string>('Leonardo DiCaprio');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setParameter(e.target.value);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        (e.target as any).reset();

    };

    return (
        <div>
            <button onClick={() => { setSearch(!displaySearch) }}>Search</button>
            {displaySearch ? (
                <form
                    name='searchForm'
                    onSubmit={(handleSubmit)}
                >
                    <input
                        type='text'
                        required
                        placeholder='John Ott'
                        onChange={(e) => { setText(e.target.value) }}
                    />
                    <label
                        htmlFor='genre'
                    >
                        <input
                            required
                            type='radio'
                            id='genre'
                            name='searchParameter'
                            value='genre'
                            onChange={handleChange}
                        />
                        Genre
                    </label>
                    <label
                        htmlFor='cast'
                    >
                        <input
                            required
                            type='radio'
                            id='cast'
                            name='searchParameter'
                            value='cast'
                            onChange={handleChange}
                        />
                        Cast
                    </label>
                    <label
                        htmlFor='text'
                    >
                        <input
                            required
                            type='radio'
                            id='text'
                            name='searchParameter'
                            value='text'
                            onChange={handleChange}
                        />
                        Text
                    </label>
                    <input
                        type='submit'
                        value='Submit'
                    />
                </form>
            ) : null}
            <Link to='/' >
                <img src='../favicon.ico' alt='mflix' />
                <label>Mflix</label>
            </Link>
        </div>
    );
};

export default Bar;