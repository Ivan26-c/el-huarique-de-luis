document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const btnLoginShow = document.getElementById('btnLoginShow');
  const btnUserProfile = document.getElementById('btnUserProfile');
  const userEmail = document.getElementById('userEmail');
  const loginForm = document.getElementById('loginForm');
  const loginModalEl = document.getElementById('loginModal');
  let loginModal = null;

  function checkLoginStatus() {
    const userLogged = localStorage.getItem('userLogged');
    const userLoggedEmail = localStorage.getItem('userEmail');
    
    if (userLogged === 'true' && userLoggedEmail) {
      btnLoginShow.classList.add('d-none');
      btnUserProfile.classList.remove('d-none');
      userEmail.textContent = userLoggedEmail;
      return true;
    }
    return false;
  }

  function showLoginModalOnLoad() {
    if (!checkLoginStatus()) {
      setTimeout(() => {
        if (!loginModal) {
          loginModal = new bootstrap.Modal(loginModalEl);
        }
        loginModal.show();
      }, 300);
    }
  }

  if (loginModalEl) {
    loginModal = new bootstrap.Modal(loginModalEl, {
      backdrop: 'static',
      keyboard: false
    });
  }

  showLoginModalOnLoad();

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      
      if (!loginForm.checkValidity()) {
        event.stopPropagation();
        loginForm.classList.add('was-validated');
      } else {
        const email = document.getElementById('loginEmail').value;
        

        localStorage.setItem('userLogged', 'true');
        localStorage.setItem('userEmail', email);
        

        btnLoginShow.classList.add('d-none');
        btnUserProfile.classList.remove('d-none');
        userEmail.textContent = email;
        

        loginForm.reset();
        loginForm.classList.remove('was-validated');
        

        if (loginModal) {
          loginModal.hide();
        }
      }
    }, false);
  }


  const guestButtons = document.querySelectorAll('button[data-bs-dismiss="modal"]');
  guestButtons.forEach(btn => {
    if (btn.textContent.includes('Invitado')) {
      btn.addEventListener('click', function() {
  
        localStorage.setItem('userLogged', 'true');
        localStorage.setItem('userEmail', 'Invitado');
        

        btnLoginShow.classList.add('d-none');
        btnUserProfile.classList.remove('d-none');
        userEmail.textContent = 'Invitado';
        
        loginForm.reset();
        loginForm.classList.remove('was-validated');
      });
    }
  });

  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('btnBackToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
      backToTopBtn?.classList.add('active');
    } else {
      header?.classList.remove('scrolled');
      backToTopBtn?.classList.remove('active');
    }
  });

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .btn-reserva-nav');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  const reservaForm = document.getElementById('reservaForm');

  if (reservaForm) {
    reservaForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!reservaForm.checkValidity()) {
        event.stopPropagation();
        reservaForm.classList.add('was-validated');
      } else {
        document.getElementById('modalNombre').textContent = document.getElementById('resNombre').value;
        document.getElementById('modalTelefono').textContent = document.getElementById('resTelefono').value;
        document.getElementById('modalSede').textContent = document.getElementById('resSede').value;
        document.getElementById('modalFecha').textContent = document.getElementById('resFecha').value;
        document.getElementById('modalHora').textContent = document.getElementById('resHora').value;
        document.getElementById('modalPersonas').textContent = document.getElementById('resPersonas').value;

        const confirmModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
        confirmModal.show();

        reservaForm.reset();
        reservaForm.classList.remove('was-validated');
      }
    }, false);
  }

});