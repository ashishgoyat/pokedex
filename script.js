// ===== SOUNDS =====
const clickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
const popSound   = new Audio("https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3");

clickSound.volume = 0.4;
popSound.volume = 0.3;


// fetching the elements from the html
let main = document.getElementById('main');
let btn = document.querySelector('button');
let input = document.querySelector('input');
let select = document.querySelector('select');
const container = document.getElementById('container');

// add eventlistner when btn is clicked
btn.addEventListener('click',async ()=>{
    clickSound.currentTime = 0;
    clickSound.play();
    container.innerHTML = '';
    let count = input.value;
    let type = select.value;
    document.body.className = '';
    document.body.classList.add(type);

    const urltype = "https://pokeapi.co/api/v2/type/"+type;
    try{
        // sending the request
        const responsetype = await fetch(urltype);
        if(!responsetype.ok){
            throw new Error(`Response status; ${responsetype.status}`);
        }
        // got the data
        const datatype = await responsetype.json();

            function shufflepokemon(arr){
            return arr.sort(() => Math.random() - 0.5);
        }
        const shuffledlist = shufflepokemon([...datatype.pokemon]);

        // using for loop for the number of pokemons
        for (let i = 0; i < count; i++) {
            // fetch the pokemon data 
            const urlpokemon = shuffledlist[i]['pokemon']["url"];
            const responsepokemon = await fetch(urlpokemon);
            if(!responsepokemon.ok){
                throw new Error(`Response status; ${responsetype.status}`);
            }
            const datapokemon = await responsepokemon.json();

            // creating the card for the pokemon
            const card = document.createElement('div');
            const img = document.createElement('img');
            const name = document.createElement('div');
            const moves = document.createElement('div');
            const attack = document.createElement('div');
            const defence = document.createElement('div');
            
            img.src = datapokemon['sprites']['front_default'];
            img.alt = "Pokemon not Captured";
            name.textContent = datapokemon['name'].replace(/-/g, " ");
            datapokemon.moves.slice(0,3).forEach(m => {
                const span = document.createElement('span');
                span.textContent = m.move.name.replace('-',' ');
                span.classList.add('move-chip');
                moves.appendChild(span);
            })
            attack.textContent = 'Attack '+datapokemon['stats'][1]['base_stat']
            defence.textContent = 'Defence '+datapokemon['stats'][2]['base_stat']

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(moves);
            card.appendChild(attack);
            card.appendChild(defence);
            container.appendChild(card);
        }

    } catch(error){
        console.error(error.message);
    }
})