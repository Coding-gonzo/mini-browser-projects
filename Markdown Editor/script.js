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

const markdownCheatSheet = `# Markdown Cheat Sheet

This editor starts with a practical Markdown example so you can see what the preview supports right away.

---

## Headings

# Heading 1
## Heading 2
### Heading 3

## Text Formatting

This is **bold**, this is *italic*, this is ***bold italic***, and this is ~~strikethrough~~.

You can also write inline code like \`const message = "Hello Markdown";\`.

## Paragraphs and Line Breaks

Markdown uses normal paragraphs separated by a blank line.

If you want a manual line break, add two spaces at the end of a line.  
This line starts right below the previous one.

## Blockquotes

> Markdown is great for notes, docs, READMEs, and quick content editing.
>
> Blockquotes can also span multiple lines.

## Lists

### Unordered List

- HTML
- CSS
- JavaScript
  - DOM events
  - Fetch API
  - Local storage

### Ordered List

1. Open the editor
2. Type Markdown
3. Check the live preview
4. Download your \`.md\` file

### Task List

- [x] Write content
- [x] Preview formatting
- [ ] Export final version

## Links

[Git](https://github.com/Coding-gonzo/mini-browser-projects)

You can also create links with readable labels inside your documentation.

## Images

![Placeholder image](https://picsum.photos/900/260)

## Horizontal Rule

---

## Code Blocks

\`\`\`javascript
function formatMarkdown(text) {
    return text.trim().toUpperCase();
}

console.log(formatMarkdown("  hello world  "));
\`\`\`

\`\`\`html
<section class="card">
    <h2>Preview Panel</h2>
    <p>Rendered from Markdown</p>
</section>
\`\`\`

## Table

| Feature | Example | Supported |
| --- | --- | --- |
| Bold | \`**text**\` | Yes |
| Italic | \`*text*\` | Yes |
| Table | \`| col | col |\` | Yes |
| Code Block | \`\`\`js\`\`\` | Yes |

## Mixed Example

### Release Notes

- Version: **1.0.0**
- Status: *Preview ready*
- Tags: \`markdown\`, \`editor\`, \`live-preview\`

> Tip: Use Markdown when you want clean source text that still renders nicely.

## Escaping Characters

Use a backslash to escape Markdown syntax when needed:

- \\*not italic\\*
- \\# not a heading
- \\[not a link\\](#)

## Inline HTML

<kbd>Ctrl</kbd> + <kbd>S</kbd> can be written directly with HTML when Markdown alone is not enough.
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
editor.value = markdownCheatSheet;
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
