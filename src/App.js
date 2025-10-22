import './App.css';
import { useEffect, useRef } from "react";
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
import padElements from './assets/padElements.json';
import DjPad from './components/DjPad';


let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function SetupButtons() {

    // document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    // document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    // document.getElementById('process').addEventListener('click', () => {
    //     Proc()
    // }
    // )
    // document.getElementById('process_play').addEventListener('click', () => {
    //     if (globalEditor != null) {
    //         Proc()
    //         globalEditor.evaluate()
    //     }
    // }
    // )
}



export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started === true) {
        console.log("her", globalEditor)
        Proc()
        globalEditor.evaluate();
    }
}

export function Proc() {

    console.log(document.getElementById('proc'))
    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    console.log("here", proc_text_replaced)
    globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault1').checked) {
        replace = "_"
    }

    return replace
}

export default function StrudelDemo() {

const hasRun = useRef(false);

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
            globalEditor = new StrudelMirror({
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
        SetupButtons()
        Proc()
    }

}, []);

// let thing = [
//   // If not selected button is on/ element is playing
//   {
//     checked: "false",
//     buttonValue: "flexRadioDefault", 
//     buttonId: "flexRadioDefault1",
//     buttonName: "p1: Hush",
//     buttonCols: "4",
//     buttonColour: "outline-primary",
//     callBack: ""
//   }
// ]


let patternOptions = [
  {
    buttonValue: "1", 
    buttonId: "patternOptions1",
    buttonName: "1",
    buttonGroupName: "patternOptions",
    buttonColour: "outline-primary",
    callBack: ""
  },
  {
    buttonValue: "2", 
    buttonId: "patternOptions2",
    buttonName: "2",
    buttonGroupName: "patternOptions",
    buttonColour: "outline-primary",
    callBack: ""
  },
  {
    buttonValue: "3", 
    buttonId: "patternOptions3",
    buttonName: "3",
    buttonGroupName: "patternOptions",
    buttonColour: "outline-primary",
    callBack: ""
  },
]

return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                        <textarea className="form-control" rows="15" id="proc" ></textarea>
                    </div>
                    <div className="col-md-4">
                        <NavBar rowGap="3" buttonList={buttonList}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <DjPad rowGap="2" checkBoxList={padElements} patternOptions={patternOptions}/>
                        {/* <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                p1: ON
                            </label>
                        </div> */}
                        {/* <DjPad checked="true" buttonValue="flexRadioDefault" buttonId="flexRadioDefault2" buttonName="p1: HUSH" callBack="ProcAndPlay"/> */}
                        {/* <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                p1: HUSH
                            </label>
                        </div> */}
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);

      //   className="mb-2"
      //   id="toggle-check"
      //   type="checkbox"
      //   variant="outline-primary"
      //   checked={checked}
      //   value={props.value}
      //   onChange={(e) => setChecked(e.currentTarget.checked)}
      // >
      //   {props.buttonName}


}