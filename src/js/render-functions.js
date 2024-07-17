import SimpleLightbox from 'simplelightbox';

const galleryList = document.querySelector('.js-gallery');

export function galleryRender(arr) {
  const markup = arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
    <li class="gallery-item">
    <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" class="card-img"/>
    </a>
    <ul class="galery-item-description">
    <li>
    <p class="count-text">Likes</p>
    <p class="count">${likes}</p>
    </li>
    <li>
    <p class="count-text">Views</p>
    <p class="count">${views}</p>
    </li>
    <li>
    <p class="count-text">Comments</p>
    <p class="count">${comments}</p>
    </li>
    <li>
    <p class="count-text">Downloads</p>
    <p class="count">${downloads}</p>
    </li>
    </ul>
    </li>
    `
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });
  lightbox;
}

export function galleryClear() {
  galleryList.innerHTML = '';
}
