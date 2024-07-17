import axios from 'axios';

const KEY_API = '44822255-685480c2b82623113acf30a35';

export function getPictures({ q = '', page = 1, per_page = 1 } = {}) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: KEY_API,
        q,
        page,
        per_page,
        imageType: 'photo',
        orientation: 'horizontal',
        safeSearch: true,
      },
    })
    .then(({ data }) => data);
}
