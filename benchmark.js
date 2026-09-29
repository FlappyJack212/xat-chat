const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><body><div id="flexy"></div></body>');
global.document = dom.window.document;
global.parent = { Classic: false };
const selector = {
  Mask: null,
  order: {
    "section1": "section1",
    "section2": "section2",
    "section3": "section3",
  },
  categories: {
    "section1": { "cat1": ["a","b","c", 0, 0, 0, 0], "cat2": ["a","b","c", 1, 0, 0, 0] },
    "section2": { "cat3": ["a","b","c", 2, 0, 0, 0], "cat4": ["a","b","c", 3, 0, 0, 0] },
    "section3": { "cat5": ["a","b","c", 4, 0, 0, 0], "cat6": ["a","b","c", 5, 0, 0, 0] }
  },
  Powers: {
    0: true, 1: true, 2: true, 3: true, 4: true, 5: true
  },
  pssa: {
    1: "pow0", 2: "pow1", 3: "pow2", 4: "pow3", 5: "pow4", 6: "pow5"
  }
};
global.selector = selector;
const _0x45c84f = "Smilies";
const _0x4212ce = true;
let _0x318f53 = [];

function _0x8cc60() { return "<div>pow</div>"; }
function _0xa01436(_0x9989fd, _0x2129e3) {
  let _0x111a30 = document.getElementById(_0x9989fd);
  if (_0x111a30) {
    _0x111a30.innerHTML += _0x2129e3;
  }
}

function runOriginal() {
  let _0x33ad60 = document.getElementById('flexy');
  _0x33ad60.innerHTML = "";
  let _0x10e2e1 = _0x4212ce ? "" : "d-none";
  let _0x37dadf = "";
  let _0xd65361 = 0;
  let _0xd62913 = false;

  for (let _0x4fcd5e in selector.order) {
    let _0x1d8481 = 0;
    let _0x276544 = 0;
    _0x33ad60.innerHTML += `<div id="${_0x4fcd5e}Container" class="selectorContainer sectionText ${_0x10e2e1}" data-sub="${_0x4fcd5e}">${_0x4fcd5e}</div>
      <div id="${_0x4fcd5e}Category" class="selectorContainer"></div>`;
    for (let _0x4305b2 in selector.categories[_0x4fcd5e]) {
      let _0x3fd222 = 0;
      let _0x38b19f = 0;
      document.getElementById(`${_0x4fcd5e}Category`).innerHTML += `<div id="${_0x4305b2}ScContainer" class="selectorContainer subSectionText" data-sub="${_0x4305b2}">${_0x4305b2}</div>
        <div id="${_0x4305b2}ScCategory" class="selectorContainer"></div>`;
      _0x37dadf = "";
      for (let _0x1c0a02 = 3;; _0x1c0a02++) {
        let _0x8a0c01 = parseInt(selector.categories[_0x4fcd5e][_0x4305b2][_0x1c0a02]);
        if (!_0x8a0c01 & _0x8a0c01 !== 0) {
          break;
        }
        let _0xecc7bf = selector.Powers[_0x8a0c01];
        _0x276544++;
        _0x38b19f++;
        if (_0xecc7bf) {
          _0x1d8481++;
          _0x3fd222++;
          _0xd65361++;
        }
        let _0xa37344 = selector.pssa[1 + _0x8a0c01];
        _0x37dadf += _0x8cc60(_0x8a0c01, _0xa37344, _0xecc7bf, _0x4212ce);
        _0x318f53.push(_0xa37344);
        let _0x4fd127 = "Smilies" == _0x45c84f ? 140 : 229;
        let _0x4216c4 = selector.categories[_0x4fcd5e][_0x4305b2].length - 3;
        // let _0x28d207 = Math.round(document.body.clientWidth / _0x4fd127);
        let _0x28d207 = 5;
        if (_0x3fd222 == _0x4216c4 && _0x4216c4 % _0x28d207 > 0) {
          while (_0x4216c4 % _0x28d207 > 0) {
            _0x37dadf += `<div class='selectorPow' style='width: 130px; margin: 0 auto;'></div>`;
            _0x4216c4++;
          }
        }
      }
      _0xa01436(_0x4305b2 + 'ScCategory', _0x37dadf);
      if (_0xd62913) {
        _0xa01436(_0x4305b2 + 'ScContainer', " [" + _0x3fd222 + "/" + _0x38b19f + "]");
      }
    }
    if (_0xd62913) {
      _0xa01436(_0x4fcd5e + 'Container', " [" + _0x1d8481 + "/" + _0x276544 + "]");
    }
  }
}

function runOptimized() {
  let _0x33ad60 = document.getElementById('flexy');
  _0x33ad60.innerHTML = "";
  let _0x10e2e1 = _0x4212ce ? "" : "d-none";
  let _0x37dadf = "";
  let _0xd65361 = 0;
  let _0xd62913 = false;

  let flexyHTML = ""; // Create a variable to hold the entire HTML

  for (let _0x4fcd5e in selector.order) {
    let _0x1d8481 = 0;
    let _0x276544 = 0;

    // Instead of appending to DOM, append to our string
    flexyHTML += `<div id="${_0x4fcd5e}Container" class="selectorContainer sectionText ${_0x10e2e1}" data-sub="${_0x4fcd5e}">${_0x4fcd5e}</div>
      <div id="${_0x4fcd5e}Category" class="selectorContainer">`;

    for (let _0x4305b2 in selector.categories[_0x4fcd5e]) {
      let _0x3fd222 = 0;
      let _0x38b19f = 0;

      // Append to the inner category div string
      flexyHTML += `<div id="${_0x4305b2}ScContainer" class="selectorContainer subSectionText" data-sub="${_0x4305b2}">${_0x4305b2}</div>
        <div id="${_0x4305b2}ScCategory" class="selectorContainer">`;

      _0x37dadf = "";
      for (let _0x1c0a02 = 3;; _0x1c0a02++) {
        let _0x8a0c01 = parseInt(selector.categories[_0x4fcd5e][_0x4305b2][_0x1c0a02]);
        if (!_0x8a0c01 & _0x8a0c01 !== 0) {
          break;
        }
        let _0xecc7bf = selector.Powers[_0x8a0c01];
        _0x276544++;
        _0x38b19f++;
        if (_0xecc7bf) {
          _0x1d8481++;
          _0x3fd222++;
          _0xd65361++;
        }
        let _0xa37344 = selector.pssa[1 + _0x8a0c01];
        _0x37dadf += _0x8cc60(_0x8a0c01, _0xa37344, _0xecc7bf, _0x4212ce);
        _0x318f53.push(_0xa37344);
        let _0x4fd127 = "Smilies" == _0x45c84f ? 140 : 229;
        let _0x4216c4 = selector.categories[_0x4fcd5e][_0x4305b2].length - 3;
        // let _0x28d207 = Math.round(document.body.clientWidth / _0x4fd127);
        let _0x28d207 = 5;
        if (_0x3fd222 == _0x4216c4 && _0x4216c4 % _0x28d207 > 0) {
          while (_0x4216c4 % _0x28d207 > 0) {
            _0x37dadf += `<div class='selectorPow' style='width: 130px; margin: 0 auto;'></div>`;
            _0x4216c4++;
          }
        }
      }

      // Close the inner category div and append contents
      flexyHTML += _0x37dadf + `</div>`;

      // if (_0xd62913) {
      //   _0xa01436(_0x4305b2 + 'ScContainer', " [" + _0x3fd222 + "/" + _0x38b19f + "]");
      // }
    }

    // Close the outer category div
    flexyHTML += `</div>`;

    // if (_0xd62913) {
    //   _0xa01436(_0x4fcd5e + 'Container', " [" + _0x1d8481 + "/" + _0x276544 + "]");
    // }
  }

  _0x33ad60.innerHTML = flexyHTML;
}

const numRuns = 1000;

console.time('Original');
for (let i = 0; i < numRuns; i++) {
  runOriginal();
}
console.timeEnd('Original');

console.time('Optimized');
for (let i = 0; i < numRuns; i++) {
  runOptimized();
}
console.timeEnd('Optimized');
