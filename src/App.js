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


const handleD3Data = (event) => {
    console.log(event.detail);
};

// drum structure


export default function StrudelDemo() {

  let globalEditor = useRef(null);
  const hasRun = useRef(false);
  const [processText, setProcessText] = useState(stranger_tune);

 
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


  // Done automatically so there is no point for these buttons.
  // TODO: Remove later!!
  function Process() {
    if (globalEditor.current) {
      Proc()
    }
  }

  function ProcAndPlay() {
    if (globalEditor.current) {
      Proc()
      globalEditor.current.evaluate()
    }
  }

  function SaveJson() {
    if (globalEditor.current) {
      console.log('save')
    }
  }

  function LoadJson() {
    if (globalEditor.current) {
      console.log('load')
    }
  }

  function DeleteJsonData() {
    if (globalEditor.current) {
      console.log('delate')
    }
  }

useEffect(() => {

    if (!hasRun.current) {
      console.log(handleD3Data)
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
    }
    globalEditor.current.setCode(processText);

}, [processText]);


// .lpf controls the volume of main arf and base
return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    {/* When graph comes in hide this element using the attribute hidden or something else. */}
                    <div className="col-md-5" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <ProcessTextarea defaultValue={processText} onChange={(event) => setProcessText(event.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <NavBar rowGap="3" buttonList={buttonList} functions={{Start, Stop, Process, ProcAndPlay, SaveJson, LoadJson, DeleteJsonData}}/>
                    </div>
                    <div className="col-md-8">
                        <DjPad rowGap="2" groupOptions={groupOptions} callBack={ProcEdit}/>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);
}