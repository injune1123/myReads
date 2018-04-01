 # MyReads 
 ![sample bookcover](https://raw.githubusercontent.com/injune1123/myReads/master/src/img/book_cover_readme.jpg)

It is a simple website that records users' reads. Users can see books they are currently reading, have read, and want to read on different shelves, and also search books to add to the shelves.

There are two pages on this website: a homepage and a search page.

The homepage contains three shelves: The top shelf called "Currently Reading" displays the books that users are currently reading as the name suggests; the second one named "Want to Read" shows the ones that users want to read, and the third one ,"Read", has books that users have already read. To move books around, click on the arrow on a book and select from "Currently Reading", "Want to Read", "Read", and "None". If you select "None", the book will be removed from all the shelves. 

The search page allows uses to search books and add them to shelves. The serach bar sits on the top of the page. Search results appears under the search bar. After typing in the search bar, the book that you are looking for will appear. If you want to add that book onto a certian shelf, click on the arrow on it and select from "Currently Reading", "Want to Read", "Read". 

If you are at the homepage, click on the Add button on the right bottom of homepage will lead you to the search page. If you are on the search page, click on the left arrow on the left of the search bar will lead you back to the homepage. The browsers back button also works.


## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Tech Stack
Frontend:
- react
- react-dom
- react-router-dom
...(the whole dependency library be seen in the package.json file)

Backend:
This project does NOT have a backend right now, it's data is from google books API

## To Run it
1. clone this repo onto your local computer
2. make sure your node version is >= v8.9.0 
  - If you don't have node installed, download it. Nvm is recommended too for managing node versions
  - Click [here](https://github.com/creationix/nvm) to download nvm
  - After installing nvm, type `$nvm ls-remote` in the terminal
  - download the latest version using `$nvm install {the newest version}`
  - use that node version
  ([Here](https://davidwalsh.name/nvm) is  David Walsh's blog about "Managing Node.js Versions with nvm")
3. run npm install, your app should be running on http://localhost:3000/
4. open your browser and type `http://localhost:3000/` to view it

## Contribution
Feel free to open an issue, if you have found any bugs. Pull requests that adds new functionalities are also welcomed. 

### references
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
It is a project from the React Nano Degree on [Udacity](https://classroom.udacity.com/nanodegrees/nd019).

