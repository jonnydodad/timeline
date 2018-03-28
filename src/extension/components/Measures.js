import React from 'react'
import {yType, XYPlot, XAxis, YAxis, LineSeries, Hint, LabelSeries, HorizontalBarSeries} from 'react-vis';
// import HorizontalBarSeries from './HorizontalBarSeries'
import Highlight from './Highlight'
import {Decimal} from 'decimal.js';
//console.log(HorizontalBarSeries)
const colorCache = {}
function buildHierarchy(data) {

  let stack = [0]
  let lastEndTime;
  let result = []

  for (var i = 0; i < data.length; i++) {
    let datum = { name: data[i].name, startTime:data[i].startTime, duration:data[i].duration, line:null };
    if (!colorCache[i]) colorCache[i] = Math.random()*0.3;
    datum["color"] = colorCache[i]
    while (data[i].startTime >= stack[stack.length-1] && stack.length >= 0){
      stack.pop();
    }
  
    datum["line"] = stack.length+1;
    result.push(datum);
    let ST = new Decimal(data[i].startTime)
    let dur = new Decimal(data[i].duration)
    lastEndTime = ST.plus(dur);
    stack.push(lastEndTime)

  }
  return result;
};

export class Measures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastDrawLocation: null,
      zoom: false,
      hoveredCell: false,
      measures: false,
      color: false,
      hint: false
    }
  }

  componentDidMount(){
   this.buildData();
  }

  componentWillReceiveProps(){
    this.buildData();
  }

  buildData = () => {
    this.setState({
      measures: buildHierarchy(this.props.rawMeasures).map((measure,i)=>{
              return { x0:measure.startTime/10000, x:(measure.startTime + measure.duration)/10000, y:measure.line, name:measure.name, label: measure.name, color: measure.color}
            })
    })
  }
   
  render(){
    const {lastDrawLocation, hoveredCell} = this.state;
    return (
      <div>
        <button onClick={() => {
          this.setState({lastDrawLocation: null});
        }}>
          Reset Zoom
        </button>
         <button onClick={() => {
          this.setState({zoom: !this.state.zoom});
        }}>
          Zoom Tool
        </button>
        
          {this.state.hint ? 
            <div id={'mouser'} style={{fontSize: '15px'}}>
            {this.state.hint}
            </div> : null}
        
        <XYPlot
          style={{background: '#bcdddc'}}
          margin={{left: 80, right: 0, top: 20, bottom: 40}}
          xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
          yType={'ordinal'}
          width={1000}
          height={150}
          colorType="linear"
          colorDomain={[0, 1]}
          colorRange={['white','lightblue']}
          >

          <HorizontalBarSeries 
          stroke={'grey'}
          onValueMouseOver={v => { if (!this.state.zoom) this.setState({hint:v.name,  hoveredCell: v.x && v.y ? v : false})}}
          onValueMouseOut={v => this.setState({hoveredCell: false})} 
          animation 
          
          getLabel={d => d.name}
          data={this.state.measures}/>
          
          {(this.state.zoom) ? 
              <Highlight color={'red'} onBrushEnd={(area) => {
                this.setState({
                  lastDrawLocation: area
                });
              }} />
          : null}   
          <XAxis />
          <YAxis />         
        </XYPlot>
      </div>
    )
  }
}

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
