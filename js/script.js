//Global Variables

const profileOverview = document.querySelector(".overview");
const username = "Shanae-B";
const repoList = document.querySelector(".repo-list");

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

    const div= document.createElement("div");
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
};

const fetchRepos = async function () {
    const repos = await fetch ('https://api.github.com/users/Shanae-B/repos')


};

//displayData(data);
