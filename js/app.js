(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $Title = $('<h6>').addClass('card-Title truncate');

      $Title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $Title.tooltip({
        delay: 50
      }).text(movie.Title);

      const $Poster = $('<img>').addClass('Poster');

      $Poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($Title, $Poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  let btn = $('button')
  btn.click(function(e) {
    e.preventDefault()
    $.get("http://www.omdbapi.com/?apikey=702b3bb5&t=" + $('#search').val(), function(data) {
      movies = []
      movies.push(data)
      renderMovies()
      console.log(data.Plot)
    })
  })

})();
