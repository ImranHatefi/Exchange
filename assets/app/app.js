let selectFrom = document.querySelector("#selectFrom");
let selectTo = document.querySelector("#selectTo");
let inputFrom = document.querySelector("#inputFrom");
let inputTo = document.querySelector("#inputTo");
const URL = "https://api.exchangerate.host/latest";

function updateHTML(rates) {
  let inner = "";
  let entries = Object.keys(rates);
  entries.forEach((e) => {
    return (inner += `<option value=${e}>${e}</option>`);
  });
  selectFrom.innerHTML = inner;
  selectTo.innerHTML = inner;
}

function exchange(fromSelect, toSelect, rates) {
  const euroRate = rates[fromSelect.value] / rates[toSelect.value];
  let newInput = inputFrom.value * euroRate;
  inputTo.value = newInput.toFixed(2);
}

function dynaListeners(rates) {
  inputFrom.addEventListener("input", () =>
    exchange(selectTo, selectFrom, rates)
  );
  selectFrom.addEventListener("change", () =>
    exchange(selectFrom, selectTo, rates)
  );
  selectTo.addEventListener("change", () =>
    exchange(selectTo, selectFrom, rates)
  );
}

function currency() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const rates = data.rates;
      updateHTML(rates);
      dynaListeners(rates);
      exchange(selectFrom, selectTo, rates);
    });
}

currency();
