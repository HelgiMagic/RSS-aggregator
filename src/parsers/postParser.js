import changeModalContent from '../changeModal.js';

const parsePosts = (posts) => posts.map(({ url, title, description }) => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.classList.add('fw-bold');
  a.textContent = title;

  const button = document.createElement('button');
  button.textContent = 'Просмотр';
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.addEventListener('click', () => {
    changeModalContent(title, description, url);
  });

  const li = document.createElement('li');
  li.classList.add('post', 'd-flex', 'justify-content-between');
  li.append(a, button);

  return { url, element: li };
});

export default parsePosts;
