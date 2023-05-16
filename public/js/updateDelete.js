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
    const newArticleTitle = articleTitleInput.value;
    const newArticleContent = document.querySelector('textarea').value;
    const postId = editButton.dataset.postId;

    try {
      await fetch(`/api/posts/${postId}`, {
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
  const postId = deleteButton.dataset.postId;

  try {
    await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    window.location.href = '/';
  } catch (error) {
    console.error(error);
  }
});
