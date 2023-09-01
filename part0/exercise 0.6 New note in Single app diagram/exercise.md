# 0.6 New note in Single page app diagram

## Request

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

## Solution

```mermaid

sequenceDiagram
    participant browser
    participant server
    
    note right of browser: Form on submit event
    note right of browser: Redraw notes with created element
    browser->>server: POST AJAX  https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    note left of server: Processing payload
    server-->>browser: {message: "note created"}
    deactivate server
   
   	
        
```