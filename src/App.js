import React, { Component, useState, useEffect } from "react";
import { nanoid } from "nanoid";

// import githubImg from "./assets/img/github.png";
import styles from "./styles.module.css";

const logs = document.getElementById("logs");

const clearLogBtn = document.getElementById("clearlogs");
clearLogBtn.onclick = (e) => {
  e.preventDefault();
  // console.clear();
  logs.innerHTML = "";
};

const LOG = (newLog) => {
  // if (logs.lastChild !== null && logs.lastChild.innerHTML === newLog.toString())
  //   return;
  let li = document.createElement("li");
  let newId = nanoid(7);
  li.id = newId;
  li.innerHTML = newLog.toString();
  // newLog.toString() + " " + new Date().toLocaleTimeString();
  logs.append(li);
  setTimeout(() => {
    let li = document.getElementById(newId);
    if (li) li.style.backgroundColor = "#ffffff";
  }, 1500);
  logs.scrollTop = logs.scrollHeight;
};

// Extending/Redefining the default console.log (React rendering ways)
function FromConsole() {
  let fromConsole =
    typeof keys === "function" &&
    keys.toString().indexOf("Command Line API") !== -1;
  return fromConsole;
}

const pureConsoleLog = console.log;

console.log = (log) => {
  pureConsoleLog(log);
  if (!FromConsole()) LOG(log);
};

// COMPONENT A
class CompA extends Component {
  // static Log = LOG;

  constructor(props) {
    super(props);
    this.state = {
      a: 0,
      b: props.num,
      mountB: true,
      mountC: true,
    };
    // this.log = LOG;
    // this.log("[Comp A] : Constructor...");
    console.log("[Comp A] : Constructor...");
  }

  static getDerivedStateFromProps(props, state) {
    // LOG("[Comp A] : static getDerivedStateFromProps called...");
    console.log("[Comp A] : static getDerivedStateFromProps called...");
    return { derivedState: props };
  }

  getSnapshotBeforeUpdate(p, ps) {
    // this.log("[Comp A] : getSnapshotBeforeUpdate Called...");
    // console.log(p, ps);
    console.log("[Comp A] : getSnapshotBeforeUpdate Called...");
    pureConsoleLog(p, ps);
    return true;
  }

  componentDidMount() {
    // this.log("[Comp A] : Mounted");
    console.log("[Comp A] : (componentDidMount) Mounted");
  }

  shouldComponentUpdate(p, n) {
    // this.log("[Comp A] : shouldComponentUpdate Called...");
    // console.log(p, n);
    console.log("[Comp A] : shouldComponentUpdate Called...");
    pureConsoleLog(p, n);
    return true;
  }

  componentDidUpdate() {
    // this.log("[Comp A] : Updated");
    console.log("[Comp A] : (componentDidUpdate) Updated");
  }

  componentWillUnmount() {
    // this.log("[Comp A] : Unmounting...");
    console.log("[Comp A] : (componentWillUnmount) Unmounting...");
  }

  inc = () => {
    this.setState(({ a }) => {
      return {
        a: a + 1,
      };
    });
  };

  mountUnmountB = () => {
    this.setState(({ mountB }) => {
      return {
        mountB: !mountB,
      };
    });
  };

  mountUnmountC = () => {
    this.setState(({ mountC }) => {
      return {
        mountC: !mountC,
      };
    });
  };

  changeProps = () => {
    this.setState(({ b }) => {
      return {
        b: b + 1,
      };
    });
  };

  render() {
    // this.log("[Comp A] : Rendering...");
    console.log("[Comp A] : (render) Rendering...");
    return (
      <div className={[styles.comp, styles.compA].join(" ")}>
        <h3>COMPONENT A</h3>
        <p>Props : {JSON.stringify(this.props, null, 2)}</p>
        <p>State : {JSON.stringify(this.state, null, 2)}</p>
        <button onClick={this.inc}>Increment State "a"</button>
        <button onClick={this.mountUnmountB}>
          {this.state.mountB ? "Unmount B" : "Mount B"}
        </button>
        <button onClick={this.mountUnmountC}>
          {this.state.mountC ? "Unmount C" : "Mount C"}
        </button>
        <button onClick={this.changeProps}>
          Increment State "b" (Prop "c" of C)
        </button>
        <div className={styles.compContainer}>
          {this.state.mountB && <CompB a={this.state.a} />}
          {this.state.mountC && <FuncC c={this.state.b} {...this.props} />}
        </div>
      </div>
    );
  }
}

// COMPONENT B
class CompB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //b: "Sample text",
      bVal: 0,
    };
    // this.log = LOG;
    // this.log("[Comp B] : Constructor...");
    console.log("[Comp B] : Constructor...");
  }

  static getDerivedStateFromProps(props, state) {
    // LOG("[Comp B] : static getDerivedStateFromProps called...");
    console.log("[Comp B] : static getDerivedStateFromProps called...");
    return null;
  }

  getSnapshotBeforeUpdate(p, ps) {
    // this.log("[Comp B] : getSnapshotBeforeUpdate Called...");
    // console.log(p, ps);
    console.log("[Comp B] : getSnapshotBeforeUpdate Called...");
    pureConsoleLog(p, ps);
    return true;
  }

  componentDidMount() {
    // this.log("[Comp B] : Mounted");
    console.log("[Comp B] : (componentDidMount) Mounted");
  }

  shouldComponentUpdate(p, n) {
    // this.log("[Comp B] : shouldComponentUpdate Called...");
    // console.log(p, n);
    console.log("[Comp B] : shouldComponentUpdate Called...");
    pureConsoleLog(p, n);
    return true;
  }

  componentDidUpdate() {
    // this.log("[Comp B] : Updated");
    console.log("[Comp B] : (componentDidUpdate) Updated");
  }

  componentWillUnmount() {
    // this.log("[Comp B] : Unmounting...");
    console.log("[Comp B] : (componentWillUnmount) Unmounting...");
  }

  changeVal = () => {
    this.setState(({ bVal }) => {
      return { bVal: bVal + 1 };
    });
  };

  render() {
    // this.log("[Comp B] : Rendering...");
    console.log("[Comp B] : (render) Rendering...");
    const { comp, compB } = styles;
    return (
      <div className={[comp, compB].join(" ")}>
        <h3>COMPONENT B</h3>
        <p>Props : {JSON.stringify(this.props, null, 2)}</p>
        <p>State : {JSON.stringify(this.state, null, 2)}</p>
        <button onClick={this.changeVal}>Change "bVal"</button>
      </div>
    );
  }
}

// FUNCTIONAL C
const FuncC = (props) => {
  const { comp, func } = styles;
  const [cVal, setCVal] = useState({ cVal: 0 });
  // const log = LOG;

  useEffect(() => {
    // log("[Func C] : (from useEffect) Mounted (Deferred)");
    console.log("[Func C] : (useEffect []) Mounted (Deferred)");
    return () => {
      // log("[Func C] : (from useEffect) Unmounting...");
      console.log("[Func C] : (useEffect []) Unmounting...");
    };
  }, []);

  useEffect(() => {
    // log("[Func C] : (from useEffect) Updated (Deferred)");
    console.log("[Func C] : (useEffect [props.c, cVal]) Updated (Deferred)");
  }, [props.c, cVal]);

  useEffect(() => {
    // log("[Func C] : (from useEffect) Updated (Deferred)");
    console.log("[Func C] : (useEffect) Updated (Deferred)");
  });

  // log("[Func C] : Rendering...");
  console.log("[Func C] : Rendering...");
  return (
    <div className={[comp, func].join(" ")}>
      <h3>FUNCTIONAL C</h3>
      <p>Props : {JSON.stringify(props, null, 2)}</p>
      <p>State : {JSON.stringify(cVal, null, 2)}</p>
      <button
        onClick={() =>
          setCVal(({ cVal }) => {
            return { cVal: cVal + 1 };
          })
        }
      >
        Change "cVal"
      </button>
    </div>
  );
};

const App = () => {
  const [mountA, setMountA] = useState(true);
  const remountA = () => {
    setMountA((prev) => !prev);
  };
  // useEffect(() => {
  //   return () => {
  //     console.log = pureConsoleLog;
  //   };
  // });
  return (
    <>
      {/* <div className={styles.githubImgContainer}>
        <img src={githubImg} alt="" />
      </div> */}
      <a href="https://github.com/sidharthism/RCLCV" target="_blank">
        <div className={styles.githubContainer}>Github</div>
      </a>
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
