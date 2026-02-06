document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');

    // Load comments from localStorage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('blog_comments')) || [];
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            renderComment(comment);
        });
    }

    // Render a single comment
    function renderComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <h4>${escapeHtml(comment.name)} <small>${comment.date}</small></h4>
            <p>${escapeHtml(comment.text)}</p>
        `;
        // Prepend to show newest comments at the top (if iterating normal order) -> wait
        // If we save via push (append), array is [old, ..., new].
        // If we want newest at top, we should iterate in reverse or prepend.
        // If we prepend while iterating [old, new], first OLD is prepended, then NEW is prepended ABOVE old.
        // So container: [NEW] [OLD]. Correct.
        commentsContainer.prepend(commentElement); 
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Handle form submission
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const text = textInput.value.trim();

            if (name && text) {
                const newComment = {
                    name: name,
                    text: text,
                    date: new Date().toLocaleDateString()
                };

                // Save to localStorage
                const comments = JSON.parse(localStorage.getItem('blog_comments')) || [];
                comments.push(newComment);
                localStorage.setItem('blog_comments', JSON.stringify(comments));

                // Render and clear form
                renderComment(newComment);
                nameInput.value = '';
                textInput.value = '';
            }
        });
    }

    loadComments();
});
