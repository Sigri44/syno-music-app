import React from 'react';
import { as } from '../utils/syno-api'
import '../styles/Player.global.css'

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)

    const songUrl = ''
    const playing = false
    this.state = {songUrl, playing}
  }

  componentDidUpdate(prevProps, prevState) {
    if ( (this.props.player.currentSongIdx || this.props.player.currentSongIdx === 0) && this.props.player.songs[this.props.player.currentSongIdx]) {
      const songUrl = as.getStreamSongUrl(this.props.profile, this.props.player.songs[this.props.player.currentSongIdx].id)
      // const songUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3'
      if (this.state.songUrl != songUrl) {
        // console.log(songUrl)
        this.setState({songUrl})
      }
    }

    let audio = document.getElementById('audio')
    if (this.props.player.status === 'play') {
      audio.play()
    } else {
      audio.pause()
    }
  }

  handlePlayPauseClick() {
    this.props.playerPlayPause()
    // console.log(audio.currentSrc, audio.currentTime, audio.duration)
  }

  handlePrevClick() {
    this.props.playerPrevious()
  }

  handleNextClick() {
    this.props.playerNext()
  }

  render() {
    const playPauseActionText = (this.props.player.status==='play'?'Pause':'Play')
    return (
      <div className="player">
        <button onClick={this.handlePrevClick} type="button">Prev</button>
        <button onClick={this.handlePlayPauseClick} type="button">{playPauseActionText}</button>
        <button onClick={this.handleNextClick} type="button">Next</button>
        <p>{this.props.player.songs.length} loaded ({this.props.player.currentPlaylistId}) - Song {this.props.player.currentSongIdx} - Status {this.props.player.status}</p>
        { (this.props.player.currentSongIdx || this.props.player.currentSongIdx === 0) &&
        <audio id="audio" src={this.state.songUrl} ></audio>
        }
        { (this.props.player.currentSongIdx || this.props.player.currentSongIdx === 0) &&
        <p><small>{this.props.player.songs[this.props.player.currentSongIdx].title}</small></p>
        }
      </div>
    )
  }
}

export default Player