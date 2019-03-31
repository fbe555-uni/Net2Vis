import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as legend from '../../legend';
import * as colors from '../../colors';

import ComplexLegendItem from './ComplexLegendItem';

class LegendItem extends React.Component {
  render() {
    const stroke_color = this.props.preferences.no_colors.value ? 'grey' : colors.darkenColor(this.props.representation.layer.representer.setting.color);
    const style = {
      fill: this.props.preferences.no_colors.value ? this.props.representation.layer.representer.setting.texture : this.props.representation.layer.representer.setting.color,
      stroke: this.props.representation.layer.active ? stroke_color : 'lightgrey',
      strokeLinejoin: 'round',
      strokeWidth: this.props.legend_preferences.stroke_width.value
    };  
    if (this.props.selected === this.props.representation.layer.representer.name) {
      style.stroke = 'red'
    }
    const textStyle = {
      fill: this.props.representation.layer.active ? 'black' : 'lightgrey'
    };
    if (this.props.representation.layer.trivial) {
      return (
        <g>
          <text textAnchor='middle' x={this.props.representation.position + (this.props.representation.layer.width / 2.0)} y={this.props.legend_preferences.layer_height.value + 5 + 12} style={textStyle}>{this.props.representation.layer.representer.setting.alias}</text>
          <rect x={this.props.representation.position} y='0' width={this.props.legend_preferences.layer_width.value} height={this.props.legend_preferences.layer_height.value} style={style} onClick={() => this.props.action(this.props.representation.layer.representer.name)}/>
        </g>
      ) 
    } else {
      const graph = this.props.representation.layer.graph;
      var nodes = [];
      graph.nodes().forEach(function(e) {
        nodes.push(graph.node(e));
      });
      var edges = [];
      graph.edges().forEach(function(e) {
        edges.push({v: e.v, w: e.w, points: graph.edge(e)});
      });
      var displacement = nodes[legend.getInputNode(nodes)].y - (this.props.legend_preferences.layer_height.value / 2.0); // Calculate the displacement if an inputnode to a legenditem is not standardly placed in the legend 
      return (
        <g>
          <rect x={this.props.representation.position} y='0' width={this.props.legend_preferences.layer_width.value} height={this.props.legend_preferences.layer_height.value} style={style} onClick={() => this.props.action(this.props.representation.layer.representer.name)}/>
          <text textAnchor='middle' x={this.props.representation.position + this.props.legend_preferences.layer_width.value + (this.props.legend_preferences.complex_spacing.value / 2.0)} y={this.props.legend_preferences.layer_height.value / 2.0 + 6} style={textStyle}>=</text>
          <g transform={`translate(0, ${-(displacement + (this.props.legend_preferences.layer_height.value / 2.0))})`}>
            <text textAnchor='middle' x={this.props.representation.position + (this.props.representation.layer.width / 2.0)} y={this.props.representation.layer.height + (this.props.legend_preferences.layer_height.value / 2.0) + 5 + 12} style={textStyle}>{this.props.representation.layer.representer.setting.alias}</text>
            {nodes.map((layer, i) => 
              <ComplexLegendItem layer={layer} edges={edges} position={this.props.representation.position} active={this.props.representation.layer.active} height={graph.graph().height} key={i} action={this.props.action}/>
            )}
          </g>
        </g>
      ) 
    }
  }
}

// PropTypes of this Class
LegendItem.propTypes = {
  groups: PropTypes.array.isRequired,
  legend_preferences: PropTypes.object.isRequired,
  preferences: PropTypes.object.isRequired
}

// Map the State of the Application to the Props of this Class
function mapStateToProps(state, ownProps) {
  return {
    groups: state.groups,
    legend_preferences: state.legend_preferences,
    preferences: state.preferences
  };
}

export default connect(mapStateToProps, undefined)(LegendItem);