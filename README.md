# Autocomplete sample project

## Run the project

Requires Node v4.0.0 or greater

`npm install`

`npm start` - this will open a new browser tab to the index page 

## Testing

Open a terminal and run `npm start`

Open a separate terminal and run `npm test`

## TODO:
- Support for `escape` closing the suggestion box
- Support for the arrow keys for moving up and down the list 
- Improved `backspace` interaction
- Improved keyboard support (right now you have to tab "onto" the list, then tab "into" the list items)
- CSS isn't "relative" enough (too many line returns can cause overlap on the suggestions box in Chrome)
- CSS doesn't produce the same visual result in Safari (suggestions box is too far down)
- Support for clicking a name to select it (right now it's just keyboard support)
