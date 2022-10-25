const pokeAPI = {};

pokeAPI.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
}

pokeAPI.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetails))
        .then((detailRequests => Promise.all(detailRequests)))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
}
