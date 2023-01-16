# Notes

## Hijacker
I set up Hijacker to work with this project to easily edit the mocks easily without modifying the exisiting ones. It will proxy to the routes if no matching rules are enabled.

To run everything with hijacker use the following command:
`npm run dev`

This will spin the existing mocks up on port 3002, the hijacker api on 3001, with the hijacker frontend on 3003. The port for the assignment frontend remains 3000.