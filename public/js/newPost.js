const newPostBtn = document.querySelector("#newPostBtn");
const postsSection = document.querySelector(".posts");
const newPostFormSection = document.querySelector(".new-post-form");
const cancelBtn = document.querySelector("#cancel");

newPostBtn.addEventListener("click", (e) => {
    e.preventDefault();
  // hide posts and show new post form
  postsSection.classList.add("hidden");
  newPostFormSection.classList.remove("hidden");
});

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
  // hide new post form and show posts
  newPostFormSection.classList.add("hidden");
  postsSection.classList.remove("hidden");
});

const newPostForm = document.querySelector("#new-post-form");
newPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const title = document.querySelector("#title").value;
  const contents = document.querySelector("#contents").value;
  const userIdInput = document.querySelector('input[name="user_id"]');
  const user_id = userIdInput.value;

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, contents, user_id })
    });
    
    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Failed to create post");
  }
});
