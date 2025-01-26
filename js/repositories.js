document.addEventListener("DOMContentLoaded", () => {
  const username = "Ziad-Abaza";
  const repositoriesContainer = document.getElementById(
    "gh-repositories-container"
  );
  const loadingIndicator = document.getElementById("gh-loading-indicator");
  let currentPage = 1;
  const perPage = 10;
  let isLoading = false;

  async function fetchRepositories(page) {
    isLoading = true;
    loadingIndicator.style.display = "block";

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`
      );
      const repositories = await response.json();

      if (repositories.message) {
        throw new Error(repositories.message);
      }

      if (repositories.length === 0) {
        loadingIndicator.textContent = "No more repositories to load.";
        return;
      }

      repositories.forEach((repo) => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("gh-repo-card");

        const repoName = document.createElement("h2");
        repoName.textContent = repo.name;
        repoName.classList.add("gh-repo-name");

        const repoDescription = document.createElement("p");
        repoDescription.textContent =
          repo.description || "No description provided.";
        repoDescription.classList.add("gh-repo-description");

        const repoStats = document.createElement("div");
        repoStats.classList.add("gh-repo-stats");
        repoStats.innerHTML = `
                    <span>Stars: ${repo.stargazers_count}</span>
                    <span>Forks: ${repo.forks_count}</span>
                `;

        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = "View on GitHub";
        repoLink.classList.add("gh-btn", "gh-btn-primary");

        const repoPagesLink = document.createElement("a");
        if (repo.has_pages) {
          repoPagesLink.href = `https://${username}.github.io/${repo.name}`;
          repoPagesLink.textContent = "View GitHub Pages";
          repoPagesLink.classList.add("gh-btn", "gh-btn-secondary");
        }

        repoCard.appendChild(repoName);
        repoCard.appendChild(repoDescription);
        repoCard.appendChild(repoStats);
        repoCard.appendChild(repoLink);
        if (repo.has_pages) {
          repoCard.appendChild(repoPagesLink);
        }

        repositoriesContainer.appendChild(repoCard);
      });

      currentPage++;
    } catch (error) {
      console.error("Error fetching repositories:", error);
      loadingIndicator.textContent =
        "Error loading repositories. Please try again.";
    } finally {
      isLoading = false;
      loadingIndicator.style.display = "none";
    }
  }

  function checkScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      fetchRepositories(currentPage);
    }
  }

  fetchRepositories(currentPage);
  window.addEventListener("scroll", checkScroll);
});
