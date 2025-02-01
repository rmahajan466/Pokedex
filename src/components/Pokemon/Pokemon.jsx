import './Pokemon.css'

function Pokemon({ name, url }) {
    return (
        <div className="pokemon">
            <div className='pokemon-name'> {name.toUpperCase()} </div>
            <div>
                <img className='pokemon-image' src={url} alt={name} />
            </div>
        </div>
    )
}

export default Pokemon;