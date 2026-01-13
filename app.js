// Prompt Library Application

// Get DOM elements
const promptForm = document.getElementById('promptForm');
const promptTitle = document.getElementById('promptTitle');
const promptContent = document.getElementById('promptContent');
const promptsList = document.getElementById('promptsList');

// Storage key for localStorage
const STORAGE_KEY = 'promptLibrary';

// Load prompts from localStorage
function loadPrompts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Save prompts to localStorage
function savePrompts(prompts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

// Display all prompts
function displayPrompts() {
    const prompts = loadPrompts();
    
    if (prompts.length === 0) {
        promptsList.innerHTML = `
            <div class="empty-state">
                <p>No prompts saved yet</p>
                <p>👆 Add your first prompt above</p>
            </div>
        `;
        return;
    }
    
    promptsList.innerHTML = prompts.map((prompt, index) => `
        <div class="prompt-card">
            <div class="prompt-header">
                <h3 class="prompt-title">${escapeHtml(prompt.title)}</h3>
                <button class="btn btn-delete" onclick="deletePrompt(${index})">Delete</button>
            </div>
            <p class="prompt-content">${escapeHtml(prompt.content)}</p>
        </div>
    `).join('');
}

// Add new prompt
function addPrompt(title, content) {
    const prompts = loadPrompts();
    const newPrompt = {
        id: Date.now(),
        title: title,
        content: content,
        createdAt: new Date().toISOString()
    };
    
    prompts.push(newPrompt);
    savePrompts(prompts);
    displayPrompts();
}

// Delete prompt
function deletePrompt(index) {
    const prompts = loadPrompts();
    prompts.splice(index, 1);
    savePrompts(prompts);
    displayPrompts();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle form submission
promptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = promptTitle.value.trim();
    const content = promptContent.value.trim();
    
    if (title && content) {
        addPrompt(title, content);
        promptTitle.value = '';
        promptContent.value = '';
        promptTitle.focus();
    }
});

// Initialize: Display prompts on page load
displayPrompts();
