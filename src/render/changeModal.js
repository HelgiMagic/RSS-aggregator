const changeModalContent = (elements, title, description, link) => {
  elements.modalTitle.textContent = title;
  elements.modalDescription.textContent = description;

  elements.modalButton.setAttribute('href', link);
};

export default changeModalContent;
