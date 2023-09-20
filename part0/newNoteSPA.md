# New note in Single page app

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST {content:..., date:...} to https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    activate server
    server-->>browser: HTTP code: 201 created
    deactivate server

Note left of server: The server doesn't make the browser do any GET requests

Note right of browser: The browser instead use the javascript code to handle the form submit (create a new note, adds it to note list, rerenders the page, sends the new note to the server)
    
```
