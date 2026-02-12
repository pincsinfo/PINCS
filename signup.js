// Production-safe client-side validation for signup form (demo)
(() => {
  const form = document.querySelector("#signup-form");
  if (!(form instanceof HTMLFormElement)) return;

  const fullName = form.querySelector("#fullName");
  const email = form.querySelector("#email");
  const password = form.querySelector("#password");
  const confirmPassword = form.querySelector("#confirmPassword");
  const terms = form.querySelector("#terms");
  const termsError = form.querySelector("[data-terms-error]");

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

    if (!(fullName instanceof HTMLInputElement) || fullName.value.trim().length < 2) {
      setError(fullName, "Please enter your full name.");
      ok = false;
    } else {
      setError(fullName, "");
    }

    if (!(email instanceof HTMLInputElement) || !isEmail(email.value)) {
      setError(email, "Please enter a valid email address.");
      ok = false;
    } else {
      setError(email, "");
    }

    if (!(password instanceof HTMLInputElement) || password.value.length < 8) {
      setError(password, "Password must be at least 8 characters.");
      ok = false;
    } else {
      setError(password, "");
    }

    if (
      !(confirmPassword instanceof HTMLInputElement) ||
      confirmPassword.value.length < 8 ||
      (password instanceof HTMLInputElement && confirmPassword.value !== password.value)
    ) {
      setError(confirmPassword, "Passwords do not match.");
      ok = false;
    } else {
      setError(confirmPassword, "");
    }

    if (termsError) termsError.textContent = "";
    if (!(terms instanceof HTMLInputElement) || !terms.checked) {
      if (termsError) termsError.textContent = "Please accept the terms to continue.";
      ok = false;
    }

    return ok;
  };

  // Light realtime feedback
  form.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (t.id === "terms") {
      if (termsError) termsError.textContent = "";
      return;
    }
    // validate only that field
    validate();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Demo behavior: in real production you would POST to your backend here
    // window.location.href = "index.html";
    alert("Account created (demo). Hook this up to your backend for production.");
  });
})();

