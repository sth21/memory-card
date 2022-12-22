export default function Card(props) {
    return (
        <button onClick={ props.handleClick } data-index={ props.index }>
            <img src={ props.imgSrc } alt={ "Image of " + props.name }></img>
            <p>{ props.name }</p>
        </button>
    );
}