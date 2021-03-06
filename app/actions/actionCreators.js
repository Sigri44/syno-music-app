import { synoLoginQuery, synoDSListQuery, as } from '../utils/syno-api'

export function addProfile(name, url, port, login, password) {
  return {
    type: 'PROFILE_ADD',
    name,
    url,
    port,
    login,
    password
  }
}

export function deleteProfile(index) {
  return {
    type: 'PROFILE_DELETE',
    index
  }
}

export function selectClientProfile(index) {
  return {
    type: 'CLIENT_PROFILE_SELECTED',
    index
  }
}

export function clearSelectedClientProfile() {
  return {
    type: 'CLIENT_PROFILE_CLEAR'
  }
}

/**
 * Create action when current client is loading data
 * @export
 * @returns {object}
 */
export function clientLoading() {
  return {
    type: 'CLIENT_LOADING'
  }
}

/**
 * Create action when current client has finished loading data
 * @export
 * @returns {object}
 */
export function clientLoaded() {
  return {
    type: 'CLIENT_LOADED'
  }
}

/**
 * Update the loading status of our client
 * @param {string} status ('loggingIn', 'loadingArtists', 'loadingAlbums', 'loadingSongs')
 */
export function updateClientLoadingStatus(status) {
  return {
    type: 'CLIENT_UPDATE_LOADING_STATUS',
    status
  }
}

export function asclientLogin(profile, autoRefresh = false) {
  return dispatch => {
    dispatch(clientLoading())
    dispatch(updateClientLoadingStatus('loggingIn'))
    fetch(synoLoginQuery(profile), {credentials: 'include'}).then( (response) => {
      if(response.status === 200){
        response.json().then( (json) => {
          dispatch(clientLoggedIn(json.data.sid))
          dispatch(updateClientLoadingStatus('loadingArtists'))
          dispatch(clientListArtists(profile, autoRefresh))
        })

      } else {
        console.error(response)
        dispatch(clientLoaded())
      }
    }, (response) => {
      // Promise failed/rejected
      console.error(response)
      dispatch(clientLoaded())
    })
  }
}

export function clientLoggedIn(sid) {
  return {
    type: 'CLIENT_LOGGEDIN',
    sid
  }
}

export function clientListArtists(profile) {
  return dispatch => {
    fetch(as.listArtistsQuery(profile), {credentials: 'include'}).then( (response) => {
      if(response.status === 200){
        response.json().then( (json) => {
          dispatch(updateClientLoadingStatus(''))
          dispatch(clientListArtistsReceived(json.data.artists))
        })
      } else {
        console.error(response)
      }
    }, (response) => {
      // Promise failed/rejected
      console.error(response)
    })
  }
}

export function clientListArtistsReceived(artistsList) {
  return {
    type: 'ARTISTS_LIST_UPDATE',
    artistsList
  }
}

export function clientListArtistAlbums(profile, artist) {
  return dispatch => {
    fetch(as.listArtistAlbumsQuery(profile, artist), {credentials: 'include'}).then( (response) => {
      if(response.status === 200){
        response.json().then( (json) => {
          dispatch(updateClientLoadingStatus(''))
          dispatch(clientListArtistAlbumsReceived(artist, json.data.albums))
        })
      } else {
        console.error(response)
      }
    })
  }
}

export function clientListArtistAlbumsReceived(artist, albums) {
  return {
    type: 'ARTIST_ALBUMS_LIST_UPDATE',
    artist,
    albums
  }
}

export function clientListAlbumSongs(profile, artist, album, albumArtist) {
  return dispatch => {
    fetch(as.listAlbumSongsQuery(profile, artist, album, albumArtist), {credentials: 'include'}).then( (response) => {
      if(response.status === 200){
        response.json().then( (json) => {
          dispatch(updateClientLoadingStatus(''))
          dispatch(clientListAlbumSongsReceived(artist, album, albumArtist, json.data.songs))
        })
      } else {
        console.error(response)
        dispatch(uiHideLoadingOverlay())
      }
    })
  }
}

export function clientListAlbumSongsReceived(artist, album, albumArtist, songs) {
  return {
    type: 'ALBUM_SONGS_LIST_UPDATE',
    artist,
    album,
    albumArtist,
    songs
  }
}

export function uiShowLoadingOverlay() {
  return {
    type: 'UI_SHOW_LOADING_OVERLAY'
  }
}

export function uiHideLoadingOverlay() {
  return {
    type: 'UI_HIDE_LOADING_OVERLAY'
  }
}

export function popupShow(popupOptions) {
  return {
    type: 'POPUP_SHOW',
    popupOptions
  }
}

export function popupHide() {
  return {
    type: 'POPUP_HIDE'
  }
}

export function playerPlayPause() {
  return {
    type: 'PLAY_PAUSE_PLAYER'
  }
}

export function playerPlay() {
  return {
    type: 'PLAYER_PLAY'
  }
}

export function playerPause() {
  return {
    type: 'PLAYER_PAUSE'
  }
}

export function playerPrevious() {
  return {
    type: 'PLAYER_PREVIOUS'
  }
}

export function playerNext() {
  return {
    type: 'PLAYER_NEXT'
  }
}

export function playerMuteUnmute() {
  return {
    type: 'PLAYER_MUTE_UNMUTE'
  }
}

export function setPlayerSongs(songs, currentPlaylistId='') {
  return {
    type: 'UPDATE_PLAYER_SONGS',
    songs,
    currentPlaylistId
  }
}

export function setPlayerCurrentSong(songIdx) {
  return {
    type: 'PLAYER_SET_SONG',
    songIdx: parseInt(songIdx, 10)
  }
}