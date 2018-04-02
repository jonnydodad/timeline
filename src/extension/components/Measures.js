import React from 'react'
import {yType, XYPlot, XAxis, YAxis, LineSeries, Hint, LabelSeries, HorizontalBarSeries} from 'react-vis';
import Highlight from './Highlight'
import formatTimelineData from './formatTimelineData'
import {Decimal} from 'decimal.js';
//hi nathan
var buttonContainerStyle = {
  paddingLeft: "400px",
  background: "#19004c",
   padding:"10px 0 10px 400px",
  width: "600px"
};

export class Measures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastDrawLocation: null,
      zoom: false,
      hoveredCell: false,
      timelineMeasures: false,
      color: false,
      hint: false
    }
  }

  componentDidMount(){
   this.buildTimelineData();
  }

  componentWillReceiveProps(){
    this.buildTimelineData();
  }

  buildTimelineData = () => {
    this.setState({
      timelineMeasures: formatTimelineData(this.props.rawMeasures).map((measure,i)=>{
              return { x0:measure.startTime/10000, x:(measure.startTime + measure.duration)/10000, y:measure.line, name:measure.name, label: measure.name, color: measure.color, style:{fontSize: '15', display:'none'}}
            })
    })
  }
   
  render(){
    const {lastDrawLocation, hoveredCell} = this.state;
    return (
      <div >
        
        <XYPlot
          style={{background: '#020028'}}
          margin={{left: 80, right: 0, top: 40, bottom: 40}}
          xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
          yType={'ordinal'}
          width={1000}
          height={150}
          colorType="linear"
          colorDomain={[0, 1]}
          colorRange={['orange','red']}
          yRange={[-10, 100]}
          >

        <HorizontalBarSeries 
          stroke={'red'}
          onValueMouseOver={v => { if (!this.state.zoom) this.setState({hint:v.name,  hoveredCell: v.x && v.y ? v : false})}}
          onValueMouseOut={v => this.setState({hoveredCell: false})} 
          animation 
          onSeriesMouseOver={(event)=>{
            // does something on mouse over
            // you can access the value of the event
          }}
          data={this.state.timelineMeasures}/>
          
          {(this.state.zoom) ? 
              <Highlight color={'red'} onBrushEnd={(area) => {
                this.setState({
                  lastDrawLocation: area
                });
              }} />
          : null} 

            <Hint value={hoveredCell} topLeft>
              <div style={{background: '#3de285',fontSize:10, color:'black', opacity: 0.9 }}>
                <h3>{hoveredCell.name}</h3>
              </div>
            </Hint>
            
          <XAxis hideLine orientation="top" top={-15} tickTotal={8} style={{
              paddingTop: 15,
              line: {stroke: '#ADDDE1'},
              ticks: {stroke: '#ADDDE1'},
              //text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }}/>
          <YAxis hideLine/>         
        </XYPlot>


        <div style={buttonContainerStyle}>
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"red"}} onClick={() => {this.setState({lastDrawLocation: null});}}>Reset Zoom</button>
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"red"}} onClick={() => {this.setState({zoom: !this.state.zoom});}}>Brush Tool</button>  
        </div>


        <XYPlot
          style={{background: '#020028'}}
          margin={{left: 80, right: 0, top: 40, bottom: 40}}
          xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
          yType={'ordinal'}
          width={1000}
          height={150}
          colorType="linear"
          colorDomain={[0, 1]}
          colorRange={['orange','red']}
          yRange={[-10, 100]}
          >

          <HorizontalBarSeries 
          stroke={'red'}
          onValueMouseOver={v => { if (!this.state.zoom) this.setState({hint:v.name,  hoveredCell: v.x && v.y ? v : false})}}
          onValueMouseOut={v => this.setState({hoveredCell: false})} 
          animation 
          onSeriesMouseOver={(event)=>{
            // vironi stuff
          }}
          data={this.state.timelineMeasures}
          />
          
          {(this.state.zoom) ? 
              <Highlight color={'red'} onBrushEnd={(area) => {
                this.setState({
                  lastDrawLocation: area
                });
              }} />
          : null} 

            <Hint value={hoveredCell} topLeft>
              <div style={{background: '#3de285',fontSize:10, color:'black', opacity: 0.9 }}>
                <h3>{hoveredCell.name}</h3>
              </div>
            </Hint>
            
          <XAxis hideLine orientation="top" top={-15} tickTotal={8} style={{
              paddingTop: 15,
              line: {stroke: '#ADDDE1'},
              ticks: {stroke: '#ADDDE1'},
              //text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }}/>
          <YAxis hideLine/>     

        </XYPlot>
        
      </div>
    )
  }
}
//#bcdddc   

//{this.state.hint ? 
//            <div id={'mouser'} style={{fontSize: '15px', marginLeft:'300'}}>
//            {this.state.hint}
//            </div> : null}

//<LabelSeries
//           style={{fontSize: '40px'}}
 //           animation
///            bottomRight
//            data={this.state.timelineMeasures} />  

//<Hint value={hoveredCell}>
//              <div style={{background: 'grey'}}>
//                <h3>Value of hint</h3>
//                <p>{hoveredCell.name}</p>
//              </div>
//            </Hint>
// {this.state.hoveredCell ? <Hint value={{x:this.state.hoveredCell.x, y:this.state.hoveredCell.y}}>
//               <div style={{background: 'lightgrey'}}>
//                 <h3>{this.state.hoveredCell.name}</h3>
//                 <p>{(this.state.hoveredCell.name === 'queue update') ? 'priorityLevel:'+this.state.hoveredCell.priorityLevel : null}</p>
//               </div>
//             </Hint> : null}

// <HorizontalBarSeries onValueRightClick={(d,e)=> {console.log('ima bar',d,e)}} onValueMouseOver={v => this.setState({hoveredCell: v})} onValueMouseOut={v => this.setState({hoveredCell: false})} animation
//             data={this.props.updateQueues.map((queue,i)=>{
//               if (queue.updateque){
//                 return { x0:queue.time/1000, x:queue.time/1000+.0003, y:0, name:"queue update", priorityLevel: queue.updateque.first.priorityLevel}
//               }
//             })}/>
