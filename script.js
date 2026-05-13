// ─── NAV shadow on scroll ───
      const navbar = document.getElementById("navbar");
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
      });

      // ─── Parallax backgrounds ───
      const parallaxBgs = document.querySelectorAll(".parallax-bg");
      window.addEventListener(
        "scroll",
        () => {
          const sy = window.scrollY;
          parallaxBgs.forEach((el) => {
            const speed = parseFloat(el.dataset.speed) || 0.3;
            const rect = el
              .closest(".parallax-section")
              .getBoundingClientRect();
            const offset = (rect.top + sy) * speed;
            el.style.transform = `translateY(${offset * 0.18}px)`;
          });
        },
        { passive: true },
      );

      // ─── Scroll reveal ───
      const reveals = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      reveals.forEach((el) => observer.observe(el));

      function gen() {
        const a = (() => {
          let suma = 0;
          for (let i = 1; i <= 10000; i++) suma += 1 / (i * i);
          return Math.round((Math.PI * Math.PI) / suma);
        })();

        const phi = (1 + Math.sqrt(5)) / 2;
        const eIndirecto = Math.floor(Math.sqrt(4));
        const b = Math.floor(Math.PI * phi - eIndirecto);

        const dd = Math.floor(Math.log(Math.pow(Math.PI, Math.PI)) * phi);

        let zeta3 = 0;
        for (let i = 1; i <= 10000; i++) zeta3 += 1 / (i * i * i);
        const e = Math.floor((Math.PI * Math.PI) / (zeta3 * 4));

        const f = Math.floor(Math.PI * Math.PI);

        const tt = Math.floor(Math.cos(0));

        const u = Math.floor(Math.E * Math.E);

        const ePi = Math.pow(Math.E, Math.PI);
        const piCuadrado = Math.PI * Math.PI;
        const ddIndirecto = Math.floor(piCuadrado / 2);
        const y = Math.floor(ePi - piCuadrado - 5);

        return parseInt(`${a}${b}${dd}${e}${f}${tt}${u}${y}${tt}`);
      }

      function r3c4p7ch7() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operadores = ["+", "-", "*"];
        const operador =
          operadores[Math.floor(Math.random() * operadores.length)];

        let resultado;
        let operacionTexto;

        switch (operador) {
          case "+":
            resultado = num1 + num2;
            operacionTexto = `${num1} + ${num2}`;
            break;
          case "-":
            // Asegurar que el número grande reste el pequeño
            const mayor = Math.max(num1, num2);
            const menor = Math.min(num1, num2);
            resultado = mayor - menor;
            operacionTexto = `${mayor} - ${menor}`;
            break;
          case "*":
            resultado = num1 * num2;
            operacionTexto = `${num1} × ${num2}`;
            break;
        }

        return {
          operacion: operacionTexto,
          resultado: resultado,
        };
      }

      // Variables globales para el modal
      let currentCaptcha = null;
      let generatedPhoneNumber = null;

      // Función para mostrar el modal
      function showModal() {
        const modal = document.getElementById("contactModal");
        modal.style.display = "flex";
      }

      // Función para cerrar el modal
      function closeModal() {
        const modal = document.getElementById("contactModal");
        modal.style.display = "none";
        // Resetear el modal
        document.getElementById("modalCaptcha").style.display = "block";
        document.getElementById("modalContactInfo").style.display = "none";
        document.getElementById("captchaAnswer").value = "";
        currentCaptcha = null;
      }

      // Función para generar nuevo captcha
      function generarNuevoCaptcha() {
        currentCaptcha = r3c4p7ch7();
        document.getElementById("captchaQuestion").textContent =
          `${currentCaptcha.operacion} = ?`;
        // Limpiar input y ocultar mensaje de error
        document.getElementById("captchaAnswer").value = "";
        document.getElementById("captchaError").style.display = "none";
        // Quitar el borde rojo si existe
        document.getElementById("captchaAnswer").style.borderColor = "";
      }

      // Función para mostrar la información de contacto
      function mostrarContacto(phoneNumber) {
        const numStr = phoneNumber.toString();
        const formateado = `${numStr.slice(0, 3)} ${numStr.slice(3, 6)} ${numStr.slice(6, 9)}`;

        // Actualizar el modal con el número generado
        document.getElementById("modalPhoneNumber").textContent = formateado;
        document.getElementById("modalPhoneLink").href = `tel:${phoneNumber}`;

        // También actualizar el enlace del DOM original (por si acaso)
        const contactLink = document.querySelector(
          '.contact-item[href="tel:635291781"]',
        );
        if (contactLink) {
          contactLink.href = `tel:${phoneNumber}`;
          contactLink.innerHTML = `<span class="ci-icon">📞</span> ${formateado}`;
        }

        // Cambiar la vista del modal
        document.getElementById("modalCaptcha").style.display = "none";
        document.getElementById("modalContactInfo").style.display = "block";
      }

      // Evento del botón principal
      document.getElementById("miBoton").addEventListener("click", function () {
        // Generar el número de teléfono (solo una vez)
        if (!generatedPhoneNumber) {
          generatedPhoneNumber = gen();
        }

        // Generar nuevo captcha
        generarNuevoCaptcha();

        // Mostrar el modal
        showModal();
      });

      // Evento para verificar el captcha
      // Evento para verificar el captcha
      document
        .getElementById("verifyCaptchaBtn")
        .addEventListener("click", function () {
          const respuestaUsuario =
            document.getElementById("captchaAnswer").value;
          const errorDiv = document.getElementById("captchaError");
          const inputElement = document.getElementById("captchaAnswer");

          if (respuestaUsuario === "") {
            errorDiv.textContent = "❌ Por favor, introduce un resultado";
            errorDiv.style.display = "block";
            inputElement.style.borderColor = "#ff4444";
            return;
          }

          if (parseInt(respuestaUsuario) === currentCaptcha.resultado) {
            // Captcha correcto - mostrar contacto
            mostrarContacto(generatedPhoneNumber);
          } else {
            // Mostrar error sin alert
            errorDiv.textContent = `❌ Operación incorrecta. El resultado de ${currentCaptcha.operacion} es ${currentCaptcha.resultado}`;
            errorDiv.style.display = "block";
            inputElement.style.borderColor = "#ff4444";

            // Generar nuevo captcha para reintentar después de 1 segundo
            setTimeout(() => {
              generarNuevoCaptcha();
            }, 1500);
          }
        });

      // Evento para cerrar el modal
      document
        .getElementById("closeModalBtn")
        .addEventListener("click", function () {
          closeModal();
        });

      // Limpiar error cuando el usuario empiece a escribir
      document
        .getElementById("captchaAnswer")
        .addEventListener("input", function () {
          document.getElementById("captchaError").style.display = "none";
          this.style.borderColor = "";
        });
      // Cerrar modal si se clickea fuera del contenido
      window.addEventListener("click", function (event) {
        const modal = document.getElementById("contactModal");
        if (event.target === modal) {
          closeModal();
        }
      });
