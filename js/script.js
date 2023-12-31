//Global Variables

const profileOverview = document.querySelector(".overview");
const username = "Shanae-B";
const repoList = document.querySelector(".repo-list");
const repoElement = document.querySelector(".repos");
const eachRepoData = document.querySelector(".repo-data");
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");




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
        filterInput;
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

//Function to get specific repo info
const specificRepo = async function (repoName) {
    const exactRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await exactRepo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoInfo.name}/languages`);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //created array for languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);

};

//function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {

    eachRepoData.innerHTML = " ";
    eachRepoData.classList.remove("hide");
    repoElement.classList.add("hide");
    backToRepo.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    eachRepoData.append(div);

};

//displayData(data);
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepo(repoName);
    }

});

backToRepo.addEventListener("click", function (e) {
    //console.log(e.target.value);
    repoElement.classList.remove("hide");
    filterInput.classList.remove("hide");
    eachRepoData.classList.add("hide");
    backToRepo.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {

    const searchField = e.target.value;
    console.log(searchField);
    const repos = document.querySelectorAll(".repo");
    const lowerCaseText = searchField.toLowerCase();

    for (const repo of repos) {

        const searchLowerText = repo.innerText.toLowerCase();
        if (searchLowerText.includes(lowerCaseText)) {

            repo.classList.remove("hide");
        }

        else {
            repo.classList.add("hide");
        }
    }


});


