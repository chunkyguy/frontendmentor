// calculator
const add = (res, curr) => res + curr;
const sub = (res, curr) => res - curr;
const mul = (res, curr) => res * curr;
const div = (res, curr) => res / curr;
const eql = (res, curr) => res;

let buf = ["0"];
let res = undefined;
let fn = undefined;

function computeResult(next) {
  let curr = parseFloat(buf.join(""));
  curr = isNaN(curr) ? 0 : curr;

  if (res === undefined) {
    res = curr;
  } else {
    res = fn(res, curr);
  }

  fn = next;

  if (fn !== undefined) {
    buf = ["0"];
  }
  return res.toString();
}

// interaction
function handleInput(key) {
  switch (key) {
    case "+":
      return computeResult(add);

    case "-":
      return computeResult(sub);

    case "*":
      return computeResult(mul);

    case "/":
      return computeResult(div);

    case "=":
    case "Enter":
      return computeResult(eql);

    case ".":
      if (!buf.includes(".")) {
        buf.push(".");
      }
      return buf.join("");

    case "Backspace":
      buf.pop();
      if (buf.length === 0) {
        buf = ["0"];
      }
      return buf.join("");

    case "Escape":
      buf = ["0"];
      res = undefined;
      fn = undefined;
      return buf.join("");

    default:
      if (!"0123456789".includes(key)) return undefined;
      // if the only digit in buffer is a 0 then replace it with the input
      if (buf.length === 1 && buf[0] === "0") {
        buf[0] = key;
      } else {
        buf.push(key);
      }
      return buf.join("");
  }
}

// DOM
const outFld = document.querySelector("#output");
const btns = document.querySelectorAll("[data-key]");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    draw(handleInput(btn.dataset.key));
  });
});

document.addEventListener("keydown", (evt) => {
  draw(handleInput(evt.key));
});

function draw(text) {
  if (text === undefined) return;
  // 13 is the max digits that can fit in the display
  outFld.innerHTML = text.toString().slice(0, 13);
}
