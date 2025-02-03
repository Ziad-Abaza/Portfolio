document.addEventListener("DOMContentLoaded", () => {
  const username = "Ziad-Abaza";
  const repositoriesContainer = document.getElementById(
    "gh-repositories-container"
  );
  const loadingIndicator = document.getElementById("gh-loading-indicator");
  let currentPage = 1;
  const perPage = 10;
  let isLoading = false;
  let hasMoreRepos = true;

  async function checkForScreenshot(repo) {
    const imageExtensions = ["png", "jpg", "jpeg"];
    for (const ext of imageExtensions) {
      const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/screenshots/screenshot.${ext}`;
      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          return imageUrl;
        }
      } catch (error) {
        console.error(`Error checking for screenshot: ${error}`);
      }
    }
    return null;
  }

  async function getRepoImage(repo) {
    const screenshotUrl = await checkForScreenshot(repo);
    if (screenshotUrl) {
      return screenshotUrl;
    }

    const socialPreviewUrl = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
    try {
      const response = await fetch(socialPreviewUrl);
      if (response.ok) {
        return socialPreviewUrl;
      }
    } catch (error) {
      console.error(`Error fetching social preview: ${error}`);
    }

    return `./img/placeholder.png`;
  }

  async function fetchRepositories(page) {
    if (!hasMoreRepos || isLoading) return;
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
        hasMoreRepos = false;
        loadingIndicator.textContent = "No more repositories to load.";
        return;
      }

      for (const repo of repositories) {
        if (!repo.description) continue;

        const repoCard = document.createElement("div");
        repoCard.classList.add("gh-repo-card");

        const repoImage = document.createElement("img");
        repoImage.src = await getRepoImage(repo);
        repoImage.alt = repo.name;
        repoImage.classList.add("gh-repo-image");

        const repoName = document.createElement("h2");
        repoName.textContent = repo.name;
        repoName.classList.add("gh-repo-name");

        const repoDescription = document.createElement("p");
        repoDescription.textContent =
          repo.description || "No description provided.";
        repoDescription.classList.add("gh-repo-description");

        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = "View on GitHub";
        repoLink.classList.add("gh-btn", "gh-btn-primary");

        const repoPagesLink = document.createElement("a");
        if (repo.has_pages) {
          repoPagesLink.href = `https://${username}.github.io/${repo.name}`;
          repoPagesLink.textContent = "View Demo Pages";
          repoPagesLink.classList.add("gh-btn", "gh-btn-secondary");
        }

        repoCard.appendChild(repoImage);
        repoCard.appendChild(repoName);
        repoCard.appendChild(repoDescription);
        repoCard.appendChild(repoLink);
        if (repo.has_pages) {
          repoCard.appendChild(repoPagesLink);
        }

        repositoriesContainer.appendChild(repoCard);
      }

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

  let isScrolling;
  function checkScroll() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !isLoading &&
        hasMoreRepos
      ) {
        fetchRepositories(currentPage);
      }
    }, 100);
  }

  fetchRepositories(currentPage);
  window.addEventListener("scroll", checkScroll);
});
