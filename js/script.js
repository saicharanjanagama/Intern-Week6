const blogFrom = document.getElementById('blogForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const blogIdInput = document.getElementById('blogId');
const blogsContainer = document.getElementById('blogsContainer');

let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
console.log("✅ Loaded blogs from localStorage:", blogs); // 1 when you click on save blogs it renders then it loades to localstorage

function saveBlogs() {
    localStorage.setItem('blogs', JSON.stringify(blogs));
    console.log("💾 Blogs saved to localStorage:", blogs); // this saves the blogs 
}

function renderBlogs() {
    blogsContainer.innerHTML = '';

    if (blogs.length === 0) {
        blogsContainer.innerHTML = `<p style="text-align:center;color:#777;">No blogs added yet.</p>`;
        console.log("ℹ️ No blogs to display."); // 2 shows no blogs to show
        return;
    }

    blogs.forEach(blog => {
        console.log("📝 Rendering blog:", blog); // 4 it renders the blog that are stored in blogs
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog-card');

        blogDiv.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>

            <div class="blog-actions">
                <button class="btn edit-btn" onclick="editBlog('${blog.id}')">Edit</button>
                <button class="btn delete-btn" onclick="deleteBlog('${blog.id}')">Delete</button>
            </div>
        `;

        blogsContainer.appendChild(blogDiv);
    });
}

blogFrom.addEventListener('submit', e => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const id = blogIdInput.value;

    if (!title || !content) {
        console.warn("⚠️ Title or content is empty. Blog not saved.");
        return;
    }

    if (id) {
        blogs = blogs.map(blog => 
            blog.id === id ? { ...blog, title, content } : blog
        );
        console.log(`✏️ Blog with ID ${id} updated:`, { title, content }); // 6 when you updated and stores in localstorage then it renders angain
    } else {
        const newBlog = {
            id: Date.now().toString(),
            title,
            content
        }
        blogs.push(newBlog);
        console.log("➕ New blog added:", newBlog); // 3 it pushes the newBlog to localstorage
    }

    blogFrom.reset();
    blogIdInput.value = '';
    saveBlogs();
    renderBlogs();
});

function editBlog(id) {
    const blog = blogs.find(blog => blog.id === id);
    if (!blog) {
        console.error(`❌ Blog with ID ${id} not found for editing.`);
        return;
    }

    titleInput.value = blog.title;
    contentInput.value = blog.content;
    blogIdInput.value = blog.id;

    console.log(`✏️ Editing blog with ID ${id}:`, blog); // 5 when u click on edit
}

function deleteBlog(id) {
    if (!confirm("Are you sure you want to delete this blog?")) {
        console.log("🚫 Deletion canceled for blog ID:", id); // when u want to delete or cancle
        return;
    }

    blogs = blogs.filter(blog => blog.id !== id);
    saveBlogs();
    renderBlogs();

    console.log(`🗑️ Blog with ID ${id} deleted.`); // after deleted
}

renderBlogs();

