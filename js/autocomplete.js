var APP = {};

APP.keys = '';
APP.fetchData = new XMLHttpRequest();
APP.names; 
APP.legalNameChars = 'abcdefghijklmnopqrstuvwxyz';
APP.domElement;

/**
 * Initialize the application for the page, fetching data for the usernames
 */
APP.init = function () {    
    var fetchData = this.fetchData;

    fetchData.addEventListener('load', this.fetchComplete);
    fetchData.addEventListener('error', this.fetchFailed);

    fetchData.open('GET', '/data/data.json');
    fetchData.send();
};

APP.fetchComplete = function (event) {
    if (APP.fetchData.status === 200) {
        APP.names = JSON.parse(APP.fetchData.responseText);
        APP.domElement = document.getElementById('comment');

        APP.setupEvents(APP.domElement);
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
    // TODO: may need some means of throttling/debouncing
    element.addEventListener('keyup', this.checkKeys);

    document.body.addEventListener('keyup', this.selectName);
};

/**
 * Track typed keys (alphabetic characters only) 
 * @param {Event} keyup event
 */
APP.checkKeys = function (event) {
    var keyPressed = event.key.toLowerCase();
    var matches;

    if (APP.legalNameChars.indexOf(keyPressed) > -1) {
        APP.keys = APP.keys + keyPressed;

        if (APP.keys.length > 1) {
            matches = APP.matchNames();

            if (matches.length < 1) {
                APP.removeResults();
            } else {
                APP.appendResults(matches);
            }
        }    
    }

    if (keyPressed === 'backspace') {
        APP.keys = APP.keys.slice(0, -1);

        if (APP.keys.length < 1) {
            APP.removeResults();
        }
    } else if (keyPressed === ' ') {
        // reset tracking on space; this could potentially cause issues for users with spaces in their first name
        APP.keys = '';
        APP.removeResults();
    } else if (keyPressed === 'delete') {
        APP.removeResults();
    }
};

/**
 * Match characters typed up to this point against username and name
 * return {Array} limited to 5 results
 */
APP.matchNames = function () {
    var matchingNames = APP.names.filter(function (value, index, arr) {
        if (value.username.indexOf(APP.keys) === 0 ||
            value.name.toLowerCase().indexOf(APP.keys) === 0) {
            return value;
        }
    });


    return matchingNames.slice(0, 5);
};

/**
 * @return {Number} 
 */
APP.getCursorVerticalOffset = function () {
    var lineBreaks = APP.domElement.value.match(/[\r|\n]/g);

    if (!lineBreaks) {
        return 3;
    } else {
        return 3 + lineBreaks.length;
    }
};

APP.removeResults = function () {
    var list = document.getElementsByClassName('autocomplete-names')[0];
    if (list) {
        list.remove();
    }    
}

APP.appendResults = function (matches) {
    APP.removeResults();

    var fragment = document.createDocumentFragment();
    var list = document.createElement('ul');
    var listElement;

    list.className = 'autocomplete-names';
    list.style = 'top: ' + APP.getCursorVerticalOffset() + 'em';
    list.tabIndex = 0;

    fragment.appendChild(list);

    for (var i = 0; i < matches.length; i++) {
        listElement = document.createElement('li');
        listElement.innerText = matches[i].name;
        listElement.className = 'autocomplete-names--name';
        listElement.tabIndex = 0;

        list.appendChild(listElement);
    }

    APP.domElement.parentElement.appendChild(fragment);   
};

APP.selectName = function (event) {
    if (event.target.className !== 'autocomplete-names--name' ||
        event.key.toLowerCase() !== 'enter') {
        return;
    }

    var text = APP.domElement.value;
    var textArray = text.split(' ').slice(0, -1); // chop off last type text after a space

    // replace with the selected target
    textArray.push(event.target.innerText);
   
    APP.domElement.value = textArray.join(' ');

    APP.removeResults();

    APP.domElement.focus();
};

APP.init();
