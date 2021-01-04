# RGA4
React context and hooks for integrating Google Analytics 4 into an application

### Add / Install

```js
  yarn add @keg-hub/rga4
  npm install @keg-hub/rga4
```

## Setup

**Important**
* A Google Analytic 4 Measurement ID is required
* See this [page for more information](https://support.google.com/analytics/answer/9306384?visit_id=637436678402332999-753716772&rd=1)


## Example

  ```javascript
    import React, { useEffect, useCallback } from 'react'
    import { RGA4Provider, useRGA4 } from '@keg-hub/rga4'

    const Child = (props) => {

      // Use the hook to get access to the Google Analytics Context
      const rga4 = useRGA4()
      
      useEffect(() => {
        // Call the rga4.event method to send an analytics event
        rga4.event('page_view', {
          label: 'Github Readme',
          category: 'engagement',
        })
      }, [])

      // Custom analytics event when a button is clicked
      const onClick = useCallback(() => {
        // Call the rga4.event method to send an analytics event
        rga4.event('button_click', {
          event_label: 'Demo Button',
          event_category: 'engagement',
        })
      }, [ rga4 ])

      return (
        <div>
          <button onClick={onClick}>
            Demo Analytics Event
          </button>
        </div>
      )
    }

    export const Component = (props) => {
      const measurementID = `Replace with your GA4 Measurement ID`
      
      return (
        <RGA4Provider code={measurementID}>
          <Child />
        </RGA4Provider>
      )
    }
  ```
