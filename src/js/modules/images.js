const images = () => {
  const imgPopup = document.createElement('div'),
    workSection = document.querySelector('.works'),
    bigImage = document.createElement('img');

  imgPopup.classList.add('popup');
  workSection.appendChild(imgPopup);

  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';

  bigImage.style.maxWidth = '70vw';

  imgPopup.appendChild(bigImage);

  workSection.addEventListener('click', e => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains('preview')) {
      document.body.style.overflow = 'hidden';
      imgPopup.style.display = 'flex';
      const path = target.parentNode.getAttribute('href');
      bigImage.setAttribute('src', path);
    }

    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
};

export default images;
