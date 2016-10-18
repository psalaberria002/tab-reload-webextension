function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

// Saves options to chrome.storage.sync.
function save_options() {
    var tabOptions = [];
    var periods = document.getElementsByClassName('period');
    var urls = document.getElementsByClassName('url');

    var periodInSeconds;
    var url;
    for(var i = 0; i < periods.length; i++)
    {
        periodInSeconds = periods.item(i).value;
        url = urls.item(i).value;
        if (!isBlank(periodInSeconds) && !isBlank(url)) {
            tabOptions.push({"periodInSeconds": periodInSeconds , "url": url})
        };
    }
console.log(tabOptions);
  chrome.storage.local.set({
    tabOptions: JSON.stringify(tabOptions)
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
      tabOptions: []
  }, function(items) {
      var tabOptions = JSON.parse(items);
      console.log(tabOptions);
      //TODO: Generate html for each tab in items
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);