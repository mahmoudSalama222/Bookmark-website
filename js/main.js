var siteName = document.getElementById('bookmarkName')
var siteURL = document.getElementById('bookmarkURL')

var bookmarklist = []
if (localStorage.getItem('list')) {
    bookmarklist = JSON.parse(localStorage.getItem('list'))
    display()
}


function getInputsValues() {
    var bookmark = {
        name: siteName.value,
        URL: siteURL.value
    }
    if (validationName() && validationURL()) {
        bookmarklist.push(bookmark)
        localStorage.setItem('list', JSON.stringify(bookmarklist))
        display()
    }
}

function display() {
    var searchInput = document.getElementById('searchInput');
    trs = ``
    for (var i = 0; i < bookmarklist.length; i++) {
        trs += `
        <tr>
        <td>${i+1}</td>
        <td>${bookmarklist[i].name}</td>
        <td><button class="btn btn-visit"><a class="text-decoration-none text-white" href="${bookmarklist[i].URL}"  target="_blank">visit</a></button></td>
        <td><button onclick="deleteweb(${i})"  class="btn btn-delete">Delete</button></td> 
      </tr>
        `
    }
    document.getElementById('tableContent').innerHTML = trs;
    if (searchInput.value != "") {
        search();
    }
}

function validationName() {
    var regex = /^[a-zA-Z]{2,9}$/;
    if (siteName.value == "") {
        document.getElementById('capitalLetter').style.display = "none";
        document.getElementById('word').style.display = "none";
        document.getElementById('nameSuccess').style.display = "none";
    } else if (/^[A-Z]/.test(siteName.value) && regex.test(siteName.value.slice(1))) {
        document.getElementById('capitalLetter').style.display = "none";
        document.getElementById('word').style.display = "none";
        document.getElementById('nameSuccess').style.display = "block";
        return true;
    } else {
        if (!/^[A-Z]/.test(siteName.value) && !regex.test(siteName.value.slice(1))) {
            document.getElementById('capitalLetter').style.display = "block";
            document.getElementById('word').style.display = "block";
        } else if (/^[A-Z]/.test(siteName.value)) {
            document.getElementById('capitalLetter').style.display = "none";
            document.getElementById('word').style.display = "block";
        } else if (regex.test(siteName.value.slice(1))) {
            document.getElementById('capitalLetter').style.display = "block";
            document.getElementById('word').style.display = "none";
        }
    }
}

function validationURL() {
    var regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (siteURL.value == "") {
        document.getElementById('urlAlert').style.display = "none";
        document.getElementById('urlSuccess').style.display = "none";
    } else if (regex.test(siteURL.value)) {
        document.getElementById('urlAlert').style.display = "none";
        document.getElementById('urlSuccess').style.display = "block";
        return true
    } else {
        document.getElementById('urlAlert').style.display = "block";
        document.getElementById('urlSuccess').style.display = "none";
    }
}

function deleteweb(i) {
    bookmarklist.splice(i, 1);
    localStorage.setItem('list', JSON.stringify(bookmarklist))

    display()
}

var searchInput = document.getElementById('searchInput');

function search() {

    trs = ``
    for (var i = 0; i < bookmarklist.length; i++) {

        if (bookmarklist[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {

            trs += `
    <tr>
    <td>${i+1}</td>
    <td>${bookmarklist[i].name.replace(searchInput.value,`<span class="text-bg-warning">${searchInput.value}</span>`)}</td>
    <td><button class="btn btn-visit"><a class="text-decoration-none text-white" href="${bookmarklist[i].URL}"  target="_blank">visit</a></button></td>
    <td><button onclick="deleteweb(${i})"  class="btn btn-delete">Delete</button></td> 
  </tr>
    `
        }
    }
    document.getElementById('tableContent').innerHTML = trs;
}