const showModal = (title, description, link) => {
  const modal = document.getElementById('modal');
  modal.classList.add('show');

  const closeModal = modal.querySelector('.btn-close');
  const closeModal2 = modal.querySelector('.btn-secondary');
  closeModal2.addEventListener('click', () => { modal.classList.remove('show'); });
  closeModal.addEventListener('click', () => { modal.classList.remove('show'); });

  const modalDescription = modal.querySelector('p');
  const modalTitle = modal.querySelector('h5');

  modalTitle.textContent = title;
  modalDescription.textContent = description;

  const a = modal.querySelector('a');
  a.setAttribute('href', link);
};

export default showModal;
