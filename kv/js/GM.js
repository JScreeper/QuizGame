let level = 1;
let round = 1;
let index = 0;

let scores = [0, 0]; // [Igrač 1, Igrač 2]

const MAX_ROUNDS = 2;
const QUESTION_TIME = 10;
let timeLeft = QUESTION_TIME;
let timerInterval = null;

const levelEl = document.getElementById("level");
const gameoverOverlay = document.getElementById("gameover-overlay");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

const p1ScoreEl = document.getElementById("p1-score");
const p2ScoreEl = document.getElementById("p2-score");
const timerEl = document.getElementById("timer");

/* ------------------ BAZA PITANJA i resenja ------------------ */
const level1 = [
 { q:"Glavni grad Francuske?", a:["Pariz","Rim","Berlin"], c:0 },
 { q:"Boja neba?", a:["Plava","Zelena","Crvena"], c:0 },
 { q:"Koliko dana ima nedelja?", a:["6","7","8"], c:1 },
 { q:"Koji je najveći kontinent?", a:["Afrika","Azija","Evropa"], c:1 },
 { q:"Koja životinja je poznata po dugom vratu?", a:["Žirafa","Slon","Konj"], c:0 },
 { q:"Koja planeta je najbliža Suncu?", a:["Venera","Merkur","Mars"], c:1 },
 { q:"Koji je simbol vode u hemiji?", a:["H2O","O2","CO2"], c:0 },
 { q:"Koliko sati ima jedan dan?", a:["24","12","36"], c:0 },
 { q:"Koji je glavni grad Italije?", a:["Rim","Milano","Napulj"], c:0 },
 { q:"Koja životinja daje mleko?", a:["Krava","Pas","Mačka"], c:0 },
 { q:"Koja boja se dobija mešanjem plave i žute?", a:["Zelena","Narandžasta","Ljubičasta"], c:0 },
 { q:"Koji je najveći okean?", a:["Tihi","Atlantski","Indijski"], c:0 },
 { q:"Koja ptica ne može da leti?", a:["Pingvin","Golub","Vrana"], c:0 }
];

const level2 = [
 { q:"Izbaci uljeza", a:["Pas","Mačka","Konj","Krava","Lav","Tigar","Slon","Stolica"], c:7 },
 { q:"Izbaci uljeza", a:["Merkur","Venera","Zemlja","Mars","Jupiter","Saturn","Neptun","Pluton"], c:7 },
 { q:"Izbaci uljeza", a:["Bakar","Gvožđe","Aluminijum","Cink","Olovo","Srebro","Zlato","Plastika"], c:7 },
 { q:"Izbaci uljeza", a:["Pitágora","Euklid","Arhimed","Platon","Tales","Sokrat","Hipatija","Napoleon"], c:7 },
 { q:"Izbaci uljeza", a:["HTTP","HTTPS","FTP","SMTP","TCP","UDP","HTML","IP"], c:6 },
 { q:"Izbaci uljeza", a:["Python","Java","C++","C#","JavaScript","Go","Rust","Photoshop"], c:7 },
 { q:"Izbaci uljeza", a:["Mitoza","Mejoza","Replikacija","Transkripcija","Translacija","Mutacija","Hromozom","Mitohondrija"], c:7 },
 { q:"Izbaci uljeza", a:["Pariz","Berlin","Rim","Madrid","Beč","Prag","Atina","Sidnej"], c:7 },
 { q:"Izbaci uljeza", a:["Mozart","Bah","Betoven","Šopen","Vivaldi","Hajdn","Brams","Picasso"], c:7 },
 { q:"Izbaci uljeza", a:["H2O","CO2","NaCl","O2","CH4","NH3","H2SO4","Plastika"], c:7 },
 { q:"Izbaci uljeza", a:["RAM","CPU","GPU","SSD","HDD","Matična ploča","Napajanje","Windows"], c:7 }
];

const riskQuestions = {
 easy:{ q:"1 + 1 = ?", a:["1","2","3"], c:1, p:5 },
 medium:{ q:"Glavni grad Nemačke?", a:["Berlin","Minhen","Hamburg"], c:0, p:10 },
 hard:{ q:"Autor Hamleta?", a:["Šekspir","Tolstoj","Gete"], c:0, p:20 },
 surprise:{ q:"Najveća planeta?", a:["Mars","Zemlja","Jupiter"], c:2, p:15 },
 trap:{ q:"Koliko minuta ima sat?", a:["50","60","100"], c:1, p:-10 }
};

const level4 = [
  { fields:["Pas","Mačka","Krava","Konj","Ovca","Koza"],
    solution:["ZIVOTINJE","zivotinje","Zivotinje","Zivotinja","ZIVOTINJA","zivotinja"] },
  { fields:["Amper","Volt","Ohm","Žica","Kondenzator","Otpornik"],
    solution:["STRUJA","Struja","struja"] },
  { fields:["Mercur","Venera","Zemlja","Mars","Jupiter","Saturn"],
    solution:["PLANETE","Planete","planete"] },
  { fields:["H2O","O2","CO2","NaCl","CH4","NH3"],
    solution:["HEMIJSKE SUPSTANCE","Hemijske supstance","hemijske supstance"] },
  { fields:["Kafka","Orwell","Huxley","Shakespeare","Tolstoj","Dostojevski"],
    solution:["POZNATI PISCI","Poznati pisci","poznati pisci","PISCI","Pisci"] },
  { fields:["Python","Java","C++","Rust","Go","C#"],
    solution:["PROGRAMSKI JEZICI","Programski jezici","programski jezici","Programski jezik","PROGRAMSKI JEZIK"] },
  { fields:["Turbina","Generator","Transformator","Kablovi","Izolator","Prekidač"],
    solution:["ELEKTRIČNA MREŽA","Električna mreža","električna mreža","Elektricna mreza","ELEKTRICNA MREZA"] },
  { fields:["Mozart","Beethoven","Bach","Chopin","Vivaldi","Haydn"],
    solution:["KLASIČNA MUZIKA","Klasična muzika","klasična muzika","KLASICNA MUZIKA","Klasicna muzika","klasicna muzika"] },
  { fields:["Ribozom","Mitohondrija","Kromozom","DNK","RNK","Citoplazma"],
    solution:["CELIJA","Ćelija","celija","Celija"] },
  { fields:["Newton","Einstein","Galileo","Tesla","Curie","Faraday"],
    solution:["NAUČNICI","Naučnici","naučnici","NAUCNICI","Naucnici","naucnici"] },
  { fields:["HTML","CSS","JavaScript","PHP","Python","SQL"],
    solution:["WEB TEHNOLOGIJE","Web tehnologije","web tehnologije"] }
];

const level5 = [
 { q:"Najveći okean?", a:["Atlantski","Indijski","Tihi","Arktički"], c:2 },
 { q:"Autor 'Na Drini ćuprija'?", a:["Andrić","Crnjanski","Kiš","Selimović"], c:0 },
 { q:"Autor 'Na Drini ćuprija'?", a:["Andrić","Crnjanski","Kiš","Selimović"], c:0 },
 { q:"Koje delo Borislava Pekića ima formu zatvorskog dnevnika?", a:["Kako upokojiti vampira","Besnilo","Zlatno runo","Hodočašće Arsenija Njegovana"], c:0 },
 { q:"Ko je autor pojma 'banalnost zla'?", a:["Hana Arent","Žan-Pol Sartr","Teodor Adorno","Karl Jaspers"], c:0 },
 { q:"Koja država je potpisnica Dejtonskog sporazuma?", a:["Srbija","SR Jugoslavija","Bosna i Hercegovina","Hrvatska"], c:1 },
 { q:"Roman 'Hazarski rečnik' strukturisan je kao?", a:["Klasičan roman","Hronika","Enciklopedija","Drama"], c:2 },
 { q:"Ko je predvodio Bitku kod Pliske 811. godine?", a:["Justinijan","Nikefor I","Vasilije II","Heraklije"], c:1 },
 { q:"Koja filozofska struja je vezana za Sartra?", a:["Pozitivizam","Egzistencijalizam","Stoicizam","Empirizam"], c:1 },
 { q:"Koji srpski pisac je bio član SANU i otvoreni disident?", a:["Dobrica Ćosić","Danilo Kiš","Borislav Pekić","Branko Ćopić"], c:2 },
 { q:"Koji događaj se smatra početkom Hladnog rata?", a:["Maršalov plan","Berlinski zid","Trumanova doktrina","Korejski rat"], c:2 },
 { q:"Ko je autor dela 'Seobe II'?", a:["Ivo Andrić","Miloš Crnjanski","Dobrica Ćosić","Meša Selimović"], c:1 },
 { q:"Koja država je prva priznala nezavisnost Slovenije 1991.?", a:["Italija","Austrija","Nemačka","Mađarska"], c:3 },
 { q:"Kako Jirgen Habermas definiše 'idealnu govornu situaciju'?", a:["Konsenzus bez prinude","Diskurs vođen interesima","Jezik kao ideologija","Moć komunikacije"], c:0 },
 { q:"Koji pojam Niklas Luman koristi za opis samoreferencijalnih društvenih sistema?", a:["Strukturalna integracija","Autopojeza","Funkcionalna diferencijacija","Socijalna kompleksnost"], c:1 },
 { q:"Koja metodološka pozicija je centralna za Veberovu razumevajuću sociologiju?", a:["Pozitivizam","Verstehen","Strukturalizam","Empirizam"], c:1 },
 { q:"Koja Fukoova analiza se bavi transformacijom kaznene moći u modernom društvu?", a:["Istorija seksualnosti","Rađanje klinike","Nadzirati i kažnjavati","Reči i stvari"], c:2 },
 { q:"Koji pojam kod Đorđa Agambena označava život izuzet iz pravnog poretka?", a:["Biopolitika","Goli život","Izvanredno stanje","Suverenost"], c:1 },

];

/* ------------------ LEVEL 1 ------------------ */
const QUESTIONS_PER_ROUND = 3;
let level1QuestionsOrder = [];

function initLevel1() {
  let temp = [...level1];
  level1QuestionsOrder = [];
  for(let i=0;i<QUESTIONS_PER_ROUND;i++){
    let r = Math.floor(Math.random()*temp.length);
    level1QuestionsOrder.push(temp[r]);
    temp.splice(r,1);
  }
  index = 0;
}

/* ------------------ Tajmer ------------------ */
function startTimer(callback){
  clearInterval(timerInterval);
  timeLeft = QUESTION_TIME;

  timerEl.textContent = `⏱ ${timeLeft}s`;
  timerEl.classList.remove("danger"); // reset

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱ ${timeLeft}s`;

    // Kad ostane 5 sekundi – tajmer crveni i pulsira
    if(timeLeft <= 5){
      timerEl.classList.add("danger");
    } else {
      timerEl.classList.remove("danger");
    }

    if(timeLeft <= 0){
      clearInterval(timerInterval);
      timerEl.classList.remove("danger");
      callback();
    }
  }, 1000);
}



/* ------------------ CORE ------------------ */
function clearUI(){
  answersEl.innerHTML = "";
  levelEl.textContent = `NIVO ${level} | RUNDA ${round}/${MAX_ROUNDS}`;
  updateScores();
}

function load(){
  clearUI();
  if(level===1) loadClassic();
  else if(level===2) loadOdd();
  else if(level===3) loadRisk();
  else if(level===4) loadAssociation();
  else if(level===5) loadFinal();
}

/* ------------------ LEVEL 1 ------------------ */
function loadClassic(){
  if(index===0) initLevel1();
  let q = level1QuestionsOrder[index];
  questionEl.textContent = q.q;

  let answers = q.a.map((t,i)=>({t, ok:i===q.c})).sort(()=>Math.random()-0.5);

  startTimer(nextClassic);

  answers.forEach(a=>{
    answersEl.appendChild(btn(a.t,()=>{
      if(a.ok){ scores[0]+=10; scores[1]+=10; }
      nextClassic();
    }));
  });
}

function nextClassic(){
  clearInterval(timerInterval);
  index++;
  if(index>=QUESTIONS_PER_ROUND){
    index=0; round++;
    if(round>MAX_ROUNDS){ round=1; level++; }
  }
  load();
}

/* ------------------ LEVEL 2 (UPGRADE) ------------------ */
function loadOdd(){
  let q = level2[Math.floor(Math.random()*level2.length)];
  questionEl.textContent = q.q;

  startTimer(nextLevel2);

  q.a.forEach((x,i)=>{
    answersEl.appendChild(btn(x,()=>{
      if(i===q.c){ scores[0]+=10; scores[1]+=10; }
      nextLevel2();
    }));
  });
}

function nextLevel2(){
  clearInterval(timerInterval);
  round++;
  if(round>MAX_ROUNDS){
    round=1;
    level++;
  }
  load();
}

/* ------------------ LEVEL 3 : RIZIK ------------------ */

let selectedRisk = null;

function loadRisk(){
  clearUI();

  // BITNO: ovde NEMA TAJMERA
  timerEl.textContent = "⏱ --";

  questionEl.textContent = "IZABERI RIZIK";

  Object.keys(riskQuestions).forEach(key => {
    answersEl.appendChild(
      btn(key.toUpperCase(), () => startRiskQuestion(key))
    );
  });
}

function startRiskQuestion(key){
  clearUI();
  selectedRisk = riskQuestions[key];

  questionEl.textContent = selectedRisk.q;

  startTimer(() => {
    applyRiskResult(false);
  });

  selectedRisk.a.forEach((ans, i) => {
    answersEl.appendChild(
      btn(ans, () => {
        clearInterval(timerInterval);
        applyRiskResult(i === selectedRisk.c);
      })
    );
  });
}

function applyRiskResult(correct){
  if(correct){
    scores[0] += selectedRisk.p;
    scores[1] += selectedRisk.p;
  } else {
    // kazna samo ako je negativan rizik (TRAP)
    if(selectedRisk.p < 0){
      scores[0] += selectedRisk.p;
      scores[1] += selectedRisk.p;
    }
  }

  updateScores();
  nextRisk();
}

function nextRisk(){
  round++;
  if(round > MAX_ROUNDS){
    round = 1;
    level++;
  }
  load();
}


/* ------------------ LEVEL 4 asocijacija ------------------ */
function loadAssociation() {
  questionEl.textContent = "Asocijacija";
  answersEl.innerHTML = ""; // očisti prethodni sadržaj

  let openedCount = 0;
  let solved = false;
  let mustGuessBeforeNext = false;
  const FIELD_TIME = 10;
  let fieldTimer = null;
  let fieldTimeLeft = FIELD_TIME;
  let fieldInterval = null;
  const buttons = [];

  const currentSet = level4[Math.floor(Math.random() * level4.length)];
  const totalFields = currentSet.fields.length;

  function startFieldTimer() {
    clearTimeout(fieldTimer);
    clearInterval(fieldInterval);
    fieldTimeLeft = FIELD_TIME;

    if (timerEl) {
      timerEl.textContent = `⏱ ${fieldTimeLeft}s`;
      timerEl.style.color = "";
      timerEl.style.animation = "";
      timerEl.classList.remove("active");
    }

    fieldInterval = setInterval(() => {
      fieldTimeLeft--;
      if (timerEl) {
        timerEl.textContent = `⏱ ${fieldTimeLeft}s`;
        if (fieldTimeLeft <= 5) {
          timerEl.style.color = "red";
          timerEl.style.animation = "pulse 1s infinite";
          timerEl.classList.add("active");
        } else {
          timerEl.style.color = "";
          timerEl.style.animation = "";
          timerEl.classList.remove("active");
        }
      }
    }, 1000);

    fieldTimer = setTimeout(() => {
      clearInterval(fieldInterval);
      if (!solved) {
        mustGuessBeforeNext = false;

        // pronađi sledeće neotvoreno polje i otvori ga
        const nextBtn = buttons.find(b => b.textContent === "???");
        if (nextBtn) {
          nextBtn.click();
        } else {
          // Ako nema više polja, prikaži rešenje i idi na sledeću rundu
          solved = true;
          guessBtn.textContent = `Rešenje: ${currentSet.solution[0]}`;
          startAutoNextTimer();
        }
      }
    }, FIELD_TIME * 1000);
  }

  // kreiranje dugmadi za polja
  currentSet.fields.forEach((field, i) => {
    let b = document.createElement("button");
    b.textContent = "???";
    b.style.margin = "5px";
    b.onclick = () => {
      if (solved) return;
      if (mustGuessBeforeNext) {
        alert("Prvo pokušaj da pogodiš rešenje pre nego što otvoriš novo polje!");
        return;
      }
      if (b.textContent === "???") {
        b.textContent = field;
        openedCount++;
        mustGuessBeforeNext = true;
        startFieldTimer();
      }
    };
    answersEl.appendChild(b);
    buttons.push(b);
  });

  // dugme za unos rešenja
  let guessBtn = document.createElement("button");
  guessBtn.textContent = "Pogodi rešenje";
  guessBtn.style.display = "block";
  guessBtn.style.marginTop = "10px";
  answersEl.appendChild(guessBtn);

  guessBtn.onclick = () => {
    if (solved) return;

    let g = prompt("Unesi rešenje:");
    if (!g) return;

    let correct = currentSet.solution.some(sol => sol.toUpperCase() === g.trim().toUpperCase());

    if (correct) {
      clearTimeout(fieldTimer);
      clearInterval(fieldInterval);

      let points;
      switch(openedCount) {
        case 1: points = 30; break;
        case 2: points = 25; break;
        case 3: points = 20; break;
        case 4: points = 15; break;
        case 5: points = 10; break;
        case 6: points = 5; break;
        default: points = 0;
      }
      scores[0] += points;
      scores[1] += points;
      updateScores();
      solved = true;

      guessBtn.textContent = `Tačno! Rešenje: ${currentSet.solution[0]} | Osvojeno: ${points} poena`;
      startAutoNextTimer();
    } else {
      alert("Netačno! Sada možeš da otvoriš još jedno polje.");
      mustGuessBeforeNext = false;
    }
  };

  // -------------------------------------------------------
  function startAutoNextTimer() {
    let autoTime = 5;
    timerEl.textContent = `⏱ ${autoTime}s`;
    timerEl.style.color = "yellow";
    timerEl.style.animation = "pulse 1s infinite";

    const autoInterval = setInterval(() => {
      autoTime--;
      timerEl.textContent = `⏱ ${autoTime}s`;
      if (autoTime <= 0) {
        clearInterval(autoInterval);
        timerEl.style.color = "";
        timerEl.style.animation = "";
        nextAssociation();
      }
    }, 1000);
  }

  // start tajmera za prvo polje odmah
  startFieldTimer();
}

function nextAssociation(){
  round++;
  if(round > MAX_ROUNDS){
    round = 1;
    level++;
    if(level > 5){
      gameOver();
      return;
    }
  }
  index = 0;
  load();
}

/* ------------------ LEVEL 5 ------------------ */
let saveUsed = false; // globalno: da li je dugme već korišćeno

function loadFinal(){
  let q = level5[index % level5.length];
  questionEl.textContent = q.q;
  answersEl.innerHTML = ""; // očisti prethodne odgovore

  let buttons = [];
  let sec = 5;

  // ------------------ TAJMER ------------------
  timerEl.textContent = `⏱ ${sec}s`;
  timerEl.style.color = "yellow";
  timerEl.style.animation = "pulse 1s infinite";

  let interval = setInterval(() => {
    sec--;
    timerEl.textContent = `⏱ ${sec}s`;
    if(sec <= 0){
      clearInterval(interval);
      timerEl.style.color = "";
      timerEl.style.animation = "";
      alert("Vreme je isteklo! Pitanje se preskače.");
      nextFinal(); // automatski preskok kao Save Me
    }
  }, 1000);

  // ------------------ DUGMAD ZA ODGOVORE ------------------
  q.a.forEach((x, i) => {
    let b = btn(x, () => {
      clearInterval(interval);
      if(i === q.c){
        scores[0] += 20;
        scores[1] += 20;
      } else {
        scores[0] -= 20;
        scores[1] -= 20;
      }
      updateScores();
      nextFinal();
    });
    answersEl.appendChild(b);
    buttons.push(b);
  });

  // ------------------ DUGME SAVE ME ------------------
  let saveBtn = document.getElementById("saveMeBtn");

  if(!saveBtn){
    saveBtn = document.createElement("button");
    saveBtn.id = "saveMeBtn";
    saveBtn.textContent = "SAVE ME";
    saveBtn.style.position = "fixed";
    saveBtn.style.bottom = "10px";
    saveBtn.style.left = "50%";
    saveBtn.style.transform = "translateX(-50%)";
    saveBtn.style.backgroundColor = "green";
    saveBtn.style.color = "white";
    saveBtn.style.fontWeight = "bold";
    saveBtn.style.padding = "10px 20px";
    saveBtn.style.border = "none";
    saveBtn.style.borderRadius = "10px";
    saveBtn.style.cursor = "pointer";
    saveBtn.style.zIndex = "9999";
    document.body.appendChild(saveBtn);
  }

  saveBtn.onclick = () => {
    if(saveUsed){
      alert("Dugme 'SAVE ME' je već iskorišćeno!");
      return;
    }
    clearInterval(interval);
    alert("Pitanje preskočeno!"); 
    saveUsed = true; // sada dugme ne može ponovo
    nextFinal();
  };
}

function nextFinal(){
  index++;
  if(index >= level5.length){
    index = 0;
    round++;
    if(round > MAX_ROUNDS){
      gameOver();
      return;
    }
  }
  load();
}


/* ------------------ Kraj igre, skor, dugmad ------------------ */
function updateScores(){
  p1ScoreEl.textContent=scores[0];
  p2ScoreEl.textContent=scores[1];
}

function gameOver(){
  clearInterval(timerInterval);
  alert(`KRAJ IGRE\nIgrač 1: ${scores[0]}\nIgrač 2: ${scores[1]}`);
}

function btn(t,fn){
  let b=document.createElement("button");
  b.textContent=t;
  b.onclick=fn;
  return b;
}

/* ------------------ POKRETANJE IGRE ------------------ */
load();
