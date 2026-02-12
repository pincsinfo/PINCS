// Production-safe client-side validation for sign-in form (demo)
(() => {
  const form = document.querySelector("#signin-form");
  if (!(form instanceof HTMLFormElement)) return;

  const email = form.querySelector("#signin-email");
  const password = form.querySelector("#signin-password");

  const fieldErrorEl = (input) => {
    if (!(input instanceof HTMLElement)) return null;
    const field = input.closest(".field");
    return field ? field.querySelector(".field-error") : null;
  };

  const setError = (input, message) => {
    const el = fieldErrorEl(input);
    if (el) el.textContent = message || "";
    if (input instanceof HTMLInputElement) {
      input.setAttribute("aria-invalid", message ? "true" : "false");
    }
  };

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

  const validate = () => {
    let ok = true;

    if (!(email instanceof HTMLInputElement) || !isEmail(email.value)) {
      setError(email, "Please enter a valid email address.");
      ok = false;
    } else {
      setError(email, "");
    }

    if (!(password instanceof HTMLInputElement) || password.value.trim().length < 6) {
      setError(password, "Password must be at least 6 characters.");
      ok = false;
    } else {
      setError(password, "");
    }

    return ok;
  };

  // Light realtime feedback
  form.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    validate();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Demo behavior: in real production you would POST to your backend here
    // fetch("/api/signin", { method: "POST", body: ... })
    alert("Signed in (demo). Hook this up to your backend for production.");
  });
})();

