function main() {
  const channelsUrl = 'https://wind-bow.gomix.me/twitch-api/channels/';
  const streamsUrl  = 'https://wind-bow.gomix.me/twitch-api/streams/';
  const channels    = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

  function getChannel(chanName, statut, gameStreams) {
    const finalUrl = channelsUrl + chanName + '?callback=?';
    $.getJSON(finalUrl, r => {
      const img = r.logo != null ? r.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
      
      $('.channels').append(`
        <div class="${statut}">        
          <div><img src="${img}" alt="${chanName}"></div>
          <div><a href="${r.url}" target="_blank">${chanName}</a></div>
          <div>${statut}</div>
        </div>`
       );
      
    });
  }
  
  function getStreams(strName) {
    const finalUrl =  streamsUrl + strName + '?callback=?';
    $.getJSON(finalUrl, r => {
      let statut;
      let gameStreams;
      if(r.stream === null) {
         statut = 'offline';
         gameStreams = '';
      } else {
         gameStreams = r.stream.game;
         statut = 'online';
      }
      getChannel(strName, statut, gameStreams);
    });
  }
  
  channels.forEach( c => {getStreams(c)});
  
  setTimeout( () => {$('.wait').hide();
                     $('.channels').slideDown(2000)}, 2000);
  
  $('.main').on('click', 'li', (event) => {
    let tri = $(event.currentTarget).text();
    $('li').removeClass('active');
    $(event.currentTarget).addClass('active');
    if(tri === 'online') {
      $('.offline').addClass('visible');
      $('.online').removeClass('visible');
    } else if(tri === 'offline') {
      $('.offline').removeClass('visible');
      $('.online').addClass('visible');
    } else {
      $('.offline, .online').removeClass('visible');
    }
    
  });
}

$(document).ready(main);