// js/features.js - loads different feature UIs into #featureArea
function loadStart(){
  const area = document.getElementById('featureArea');
  area.innerHTML = `
  <div class="panel">
    <h3>Start Learning</h3>
    <p>Choose class:</p>
    <div class="class-grid">
      <a class="classbtn" href="classes/class9.html">Class 9</a>
      <a class="classbtn" href="classes/class10.html">Class 10</a>
      <a class="classbtn" href="classes/class11.html">Class 11</a>
      <a class="classbtn" href="classes/class12.html">Class 12</a>
    </div>
  </div>`;
}

function loadTimer(){
  const area = document.getElementById('featureArea');
  area.innerHTML = `
  <div class="panel">
    <h3>Study Timer</h3>
    <div class="timer-controls">
      <div>Timer: <input id="timerInput" type="number" value="25"> minutes</div>
      <div class="preset-buttons">
        <button onclick="startPreset(5)">5m</button><button onclick="startPreset(15)">15m</button><button onclick="startPreset(25)">25m</button><button onclick="startPreset(45)">45m</button>
      </div>
      <div><button id="startTimer" class="btn">Start</button> <button id="stopTimer" class="btn-outline">Stop</button></div>
      <div>Remaining: <span id="remaining">—</span></div>
      <h4>Stopwatch</h4>
      <div><span id="sw">00:00:00</span></div>
      <div><button id="swStart" class="btn">Start</button> <button id="swStop" class="btn-outline">Stop</button> <button id="swReset" class="btn-outline">Reset</button></div>
    </div>
  </div>`;
  hookTimer();
}

function loadCalendar(){
  const area = document.getElementById('featureArea');
  area.innerHTML = `<div class="panel"><h3>Calendar</h3><div id="calendar"></div></div>`;
  renderCalendar();
}

function loadMotivation(){
  const area = document.getElementById('featureArea');
  const quotes = [
    "Believe you can and you're halfway there.",
    "Small progress is still progress.",
    "Study hard — your future self will thank you.",
    "Consistency beats intensity.",
    "Mistakes are proof you're trying."
  ];
  const q = quotes[Math.floor(Math.random()*quotes.length)];
  area.innerHTML = `<div class="panel"><h3>Daily Motivation</h3><blockquote class="quote">${q}</blockquote><button onclick="loadMotivation()" class="btn-outline">New</button></div>`;
}

// Timer logic
let timerInterval, remainingSeconds;
function startPreset(min){ document.getElementById('timerInput').value = min; startTimer(); }
function startTimer(){
  clearInterval(timerInterval);
  const m = parseInt(document.getElementById('timerInput').value||0,10);
  if(!m) return;
  remainingSeconds = m*60;
  document.getElementById('remaining').textContent = formatTime(remainingSeconds);
  timerInterval = setInterval(()=>{
    remainingSeconds--; document.getElementById('remaining').textContent = formatTime(remainingSeconds);
    if(remainingSeconds<=0){ clearInterval(timerInterval); alert('Timer finished'); }
  },1000);
}
function stopTimer(){ clearInterval(timerInterval); }
function formatTime(s){ const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sec=s%60; return (h?String(h).padStart(2,'0')+':':'') + String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0'); }

// Stopwatch
let swInterval, swStartTime=0, swElapsed=0;
function hookTimer(){
  document.getElementById('startTimer').onclick = startTimer;
  document.getElementById('stopTimer').onclick = stopTimer;
  document.getElementById('swStart').onclick = ()=>{ if(swInterval) return; swStartTime=Date.now()-swElapsed; swInterval=setInterval(()=>{ swElapsed=Date.now()-swStartTime; document.getElementById('sw').textContent = msToTime(swElapsed); }, 100); };
  document.getElementById('swStop').onclick = ()=>{ clearInterval(swInterval); swInterval=null; };
  document.getElementById('swReset').onclick = ()=>{ clearInterval(swInterval); swInterval=null; swElapsed=0; document.getElementById('sw').textContent='00:00:00'; };
}
function msToTime(ms){ const totalSec=Math.floor(ms/1000); const h=Math.floor(totalSec/3600); const m=Math.floor((totalSec%3600)/60); const s=totalSec%60; return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'); }

// Calendar render
function renderCalendar(){
  const cal=document.getElementById('calendar'); cal.innerHTML='';
  const now=new Date(); const days= new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  for(let d=1; d<=days; d++){
    const el=document.createElement('div'); el.className='cal-day'; el.textContent=d;
    if(d===now.getDate()){ el.classList.add('today'); el.style.animation='pulse 1.6s infinite'; }
    cal.appendChild(el);
  }
}