const postsContainer = document.getElementById('posts-container');

const loading = document.querySelector('.loader');

const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts() {
    // const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`);

    const res = await fetch(`https://type.fit/api/quotes`)

    const data = await res.json();

    return data;
}

async function showPosts() {
    const posts = await getPosts();
    // console.log(posts);
    let i = 1;
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${i++}</div>
        <div class="post-info">
            <h2 class="post-title">${post.author}</h2>
            <p class="post-body">${post.text}</p>
        </div>
        `;
        // console.log(postsContainer.innerText);
        postsContainer.appendChild(postEl);
    });
}

function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);

    }, 1000)
}

function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    console.log(term);
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        // console.log(title);
        // console.log(body);

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);