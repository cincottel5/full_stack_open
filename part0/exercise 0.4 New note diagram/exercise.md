# 0.4 New note diagram

## Request

Create a similar diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

If necessary, show operations on the browser or on the server as comments on the diagram.

The diagram does not have to be a sequence diagram. Any sensible way of presenting the events is fine.

All necessary information for doing this, and the next two exercises, can be found in the text of this part. The idea of these exercises is to read the text once more and to think through what is going on there. Reading the application code is not necessary, but it is of course possible.

You can do the diagrams with any program, but perhaps the easiest and the best way to do diagrams is the Mermaid syntax that is now implemented in GitHub Markdown pages!

## Solution

```mermaid

sequenceDiagram
    participant browser
    participant server
    
    note right of browser: Form submit action
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    note left of server: Processing payload
    server-->>browser: document/Redirect
    deactivate server
   	
    note right of browser: Refresh page
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/note
    server-->>browser: document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: stylesheet
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: script
    
    note right of browser: browser starts to execute javascript
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: [{content: "", date: ""}, {content: "", date: ""}, ... ]
    note right of browser: browser executes the callback function that render the notes
        
```