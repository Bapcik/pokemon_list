const listPokemon = document.querySelector(".list-pokemon");
const infoPokemon = document.querySelector(".info-pokemon");
const containerPokemon = document.querySelector(".container-pokemon");
const close = document.querySelector(".close");

const namePokemonData = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  let twentyPokemon = data.results.slice(0, 20);
  return twentyPokemon;
};

const pokemonID = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await response.json();
  infoPokemon.innerHTML = `<h3>${data.name}</h3> <img src="${
    data.sprites.front_default
  }" alt="${data.name}"> <p><b>Тип:</b> ${data.types
    .map((type) => type.type.name)
    .join(", ")}</p> <p><b>Рост:</b> ${data.height}</p> <p><b>Вес:</b> ${
    data.weight
  }</p> `;
};

const pokemonListDiv = async () => {
  const elementPokemon = await namePokemonData();
  elementPokemon.forEach(async (pokemon) => {
    const divPokemon = document.createElement("div");
    divPokemon.classList.add("pokemon-name");
    divPokemon.innerHTML = pokemon.name;
    listPokemon.append(divPokemon);
    divPokemon.addEventListener("click", async function () {
      await pokemonID(pokemon.name);
      containerPokemon.style.display = "block";
    });
    return divPokemon;
  });
};
pokemonListDiv();

close.addEventListener("click", () => {
  containerPokemon.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event !== containerPokemon) {
    containerPokemon.style.display = "none";
  }
});
