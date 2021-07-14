import { Link } from "react-router-dom";
import { moviesByPageNumber } from "../types/types";

interface Props {

    data: moviesByPageNumber[],
    handleClickPrevious?: () => void,
    handleClickNext?: () => void

};

function List(props: Props) {

    return (
        <div>
            {props.data.map((element, index) => {
                return <Link to={`/movieByID/${element._id}`} key={index} >
                    {element.poster ?
                        <img src={element.poster} alt=''></img>
                        : <div>Poster Not Available</div>}
                    {<h4>{element.title}</h4>}
                    <h5>
                        <span>{element.year} </span>
                        <span>{element.rated}</span>
                    </h5>
                    <h5>
                        {element.cast?.map((actor, key) => {
                            return <span key={key}>{actor} </span>
                        })}
                    </h5>
                    <h6>
                        {element.imdb?.rating}
                    </h6>
                </Link>
            })}
            {props.handleClickPrevious ? 
            <button
                onClick={props.handleClickPrevious}
            >Previous
            </button>
                : null}
            {props.handleClickNext ? 
            <button
                onClick={props.handleClickNext}
            >Next
            </button>
                : null}
        </div>
    );
};

export default List;