# RGA4
React Components and hooks for integrating Google Analytics 4 into an application

### Add / Install

```js
  yarn add @lancetipton/rga4
  npm install @lancetipton/rga4
```

## Setup

**Important**
* A Google Analytic 4 Measurement ID is required
* See this [page for more information](https://support.google.com/analytics/answer/9306384?visit_id=637436678402332999-753716772&rd=1)


## Example

  ```javascript
    import React, { useEffect } from 'react'
    import { RGA4 } from '@lancetipton/rga4'

    const Child = ({ rga4, ...props }) => {

      useEffect(() => {

        // Call an analytics events with the rga4 prop
        rga4.event('page_view', {
          event_label: 'Github Readme',
          event_category: 'engagement',
          non_interaction: true,
        })

      }, [])

      return (
        <View>
          ...
        </View>
      )
    }

    export const Component = (props) => {
      const measurementID = `Replace with your GA4 Measurement ID`
      
      return (
        <RGA4 code={measurementID}>
          <Child />
        </RGA4>
      )
    }
  ```
