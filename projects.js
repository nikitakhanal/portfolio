(async () => {
  // Elements
  const projectsContainer = document.querySelector('.projects');
  const loaderContainer = document.querySelector('.loader');

  const projectContainer = document.createElement('div');
  const imageContainer = document.createElement('div');
  const mainImage = document.createElement('div');
  const image = document.createElement('img');
  const projectLinks = document.createElement('div');
  const githubLink = document.createElement('a');
  const liveDemo = document.createElement('a');
  const projectInfo = document.createElement('div');
  const projectName = document.createElement('h4');
  const languageUsed = document.createElement('p');

  // applying attributes
  projectContainer.setAttribute('class', 'project');
  imageContainer.setAttribute('class', 'image-container');
  mainImage.setAttribute('class', 'main-image');

  projectLinks.setAttribute('class', 'project-links');

  githubLink.textContent = 'View Code';
  liveDemo.textContent = 'Visit Site';

  projectInfo.setAttribute('class', 'project-info');

  projectName.setAttribute('class', 'name');

  languageUsed.setAttribute('class', 'language');

  // create a project - append appropriate child elements
  function createProject() {
    projectInfo.appendChild(projectName);
    projectInfo.appendChild(languageUsed);

    projectLinks.appendChild(githubLink);
    projectLinks.appendChild(liveDemo);

    mainImage.appendChild(image);

    imageContainer.appendChild(mainImage);
    imageContainer.appendChild(projectLinks);

    projectContainer.appendChild(imageContainer);
    projectContainer.appendChild(projectInfo);
  }

  // get all repositories from github | use 'http://localhost:[port]/data.json' for offline
  async function getAllRepos() {
    try {
      const res = await fetch(
        'https://api.github.com/users/nikitakhanal/repos'
      );
      const allRepos = await res.json();

      return allRepos;
    } catch (e) {
      console.error(e);
    }
  }

  const allRepos = await getAllRepos();

  // hide the loader
  loaderContainer.classList.add('hidden');

  // populate the DOM
  allRepos.forEach((repo) => {
    const { name, html_url, homepage, language } = repo;

    // setup dynamic data
    image.setAttribute(
      'src',
      `https://raw.githubusercontent.com/nikitakhanal/${name}/main/design/desktop-preview.jpg`
    );
    image.setAttribute('alt', `design for project ${name}`);

    projectName.textContent = name;
    languageUsed.textContent = language;

    githubLink.setAttribute('href', html_url);
    liveDemo.setAttribute('href', homepage);

    createProject();
    projectsContainer.appendChild(projectContainer.cloneNode(true)); // ref: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
  });
})();
