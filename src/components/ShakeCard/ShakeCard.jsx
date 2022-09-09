export const ShakeCard = ({ shake: { title, method, rating } }) => {
    return (
        <article className='shake-card'>
            <h2>{title}</h2>
            <p>{method}</p>
            <div className='shake-rating'>{rating}</div>
        </article>
    )
}
