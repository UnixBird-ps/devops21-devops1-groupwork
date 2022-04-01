
async function getData(restRoute) {
  let rawData = await fetch(restRoute);
  let result = await rawData.json();
  return result;
}

function renderList(cssSelector, list) {
  let html = '<table>';
  html += '<thead><tr>'
  for (let [key, value] of Object.entries(list[0])) {
    html += '<th class="' + typeof value + '">' + key + '</th>';
  }
  html += '</tr></thead>'
  html += '<tbody>';
  for (let item of list) {
    html += '<tr>';
    for (let value of Object.values(item)) {
      html += '<td class="' + typeof value + '">' + value + '</td>';
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  document.querySelector(cssSelector).innerHTML = html;
}

function renderSelectBox(cssSelector, list, eventHandlerFunc) {
  let html = '<select>' +
    list.map(item => '<option>' + item + '</option>').join('')
    + '</select>';
  document.querySelector(cssSelector).innerHTML = html;
  let selectBox = document.querySelector(cssSelector + ' select');
  selectBox.addEventListener('change', eventHandlerFunc);
  eventHandlerFunc({ target: selectBox });
}

async function reactOnUserSelectChoices(event) {
  let tableOrView = event.target.value.split(' ')[1];
  renderList('.data-table', await getData('/api/' + tableOrView));
}

async function start(userRole) {
  document.querySelector('main').innerHTML =
    userRole === 'user' ? '<h1>You are logged in...</h1>' : '<h1>Admin view</h1>';
  if (userRole === 'user') {
    return;
  }
  let selectData = (await getData('/api/tablesAndViews'))
    .map(item => item.type + ': ' + item.name).sort()
    .filter(x => x !== 'table: customers');
  selectData.unshift('table: customers');
  renderSelectBox('.select-holder', selectData, reactOnUserSelectChoices);
}