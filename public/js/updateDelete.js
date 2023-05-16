// define variables for DOM elements we will need
var editButton = document.querySelector('#edit-post-button');
var deleteButton = document.querySelector('#delete-post-button');
var articleTitle = document.querySelector('#postTitle');
var articleContent = document.querySelector('p');
var commentsSection = document.querySelector('#comments-section');

// add event listener to edit button
editButton.addEventListener('click', function() {
  // create input fields and populate with existing title/contents
  var inputFields = `
  <div id="input-fields">
    <input class="articleTitleInput" type="text" name="title" value="${articleTitle.textContent}">
    <textarea name="contents">${articleContent.textContent}</textarea>
    <button id="save-button">Save</button>
    <button id="cancel-button">Cancel</button>
  </div>
  `;
  const articleTitleInput = document.querySelector('#articleTitleInput');
  // hide article content and comments, show input fields
  articleTitle.style.display = 'none';
  articleContent.style.display = 'none';
  commentsSection.style.display = 'none';
  articleTitle.insertAdjacentHTML('afterend', inputFields);

  // add event listeners to save/cancel buttons
  var saveButton = document.querySelector('#save-button');
  var cancelButton = document.querySelector('#cancel-button');
  
  saveButton.addEventListener('click', function() {
    // perform request to update post with new data
    // then reload page to see updated content
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
deleteButton.addEventListener('click', function() {
  // perform request to delete post
  // then redirect user to homepage (or some other appropriate location)
});
