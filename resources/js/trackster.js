

/*last.fm developer api
https://www.last.fm/api

Application name	trackster
API key	2bbe973ecc284f94d17812d4bb225063
Shared secret	66e3824a0613d1875bbfd4de0181261f
Registered to	sunligfht

search for tracks:
JSON: /2.0/?method=track.search&track=Believe&api_key=YOUR_API_KEY&format=json
XML: /2.0/?method=track.search&track=Believe&api_key=YOUR_API_KEY

search for album:
JSON: /2.0/?method=album.search&album=believe&api_key=YOUR_API_KEY&format=json
XML: /2.0/?method=album.search&album=believe&api_key=YOUR_API_KEY
*/

// Variables
var list;
var Trackster = {};
var filter = {artist:'ascending', name:'ascending', listeners:'ascending'}

// ******************************************************************* //

/* run the click event only if the page has loaded*/
$(document).ready(function(){
  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js');
  
  $('#search-button').click(clicked);

  $('#search-input').keypress(function (e) {
    if (e.which == 13) {
      clicked();
      return false;    
      //"return false" is the same as calling e.preventDefault and e.stopPropagation().
    }
  });

//hid the descendant buttons
$('#sortButton1b').hide();
$('#sortButton2b').hide();
$('#sortButton3b').hide();



//$( "#foo" ).toggle( display );
  $('#artist-heading').click(sortByArtist);
  $('#song-heading').click(sortBySong);
  $('#popularity-heading').click(sortByPopularity);
});

// ******************************************************************* //

/* do something when a user clicks the button*/
function clicked() {
  let query = $('.search__bar').val();
  Trackster.searchTracksByTitle(query);
}
// ******************************************************************* //

/* filter popularity */
function sortByPopularity() {
  if(filter.listeners ==='ascending'){
    var $t = list.sort((a, b) => a.listeners - b.listeners); // For ascending sort
    filter.listeners = 'descending';
    $('#sortButton3a').show();
    $('#sortButton3b').hide();
  }
  else if (filter.listeners ==='descending'){
    var $t = list.sort((a, b) => b.listeners - a.listeners); // For descending sort  
    filter.listeners = 'ascending';
    $('#sortButton3b').show();
    $('#sortButton3a').hide();
  }
  list = $t; // add newly sorted list to the current list.
  $('#track-list').empty(); // empty the DOM list items.
  
  for(let i = 0; i < $t.length; i++){
    var string = numeral($t[i].listeners).format('0,0');
  $('#track-list').append
    ('<div class="list-item  col-xs-1 col-xs-offset-2"><a href="'
    +
    $t[i].url
    +
    '" class="far fa-play-circle"></a></div><div class="list-item  col-xs-1">'
    +
    '1'
    +
    '</div><div class="list-item col-xs-3">'
    +
    $t[i].name
    +
    '</div><div class="list-item col-xs-3">'
    +
    $t[i].artist
    +
    '</div><div class="list-item col-xs-2">'
    +
    string
    +
    '</div></div>');
  }
}
// ******************************************************************* //

/* filter songs */
function sortBySong() {
  if(filter.name ==='ascending'){
    var $t = list.sort((a, b) => a.name.localeCompare(b.name));
    filter.name = 'descending';
    $('#sortButton1b').show();
    $('#sortButton1a').hide();
  }
  else if (filter.name ==='descending'){
    var $t = list.sort((a, b) => b.name.localeCompare(a.name));
    filter.name = 'ascending';
    $('#sortButton1a').show();
    $('#sortButton1b').hide();
  }
  list = $t; // add newly sorted list to the current list.
  $('#track-list').empty(); // empty the DOM list items.
  
  for(let i = 0; i < $t.length; i++){
    var string = numeral($t[i].listeners).format('0,0');
  $('#track-list').append
    ('<div class="list-item  col-xs-1 col-xs-offset-2"><a href="'
    +
    $t[i].url
    +
    '" class="far fa-play-circle"></a></div><div class="list-item  col-xs-1">'
    +
    '1'
    +
    '</div><div class="list-item col-xs-3">'
    +
    $t[i].name
    +
    '</div><div class="list-item col-xs-3">'
    +
    $t[i].artist
    +
    '</div><div class="list-item col-xs-2">'
    +
    string
    +
    '</div></div>');
  }
}

// ******************************************************************* //
/* filter Artist */
function sortByArtist() {
  if(filter.artist ==='ascending'){
    var $t = list.sort((a, b) => a.artist.localeCompare(b.artist));
    filter.artist = 'descending';
    $('#sortButton2b').show();
    $('#sortButton2a').hide();
  }
  else if (filter.artist ==='descending'){
    var $t = list.sort((a, b) => b.artist.localeCompare(a.artist));
    filter.artist = 'ascending';
    $('#sortButton2a').show();
    $('#sortButton2b').hide();
  }
  list = $t; // add newly sorted list to the current list.
  $('#track-list').empty(); // empty the DOM list items.
  
  for(let i = 0; i < $t.length; i++){
    var string = numeral($t[i].listeners).format('0,0');
  $('#track-list').append
    ('<div class="list-item  col-xs-1 col-xs-offset-2"><a href="'
    +
    $t[i].url
    +
    '" class="far fa-play-circle"></a></div><div class="list-item  col-xs-1">'
    +
    '1'
    +
    '</div><div class="list-item col-xs-3">'
    +
    $t[i].name
    +
    '</div><div class="list-item col-xs-3">'
    +
    $t[i].artist
    +
    '</div><div class="list-item col-xs-2">'
    +
    string
    +
    '</div></div>');
  }
}
// ******************************************************************* //

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {
  list = tracks.results.trackmatches.track;
  $('#track-list').empty();
  

  for(let i = 0; i < list.length; i++){
    var string = numeral(list[i].listeners).format('0,0');

    $('#track-list').append
    ('<div class="list-item  col-xs-1 col-xs-offset-2"><a href="'
    +
    list[i].url
    +
    '" class="far fa-play-circle"></a></div><div class="list-item  col-xs-1">'
    +
    '1'
    +
    '</div><div class="list-item col-xs-3">'
    +
    list[i].name
    +
    '</div><div class="list-item col-xs-3">'
    +
    list[i].artist
    +
    '</div><div class="list-item col-xs-2">'
    +
    string
    +
    '</div></div>');
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  let baseurl= 'http://ws.audioscrobbler.com/';
  let searchTrackUrl = "/2.0/?method=track.search&track="+title+"&api_key=2bbe973ecc284f94d17812d4bb225063&format=json";

    $.get(baseurl+searchTrackUrl, function(dataTracks){
      Trackster.renderTracks(dataTracks);
      $('.search__bar').val('');
    });
};

























/* chaining ajax calls */
Trackster.searchMany = function(query) {
    $.when(
      $.ajax("/some/page"),
      $.ajax("/some/other-page"),
      $.ajax("/some/other-other-page"),
      $.ajax("/and/so/on")
      )
      .done(function(first_call, second_call, third_call, fourth_call){
          //we're good to go - do something
      })
      .fail(function(){
          //ruh roh - bail out!
    });
};
