import React, { Component } from 'react';
import LoadingOverlay from './LoadingOverlay'
import Popup from './Popup'
import Player from './Player'
import '../styles/Main.global.css';

class Main extends Component {

  render() {
    document.body.classList.toggle('dark-theme', true)
    return (
      <div className="main">
        <LoadingOverlay {...this.props} />
        <Popup popup={this.props.popup} popupShow={this.props.popupShow} popupHide={this.props.popupHide} />
        <div className="main-container">
          {React.cloneElement(this.props.children, this.props)}
        </div>
        {this.props.player.songs && this.props.player.songs.length > 0 &&
          <Player
          playerPlayPause={this.props.playerPlayPause}
          playerPrevious={this.props.playerPrevious}
          playerNext={this.props.playerNext}
          player={this.props.player}
          profile={this.props.profiles[this.props.client.selectedProfileIndex]}
          />
        }
      </div>
    )
  }
}

export default Main
