function toHalfWidth(str) {
  return str.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

function countText(text) {
  return text.replace(/\s+/g, '').length;
}

const limitField = document.getElementById('limitCount');
const textField = document.getElementById('inputText');
const countDisplay = document.getElementById('charCount');
const overCountDisplay = document.getElementById('excessChars');
const clearButton = document.getElementById('clearButton');

textField.addEventListener('input', updateText);
limitField.addEventListener('input', updateText);
clearButton.addEventListener('click', clearText);

function updateText() {
  const text = textField.textContent;
  const count = countText(text);
  const limit = parseInt(toHalfWidth(limitField.value)) || 0;

  countDisplay.textContent = count;

  if (count > limit && limit > 0) {
    overCountDisplay.textContent = `${count - limit}`;

    const normalText = text.substring(0, limit);
    const excessText = text.substring(limit);

    textField.innerHTML = normalText + '<span style="color: red;">' + excessText + '</span>';
    // カーソルをテキストの最後に移動
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(textField);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    overCountDisplay.textContent = '';
    textField.style.color = '';
  }
}

function clearText() {
  textField.textContent = '';
  updateText();
}
