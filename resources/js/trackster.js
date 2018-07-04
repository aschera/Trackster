/*last.fm developer api
https://www.last.fm/api

Application name	trackster
API key	2bbe973ecc284f94d17812d4bb225063
Shared secret	66e3824a0613d1875bbfd4de0181261f
Registered to	sunligfht

search for tracks:
JSON: /2.0/?method=track.search&track=Believe&api_key=YOUR_API_KEY&format=json
XML: /2.0/?method=track.search&track=Believe&api_key=YOUR_API_KEY
*/


/* run the click event only if the page has loaded*/
$(document).ready(function(){
  $('#search-button').click(clicked);
});

/* do something when a user clicks the button*/
function clicked() {
  let query = $('.search__bar').val();
  Trackster.searchTracksByTitle(query);
}

var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {

  console.log(tracks);
  let list = tracks.results.trackmatches.track;

  $('#track-list').empty();

  for(let i = 0; i < list.length; i++){
   let test = 'test';

    $('#track-list').append
    ('<div class="list-item  col-xs-1 col-xs-offset-2"><a href="'
    +
    list[i].url
    +
    '" class="fa fa-play-circle-o"></a></div><div class="list-item  col-xs-1">'
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
    list[i].listeners
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

  $.get(baseurl+searchTrackUrl, function(data){

    Trackster.renderTracks(data);
    $('.search__bar').val('');
});

};