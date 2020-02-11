import React,{Component} from 'react'
import {Dimensions, StyleSheet,
  Animated,
  View,
  TouchableWithoutFeedback} from 'react-native'
// var ReactNativeART = require('ReactNativeART');
import {
  Surface,
    Shape,
    Path,
    Group,
    Transform
} from '@react-native-community/art';

var {
  width,
  height
} = Dimensions.get('window');
var MORTAR_RADIUS = 5;
var PARTICLE_RADIUS = 30;
var PARTICLE_COUNT = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
// var {
//   AppRegistry,
//   StyleSheet,
//   Animated,
//   View,
//   TouchableWithoutFeedback
// } = React;
// var {
//     Surface,
//     Shape,
//     Path,
//     Group,
//     Transform
// } = ReactNativeART;
var SHOOTING_COLORS = [
  'rgb(234,238,112)',
  'rgb(245,137,12)'
];
var PARTICLE_COLORS = [
    'rgba(54, 17, 52, 100)',
    'rgba(176, 34, 140, 100)',
    'rgba(234, 55, 136, 100)',
    'rgba(229, 107, 112, 100)',
    'rgba(243, 145, 160, 100)'
]
var AnimatedShape = Animated.createAnimatedComponent(Shape);
var AnimatedGroup = Animated.createAnimatedComponent(Group);
var FireworkShooter = React.createClass({
  getInitialState: function() {
    return {
      fireworks: []
    };
  },
  adjustShootingFill: function(_shootingColor, value) {
    Animated.timing(_shootingColor, {
      duration: 16,
      toValue: _shootingColor.__getAnimatedValue() == 0 ? 1 : 0
    }).start()
  },
  adjustParticleFill: function(_particleColor, value) {
    var _currentFill = _particleColor.__getAnimatedValue(),
        _particleFill = _currentFill === 5 ? 0 : _currentFill + 1;
    Animated.timing(_particleColor, {
      duration: 16,
      toValue: _particleFill
    }).start()
  },
  removeSelf: function(_shootingPosition) {
    this.state.fireworks = this.state.fireworks.filter((firework) => firework.shootingPosition !== _shootingPosition);
    this.setState(this.state);
  },
  _handleAddFirework: function(e) {
    var _shootingPosition = new Animated.ValueXY({x: width/2, y: height - MORTAR_RADIUS});
    var _shootingColor = new Animated.Value(0);
    var _particleColor = new Animated.Value(0);
    var _particleRadius = new Animated.Value(0);
    var _coreOpacity = new Animated.Value(1);
    var _particlePositions = PARTICLE_COUNT.map(() => new Animated.ValueXY({x: 0, y: 0}));
    this.state.fireworks.push({
      shootingPosition: _shootingPosition,
      shootingColor: _shootingColor,
      particleColor: _particleColor,
      particleRadius: _particleRadius,
      coreOpacity: _coreOpacity,
      particlePositions: _particlePositions
    });
    var _animatedParticles = [
        Animated.timing(_particleRadius, {
          duration: 700,
          toValue: 1
        }),
        Animated.timing(_coreOpacity, {
          duration: 200,
          toValue: 0
        })
    ]
    _movingParticles = _particlePositions.map((particle, i) => {
      var _xy = getXYParticle(PARTICLE_COUNT.length, i, PARTICLE_RADIUS);
      return Animated.timing(particle, {
        duration: 250,
        toValue: _xy
      })
    })
    _animatedParticles = _animatedParticles.concat(_movingParticles);
    Animated.sequence([
      Animated.timing(_shootingPosition, {
        duration: 300,
        toValue: {
          y: e.nativeEvent.locationY,
          x: e.nativeEvent.locationX
        }
      }),
      Animated.parallel(_animatedParticles)
    ]).start(this.removeSelf.bind(this, _shootingPosition));
    _shootingPosition.addListener(this.adjustShootingFill.bind(null, _shootingColor));
    _particleRadius.addListener(this.adjustParticleFill.bind(null, _particleColor));
    this.setState(this.state);
  },
  getFireworks: function() {
    return this.state.fireworks.map((firework, i) => {
      var _shootingFill = firework.shootingColor.interpolate({
        inputRange: [0,1],
        outputRange: SHOOTING_COLORS
      });
      var _particleFill = firework.particleColor.interpolate({
        inputRange: [0,1,2,3,4],
        outputRange: PARTICLE_COLORS
      });
      return (
          <AnimatedGroup 
            x={firework.shootingPosition.x}
            y={firework.shootingPosition.y}
          >
                <AnimatedCircle
                  key={i}
                  opacity={firework.coreOpacity}
                  radius={MORTAR_RADIUS}
                  fill={_shootingFill}
                />
                <Group>
                {
                  PARTICLE_COUNT.map((v, j) => {
                    return <AnimatedCircle
                      x={firework.particlePositions[j].x}
                      y={firework.particlePositions[j].y}
                      scaleX={firework.particleRadius}
                      scaleY={firework.particleRadius}
                      radius={PARTICLE_RADIUS}
                      fill={_particleFill}
                    />
                  })
                }
                </Group>
          </AnimatedGroup>
      );
    })
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._handleAddFirework}>
          <View>
            <Surface width={width} height={height}>
              {this.getFireworks()}
            </Surface>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
function getXYParticle(total, i, radius) {
  var angle = 360/total*i;
  var x = Math.round((radius*2) * Math.cos(angle - (Math.PI/2)));
  var y = Math.round((radius*2) * Math.sin(angle - (Math.PI/2)));
  return {
    x: x,
    y: y
  }
}
//Modified this to use the AnimatedShape we create up above. Thanks Facebook :)
/**
 * Copyright 2013-2014 Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Circle.art
 * @typechecks
 *
 * Example usage:
 * <Circle
 *   radius={10}
 *   stroke="green"
 *   strokeWidth={3}
 *   fill="blue"
 * />
 *
 */
var AnimatedCircle = React.createClass({displayName: "Circle",
  render: function() {
    var radius = this.props.radius;
    var path = Path().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
        .close();
    return React.createElement(AnimatedShape, React.__spread({},  this.props, {d: path}));
  }
});
export default FireworkShooter
