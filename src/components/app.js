import _ from 'lodash';
import React, {Component} from 'react';
import SearchBar from './search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './video_list';
import VideoDetail from './video_detail'

const YOUTUBE_API_KEY = "AIzaSyCt-rhC0hgZ1f1J4-nVWSr11ZmhcdCvrBM";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
        };

        this.videoSearch('tarsier');
    }

    videoSearch(term) {
        YTSearch({key: YOUTUBE_API_KEY, term}, videos => {
            const selectedVideo = videos[0];
            this.setState({videos, selectedVideo});
            console.log(this.state.videos);
        });
    }

    render() {
        const videoSearch = _.debounce(this.videoSearch.bind(this), 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
            </div>
        );
    }
}
