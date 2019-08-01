import React from 'react'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class StackedAreaExample extends React.PureComponent {
    render() {
        const data = this.props.data

        const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff']
        const keys = ['apples', 'bananas', 'cherries', 'dates']
        const svgs = [
            { onPress: () => console.log('apples') },
            { onPress: () => console.log('bananas') },
            { onPress: () => console.log('cherries') },
            { onPress: () => console.log('dates') },
        ]

        return (
            <StackedAreaChart
                style={{ height: 200, paddingVertical: 16 }}
                data={data}
                keys={keys}
                colors={colors}
                curve={shape.curveNatural}
                showGrid={false}
                svgs={svgs}
            />
        )
    }
}

export default StackedAreaExample