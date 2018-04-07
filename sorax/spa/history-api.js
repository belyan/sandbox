var links, updatestate, contentEl, navEl, updatenav;

contentEl = document.querySelector('.content');
navEl = document.querySelector('.nav');

links = {
    main: 'This is the <strong>main</strong> page',
    about: 'This is the <strong>about</strong> page',
    downloads: 'This is the <strong>downloads</strong> page'
};

updatestate = function(state) {
    if (!state) return;

    contentEl.innerHTML = links[state.page];
    updatenav(state);
};

updatenav = function(state) {
    [].slice.call(navEl.querySelectorAll('a'))
        .forEach(function(el) {
            var classList = el.parentNode.classList;

            state.page == el.getAttribute('href')
            ? classList.add('active')
            : classList.remove('active');
        });
};

window.addEventListener('popstate', function(e) {
    updatestate(e.state);
});

navEl.addEventListener('click', function(e) {
    var state;
    if (e.target.tagName !== 'A') return;

    state = {
        page: e.target.getAttribute('href')
    };

    history.pushState(state, '', state.page);
    updatestate(state);

    e.preventDefault();
});
