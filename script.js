const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x1e1e1e, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);




const geometry = new THREE.IcosahedronGeometry(15, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4ec9b0, wireframe: true, transparent: true, opacity: 0.15 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


const innerGeo = new THREE.IcosahedronGeometry(7, 2);
const innerMat = new THREE.MeshStandardMaterial({ color: 0x569cd6, roughness: 0.2, metalness: 0.8, flatShading: true });
const innerSphere = new THREE.Mesh(innerGeo, innerMat);
scene.add(innerSphere);


const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 80;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMat = new THREE.PointsMaterial({ size: 0.05, color: 0x4ec9b0, transparent: true, opacity: 0.6 });
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);


const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x569cd6, 2, 100);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xc586c0, 2, 100);
pointLight2.position.set(-20, -20, 10);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x4ec9b0, 1, 100);
pointLight3.position.set(0, -20, -10);
scene.add(pointLight3);


camera.position.z = 35;


let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});


const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    
    targetX = mouseX * 0.0005;
    targetY = mouseY * 0.0005;

    sphere.rotation.y += 0.3 * (targetX - sphere.rotation.y);
    sphere.rotation.x += 0.3 * (targetY - sphere.rotation.x);

    
    sphere.rotation.y += 0.001;
    innerSphere.rotation.y -= 0.003;
    innerSphere.rotation.x += 0.002;

    
    sphere.position.y = Math.sin(elapsedTime * 0.5) * 1.5;
    innerSphere.position.y = Math.sin(elapsedTime * 0.5) * 1.5;

   
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = mouseY * 0.0001;

    renderer.render(scene, camera);
}

animate();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


function unlockProfile() {
    document.body.classList.add('unlocked');
}


document.getElementById('password-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        unlockProfile();
    }
});


function toggleFaq(element) {
    const faqItem = element.parentElement;
    const wasActive = faqItem.classList.contains('active');
    

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    

    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


function downloadResume() {
    alert('Resume download would start here. Add your resume.pdf file to enable this feature.');
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('.section-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});
