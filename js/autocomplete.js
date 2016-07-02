var APP = {};

APP.keys = '';
APP.fetchData = new XMLHttpRequest();
APP.names; 

APP.init = function () {    
    var fetchData = this.fetchData;

    fetchData.addEventListener('load', this.fetchComplete);
    fetchData.addEventListener('error', this.fetchFailed);

    fetchData.open('GET', '/data/data.json');
    fetchData.send();
};

APP.fetchComplete = function (event) {
    var element;

    if (APP.fetchData.status === 200) {
        APP.names = JSON.parse(APP.fetchData.responseText);
        element = document.getElementById('comment');

        APP.setupEvents(element);
    } else {
        APP.fetchErrored();
    }
}

APP.fetchErrored = function () {
    console.log('Fetching data failed with status code ', APP.fetchData.status);
}

APP.fetchFailed = function (event) {
    console.log('Fetching data failed', event);
}

APP.setupEvents = function (element) {
    element.addEventListener('keyup', this.checkKeys);
};

APP.checkKeys = function (event) {
    APP.keys = APP.keys + event.key;


console.log('keys', APP.keys);
};

APP.init();
