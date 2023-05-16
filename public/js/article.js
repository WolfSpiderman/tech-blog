const addCommentButton = document.getElementById('add-comment-button');
const newCommentForm = document.getElementById('new-comment-form');
const addCommentForm = document.getElementById('add-comment-form');

addCommentButton.addEventListener('click', () => {
    addCommentButton.style.display = 'none';
    newCommentForm.style.display = 'block'; 
});

addCommentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const commentContents = document.getElementById('comment-contents').value;
    const userIdInput = document.querySelector('input[name="user_id"]');
    const postIdInput = document.querySelector('input[name="post_id"]');
    const user_id = userIdInput.value;
    const post_id = postIdInput.value;
    console.log('comment: ', commentContents, '. user: ', user_id, '. post: ', post_id);
    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              contents: commentContents,
              user_id,
              post_id
            })
          });
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        window.location.reload();
    } catch (error) {
        console.error(error);
        alert('Failed to add comment');
    }
});
