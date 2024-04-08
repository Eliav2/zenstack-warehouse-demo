import { useEffect, useRef, useState } from "react";

const useRerender = () => {
  const [, setRender] = useState({});
  return () => setRender({});
};

interface Options {
  delay: number;
  desiredSentence: number;
  enabledInit?: number;
}

type AnimatedText =
  | string
  | {
      delay?: number;
      // wait time in milliseconds before starting the animation
      waitBeforeStart?: number;
      text: string;
      onEnd?: () => void;
    };

export const useAnimatedText = (
  sentences: AnimatedText[],
  options: Options,
) => {
  const firstSentence =
    typeof sentences[0] === "string" ? sentences[0] : sentences[0].text;
  const [output, setOutput] = useState(firstSentence);
  const render = useRerender();
  const outputRef = useRef(output);
  // const indexRef = useRef(0);
  const activeSentence = useRef(options.desiredSentence);
  // const [activeSentence, setCurrentlyEnabled] = useState(options.enabled);
  // console.log(options.desiredSentence, activeSentence.current);
  const delayRef = useRef(options.delay);
  const enabledRef = useRef(options.desiredSentence);

  const state = useRef<
    // normal flow
    | "normal"
    // indicates if the current animation is a fallback (happens if enabled is changed during animation to an lower index then the current index)
    | "fallback"
  >("normal");

  const animationId = useRef<number>(null);
  const animationOn = useRef(false);
  const targetText = useRef("");
  // console.log(
  //   "activeSentence.current",
  //   activeSentence.current,
  //   enabledRef.current,
  //   delayRef.current,
  // );
  // console.log(
  //   "root",
  //   activeSentence.current,
  //   enabledRef.current,
  //   `"${output}"`,
  // );
  const parseSentence = () => {
    const targetAnimated = sentences[activeSentence.current];
    if (!targetAnimated) return;

    const _targetAnimated =
      typeof targetAnimated === "string"
        ? {
            text: targetAnimated,
            delay: options.delay,
          }
        : { ...targetAnimated, delay: targetAnimated.delay ?? options.delay };
    targetText.current = _targetAnimated.text;
    delayRef.current = _targetAnimated.delay;
    return _targetAnimated;
  };

  function nextCharAnimation() {
    const targetAnimated = parseSentence();
    if (!targetAnimated) return;
    const _targetAnimated = targetAnimated;

    // console.log("targetText.current", targetText.current);
    // console.log("targetText.current", targetText.current);
    // if (typeof targetAnimated !== "string") {
    //   delayRef.current = targetAnimated.delay ?? options.delay;
    // } else {
    //   delayRef.current = options.delay;
    // }
    const waitBeforeStart =
      typeof targetAnimated === "string"
        ? 0
        : targetAnimated.waitBeforeStart || 0;

    function animate() {
      animationOn.current = true;
      const charecterTimer = setTimeout(() => {
        // console.log("setTimeout!");

        const exit = () => {
          // console.log("DONE");
          animationOn.current = false;
          return clearTimeout(charecterTimer);
        };

        const removeChar = () => {
          outputRef.current = outputRef.current.slice(0, -1);
        };

        const addChar = () => {
          outputRef.current =
            outputRef.current +
            targetText.current.charAt(outputRef.current.length);
        };

        const nextSentence = () => {
          // console.log("nextSentence");
          _targetAnimated.onEnd?.();
          activeSentence.current++;
          render();
        };

        const prevSentence = () => {
          // console.log("prevSentence");
          activeSentence.current--;
          render();
        };

        // console.log("setTimeout", activeSentence.current, enabledRef.current);

        if (
          enabledRef.current < 0 ||
          activeSentence.current >= sentences.length
        ) {
          animationOn.current = false;
          return;
        }

        // console.log(enabledRef.current, activeSentence.current);
        // if the activeSentence is less then the requested sentence
        // if (enabledRef.current < activeSentence.current) {
        //   console.log("down!");
        //   prevSentence();
        // } else if (enabledRef.current < activeSentence.current) {
        //   console.log("up!");
        //   nextSentence();
        // } else
        // if (state.current === "fallback") {
        //   console.log("fallback!", targetText.current);
        //   // if (enabledRef.current < activeSentence.current) {
        //   //   console.log("down!");
        //   //   prevSentence();
        //   // }
        //   //
        //   // console.log(targetText.current);
        //   if (enabledRef.current < activeSentence.current) {
        //     prevSentence();
        //   } else {
        //     // nextSentence();
        //   }
        //   state.current = "normal";
        // } else
        // if (activeSentence.current === enabledRef.current) {
        //   if (
        //     // if the current index is less than the target text length
        //     outputRef.current.length < targetText.current.length &&
        //     targetText.current.startsWith(
        //       outputRef.current.slice(0, outputRef.current.length),
        //     )
        //   ) {
        //     // console.log("add");
        //     // Add a character
        //     // outputRef.current =
        //     //   outputRef.current.slice(0, outputRef.current.length) +
        //     //   targetText.current.charAt(outputRef.current.length);
        //     addChar();
        //   } else if (
        //     outputRef.current.length > targetText.current.length &&
        //     targetText.current !== outputRef.current
        //   ) {
        //     // removes a charecter
        //     // console.log("remove");
        //
        //     // outputRef.current = outputRef.current.slice(0, -1);
        //     removeChar();
        //   }
        // }
        if (
          // if the current index is less than the target text length
          outputRef.current.length < targetText.current.length &&
          targetText.current.startsWith(
            outputRef.current.slice(0, outputRef.current.length),
          )
        ) {
          // console.log("add");
          // Add a character
          // outputRef.current =
          //   outputRef.current.slice(0, outputRef.current.length) +
          //   targetText.current.charAt(outputRef.current.length);
          addChar();
        } else if (
          // the current output is longer than the target
          outputRef.current.length > targetText.current.length &&
          // not the same string yet
          targetText.current !== outputRef.current
        ) {
          // removes a character
          // console.log("remove");

          // outputRef.current = outputRef.current.slice(0, -1);
          removeChar();
        } else {
          // the strings here are the same length

          // console.log("equal");

          if (outputRef.current !== targetText.current) {
            // if not string same, then start removing characters
            // console.log("words are not the same");
            removeChar();
          } else {
            // the words are the same, now check if we are at the target sentence
            // proceed to the next word if available
            if (activeSentence.current < enabledRef.current) {
              // console.log("next word", activeSentence);
              // _targetAnimated.onEnd?.();
              // activeSentence.current++;
              // render();
              nextSentence();
            } else if (activeSentence.current > enabledRef.current) {
              // go back to the previous word if asked
              prevSentence();
            } else {
              // the word is the same, and we are at the target sentence
              return exit();
              // console.log(
              //   "!activeSentence.current!",
              //   activeSentence.current,
              //   enabledRef.current,
              // );
              // console.log("DONE");
            }
          }
        }
        setOutput(outputRef.current);
        animationOn.current = false;
        nextCharAnimation();
      }, delayRef.current);
      // console.log("delayRef.current", delayRef.current);
      return charecterTimer;
    }

    return animate();
  }

  // Update the ref whenever options.enabled changes
  useEffect(() => {
    enabledRef.current = options.desiredSentence;

    // allow the animation to proceed if the difference between the current and desired sentence is 1
    if (Math.abs(activeSentence.current - options.desiredSentence) <= 1) {
      const sentence =
        sentences[
          activeSentence.current -
            -1 * (activeSentence.current - options.desiredSentence)
        ];
      // console.log("sentence", sentence);
      if (sentence && typeof sentence !== "string") {
        if (activeSentence.current > options.desiredSentence) {
          sentence.onEnd?.();
        } else if (activeSentence.current < options.desiredSentence) {
          sentence.onEnd?.();
        }
      }
      activeSentence.current = options.desiredSentence;
    }
    // activeSentence.current = options.desiredSentence;
    // if (enabledRef.current < activeSentence.current && animationOn.current)
    //   state.current = "fallback";
  }, [options.desiredSentence]);

  useEffect(() => {
    if (enabledRef.current < 0 || activeSentence.current >= sentences.length) {
      return;
    }

    if (!animationOn.current) {
      // console.log("enter!");
      animationId.current = nextCharAnimation();
    }
    return () => {
      // console.log("clear!");
      // if (animationOn.current) {
      // clearTimeout(animationId.current);
      // }
      // animationId.current = 0;
    };
  }, [JSON.stringify(sentences), JSON.stringify(options)]);

  const reset = () => {
    outputRef.current = "";
    activeSentence.current = options.enabledInit || 0;
    setOutput("");
  };

  return { text: output, reset };
};

// import { useEffect, useRef, useState } from "react";
//
// interface Options {
//   delay: number;
//   enabled: number;
// }
//
// export const useAnimatedText = (texts: string[], options: Options) => {
//   const [output, setOutput] = useState("");
//   const outputRef = useRef(output);
//   const indexRef = useRef(0);
//   const currentEnabled = useRef(options.enabled);
//
//   useEffect(() => {
//     if (options.enabled < 0 || options.enabled >= texts.length) {
//       return;
//     }
//
//     const timer = setInterval(() => {
//       const targetText = texts[currentEnabled.current];
//       let newOutput = outputRef.current;
//
//       if (indexRef.current < targetText.length) {
//         // Add a character
//         newOutput =
//             outputRef.current.slice(0, indexRef.current) +
//             targetText.charAt(indexRef.current);
//         indexRef.current++;
//       } else if (outputRef.current.length > targetText.length) {
//         // Remove a character
//         newOutput = outputRef.current.slice(0, -1);
//       } else if (currentEnabled.current < options.enabled) {
//         // Move to the next text
//         currentEnabled.current++;
//         indexRef.current = 0;
//       } else {
//         clearInterval(timer);
//       }
//
//       if (newOutput !== outputRef.current) {
//         outputRef.current = newOutput;
//         setOutput(newOutput);
//       }
//     }, options.delay);
//     return () => clearInterval(timer);
//   }, [texts, options.delay, options.enabled]);
//
//   return output;
// };
