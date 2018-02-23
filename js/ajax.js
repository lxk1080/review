function json2url(data) {
  var res = [];
  for (var key in data) {
    var str = key +'='+ data[key];
    res.push(str)
  }
  return res.join('&')
}

function ajax(json) {
  json = json || {};
  if (!json.url) return;
  var url = json.url;
  var type  = (json.type || 'get').toLowerCase();
  var data = json2url(json.data || {});

  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest()
  } else {
    var xhr = window.ActiveXObject('Microsoft.XMLHTTP')
  }

  switch (type) {
    case 'get':
      url = url + '?' + data;
      xhr.open('get', url.replace(/\?$/g, ''), true);
      xhr.send();
      break;
    case 'post':
      xhr.open('post', url, true);
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send(data);
      break;
    default: throw new Error('the request type is not correct!');
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        json.success && json.success(xhr.responseText)
      } else {
        json.error && json.error(xhr.status)
      }
    }
  }
}