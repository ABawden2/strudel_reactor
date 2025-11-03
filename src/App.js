import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import NavBar from './components/NavBar';
import buttonList from './assets/buttonList.json';
import DjPad from './components/DjPad';
import ProcessTextarea from './components/ProcessTextarea';
import groupOptions from './assets/patternOptions.json';
import ReactLogo from './logo.svg';
import '../src/assets/controls.css';
import Graph from './components/Graph';


export default function StrudelDemo() {

  let globalEditor = useRef(null);
  const djPadRef = useRef();
  const hasRun = useRef(false);
  const [processText, setProcessText] = useState(stranger_tune);
  const [d3Data, setD3Data] = useState([]);
 
  function handleD3Data(event) {
    setD3Data(event.detail[event.detail.length - 1]);
  };

  function Proc() {
    if (globalEditor.current) {
      globalEditor.current.setCode(processText);
    }
  }

  function ProcEdit(currentText, replaceText) {
    if (globalEditor.current) {
      let proc_text = processText;
      proc_text = proc_text.replace(proc_text.match(currentText), replaceText);
      document.getElementById('proc').value = proc_text;
      setProcessText(proc_text);
    }
  }

  function Stop() {
    if (globalEditor.current) {
      globalEditor.current.stop()
    }
  }

  function Start() {
    if (globalEditor.current) {
      globalEditor.current.evaluate()
    }
  }

  function SaveJson() {
    if (globalEditor.current) {
      // Saving what the current code is into local storage.
      localStorage.setItem("processText", JSON.stringify(globalEditor.current.code));
    }
  }
  useEffect(() => {
    const editorRoot = document.getElementById('editor');
    // if (editorRoot)
    console.log(editorRoot);
  })

  function LoadJson() {
    if (globalEditor.current) {
      // Loading the saved data from local storage in.
      const retrievedData = localStorage.getItem("processText");
      const parsedData = JSON.parse(retrievedData);
      setProcessText(parsedData);
    }
  }

  // const handleCodeChange = (newText) => {
  //   // parse or derive new data from text
  //   const updatedData = parseTextToData(newText);
  //   setData(updatedData);
  // };

  useEffect(() => {
    if (!hasRun.current) {
      document.addEventListener("d3Data", handleD3Data);
      console_monkey_patch();
      hasRun.current = true;
      //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
          //init canvas
          const canvas = document.getElementById('roll');
          canvas.width = canvas.width * 2;
          canvas.height = canvas.height * 2;
          const drawContext = canvas.getContext('2d');
          const drawTime = [-2, 2]; // time window of drawn haps
          globalEditor.current = new StrudelMirror({
              defaultOutput: webaudioOutput,
              getTime: () => getAudioContext().currentTime,
              transpiler,
              root: document.getElementById('editor'),
              drawTime,
              onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
              prebake: async () => {
                  initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                  const loadModules = evalScope(
                      import('@strudel/core'),
                      import('@strudel/draw'),
                      import('@strudel/mini'),
                      import('@strudel/tonal'),
                      import('@strudel/webaudio'),
                  );
                  await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
              },
          });
      document.getElementById('proc').value = stranger_tune
      console.log("testing", globalEditor.current)
    }
    globalEditor.current.setCode(processText);
  }, [processText]);


  return (
    <div>
        <div> 
          <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"> 
            <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto"> 
              <img src={ReactLogo} alt="Image of react logo" width="60" />
              <h2 class="fs-4">React Strudel Assignment</h2> 
            </div> 
          </header>
        </div>
        <main>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-md-7" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor"/>
                        <div id="output"/>
                    </div>
                    {/* When graph comes in hide this element using the attribute hidden or something else. */}
                    <div className="col-md-5" style={{ maxHeight: '50vh', overflowY: 'auto' }} hidden>
                        <ProcessTextarea defaultValue={processText} onChange={(event) => setProcessText(event.target.value)}/>
                    </div>
                    <div className="col-md-5" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <Graph value={d3Data}/>
                    </div>
                </div>
                <div className="row">
                  <NavBar rowGap="3" buttonList={buttonList} functions={{Start, Stop, SaveJson, LoadJson}}/>
                </div>
                <div className="row">
                  <DjPad rowGap="2" groupOptions={groupOptions} ref={djPadRef} callBack={ProcEdit}/>
                </div>
            </div>
            <canvas id="roll" hidden></canvas>
        </main>
    </div>
  );
}