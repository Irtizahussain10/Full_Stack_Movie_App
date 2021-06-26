import { useState } from 'react';
import { useHistory } from 'react-router';

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
        <div>
            <button
                onClick={() => { setSearch(!displaySearch) }}
            >Search
            </button>
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
        </div>
    )
};

export default SearchForm;