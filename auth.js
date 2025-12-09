async function checkLogin(){ const res = await supabase.auth.getUser(); const user = res.data?.user; if(!user) return false; return user; }
async function ensureLogin(){ const u = await checkLogin(); if(!u) location.href='index.html'; }
async function doLogout(){ await supabase.auth.signOut(); location.href='index.html'; }
