import { useState } from 'react';
import { useHistory } from 'react-router';
import '../css/searchForm.css';

function SearchForm() {

    let history = useHistory();
    let [displaySearch, setSearch] = useState(false);
    let [parameter, setParameter] = useState<string>('genre');
    let [searchText, setText] = useState<string>('Leonardo DiCaprio');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        setParameter(e.target.value);

    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        setSearch(!displaySearch);
        (e.target as any).reset();

        if (parameter === 'genre') {

            history.push(`/genre/${searchText}`);

        } else if (parameter === 'cast') {

            history.push(`/cast/${searchText}`);

        } else if (parameter === 'text') {

            history.push(`/text/${searchText}`);

        };

    };

    return (

        <div className='searchBox'>
            <button
                className='searchButton'
                onClick={() => { setSearch(!displaySearch) }}
            >Search
            </button>
            <div className='options'>
                {displaySearch ? (
                    <form
                        name='searchForm'
                        onSubmit={(handleSubmit)}
                    >
                        <input
                            className='text'
                            type='text'
                            required
                            placeholder='Type your text'
                            onChange={(e) => { setText(e.target.value) }}
                        />
                        <br />
                        <label
                            htmlFor='genre'
                        >
                            <input
                                className='Field'
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
                                className='Field'
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
                                className='Field'
                                required
                                type='radio'
                                id='text'
                                name='searchParameter'
                                value='text'
                                onChange={handleChange}
                            />
                            Text
                        </label>
                        <br />
                        <input
                            className='searchButton'
                            type='submit'
                            value='Submit'
                        />
                    </form>
                ) : null}
            </div>
        </div>
    )
};

export default SearchForm;