

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
    this.da = Date.now();
    while (true) {
      await this.demarre(this.action, 0);
      this.root.querySelectorAll("input")[0].value = this.action;
      await this.demarre(this.repos, 1);
      this.root.querySelectorAll("input")[1].value = this.repos;
      console.log((this.da - Date.now()) / 1000);
    }
  }
  demarre(time, indice) {
    this.joue = false;
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
          } else {
            clearInterval(this.chrono);
            this.chrono = null;
            this.joue = false;
            res("fini");
          }
        }, 1000);
      else {
        clearInterval(this.chrono);
        this.chrono = null;
      }
    });
  }
  modifie(anon) {
    anon = 15;
  }
  render() {
    return `
    <div class="Chrono">
    <input class="Chrono_input" data-type="action" id="test" type="number" value = "29"/>
    <input class="Chrono_input" data-type="repos" type="number" value="29"/>
    <input class="Chrono_button" type="button" value="Start/pause"/>
    <audio id = "beep"><source src="src/BEEP.mp3" type="audio/mpeg"></source></audio>
    </div>`;
  }
}

let divC = document.createElement("div");
divC.className = "divC";
new Chronometre(divC);
let app = document.getElementById("app");
app.appendChild(divC);
