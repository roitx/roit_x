async function signUpUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await window.supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) alert(error.message);
  else {
    alert("Signup successful! Login now.");
    window.location.href = "index.html";
  }
}

async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await window.supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) alert(error.message);
  else window.location.href = "dashboard.html";
}
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_ANON_KEY"
);

document.getElementById("googleLogin").addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google"
  });
  if (error) alert(error.message);
});
