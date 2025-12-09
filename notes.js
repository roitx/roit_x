// js/notes.js - upload + list files using Supabase storage 'notes'
document.getElementById('uploadBtn')?.addEventListener('click', async ()=>{
  const file = document.getElementById('fileInput').files[0];
  const title = document.getElementById('fileTitle').value || (file && file.name) || 'file';
  const msg = document.getElementById('upMsg');
  if(!file){ msg.textContent='Choose a file'; return; }
  const userRes = await supabase.auth.getUser(); const user = userRes.data?.user;
  if(!user){ msg.textContent='Login required'; return; }
  const path = `notes/${user.id}/${Date.now()}_${file.name}`;
  msg.textContent='Uploading...';
  const { error } = await supabase.storage.from('notes').upload(path, file);
  if(error){ msg.textContent = error.message; return; }
  const url = await supabase.storage.from('notes').getPublicUrl(path);
  msg.textContent='Uploaded';
  loadFiles();
});

async function loadFiles(){
  const list = document.getElementById('filesList'); list.innerHTML='Loading...';
  const userRes = await supabase.auth.getUser(); const user=userRes.data?.user;
  if(!user){ list.innerHTML='Login required'; return; }
  const { data, error } = await supabase.storage.from('notes').list(user.id, {limit:100, offset:0});
  if(error){ list.innerHTML=error.message; return; }
  list.innerHTML='';
  for(const f of data){
    const url = await supabase.storage.from('notes').getPublicUrl(user.id + '/' + f.name);
    const div = document.createElement('div'); div.className='file-item';
    div.innerHTML = `<a href="${url.data.publicUrl}" target="_blank">${f.name}</a> <button onclick="deleteFile('${user.id}','${f.name}')">Delete</button>`;
    list.appendChild(div);
  }
}

async function deleteFile(uid, name){ if(!confirm('Delete?')) return; const { error } = await supabase.storage.from('notes').remove([uid + '/' + name]); if(error) alert(error.message); loadFiles(); }

setTimeout(()=>{ if(typeof loadFiles==='function') loadFiles(); }, 400);
