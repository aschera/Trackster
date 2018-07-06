
/* -------------------------------------- API info -------------------------------------- */
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

/* -------------------------------------------------------------------------------------- */
/* ------------------------- Document is ready - event listeners ---------- ------------- */

/* run the click event only if the page has loaded*/
$(document).ready(function(){

  // script to format numbers.
  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js');

  //loading spinner
  let $loadingspinner = $('.fa-spinner').hide();
  $loadingspinner.hide();

  //hide the descendant buttons
  $('#sortButton1b').hide();
  $('#sortButton2b').hide();
  $('#sortButton3b').hide();
 
 
  // Filter-buttons
  $('#artist-heading').click(sortByArtist);
  $('#song-heading').click(sortBySong);
  $('#popularity-heading').click(sortByPopularity);

  // search button
  $('#search-button').click(updateTracklist);

  // Search input field. Search on ENTER.
  $('#search-input').keypress(function (e) {
    if (e.which == 13) {
      updateTracklist();
    }
  });
});

/* searches API when a user clicks the search-button*/
function updateTracklist() {
  let query = $('.search__bar').val();
  Trackster.searchTracksByTitle(query);
}


/* -------------- Automatic search when user stops typing ------------- */
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms (5 seconds)

function myFunction() {
  //user is "finished typing," do something
  const doneTyping = function() {
    let query = $('#search-input').val();
    Trackster.searchTracksByTitle(query);
  }
      //on keyup, start the countdown
      clearTimeout(typingTimer);
      if ($('#search-input').val()) {
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
      }
}

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------- Trackster-------------------------------------- */

//Holds the Trackster attributes and functions. these are searchTracksByTitle, PopulateTrackRows and renderTracks.
var Trackster = {
  list : [false],
  filter : {
    artist:'ascending', 
    name:'ascending', 
    listeners:'ascending'
  }
};



// input search query is passed to aPI and a list of song titles is returned.
Trackster.searchTracksByTitle = function(title) {
  $('.empty-search-msg').hide();
  let $loadingspinner = $('.fa-spinner').hide();
  $loadingspinner.show();
  let baseurl= 'http://ws.audioscrobbler.com/';
  let searchTrackUrl = "/2.0/?method=track.search&track="+title+"&api_key=2bbe973ecc284f94d17812d4bb225063&format=json";
    $.get(baseurl+searchTrackUrl, function(dataTracks){
      Trackster.renderTracks(dataTracks);
      //$('.search__bar').val('');
    });
};

// Here we take in the list from the API / Filter and create rows and add them to the DOM
Trackster.PopulateTrackRows = function(trackList) {
  for (let track of trackList) {

    // listerners attribute values need to be formatted: instead of 1000000, we want 1,000,000.
    let listeners = numeral(track.listeners).format('0,0');

    // add the new list rows to the DOM
    $('#track-list').append
      (`
        <div class="list-item col-xs-1 col-xs-offset-2"><a href=" ${track.url}" class="far fa-play-circle"></a></div>
        <div class="list-item col-xs-1">${1}</div>
        <div class="list-item col-xs-3">${track.name}</div>
        <div class="list-item col-xs-3">${track.artist}</div>
        <div class="list-item col-xs-2">${listeners}</div>
      `);
  }
  let $loadingspinner = $('.fa-spinner').hide();
  $loadingspinner.hide();
}

// The list returned from searchTracksByTitle() is rendered on the page.
Trackster.renderTracks = function(tracks) {
  Trackster.list = tracks.results.trackmatches.track;
  $('#track-list').empty();
  Trackster.PopulateTrackRows(Trackster.list);
};
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------- Filters --------------------------------------- */

/* filter popularity */
function sortByPopularity() {
  let list = Trackster.list;

  if(Trackster.filter.listeners ==='ascending'){
    var $t = list.sort((a, b) => a.listeners - b.listeners); // For ascending sort
    Trackster.filter.listeners = 'descending';
    $('#sortButton3b').show();
    $('#sortButton3a').hide();
  }
  else if (Trackster.filter.listeners ==='descending'){
    var $t = list.sort((a, b) => b.listeners - a.listeners); // For descending sort  
    Trackster.filter.listeners = 'ascending';
    $('#sortButton3a').show();
    $('#sortButton3b').hide();
  }
  Trackster.list = $t; // add newly sorted list to the current list.
  $('#track-list').empty(); // empty the DOM list items.
  Trackster.PopulateTrackRows(Trackster.list);
}

/* filter songs */
function sortBySong() {
  let list = Trackster.list;

  if(Trackster.filter.name ==='ascending'){
    var $t = list.sort((a, b) => a.name.localeCompare(b.name));
    Trackster.filter.name = 'descending';
    $('#sortButton1b').show();
    $('#sortButton1a').hide();
  }
  else if (Trackster.filter.name ==='descending'){
    var $t = list.sort((a, b) => b.name.localeCompare(a.name));
    Trackster.filter.name = 'ascending';
    $('#sortButton1a').show();
    $('#sortButton1b').hide();
  }
  Trackster.list = $t; // add newly sorted list to the current list.
  $('#track-list').empty(); // empty the DOM list items.
  Trackster.PopulateTrackRows(Trackster.list);
}

/* filter Artist */
function sortByArtist() {
  let list = Trackster.list;

  if(Trackster.filter.artist ==='ascending'){
    var $t = list.sort((a, b) => a.artist.localeCompare(b.artist));
    Trackster.filter.artist = 'descending';
    $('#sortButton2b').show();
    $('#sortButton2a').hide();
  }
  else if (Trackster.filter.artist ==='descending'){
    var $t = list.sort((a, b) => b.artist.localeCompare(a.artist));
    Trackster.filter.artist = 'ascending';
    $('#sortButton2a').show();
    $('#sortButton2b').hide();
  }
  Trackster.list = $t; // add newly sorted list to the current list.
  $('#track-list').empty(); // empty the DOM list items.
  Trackster.PopulateTrackRows(Trackster.list);
}