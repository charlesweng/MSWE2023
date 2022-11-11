Systems Used
============
Node Version: v16.17.1
Browser: Firefox 106.0
Operating System: macOS Monterey Version 12.5
Architecture: ARM-based

Typescript Features And Debug Typescript
========================================
List of typescript features I used:
1. classes
2. arrow functions
3. type definitions
4. any type declarations
5. interfaces

First, in tsconfig.json, you must enable `"sourceMap": true`. Then, use npm run build (webpack --mode=production --node-env=production) to check for any transpiled errors from typescript to javascript via webpack. Finally, set breakpoints in code and do some curl commands on the command line prompt to debug typescript code.

How to Test The Webserver
=========================
Run `cd server`
Run `npm install`
Run `npm run build`
Run `npm run start`
Run `cd ../client`
Run `npm install`
Run `npm start`
Click generate random book