// Phần xử lý thanh toán
document.getElementById('product1').addEventListener('click', () => submitForm(5000, 'Sản phẩm 1'));
document.getElementById('product2').addEventListener('click', () => submitForm(10000, 'Sản phẩm 2'));

async function submitForm(amount, description) {
    const response = await fetch('/create_payment_link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, description })
    });

    const payment = await response.json();
    if (payment.checkoutUrl) {
        window.open(payment.checkoutUrl);
    } else {
        alert("Lỗi khi tạo liên kết thanh toán: " + (payment.error || "Không rõ lỗi"));
    }
}

// Phần xử lý hiển thị các phần tử khi cuộn
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scroll-section');

    const revealSections = () => {
        const triggerBottom = window.innerHeight * 0.8;

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    };

    revealSections();
    window.addEventListener("scroll", revealSections);
});

// Phần xử lý modal gói dịch vụ
function showPackageDetails(packageType) {
    const modal = document.getElementById('packageModal');
    const details = document.getElementById('packageDetails');

    if (packageType === 'basic') {
        details.innerHTML = `
            <h3>Gói Cơ Bản</h3>
            <p>Số buổi tư vấn trong tháng: 2 buổi</p>
            <p>Giá:</p>
            <ul>
                <li>1 tháng: $99</li>
                <li>2 tháng: $195</li>
                <li>3 tháng: $285</li>
            </ul>
            <p>Phương thức thanh toán: Thẻ tín dụng hoặc chuyển khoản ngân hàng</p>
            <h4>Đăng nhập nếu là thành viên hoặc đăng ký nếu chưa có tài khoản</h4>
            <form>
                <input type="text" placeholder="Tên" required>
                <input type="email" placeholder="Email" required>
                <button type="submit">Đăng ký</button>
            </form>
        `;
    } else if (packageType === 'premium') {
        details.innerHTML = `
            <h3>Gói Cao Cấp</h3>
            <p>Tư vấn không giới hạn và hỗ trợ cá nhân hóa.</p>
            <p>Giá:</p>
            <ul>
                <li>1 tháng: $199</li>
                <li>2 tháng: $390</li>
                <li>3 tháng: $570</li>
            </ul>
            <p>Phương thức thanh toán: Thẻ tín dụng hoặc chuyển khoản ngân hàng</p>
            <h4>Đăng nhập nếu là thành viên hoặc đăng ký nếu chưa có tài khoản</h4>
            <form>
                <input type="text" placeholder="Tên" required>
                <input type="email" placeholder="Email" required>
                <button type="submit">Đăng ký</button>
            </form>
        `;
    }

    modal.style.display = "flex";
}

// Hàm đóng modal
function closeModal() {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.style.display = "none");
}

// Hàm xử lý sự kiện Enter và Esc trong modal
document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('packageModal');

    // Nếu nhấn Enter
    if (event.key === 'Enter') {
        const form = modal.querySelector('form');
        if (form) {
            form.submit(); // Xử lý đăng ký khi nhấn Enter
        }
    }

    // Nếu nhấn Esc
    if (event.key === 'Escape') {
        closeModal(); // Đóng modal khi nhấn Esc
    }
});

// Đóng modal khi nhấp ra ngoài
window.addEventListener('click', (event) => {
    const modal = document.getElementById('packageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Mở modal đăng nhập
document.getElementById("loginButton").addEventListener("click", () => {
    openModal("loginModal");
});

// Mở modal theo ID
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
}

// Đóng modal cho đăng nhập và đăng ký
function closeLoginModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Đóng modal khi nhấp ra ngoài
window.addEventListener('click', (event) => {
    const modal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    if (event.target === modal || event.target === registerModal) {
        closeLoginModal(event.target.id);
    }
});

// Sự kiện khi nhấn vào "Đăng ký ngay" từ modal đăng nhập
document.getElementById('registerLink').addEventListener('click', () => {
    closeModal("loginModal");
    openModal("registerModal");
});

// Sự kiện khi nhấn vào "Đăng nhập ngay" từ modal đăng ký
document.getElementById('loginLink2').addEventListener('click', () => {
    closeModal("registerModal");
    openModal("loginModal");
});

// Xử lý đăng nhập (dành cho ví dụ)
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Thực hiện kiểm tra đăng nhập (thực tế bạn sẽ kết nối với server để kiểm tra thông tin)
    if (username === "hongtuyet" && password === "280704") {
        alert("Đăng nhập thành công!");
        closeModal("loginModal");
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
});

// Xử lý đăng ký (dành cho ví dụ)
document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const regUsername = document.getElementById('regUsername').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;
    
    // Thực hiện đăng ký (thực tế bạn sẽ lưu thông tin này vào database)
    alert("Đăng ký thành công!");
    closeModal("registerModal");
});

// Hàm hiển thị chi tiết gói dịch vụ
function showPackageDetails(packageType) {
    const modal = document.getElementById('packageModal');
    const details = document.getElementById('packageDetails');

    // Xử lý thông tin theo loại gói
    if (packageType === 'group') {
        details.innerHTML = `
            <h3>Gói Trị liệu Nhóm</h3>
            <p>Trải nghiệm trị liệu tâm lý trong nhóm, chia sẻ và học hỏi từ trải nghiệm của người khác.</p>
            <p><strong>Giá:</strong></p>
            <ul>
                <li>₫300,000/người</li>
                <li>₫450,000/người/buổi</li>
            </ul>
            <p>Chuyên viên tâm lý dẫn dắt nhóm</p>
            <p>Môi trường an toàn và hỗ trợ</p>
            <p>Đặt lịch linh hoạt</p>
            <button onclick="handleBooking('Nhóm')">Đặt lịch ngay</button>
        `;
    } else if (packageType === 'individual') {
        details.innerHTML = `
            <h3>Gói Trị liệu Cá nhân</h3>
            <p>Dành riêng cho bạn, tập trung giải quyết vấn đề cá nhân một cách chuyên sâu.</p>
            <p><strong>Giá:</strong></p>
            <ul>
                <li>₫500,000 cho mỗi buổi trị liệu</li>
                <li>₫750,000/buổi</li>
            </ul>
            <p>Chuyên viên tâm lý 1:1</p>
            <p>Hoàn toàn bảo mật</p>
            <p>Đặt lịch linh hoạt</p>
            <button onclick="handleBooking('Cá nhân')">Đặt lịch ngay</button>
        `;
    }

    // Hiển thị modal
    modal.style.display = 'flex';
}

// Hàm đặt lịch
function handleBooking(packageType) {
    alert(`Đặt lịch cho gói: ${packageType}`);
}
