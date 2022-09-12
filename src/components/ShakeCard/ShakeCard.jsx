import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import supabase from "../../config/supabaseClient"

export const ShakeCard = ({ shake: { id, title, method, rating }, handleDelete }) => {
    const onDeleteClick = async () => {
        const { data, error} = await supabase
        .from('shakes')
        .delete()
        .eq('id', id)

        if (error) {
            console.log(error) 
        }
        if (data) {
            console.log(data) 
            handleDelete(id)
        }
    }

    return (
        <article className='shake-card'>
            <h2>{title}</h2>
            <p>{method}</p>
            <div className='shake-rating'>{rating}</div>
            <div className="shake-card-buttons">
                <Link to={`/${id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} className='shake-card-icon' />
                </Link>
                <FontAwesomeIcon icon={faTrash} className='shake-card-icon' onClick={onDeleteClick} />
            </div>
        </article>
    )
}
