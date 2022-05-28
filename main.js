const API_URL = "https://api.github.com/users/"

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser('9064444169')

async function getUser(username) {
    const response = await fetch(API_URL+username);
    const user = await response.json();
    createuserCard(user);
    getRepos(username);
}

async function getRepos(username){
    const resp = await fetch(API_URL+username +'/repos');
    const respData = await resp.json();
    addReposToCard(respData);
}

function addReposToCard(repos){
    const reposEL =document.getElementById('repos');
    repos.forEach(repo => {
        const repoEl =document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href =repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;
        reposEL.appendChild(repoEl);
    })
}

function createuserCard(user){
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
                <li><strong>Followers:</strong>${user.followers}
                </li>
                <li><strong>Following:</strong>${user.following}
                </li>
                <li><strong>Repose:</strong>${user.public_repos}
                </li>
                <li><strong>Location:</strong>${user.location}
                </li>
            </ul>
            <div id="repos"></div>
        </div>
    
    </div>
    `
    main.innerHTML=cardHTML;

}

form.addEventListener('submit', e => {
    e.preventDefault();
    const user = search.value;
    if(user){
        getUser(user);
        search.value ="";
    }
}
)