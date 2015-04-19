if (!window.localStorage) {
  window.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) {
      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
    },
    setItem: function (sKey, sValue) {
      if(!sKey) { return; }
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 2038 00:00:00 GMT; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}

function setEverything() {
    var feature =  document.getElementById("second").value;
    var type = document.getElementById("type").value;
    var first = document.getElementById("first").value;
    
    localStorage.setItem("feature", feature);
    localStorage.setItem("type", type); 
    localStorage.setItem("first", first);
    
    window.location.href = "foodlist.html";
}

function resetEverything() {
    var first = document.getElementById("first");
    alter(first);
    var feature =  document.getElementById("second");
    var type = document.getElementById("type");

    var featureVal = localStorage.getItem("feature");
    if (featureVal !== null)
        feature.value = featureVal;
    
    var typeVal = localStorage.getItem("type");
    if (typeVal !== null)
        type.value = typeVal;
    
    var firstVal = localStorage.getItem("first");
    if (firstVal !== null)
        first.value = firstVal;  
}