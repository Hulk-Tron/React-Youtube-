import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './component/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './component/video_list';
import VideoDetail from './component/video_detail'
const API_KEY = 'AIzaSyBGYNVK5d0asgoTTCvuyj6zzinL3pp2B64';
import _ from 'lodash';

// CREATE A NEW COMPONENT. This component should produce  some Html
// const App = () =>{
//
class App extends Component{
  constructor(props){
    super(props)
    this.state = {videos: [],selectedVideo:null }

    this.videoSearch('surfboards')

  }
videoSearch(term){
  YTSearch({key:API_KEY,term:term},(videos) => {
     this.setState({videos:videos,
     selectedVideo:videos[0] });
  })
}
  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)},300)
    return(
      <div>
      <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
      </div>
    )
  }

}
//   return (
//     <div>
// <SearchBar />
//   </div>
// )
// }

// take this component generated html and put it on the page (in the dom)
ReactDOM.render(<App />,document.querySelector('.container'));
