import React from 'react'
import {Dimensions} from 'react-native'
import { StackedBarChart , Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const {width,height} = Dimensions.get('window')

class StackedAreaExample extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dataChart:props.data
        }
    }
    render() {
        const data = this.state.dataChart

        const colors = ['#8800cc']
        const keys = ['chart']
        const svgs = [
            { onPress: () => console.warn('chart') }
        ]

        return (
            <StackedBarChart 
                style={{ height: height/1.2, paddingVertical: 50 }}
                data={data}
                keys={keys}
                colors={colors}
                curve={shape.curveNatural}
                showGrid={true}
                svgs={svgs}
                valueAccessor={({ item, key }) => item[key]}
            >
                <Grid />
            </StackedBarChart >
        )
    }
}

export default StackedAreaExample