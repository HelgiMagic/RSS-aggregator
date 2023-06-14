const modal = document.getElementById('modal');

const closeModal = modal.querySelector('.btn-close');
const closeModal2 = modal.querySelector('.btn-secondary');
closeModal.setAttribute('data-bs-dismiss', 'modal');
closeModal2.setAttribute('data-bs-dismiss', 'modal');

const changeModalContent = (title, description, link) => {
  const modalDescription = modal.querySelector('p');
  const modalTitle = modal.querySelector('h5');

  modalTitle.textContent = title;
  modalDescription.textContent = description;

  const a = modal.querySelector('a');
  a.setAttribute('href', link);
};

export default changeModalContent;
