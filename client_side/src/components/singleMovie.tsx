import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { moviesById } from '../services/moviesApi';
import { moviesByObjectId } from '../types/types';

function SingleMovie() {

    interface Params {
        id: string
    };

    let { id } = useParams<Params>();
    let [data, setData] = useState<moviesByObjectId>();

    useEffect(() => {
        moviesById(id)
            .then((res) => { setData(res); console.log(data) })
            .catch(console.log);
    }, []);

    if (!data) {
        return <>...Loading</>
    } else {
        return (
            <div>
                <p>{data.fullplot}</p>
            </div>
        );
    };
};

export default SingleMovie;