import React from 'react';
import '../styles/SongsList.global.css'

class SongsList extends React.Component {

  humanDuration(duration) {
    var sec_num = parseInt(duration, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours!=='00'?hours+':':'')+minutes+':'+seconds;
  }

  render() {
    return (
    <div>
      <h4>Songs</h4>
      <table className="songs-list">
        <tbody>
        {this.props.songs.map(function(element, idx){
          return <tr key={idx}>
            <td className="play-cell"><button className="bttn bttn-default btn-sm" type="button"><i className="glyphicon glyphicon-play"></i></button></td>
            <td>{element.title}</td>
            <td className="duration-cell">{this.humanDuration(element.additional.song_audio.duration)}</td>
            </tr>
        }, this)
        }
        </tbody>
      </table>
    </div>
    )
  }
}

export default SongsList