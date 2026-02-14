// script.js
// Tab Switching
function switchTab(tabName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.background = type === 'success' ? '#28a745' : '#dc3545';
    notification.style.color = 'white';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Get Code Feature
async function fetchWebsiteCode() {
    const url = document.getElementById('websiteUrl').value;
    
    if (!url) {
        showNotification('Masukkan URL dulu tolol!', 'error');
        return;
    }
    
    showNotification('Mengambil code...', 'success');
    
    try {
        // Using cors-anywhere demo
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(url));
        const html = await response.text();
        
        // Parse HTML untuk extract CSS & JS
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Get CSS
        let css = '';
        const styles = doc.querySelectorAll('style');
        styles.forEach(style => {
            css += style.innerHTML + '\n';
        });
        
        // Get JS
        let js = '';
        const scripts = doc.querySelectorAll('script:not([src])');
        scripts.forEach(script => {
            js += script.innerHTML + '\n';
        });
        
        // Display results
        document.getElementById('htmlCode').querySelector('code').textContent = html;
        document.getElementById('cssCode').querySelector('code').textContent = css || '// No inline CSS found';
        document.getElementById('jsCode').querySelector('code').textContent = js || '// No inline JS found';
        
        document.getElementById('codeResult').style.display = 'block';
        showNotification('Code berhasil diambil! 😈');
        
    } catch (error) {
        showNotification('Gagal mengambil code: ' + error.message, 'error');
    }
}

// Copy Code
function copyCode() {
    const activeCode = document.querySelector('.code-block.active code');
    navigator.clipboard.writeText(activeCode.textContent);
    showNotification('Code copied to clipboard!');
}

// Show different code types
function showCode(type) {
    document.querySelectorAll('.code-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.code-block').forEach(block => block.classList.remove('active'));
    document.getElementById(type + 'Code').classList.add('active');
}

// YouTube to MP3
async function convertYoutubeToMp3() {
    const url = document.getElementById('youtubeUrl').value;
    
    if (!url) {
        showNotification('Masukkan URL YouTube!', 'error');
        return;
    }
    
    showNotification('Processing...', 'success');
    
    // Simulasi API call
    setTimeout(() => {
        document.getElementById('youtubeThumb').src = 'https://img.youtube.com/vi/' + extractVideoId(url) + '/maxresdefault.jpg';
        document.getElementById('youtubeTitle').textContent = 'Sample YouTube Video';
        document.getElementById('youtubeDuration').textContent = 'Duration: 3:45';
        document.getElementById('youtubeResult').style.display = 'block';
        showNotification('Ready to download!');
    }, 2000);
}

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : 'dQw4w9WgXcQ';
}

function downloadYoutubeMp3() {
    showNotification('Download started! Check your downloads folder.');
}

// TikTok Downloader
async function downloadTikTok(type) {
    const url = document.getElementById('tiktokUrl').value;
    
    if (!url) {
        showNotification('Masukkan URL TikTok!', 'error');
        return;
    }
    
    showNotification(`Downloading TikTok ${type.toUpperCase()}...`);
    
    // Simulasi hasil
    setTimeout(() => {
        if (type === 'mp4') {
            document.getElementById('tiktokVideo').style.display = 'block';
            document.getElementById('tiktokAudio').style.display = 'none';
            document.getElementById('tiktokVideo').src = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
        } else {
            document.getElementById('tiktokAudio').style.display = 'block';
            document.getElementById('tiktokVideo').style.display = 'none';
            document.getElementById('tiktokAudio').src = 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3';
        }
        
        document.getElementById('tiktokTitle').textContent = 'TikTok Video Title';
        document.getElementById('tiktokAuthor').textContent = '@username';
        document.getElementById('tiktokResult').style.display = 'block';
        
        showNotification('Success!');
    }, 2000);
}

// Upload MP3 (like top4top)
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
});

function handleFileUpload(file) {
    if (!file.name.endsWith('.mp3')) {
        showNotification('File harus MP3 kontol!', 'error');
        return;
    }
    
    showNotification('Uploading...');
    
    // Simulasi upload
    setTimeout(() => {
        const fakeLink = 'https://files.othub.com/' + Date.now() + '/' + file.name;
        document.getElementById('downloadLink').value = fakeLink;
        document.getElementById('fileSize').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
        document.getElementById('uploadResult').style.display = 'block';
        showNotification('Upload sukses! Link generated 😈');
    }, 2000);
}

function copyLink() {
    const link = document.getElementById('downloadLink');
    link.select();
    navigator.clipboard.writeText(link.value);
    showNotification('Link copied!');
}

// Initialize
window.onload = function() {
    console.log('Tools Get Code - Powered By Aliftzycrt 😍');
};
