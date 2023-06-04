export default {
  check,
  lookup,
};

var elements;

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();
}

function check(inputWord) {
  // TODO: determine if `inputWord` can be spelled
  // with periodic table symbols; return array with
  // them if so (empty array otherwise)

  if (inputWord.length > 0) {
    for (let element of elements) {
      let symbol = element.symbol.toLowerCase();
      if (symbol.length <= inputWord.length) {
        // same thing we can write below ways as well
        // if (inputWord.startsWith(symbol)
        if (inputWord.slice(0, symbol.length) == symbol) {
          if (inputWord.length > symbol.length) {
            let res = check(inputWord.slice(symbol.length));

            if (res.length > 0) {
              return [symbol, ...res];
            }
          } else {
            // we are at the end of symbol
            return [symbol];
          }
        }
      }
    }
  }

  return [];
  // return ["be", "ca", "u", "se"];
}

function lookup(elementSymbol) {
  // TODO: return the element entry based on specified
  // symbol (case-insensitive)

  // simplest way
  for (let element of elements) {
    if (element.symbol.toLowerCase() == elementSymbol) {
      return element;
    }
  }
  //   return {};
}
