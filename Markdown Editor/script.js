const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// Default Markdown Content
const defaultContent = `# Hello, Creator! 👋

This is your new **Markdown Editor**. It is designed to be clean, fast, and secure.

## Features
1. **Live Preview**: Type on the left, see it on the right.
2. **Auto-Sanitization**: Prevents XSS attacks.
3. **Download**: Save your work as a \`.md\` file easily.

### Code Example
\`\`\`javascript
const sayHello = () => {
    console.log("Welcome to MarkLive!");
}
\`\`\`

> "Design is not just what it looks like and feels like. Design is how it works."

| Item | Status |
|---|---|
| Visuals | Polished |
| Logic | Optimized |
`;

// --- Core Logic ---

// 1. Render Markdown
function updatePreview() {
    const rawMarkdown = editor.value;
    // Parse Markdown -> HTML
    const parsedHtml = marked.parse(rawMarkdown);
    // Sanitize HTML (Security)
    const cleanHtml = DOMPurify.sanitize(parsedHtml);
    preview.innerHTML = cleanHtml;
}

// 2. Event Listener (Update on Type)
editor.addEventListener('input', updatePreview);

// 3. Initialize
editor.value = defaultContent;
updatePreview();

// --- Button Actions ---

// A. Copy HTML to Clipboard
function copyHtml() {
    const html = preview.innerHTML;
    navigator.clipboard.writeText(html).then(() => {
        const btn = document.querySelector('.btn i.fa-code');
        const originalClass = btn.className;

        // Visual feedback
        btn.className = 'fa-solid fa-check';
        setTimeout(() => {
            btn.className = originalClass;
        }, 1500);
    });
}

// B. Download Markdown File (New Feature)
function downloadMarkdown() {
    // 1. Get content
    const markdownContent = editor.value;

    // 2. Create a Blob (Binary Large Object)
    const blob = new Blob([markdownContent], { type: 'text/markdown' });

    // 3. Create a temporary link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    // 4. Set download attributes
    a.href = url;
    a.download = 'document.md'; // Default filename

    // 5. Trigger download and cleanup
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}