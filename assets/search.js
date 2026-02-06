document.addEventListener('DOMContentLoaded', () => {
    // Hardcoded index of blog posts
    const posts = [
        {
            title: "The Freedom Within the Shell",
            url: "index.html",
            date: "January 11, 2025"
        },
        {
            title: "Beginner-Friendly Linux Distros",
            url: "blog.html#distros",
            date: "Jan 25, 2025"
        },
        {
            title: "Git Guide",
            url: "blog.html#git-guide",
            date: "Feb 19, 2025"
        },
        {
            title: "Rust Data Types",
            url: "blog.html#rust",
            date: "Apr 13, 2025"
        },
        {
            title: "Algorithms",
            url: "blog.html#algorithms",
            date: "Jun 26, 2025"
        }
    ];

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const filteredPosts = posts.filter(post => 
                post.title.toLowerCase().includes(query)
            );

            if (filteredPosts.length > 0) {
                searchResults.innerHTML = filteredPosts.map(post => `
                    <div class="search-result-item">
                        <a href="${post.url}">
                            <h4>${post.title}</h4>
                            <small>${post.date}</small>
                        </a>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="search-result-item"><span style="padding: 10px; color: var(--text-muted);">No results found</span></div>';
                searchResults.style.display = 'block';
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
});
