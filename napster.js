const baseURL = 'http://api.napster.com/v2.2/search/verbose';
const key = 'ODc4Mzg3YzYtZWE4Yi00ZmYxLWJjODAtNTY5MDJhNWY3ZmRj';
let url;

const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const lyrics = document.querySelector(".trackLyrics");
const imageContainer = document.querySelector(".images")
searchForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
  e.preventDefault();
  url = baseURL + '?query=' + searchTerm.value + '&apikey=' + key;
  console.log("URL:", url);

  fetch(url).then(function (result) {
    console.log(result);
    return result.json();
  }).then(function (json) {
    console.log(json);
    displayResults(json);
  });
}

function displayResults(results) {
  console.log(results)
  while (lyrics.firstChild) {
    lyrics.removeChild(lyrics.firstChild);
  }

  let albums = results.search.data.albums;
  console.log(results.search.data.albums);
  for (album of albums) {
    console.log(album)
    fetch(album.links.images.href + '?apikey=' + key)
      .then((res) => {
        return res.json();
      })
      .then((img) => {
        console.log(img)
        let images = document.createElement('img')
        images.src = img.images[0].url
        imageContainer.appendChild(images)
      })

    //1 create the element
    let name = document.createElement('h2')
    let artistName = document.createElement('h3')
    // let originallyReleased = document.createElement('h4')
    let label = document.createElement('h4')
    let container = document.createElement('div')

    //2 adding content to the element
    name.textContent = album.name
    artistName.textContent = album.artistName
    // originallyReleased.textContent = album.originallyReleased
    label.textContent = album.label

    container.className = 'text'
    //3 append to html
    container.appendChild(artistName)
    container.appendChild(name)
    // container.appendChild(originallyReleased)
    container.appendChild(label)
    lyrics.appendChild(container)
  }
}