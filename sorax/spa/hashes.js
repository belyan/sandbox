var links, updatestate, contentEl, navEl, updatenav;

contentEl = document.querySelector('.content');
navEl = document.querySelector('.nav');

links = {
    main: 'This is the <strong>main</strong> page',
    about: 'This is the <strong>about</strong> page',
    downloads: 'This is the <strong>downloads</strong> page'
};

updatestate = function() {
    var content = links[location.hash.slice(1)];
    contentEl.innerHTML = content || 'Page not found';

    updatenav();
};

updatenav = function() {
    [].slice.call(navEl.querySelectorAll('a')).forEach(function(link) {
        var classList = link.parentNode.classList;

        link.getAttribute('href') == location.hash
        ? classList.add('active')
        : classList.remove('active');
    });
};

window.addEventListener('hashchange', updatestate);
window.addEventListener('load', updatestate);
