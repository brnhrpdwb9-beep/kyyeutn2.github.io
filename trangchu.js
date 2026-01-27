
    document.addEventListener('DOMContentLoaded', () => {





        const slider = document.querySelector('.slider');
        const track = slider.querySelector('.slider-track');
        const slides = track.children;
        const flash = document.querySelector('.flash');
        
        let slideIndex = 0;
        let autoScrollInterval;
        
        const triggerFlash = () => {
            requestAnimationFrame(() => {
                flash.classList.add('on');
                setTimeout(() => flash.classList.remove('on'), 300);
            });
        };
        
        
        





        const goNext = () => {
    slideIndex = (slideIndex + 1) % slides.length;
    
    slider.scrollTo({
        left: slides[slideIndex].offsetLeft,
        behavior: 'smooth'
    });
    
    triggerFlash();
};
        
        
        setTimeout(() => {
            goNext();
            autoScrollInterval = setInterval(goNext, 3500);
        }, 2000);
        







        const train = document.getElementById('glass-train');
        const audio = document.getElementById('train-audio');
        const emitter = document.querySelector('.smoke-emitter');
        const phoenixContainer = document.getElementById('phoenix-container');
        

        const CONFIG = {
            DURATION: 45000,
            MAX_PETALS: 99, // hoa cùng lúc
            MAX_SMOKE: 10,
            PETAL_RATE: 550, // Tốc độ ra hoa
            SMOKE_RATE: 800 // Tốc độ  ra khói
        };
        
        let isRunning = false;
        let activePetals = 0;
        let activeSmoke = 0;
        
        train.addEventListener('click', () => {
            if (isRunning) return;
            isRunning = true;
            
      
            



            train.style.setProperty('--run-duration', `${CONFIG.DURATION}ms`);
            train.classList.add('is-running');
            




            handleAudioFadeIn();
            




            const smokeInt = setInterval(() => {
                if (activeSmoke < CONFIG.MAX_SMOKE) createSmoke();
            }, CONFIG.SMOKE_RATE);
            




            for (let i = 0; i < 5; i++) setTimeout(createPetal, i * 100);
            
            const petalInt = setInterval(() => {
                if (activePetals < CONFIG.MAX_PETALS) createPetal();
            }, CONFIG.PETAL_RATE);
            

            setTimeout(() => {
                clearInterval(smokeInt);
                clearInterval(petalInt);
                handleAudioFadeOut();

            }, CONFIG.DURATION);
            
            
            
        });
        





        function createPetal() {
            activePetals++;
            const petal = document.createElement('div');
            petal.className = 'phoenix-petal'; 
            
            
            const left = Math.random() * 100; 
            const scale = Math.random() * 0.5 + 0.5; 
            const duration = Math.random() * 5 + 8; // 8s - 13s
            const drift = (Math.random() - 0.5) * 200; // Gió thổi ngang
            





            petal.style.cssText = `
            left: ${left}vw;
            transform: scale(${scale}) rotate(${Math.random() * 360}deg);
            animation: floatDown ${duration}s linear forwards;
            --drift-x: ${drift}px;
        `;
            
            phoenixContainer.appendChild(petal);
            






            setTimeout(() => {
                if (petal.isConnected) {
                    petal.remove();
                    activePetals--;
                }
            }, duration * 1000 + 100); // Thêm 100ms buffer
        }
        








        function createSmoke() {
            activeSmoke++;
            const puff = document.createElement('div');
            puff.className = 'smoke-puff';
            
            const size = Math.random() * 10 + 15;
            const offset = (Math.random() - 0.5) * 10;
            
            puff.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${offset}px;
        `;
            
            emitter.appendChild(puff);
            
            setTimeout(() => {
                if (puff.isConnected) {
                    puff.remove();
                    activeSmoke--;
                }
            }, 3000);
        }
        






        function handleAudioFadeIn() {
            audio.currentTime = 0;
            audio.volume = 0;
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    let vol = 0;
                    const fadeIn = setInterval(() => {
                        if (vol < 0.9) {
                            vol += 0.05;
                            audio.volume = vol;
                        } else {
                            clearInterval(fadeIn);
                        }
                    }, 200);
                }).catch(() => {});
            }
        }
        
        function handleAudioFadeOut() {
            const fadeOut = setInterval(() => {
                if (audio.volume > 0.05) {
                    audio.volume -= 0.05;
                } else {
                    audio.pause();
                    clearInterval(fadeOut);
                }
            }, 200);
        }
    });
    
    
    



function fitBoxToScreen() {
    const box = document.querySelector('.box');
    if (!box) return;
    
    const vh = window.innerHeight;
    const rect = box.getBoundingClientRect();
    
    const padding = 40; // chừa khoảng thở
    const availableHeight = vh - padding;
    
    if (rect.height > availableHeight) {
        const scale = availableHeight / rect.height;
        box.style.transform = `scale(${scale})`;
    } else {
        box.style.transform = 'scale(1)';
    }
}

window.addEventListener('load', fitBoxToScreen);
window.addEventListener('resize', fitBoxToScreen);





    
    