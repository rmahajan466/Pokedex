// CSS Imports
import useDebounce from '../../hooks/useDebounce';
import './Search.css';

function Search({ updateSearchTerm }) {
    const debounceUpdateSearch = useDebounce((e) => updateSearchTerm(e.target.value));
    return (
        <input
            id="search-pokemon"
            type="text"
            placeholder="Which Pokemon Your're Looking for?"
            onChange={debounceUpdateSearch}
        />
    );
}

export default Search;