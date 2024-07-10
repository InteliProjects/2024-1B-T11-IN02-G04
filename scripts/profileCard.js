document.addEventListener('DOMContentLoaded', (event) => {
    async function fetchData(url) {
      const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      return response.json();
    }
  
    async function populateProfile() {
      const username = getCookie('username');
      if (!username) {
        console.error('No username cookie found');
        return;
      }
  
      const volunteer = await fetchData(`/volunteer/profile`);
      document.getElementById('name').innerText = volunteer.name;
      document.getElementById('title').innerText = volunteer.title;
      document.getElementById('about').innerText = volunteer.about;
      document.getElementById('phone').innerText = volunteer.phone;
      document.getElementById('email').innerText = volunteer.email;
      document.getElementById('location').innerText = volunteer.city;
  
      const skillsContainer = document.getElementById('skills');
      volunteer.skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill');
        skillDiv.innerText = skill;
        skillsContainer.appendChild(skillDiv);
      });
  
      document.getElementById('workedHours').innerText = volunteer.workedHours;
      const categoriesContainer = document.getElementById('category');
      volunteer.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerText = category;
        categoriesContainer.appendChild(categoryDiv);
      });
  
      const achievementsContainer = document.getElementById('achievements');
      volunteer.achievements.forEach(achievement => {
        const achievementDiv = document.createElement('div');
        achievementDiv.classList.add('achievement');
        const img = document.createElement('img');
        img.src = achievement.img;
        img.alt = 'Medal';
        achievementDiv.appendChild(img);
        achievementsContainer.appendChild(achievementDiv);
      });
  
      const postsContainer = document.getElementById('postsContainer');
      volunteer.posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        const img = document.createElement('img');
        img.src = post.image;
        img.alt = 'Post Image';
        const h4 = document.createElement('h4');
        h4.innerText = post.title;
        const p = document.createElement('p');
        p.innerText = post.description;
        const likeButton = document.createElement('div');
        likeButton.classList.add('like-button');
        likeButton.onclick = () => toggleLike(likeButton);
        const likeIcon = document.createElement('i');
        likeIcon.classList.add('far', 'fa-heart');
        likeButton.appendChild(likeIcon);
        postDiv.appendChild(img);
        postDiv.appendChild(h4);
        postDiv.appendChild(p);
        postDiv.appendChild(likeButton);
        postsContainer.appendChild(postDiv);
      });
    }
  
    populateProfile();
  });