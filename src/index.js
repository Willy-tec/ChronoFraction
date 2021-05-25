

console.clear();

class Chronometre {
  constructor(div) {
    this.root = div; // document.createElement("div")
    this.root.innerHTML = this.render();
    this.root
      .querySelectorAll("input")
      .forEach((el) =>
        el.addEventListener("change", (e) => this.handleChangeNumber(e))
      );
    this.action = parseInt(this.root.querySelectorAll("input")[0].value, 10);
    this.repos = parseInt(this.root.querySelectorAll("input")[1].value, 10);
    this.root
      .querySelector("input[type=button]")
      .addEventListener("click", (e) => this.init(e));
    this.beep = this.root.querySelector("audio");
  }

  handleChangeNumber(e) {
    if (e.target.dataset.type === "action")
      this.action = parseInt(e.target.value, 10);
    else this.repos = parseInt(e.target.value, 10);
  }
  async init() {
    while (true) {
      await this.demarre(this.action, 0);
      this.root.querySelectorAll("input")[0].value = this.action;
      await this.demarre(this.repos, 1);
      this.root.querySelectorAll("input")[1].value = this.repos;
    }
  }
  demarre(time, indice) {
    this.date = Date.now();
    this.joue = false;
    let interv = 1000;
    let nbIter = 0;
    return new Promise((res, rej) => {
      if (!this.chrono)
        this.chrono = setInterval(() => {
          if (time > 0) {
            if (!this.joue && time <= 4) {
              this.beep.currentTime = 0;
              this.beep.play();
              this.joue = true;
            }
            time--;
            this.root.querySelectorAll("input")[indice].value = time;
            
            nbIter++;
            interv = 10 //((nbIter*1000)-(Date.now() - this.date))
            console.log(Date.now() - this.date)
            console.log(interv+" "+nbIter)



          } else {
            clearInterval(this.chrono);
            this.chrono = null;
            this.joue = false;
            res("fini");
          }
        }, interv);
      else {
        clearInterval(this.chrono);
        this.chrono = null;
      }
    });
  }
  chronoRun(){
    
  }
  render() {
    return `
    <div class="Chrono">
    <input class="Chrono_input" data-type="action" id="test" type="number" value = "29"/>
    <input class="Chrono_input" data-type="repos" type="number" value="29"/>
    <input class="Chrono_button" type="button" value="Start/pause"/>
    <audio id = "beep"><source src="https://raw.githubusercontent.com/willy-tec/ChronoFraction/main/src/BEEP.mp3" type="audio/mpeg"></source></audio>
    </div>`;
  }
}

let divC = document.createElement("div");
divC.className = "divC";
new Chronometre(divC);
let app = document.getElementById("app");
app.appendChild(divC);


// register service worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register("src/sw.js")
            .then(()=>console.log("register service worker"))
            .catch((e)=>console.log("Cant register :" + e.value))
}

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none'

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});

if(window.isSecureContext) console.log("secure")
else console.log("not secure")