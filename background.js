function setTabRefreshInterval(tabId,optionsForTab) {
    var periodInMillis = optionsForTab.periodInSeconds * 1000;
    var refreshId = setInterval(function(){
                        chrome.tabs.get(tabId, function(tab){
                            // If the tab does not exist exit the interval
                            if (!tab) clearInterval(refreshId);
                            // Refresh the tab with the given url
                            chrome.tabs.update(tab.id, {url: optionsForTab.url});
                        });
    }, periodInMillis);
}

function createTabAndSetRefreshInterval(optionsForTab) {
    chrome.tabs.create(
        {url: optionsForTab.url},
        function(newtab) {
            setTabRefreshInterval(newtab.id,optionsForTab);
        });
}


function handleClick(){
    chrome.storage.local.get(["tabOptions"],function(items){
        var tabOptions = JSON.parse(items.tabOptions);
        console.log("Number of tabs: " + tabOptions.length);
        console.log("Tab Options: " + tabOptions);

        for (i=0; i < tabOptions.length; i++) {
            var optionsForTab = tabOptions[i];
            createTabAndSetRefreshInterval(optionsForTab);
        }
    });
}

// TODO: Wrap this into an action b

chrome.browserAction.onClicked.addListener(handleClick);