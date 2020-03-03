import React from 'react';
import ReactDom from "react-dom";

const dotStyle = {
  position: 'absolute',
  background: '#61dafb',
  font: 'normal 15px sans-serif',
  textAlign: 'center',
  cursor: 'pointer',
};

const containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
};

const targetSize = 25;

class Dot extends React.Component {
  constructor() {
    super();
    this.state = { hover: false };
  }
  enter() {
    this.setState({
      hover: true
    });
  }
  leave() {
    this.setState({
      hover: false
    });
  }
  render() {
    const props = this.props;
    const s = props.size * 1.3;
    const style = {
      ...dotStyle,
      width: s + 'px',
      height: s + 'px',
      left: (props.x) + 'px',
      top: (props.y) + 'px',
      borderRadius: (s / 2) + 'px',
      lineHeight: (s) + 'px',
      background: this.state.hover ? '#ff0' : dotStyle.background
    };
    return (
      <div style={style} onMouseEnter={() => this.enter()} onMouseLeave={() => this.leave()}>
        {this.state.hover ? '*' + props.text + '*' : props.text}
      </div>
    );
  }
}

function SierpinskiTriangle({ x, y, s, children }) {
  if (s <= targetSize) {
    return (
      <Dot
        x={x - (targetSize / 2)}
        y={y - (targetSize / 2)}
        size={targetSize}
        text={children}
        key={`${x}-${y}`}
      />
    );
  }
  const slowDown = true;
  if (slowDown) {
    const e = performance.now() + 0.8;
    while (performance.now() < e) {
      // Artificially long execution time.
    }
  }

  s /= 2;

  return [
    <SierpinskiTriangle x={x} y={y - (s / 2)} s={s}>
      {children}
    </SierpinskiTriangle>,
    <SierpinskiTriangle x={x - s} y={y + (s / 2)} s={s}>
      {children}
    </SierpinskiTriangle>,
    <SierpinskiTriangle x={x + s} y={y + (s / 2)} s={s}>
      {children}
    </SierpinskiTriangle>,
  ];
}
SierpinskiTriangle.shouldComponentUpdate = function(oldProps, newProps) {
  const o = oldProps;
  const n = newProps;
  return !(
    o.x === n.x &&
    o.y === n.y &&
    o.s === n.s &&
    o.children === n.children
  );
};

class ExampleApplication extends React.Component {
  constructor() {
    super();
    this.state = { seconds: 0 };
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.intervalID = setInterval(this.tick, 1000);
  }
  tick() {
    ReactDom.unstable_scheduleWork(() => {
      this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
    });
    // this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    const seconds = this.state.seconds;

    return (
      <div style={{ ...containerStyle }} id="anim">
        <div>
          <SierpinskiTriangle x={0} y={0} s={1000}>
            {seconds}
          </SierpinskiTriangle>
        </div>
      </div>
    );
  }
}

export default ExampleApplication;
