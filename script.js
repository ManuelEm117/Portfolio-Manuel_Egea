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

      const TURNSTILE_SITE_KEY = "0x4AAAAAADOfM-_yRvKp1FOF";
      let generatedPhoneNumber = null;
      let turnstileToken = "";
      let turnstileWidgetId = null;
      let turnstileLoadTimer = null;
      let turnstileLoadStartedAt = 0;

      function setTurnstileStatus(message, state = "idle") {
        const status = document.getElementById("turnstileStatus");
        if (!status) return;
        status.textContent = message;
        status.dataset.state = state;
      }

      function showContactVerification() {
        const verification = document.getElementById("contactVerification");
        verification.hidden = false;
        turnstileLoadStartedAt = Date.now();
        renderTurnstile();
      }

      // Función para mostrar la información de contacto
      function mostrarContacto(phoneNumber) {
        const numStr = phoneNumber.toString();
        const formateado = `${numStr.slice(0, 3)} ${numStr.slice(3, 6)} ${numStr.slice(6, 9)}`;

        const phoneLink = document.getElementById("phoneContactLink");
        if (phoneLink) {
          phoneLink.href = `tel:${phoneNumber}`;
          phoneLink.innerHTML = `<span class="ci-icon">📞</span> ${formateado}`;
        }

        document
          .querySelectorAll(".contact-grid .contact-item")
          .forEach((item) => {
            item.style.filter = "none";
            item.style.pointerEvents = "";
            item.style.userSelect = "";
          });

        const button = document.getElementById("miBoton");
        if (button) button.style.display = "none";

        const verification = document.getElementById("contactVerification");
        if (verification) verification.hidden = true;
      }

      function resetTurnstile() {
        window.clearTimeout(turnstileLoadTimer);
        turnstileLoadStartedAt = 0;
        turnstileToken = "";
        const tokenInput = document.getElementById("turnstileToken");
        if (tokenInput) tokenInput.value = "";
        setTurnstileStatus("Esperando verificación segura...", "idle");

        if (window.turnstile && turnstileWidgetId !== null) {
          window.turnstile.reset(turnstileWidgetId);
        }
      }

      function renderTurnstile() {
        const verification = document.getElementById("contactVerification");
        if (!verification || verification.hidden) return;

        setTurnstileStatus("Cargando verificación segura...", "idle");

        if (!window.turnstile) {
          if (Date.now() - turnstileLoadStartedAt > 10000) {
            setTurnstileStatus(
              "No se ha podido cargar Turnstile. Revisa la conexión e inténtalo de nuevo.",
              "error",
            );
            return;
          }

          window.clearTimeout(turnstileLoadTimer);
          turnstileLoadTimer = window.setTimeout(renderTurnstile, 150);
          return;
        }

        if (turnstileWidgetId !== null) {
          window.turnstile.reset(turnstileWidgetId);
          setTurnstileStatus("Esperando verificación segura...", "idle");
          return;
        }

        turnstileWidgetId = window.turnstile.render("#turnstileWidget", {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
          callback(token) {
            turnstileToken = token;
            document.getElementById("turnstileToken").value = token;
            setTurnstileStatus(
              "Verificación completada. Desbloqueando contacto...",
              "success",
            );
            window.setTimeout(() => mostrarContacto(generatedPhoneNumber), 250);
          },
          "expired-callback"() {
            turnstileToken = "";
            document.getElementById("turnstileToken").value = "";
            setTurnstileStatus(
              "La verificación ha caducado. Vuelve a confirmarla.",
              "warning",
            );
          },
          "error-callback"() {
            turnstileToken = "";
            document.getElementById("turnstileToken").value = "";
            setTurnstileStatus(
              "No se ha podido completar la verificación. Inténtalo de nuevo.",
              "error",
            );
          },
        });
      }

      // Evento del botón principal
      document.getElementById("miBoton").addEventListener("click", function () {
        // Generar el número de teléfono (solo una vez)
        if (!generatedPhoneNumber) {
          generatedPhoneNumber = gen();
        }

        showContactVerification();
      });
