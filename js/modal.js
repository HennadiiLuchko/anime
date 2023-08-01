const modal = () => {
    const modal = document.querySelector('.search-model');
    const modalBtn = document.querySelector('.icon_search');
    const modalClose = modal.querySelector('.search-close-switch');
    const searchInput = modal.querySelector('#search-input');
    const wrapper = document.querySelector('.search-model-result');

    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '500px';

    const debounce = (func, ms = 500) => {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {func.apply(this, args)}, ms)
        }
    }

    const searchDebounce = debounce((searchString) => {
        searchFunc(searchString)
    }, 800)

    const renderFunc = (items) => {
        wrapper.innerHTML = '';

        items.forEach(item => {
            wrapper.insertAdjacentHTML('afterbegin', `
                <a class="pt-2" href="/anime-details.html" terget="_blank">${item.title}</a>
            `)
        })
    }

    const searchFunc = (searchStr) => {
        fetch('./db.json')
        .then((responce) => {
            return responce.json()
        })
        .then((data) => {
          const filteredData = data.anime.filter(dataItem => {
            console.log(dataItem)
            return dataItem.title.toLowerCase().includes(searchStr) || dataItem.description.toLowerCase().includes(searchStr);
           });

           renderFunc(filteredData.slice(0, 5));
        })

    }

    modalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        wrapper.innerHTML = '';
        searchInput.value = '';
    });

    searchInput.addEventListener('input', (event) => {
        searchDebounce(event.target.value)
    });
}

modal()

