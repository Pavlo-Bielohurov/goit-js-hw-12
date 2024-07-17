import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { getPictures } from './js/pixabay-api';
import { galleryRender, galleryClear } from './js/render-functions';

const form = document.querySelector('.js-search');
const loader = document.querySelector('.loader');
const BtnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.js-gallery');

// let lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionsData: 'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
//   overlayOpacity: 0.8,
// });

const params = {
  q: '',
  page: 1,
  per_page: 15,
  maxPge: 0,
};

form.addEventListener('submit', handleSearch);

async function handleSearch(evt) {
  evt.preventDefault();
  params.page = 1;
  galleryClear();

  const curTarget = evt.currentTarget;
  params.q = curTarget.elements.search.value.trim().toLowerCase();

  if (!params.q) {
    iziToast.info({
      title: 'Info',
      message: 'Please enter a search query.',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  showLoader();

  BtnLoadMore.style.display = 'block';

  try {
    const { total, hits } = await getPictures(params);

    params.maxPge = Math.ceil(total / params.per_page);

    if (hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 2000,
      });
      BtnLoadMore.style.display = 'none';
      return;
    }

    galleryRender(hits);
    gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (hits.length > 0 && hits.length != total) {
      BtnLoadMore.disabled = false;
      BtnLoadMore.addEventListener('click', handleSearchMore);
    } else if (hits.length <= 15) {
      BtnLoadMore.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message:
          'You have reached the maximum number of images for your request',
        position: 'topRight',
        timeout: 2000,
      });
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: `Error: ${err}`,
      position: 'topRight',
      timeout: 2000,
    });
  } finally {
    hideLoader();
    form.reset;
  }
}

async function handleSearchMore() {
  params.page += 1;
  BtnLoadMore.disabled = true;
  showLoader();
  try {
    const { hits } = await getPictures(params);
    galleryRender(hits);

    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: `Error: ${err}`,
      position: 'topRight',
      timeout: 2000,
    });
  } finally {
    hideLoader();
    BtnLoadMore.disabled = false;

    if (params.page === params.maxPge) {
      BtnLoadMore.style.display = 'none';
      BtnLoadMore.removeEventListener('click', handleSearchMore);
    }
  }
}
function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
