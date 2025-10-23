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
import ProcessTextarea from './components/ProcessTextarea';
import patternOptions from './assets/patternOptions.json';
import Range from './components/Range';


const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

  let globalEditor = useRef(null);
  const hasRun = useRef(false);


//   export function Proc() {

//     let proc_text = document.getElementById('proc').value
//     let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//     ProcessText(proc_text);
//     globalEditor.setCode(proc_text_replaced)
// }

// export function ProcessText(match, ...args) {

//     let replace = ""
//     if (document.getElementById('flexRadioDefault2').checked) {
//         replace = "_"
//     }

//     return replace
// }


  function ProcessText(match, ...args) {

      let replace = ""
      if (document.getElementById('flexRadioDefault2').checked) {
          replace = "_"
      }

      return replace
  }
  
  function Proc() {
    if (globalEditor.current) {
      console.log("noteir: ", document.getElementById('control-bassline:'))
      let proc_text = document.getElementById('proc').value
      console.log(proc_text.match(new RegExp(/^\b\w+:\s/gm)))
      let proc_text_replaced = proc_text.replaceAll('bassline:', '_bassline:');//ProcessText);

      // let slider = document.getElementById('sliderId');
      // proc_text_replaced = proc_text_replaced.replace(proc_text.match(new RegExp(/setcps\([0-9]{1,}\/60\/4\)/g)), `setcps(${slider.value}/60/4)`)

      let patternOptions = document.querySelectorAll('[name="patternOptions"]')
      patternOptions.forEach((patternOption) => {
        if (patternOption.checked) {
          console.log(patternOption)
          proc_text_replaced = proc_text_replaced.replace('pattern = 0', `pattern = ${patternOption.value}`)
        }
      })

      globalEditor.current.setCode(proc_text_replaced)
    }
  }

  function ProcEdit(currentText, replaceText) {
    console.log("in here?", currentText, replaceText)
    if (globalEditor.current) {
      let proc_text = document.getElementById('proc').value
      proc_text = proc_text.replace(proc_text.match(currentText), replaceText);

      globalEditor.current.setCode(proc_text)
    }
  }

  // function Proc() {
  //   if (globalEditor.current) {
  //     let proc_text = document.getElementById('proc').value
  
  //     globalEditor.current.setCode(proc_text)
  //   }
  // }

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

  function ProcessText(match, ...args) {

      // console.log("jere ", document.getElementById('flexRadioDefault1'))
      let replace = ""
      // if (document.getElementById('flexRadioDefault1').checked) {
      //     replace = "_"
      // }

      return replace
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
        console.log("globalEditor: ", globalEditor)
        document.getElementById('proc').value = stranger_tune
        Proc()
    }

}, []);


// TODO: somehow allow for speed to change.
// .lpf controls the volume of main arf and base
return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <NavBar rowGap="3" buttonList={buttonList} functions={{Start, Stop, Process, ProcAndPlay}}/>
                        <Range callback={ProcEdit}/>
                    </div>
                </div>
                <div className="row">
                    {/* When graph comes in hide this element using the attribute hidden or something else. */}
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <ProcessTextarea />
                    </div>
                    <div className="col-md-4">
                        <DjPad rowGap="2" checkBoxList={padElements} patternOptions={patternOptions} callback={ProcEdit}/>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);
}