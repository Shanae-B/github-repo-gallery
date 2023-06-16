//Global Variables

const profileOverview = document.querySelector(".overview");
const username = "Shanae-B";
const repoList = document.querySelector(".repo-list");
const repoElement = document.querySelector(".repos");
const eachRepoData = document.querySelector(".repo-data");


//fetch Github profile info
const getData = async function () {

    const res = await fetch(
        `https://api.github.com/users/${username}`);
    const data = await res.json();
    displayData(data);
};
getData();

//display fetched user info
const displayData = function (data) {

    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div>`;
    profileOverview.append(div);
    fetchRepos();
};


//Fetch Repos
const fetchRepos = async function () {
    const gitRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await gitRepos.json();
    displayEachRepo(repoData);
};

//display list of repos
const displayEachRepo = function (repos) {

    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

//displayData(data);
