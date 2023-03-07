import moment from 'moment';

export const formatTime = (value) => {
    if (value) {
        const stillUtc = moment.utc(value).toDate();
        const localDate = moment(stillUtc).local().format('hh:mm A | MMM Do');
        if (localDate === 'Invalid date') {
            return value;
        }
        return localDate;
    }
    return value;
};

export const formatDate = (value) => {
    if (value) {
        const stillUtc = moment.utc(value).toDate();
        const localDate = moment(stillUtc).local().format('MM/DD/YYYY');
        if (localDate === 'Invalid date') {
            return value;
        }
        return localDate;
    }
    return value;
};

export const truncateString = (str, no_words) => {
    return str.split(' ').splice(0, no_words).join(' ') + '...';
}

export const changeDateToFilter = (value) => {
    return moment(value).format('MMM')
}

export const parseEmbedVideoURL = (url) => {
    // - Supported YouTube URL formats:
    //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
    //   - http://youtu.be/My2FRPA3Gf8
    //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
    // - Supported Vimeo URL formats:
    //   - http://vimeo.com/25451551
    //   - http://player.vimeo.com/video/25451551
    // - Also supports relative URLs:
    //   - //player.vimeo.com/video/25451551
    if (url !== undefined && url !== null && url !== '') {
        url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\/&\S+)?/);
        let provider = '';
        if (RegExp.$3.indexOf('youtu') > -1) {
            provider = 'youtube';
        } else if (RegExp.$3.indexOf('vimeo') > -1) {
            provider = 'vimeo';
        }
        const id = RegExp.$6;

        if (provider == 'youtube') {
            return 'https://www.youtube.com/embed/' + id;
        } else if (provider == 'vimeo') {
            return 'https://player.vimeo.com/video/' + id;
        } else {
            return '';
        }
    } else {
        return ''
    }
}