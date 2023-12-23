const Main = (function () {
  function select(selector) {
    return document.querySelector(selector);
  }

  function selectAll(selector) {
    return document.querySelectorAll(selector);
  }

  function ajax(config) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (config?.responseType) {
        config.callBack(xhr.response);
      } else {
        config.callBack(xhr.responseText);
      }
    };
    xhr.ontimeout = function (e) {
      if (config?.timeOutCallBack) {
        config?.timeOutCallBack();
      } else {
        alert("Timeout");
        return;
      }
    };
    if (config?.responseType) {
      xhr.responseType = config.responseType;
    }
    xhr.open(config.method, config.url, config.async);
    if (config.headerContentType) {
      xhr.setRequestHeader(config.headerContentType, config.contentType);
    }
    if (config.method == "GET") {
      xhr.send();
    } else {
      xhr.send(config.sendData);
    }
  }

  return {
    select: select,
    selectAll: selectAll,
    ajax: ajax,
  };
})();
