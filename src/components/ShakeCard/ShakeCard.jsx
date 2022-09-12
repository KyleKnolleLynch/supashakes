import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export const ShakeCard = ({ shake: { id, title, method, rating } }) => {
    return (
        <article className='shake-card'>
            <h2>{title}</h2>
            <p>{method}</p>
            <div className='shake-rating'>{rating}</div>
            <div className="shake-card-buttons">
                <Link to={`/${id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} className='shake-card-edit-icon' />
                </Link>
            </div>
        </article>
    )
}
