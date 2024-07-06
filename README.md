# zealthy-takehome

## Task
The coding exercise is to create a basic “help desk” / support system ticket management
system.

## Requirements
1. End User Requirements [ ]
    - main page of the app, end users of the service should be able to submit support ticket [ ]
    - fields include name, email and a description of the problem they are experiencing [ ]
2. Support Staff [ ]
    - should be able to see a list summary of each ticket [ ]
    - respond to a request [ ]
    - update the status of the ticket (“new”, “in progress”, and “resolved”) [ ]
3. Logging [ ]
    - Log info “Would normally send email here with body: ...” [ ]

## Tech Used
- FrontEnd
    - ReactJS
    - Sass
- Backend
    - FastAPI
- DB
    - Supabase/Firebase

## Todo
1. Create user submission page [ ]
    - Title: Help Desk [ ]
    - Form Card [ ]
        - Title = Submit A Ticket
        - user - Validate len > 0
        - email - validate len > 0 and valid email address
        - description - validate len > 0.  Allow for links to be submitted and click able
        - submit button => create help desk ticket => debounce submission ticket => No spamming
2. Create staff ticket list page [ ]
    - Title: Staff Queue [ ]
    - Cards => Tickets [ ]
        - Small with User, email and ellipses the description
        - Clicking opens up a modal with all details as well as a way to comment on the ticket
        - Dropdown to change the ticket status
        - Optional
            - History of the conversation
            - Drag the cards to their columns to update status
    - Ticket Columns [ ] 
        - Section: New Ticket [ ]
        - Section: In Progress [ ]
        - Section: Resolved [ ]
3. Setup DB with tables [✔]
    - Tables
        - Tickets [✔]
            - Id, user, email, description, status, create, timestamp
        - Optional
            - User
                - Id, name, email
            - Comments => Link to tickets table M:1
                - Id, FK-ticket, comment
4. Create Help Desk Management API [ ]
    - /tickets - GET All [ ]
    - /ticket/:id - GET :id [ ]
    - /ticket/ - POST [ ]
    - /ticket/:id/changeStatus - PUT :id [ ]
    - /ticket/:id/sendComment - POST :id [ ]
5. Deploy to Vercel [ ]
    -

## Demo
