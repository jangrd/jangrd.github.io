let tabs = document.getElementsByClassName('tab-link');
let contents = document.getElementsByClassName('content');

function changeTab(event, tab) {
    for (item of tabs) {
        item.classList.remove('active');
    }
    for (item of contents) {
        item.classList.remove('active');
    }
    event.currentTarget.classList.add('active');
    document.getElementById(tab).classList.add('active');
}