function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

let container = element("div", "container", "", "");
const h1 = element("h1", "text-center", "title", "Countries Whether Report");
const row = element("div", "row", "", "");
document.body.append(h1, container);
container.append(row);

const response = fetch("https://restcountries.com/v3.1/all");
response
  .then((data) => data.json())
  .then((result) => {
    //console.log(result);
    for (let i = 0; i < result.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
      <div class ="card h-100">
      <div class ="card-header">
      <h5 class="card-title text-center">${result[i].name.common} </h5>
      </div>
      <div class = "img-box text-center ">
      <img src="${result[i].flags.png}"class="card-img-top"  alt ="country image"/>
      </div>
      <div class= "card-body">
      <div class= "card-text text-center">Region:${result[i].region}</div>
      <div class= "card-text text-center">Capital:${result[i].capital}</div>
      <div class= "card-text text-center">Country Code:${result[i].cca3}</div>
      <button class="btn btn-primary ">click for weather </button>

      </div>
      </div>

      `;
      row.append(col);
    }
    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let latlng = result[index].latlng;
        let lat = latlng[0];
        let lon = latlng[1];
        //console.log(lat);
        // console.log(long);
        let weatherapi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8a9578217b92670d05e7cf46b88fdbeb`
        );
        weatherapi
          .then((data1) => data1.json())
          .then((res) => {
            alert(
              `wheather of ${result[index].name.common} is ${Math.floor(
                res.main.temp
              )} and ${Math.ceil(res.main.feels_like)}🌡C☁`
            );
          });
      });
    });
  });
