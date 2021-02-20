import React, { Component, useState, useEffect } from "react";
import { nanoid } from "nanoid";

// import githubImg from "./assets/img/github.png";
import styles from "./styles.module.css";

const logs = document.getElementById("logs");

const clearLogBtn = document.getElementById("clearlogs");
clearLogBtn.onclick = (e) => {
  e.preventDefault();
  logs.innerHTML = "";
};

const LOG = (newLog) => {
  if (logs.lastChild !== null && logs.lastChild.innerHTML === newLog.toString())
    return;
  let li = document.createElement("li");
  let newId = nanoid(7);
  li.id = newId;
  li.innerHTML = newLog.toString();
  // newLog.toString() + " " + new Date().toLocaleTimeString();
  logs.append(li);
  setTimeout(() => {
    let li = document.getElementById(newId);
    // console.log(li.sty, newId);
    li.style.backgroundColor = "#ffffff";
  }, 1500);
};

class CompA extends Component {
  // static Log = LOG;

  constructor(props) {
    super(props);
    this.state = {
      a: 0,
      mountB: true,
    };
    this.log = LOG;
    this.log("[Comp A] : Constructor...");
    // console.log("[Comp A] : Constructor...");
  }

  static getDerivedStateFromProps(props, state) {
    LOG("[Comp A] : static getDerivedStateFromProps called...");
    return { derivedState: props };
  }

  getSnapshotBeforeUpdate(p, ps) {
    this.log("[Comp A] : getSnapshotBeforeUpdate Called...");
    console.log(p, ps);
    return true;
  }

  componentDidMount() {
    this.log("[Comp A] : Mounted");
  }

  shouldComponentUpdate(p, n) {
    this.log("[Comp A] : shouldComponentUpdate Called...");
    console.log(p, n);
    return true;
  }

  componentDidUpdate() {
    this.log("[Comp A] : Updated");
  }

  componentWillUnmount() {
    this.log("[Comp A] : Unmounting...");
  }

  inc = () => {
    let prevState = this.state.a;
    this.setState({
      a: prevState + 1,
    });
  };

  mountUnmountB = () => {
    this.setState({
      mountB: !this.state.mountB,
    });
  };

  render() {
    this.log("[Comp A] : Rendering...");
    return (
      <div className={[styles.comp, styles.compA].join(" ")}>
        <h3>COMPONENT A</h3>
        <p>Props : {JSON.stringify(this.props, null, 2)}</p>
        <p>State : {JSON.stringify(this.state, null, 2)}</p>
        <button onClick={this.inc}>Increment</button>
        <button onClick={this.mountUnmountB}>
          {this.state.mountB ? "Unmount B" : "Mount B"}
        </button>
        <div className={styles.compContainer}>
          {this.state.mountB && <CompB a={this.state.a} />}
          <FuncC {...this.props} />
        </div>
      </div>
    );
  }
}

class CompB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      b: "Sample text",
    };
    this.log = LOG;
    this.log("[Comp B] : Constructor...");
  }

  static getDerivedStateFromProps(props, state) {
    LOG("[Comp B] : static getDerivedStateFromProps called...");
    return null;
  }

  getSnapshotBeforeUpdate(p, ps) {
    this.log("[Comp B] : getSnapshotBeforeUpdate Called...");
    console.log(p, ps);
    return true;
  }

  componentDidMount() {
    this.log("[Comp B] : Mounted");
  }

  shouldComponentUpdate(p, n) {
    this.log("[Comp B] : shouldComponentUpdate Called...");
    console.log(p, n);
    return true;
  }

  componentDidUpdate() {
    this.log("[Comp B] : Updated");
  }

  componentWillUnmount() {
    this.log("[Comp B] : Unmounting...");
  }

  render() {
    this.log("[Comp B] : Rendering...");
    const { comp, compB } = styles;
    return (
      <div className={[comp, compB].join(" ")}>
        <h3>Component B</h3>
        <p>Props : {JSON.stringify(this.props, null, 2)}</p>
        <p>State : {JSON.stringify(this.state, null, 2)}</p>
      </div>
    );
  }
}

const FuncC = (props) => {
  const { comp, func } = styles;
  const log = LOG;

  log("[Func C] : Rendering...");

  useEffect(() => {
    // log("[Func C] : Mounted");
    return () => {
      log("[Func C] : Unmounting...");
    };
  }, []);

  // useEffect(() => {
  //   log("[Func C] : Updating...");
  // });
  return (
    <div className={[comp, func].join(" ")}>
      <h3>FUNCTIONAL C</h3>
      <p>Props : {JSON.stringify(props, null, 2)}</p>
    </div>
  );
};

const App = () => {
  const [mountA, setMountA] = useState(true);
  const remountA = () => {
    setMountA((prev) => !prev);
  };
  return (
    <>
      {/* <div className={styles.githubImgContainer}>
        <img src={githubImg} alt="" />
      </div> */}
      <div className={styles.githubContainer}>Github</div>
      <div className={styles.header}>
        <h2 className={styles.headerText}>
          React Component Life Cycle Visualizer
        </h2>
      </div>
      <div className={styles.App}>
        <button onClick={remountA}>
          {mountA ? "Unmount " : "Remount "}Component A
        </button>
        {mountA && <CompA num={7} />}
      </div>
      <div className={styles.footer}>
        <p className={styles.footerText}>
          <a href="https://github.com/sidharthism" target="_blank">
            © @sidharthism
          </a>
        </p>
      </div>
    </>
  );
};

export default App;
