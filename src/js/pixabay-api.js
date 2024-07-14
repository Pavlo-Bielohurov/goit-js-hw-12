export function getPictures(name) {
  const Key_Api = '44822255-685480c2b82623113acf30a35';
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = true;
  return fetch(
    `https://pixabay.com/api/?key=${Key_Api}&q=${name}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`
  ).then(res => {
    console.log(res);
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
