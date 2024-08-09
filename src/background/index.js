console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})

chrome.runtime.onInstalled.addListener(() => {
  const rules = [
    {
      id: 1,
      priority: 1,
      condition: {
        urlFilter: '*://*/*',
        resourceTypes: [
          'main_frame',
          'sub_frame',
          'xmlhttprequest',
          'script',
          'stylesheet',
          'font',
        ],
      },
      action: {
        type: 'modifyHeaders',
        responseHeaders: [
          {
            header: 'Access-Control-Allow-Origin',
            operation: 'set',
            value: '*',
          },
        ],
        requestHeaders: [
          {
            header: 'Referer',
            operation: 'set',
            value: 'https://www.4399.com',
          },
        ],
      },
    },
  ]

  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: rules.map((rule) => rule.id),
      addRules: rules,
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error('Error adding rules: ' + chrome.runtime.lastError)
      } else {
        console.log('Rules added successfully')
      }
    },
  )
})

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((details) => {
  console.log('onRuleMatchedDebug', details)
})
