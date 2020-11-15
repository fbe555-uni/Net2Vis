import React from "react";
import PropTypes from "prop-types";

import * as paths from "../../paths";

const NameLabelComponent = ({
  name,
  x,
  layer_height,
  extreme_dimensions,
  layer,
  edges,
  features_above,
}) => {
  const y_diff = [
    (extreme_dimensions.max_size - layer_height[0]) / 2,
    (extreme_dimensions.max_size - layer_height[1]) / 2,
  ]; // Calculate the vertical difference to center the Glyph
  let y_pos = [y_diff[1] + layer_height[1], y_diff[0] + layer_height[0]]; // Vertical Position of bottom-right and bottom-left Points
  if (layer.layer.properties.input.length > 1) {
    const position_reduced = paths.reducePosition(
      paths.getIncomingEdges(layer, edges)
    ); // Get the y positions of the straight parts of alloutgoing edges
    const y_off = Math.max(...position_reduced) - layer.y; // Calculate the Offset of the current Input Layer to this Layer
    y_pos[1] = y_pos[1] + y_off;
  } else if (layer.layer.properties.output.length > 1) {
    const position_reduced = paths.reducePosition(
      paths.getOutgoingEdges(layer, edges)
    ); // Get the y positions of the straight parts of alloutgoing edges
    const y_off = Math.max(...position_reduced) - layer.y; // Calculate the Offset of the current Input Layer to this Layer
    y_pos[0] = y_pos[0] + y_off;
  }
  let y = Math.max(y_pos[0], y_pos[1]);
  y = features_above ? y + 12 + 5 : y;
  return (
    <text textAnchor="middle" x={x} y={y + 5 + 12} fontSize="12">
      {name}
    </text>
  );
};

// Proptypes of ToggleBurttons
NameLabelComponent.propTypes = {
  name: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  layer_height: PropTypes.array.isRequired,
  extreme_dimensions: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  edges: PropTypes.array.isRequired,
  features_above: PropTypes.bool.isRequired,
};

export default NameLabelComponent;
