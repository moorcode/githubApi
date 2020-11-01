const handleSubmit = function () {
  $('form').on('submit', event => {
    event.preventDefault();
    const searchTerm = $('.js-search-term').val();
    buildUrl(searchTerm); 
  });
};

const buildUrl = function (searchTerm) {
  const url = `https://api.github.com/users/${searchTerm}/repos`;
  getResults(url);
};

const getResults = function (url) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

const displayResults = function (responseJson) {
  console.log(responseJson);
  $('ul').empty();
  for(let i=0; i<responseJson.length; i++){
    $('ul').append(`${i+1}
    <a href=${responseJson[i].html_url}>${responseJson[i].name}<li>
    </li></a>`);
    $('ul').removeClass('hidden');
  }
  
};

const main = function () {
  handleSubmit();
};

$(main)