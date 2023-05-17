const editButton = document.querySelector('#edit-post-button');
const deleteButton = document.querySelector('#delete-post-button');
const articleTitle = document.querySelector('#postTitle');
const articleContent = document.querySelector('p');
const commentsSection = document.querySelector('#comments-section');

editButton.addEventListener('click', function() {
  const inputFields = `
    <div id="input-fields">
      <input class="articleTitleInput" type="text" name="title" value="${articleTitle.textContent}">
      <textarea name="contents">${articleContent.textContent}</textarea>
      <button id="save-button">Save</button>
      <button id="cancel-button">Cancel</button>
    </div>
  `;
  const articleTitleInput = document.querySelector('.articleTitleInput');
  // hide article content and comments, show input fields
  articleTitle.style.display = 'none';
  articleContent.style.display = 'none';
  commentsSection.style.display = 'none';
  articleTitle.insertAdjacentHTML('afterend', inputFields);

  // add event listeners to save/cancel buttons
  const saveButton = document.querySelector('#save-button');
  const cancelButton = document.querySelector('#cancel-button');

  saveButton.addEventListener('click', async function() {
    const newArticleTitle = document.querySelector('.articleTitleInput').value;
    const newArticleContent = document.querySelector('textarea').value;
    const postIdInput = document.querySelector('input[name="post_id"]');
    const post_id = postIdInput.value;
    console.log(post_id);

    try {
      await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: newArticleTitle,
          contents: newArticleContent
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  });

  cancelButton.addEventListener('click', function() {
    const inputFieldsDiv = cancelButton.closest('#input-fields');
    articleTitle.style.display = 'block';
    inputFieldsDiv.remove();
    articleContent.style.display = 'block';
    commentsSection.style.display = 'block';
  });
});

// add event listener to delete button
deleteButton.addEventListener('click', async function() {
    const userIdInput = document.querySelector('input[name="user_id"]');
    const postIdInput = document.querySelector('input[name="post_id"]');
    const user_id = userIdInput.value;
    const post_id = postIdInput.value;

  try {
    await fetch(`/api/posts/${post_id}`, { method: 'DELETE' });
    window.location.href = `/dashboard/${user_id}`;
  } catch (error) {
    console.error(error);
  }
});
