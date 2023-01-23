import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('#vimeo-player');
const playerEl = new Player(iframeEl);

playerEl.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}

const getTime = localStorage.getItem('videoplayer-current-time');
if (getTime) {
  playerEl.setCurrentTime(getTime);
} else {
  playerEl.setCurrentTime(0);
}