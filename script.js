function initSidebar() {
    const logoBtn = document.getElementById('logoBtn');
    const sidebar = document.getElementById('mySidebar');
    const main = document.getElementById('main');
    let sidebarOpen = false;

    logoBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebarOpen = !sidebarOpen;
        sidebar.style.width = sidebarOpen ? '250px' : '0';
        main.style.marginLeft = sidebarOpen ? '250px' : '0';
    });

    document.addEventListener('click', function() {
        if (sidebarOpen) {
            sidebar.style.width = '0';
            main.style.marginLeft = '0';
            sidebarOpen = false;
        }
    });

    sidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

function initChat() {
    const phoneBtn = document.getElementById('phoneBtn');
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    let chatOpen = false;

    phoneBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        chatOpen = !chatOpen;
        
        if (chatOpen) {
            chatContainer.style.display = 'flex';
            setTimeout(() => {
                chatContainer.classList.add('show');
            }, 10);
        } else {
            chatContainer.classList.remove('show');
            setTimeout(() => {
                chatContainer.style.display = 'none';
            }, 500);
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
}

function initHeader() {
    const header = document.querySelector('.headerFlexBox');
    const mainContent = document.querySelector('.main-content');
    
    if (!header || !mainContent) return;
    
    mainContent.style.paddingTop = header.offsetHeight + 'px';
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('small');
        } else {
            header.classList.remove('small');
        }
    });
    
    window.addEventListener('resize', function() {
        mainContent.style.paddingTop = header.offsetHeight + 'px';
    });
}

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            question.classList.toggle('active');
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                answer.style.maxHeight = '0';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function showPrivacyPolicy() {
    document.getElementById('privacyModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
    document.getElementById('privacyModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function initVideo() {
    const video = document.querySelector('video');

    if (video) {
        video.play().catch(e => console.log("Автовоспроизведение отключено:", e));
    }
}
function showProductModal(title, image, price, delivery, material, description) {
    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('.modal-content');
    
    const productId = Math.floor(Math.random() * 1000000);
    modalContent.dataset.productId = productId;
    
    document.getElementById('modalProductTitle').textContent = title;
    document.getElementById('modalProductImage').src = image;
    document.getElementById('modalProductPrice').textContent = price;
    document.getElementById('modalProductDelivery').textContent = delivery;
    document.getElementById('modalProductMaterial').textContent = material;
    document.getElementById('modalProductDescription').textContent = description;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initChat();
    initHeader();
    initFAQ();
    initVideo();
    

    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            window.location.href = 'cabinet-personal.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                e.preventDefault();
                alert('Vă rugăm să completați toate câmpurile!');
            }
        });
    }
});

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeProductModal();
    }
    
    if (event.target == document.getElementById('privacyModal')) {
        closePrivacyModal();
    }
}




let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    updateCart();
    saveCartToCookies();
    showCartNotification(product.title);
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToCookies();
}
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0);
        cartTotal.textContent = `${total} MDL`;
    }
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.price} MDL x ${item.quantity}</p>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
}

function saveCartToCookies() {
    const cartData = JSON.stringify(cart);
    document.cookie = `cart=${cartData}; path=/; max-age=${60*60*24*7}; SameSite=Lax`;
}

function loadCartFromCookies() {
    const cookies = document.cookie.split('; ');
    const cartCookie = cookies.find(cookie => cookie.startsWith('cart='));
    
    if (cartCookie) {
        try {
            const cartData = cartCookie.split('=')[1];
            cart = JSON.parse(cartData) || [];
            updateCart();
        } catch (e) {
            console.error('Error parsing cart cookie', e);
            cart = [];
        }
    }
}

function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <p>${productName} добавлен в корзину!</p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function toggleCart() {
    const cartDropdown = document.getElementById('cartDropdown');
    if (cartDropdown) {
        cartDropdown.classList.toggle('show');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadCartFromCookies();
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.modal-content button')) {
            const modal = e.target.closest('.product-modal');
            if (modal) {
                const modalContent = modal.querySelector('.modal-content');
                const product = {
                    id: parseInt(modalContent.dataset.productId),
                    title: modalContent.querySelector('#modalProductTitle').textContent,
                    price: modalContent.querySelector('#modalProductPrice').textContent.split(' ')[0],
                    image: modalContent.querySelector('#modalProductImage').src
                };
                addToCart(product);
                closeProductModal();
            }
        }
        
        if (e.target.closest('.remove-item-btn')) {
            const button = e.target.closest('.remove-item-btn');
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });
});