// --- Overlay & Video Logic ---
const overlay = document.getElementById('overlay');
const video = document.getElementById('vid');

if(overlay && video) {
    overlay.addEventListener('click', () => {
        overlay.classList.add('hidden');
        
        video.muted = false;
        let playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                video.muted = true;
                video.play();
            });
        }

        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300); 
    });
}

// --- Smooth 3D Parallax Logic ---
const wrapper = document.getElementById('wrapper');

if(wrapper) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const xAxis = (e.clientX / windowWidth - 0.5) * 2;
        const yAxis = (e.clientY / windowHeight - 0.5) * 2;
        
        const maxRotateX = 15;
        const maxRotateY = 15;
        
        targetX = -yAxis * maxRotateX; 
        targetY = xAxis * maxRotateY;  
    });

    function updateParallax() {
        const ease = 0.08;
        
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;
        
        wrapper.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        
        requestAnimationFrame(updateParallax);
    }

    updateParallax();
    
    document.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });
}

// ==========================================
// --- BẢO VỆ CHỐNG DEBUG (ANTI-DEBUGGING) ---
// ==========================================

// 1. Vô hiệu hóa chuột phải (ngăn Inspect Element / Save As)
document.addEventListener('contextmenu', event => event.preventDefault());

// 2. Vô hiệu hóa các phím tắt mở DevTools
document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I (Mở DevTools)
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.keyCode === 73)) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+J (Mở Console)
    if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j" || e.keyCode === 74)) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U (Xem mã nguồn)
    if (e.ctrlKey && (e.key === "U" || e.key === "u" || e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }
});

// 3. Vòng lặp debugger vô tận (Gây treo DevTools nếu cố tình bật lên)
// Khi bật F12, script này sẽ liên tục kích hoạt breakpoint làm web bị khựng và cản trở soi code.
setInterval(function () {
    (function (a) {
        return (function (a) {
            return (Function('Function(arguments[0]+"' + a + '")()'))
        })(a)
    })('bugger')('de');
}, 50);