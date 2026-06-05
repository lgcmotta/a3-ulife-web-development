# Debugging Habits

Debugging is not a punishment for writing imperfect code. It is normal programming work. Every programmer, from a first-semester student to an experienced engineer, spends time comparing what they expected with what actually happened. The difference is that experienced programmers usually follow a routine. They do not change five things at random and hope the problem disappears. They slow down, gather evidence, and test one idea at a time.

The first habit is to reproduce the problem. If a program fails only sometimes, write down the exact input, action, or page state that makes it fail. "It crashed yesterday" is hard to investigate. "It crashes when the grade list is empty" is useful. Reproduction gives you a stable starting point. Without it, you may think a change fixed the bug when you simply failed to trigger it again.

The second habit is to write the expectation. A bug is not just "bad output"; it is a difference between expected and actual behavior. For example: "I expected the average of 8, 7, and 6 to be 7, but the program printed 21." This sentence already points toward the missing division. If the sentence is "I expected the student to be approved, but the program printed rejected", the likely area is the condition or threshold. Clear expectations make clues easier to see.

| Debugging step | Question | Example note |
| --- | --- | --- |
| Reproduce | What exact action causes the problem? | Input grades 8, 7, 6 |
| Expect | What should happen? | Average should be 7 |
| Observe | What actually happened? | Program prints 21 |
| Hypothesize | What might explain the gap? | Sum was not divided by 3 |
| Test | What single change checks the idea? | Add division before printing |

The third habit is to read messages carefully. Error messages often include a file, a line, and a type of problem. They may look intimidating, but they are usually more specific than they first appear. A syntax error says the program could not understand the code. A reference error says a name was used incorrectly or too early. A type error says a value was used in a way that does not match what it is. The [MDN JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) is useful for learning common message patterns, and language documentation for your course language will provide similar references.

The fourth habit is to change one thing at a time. If you rename a variable, change a condition, move a loop, and add a print statement all at once, you will not know which change mattered. A single focused change may feel slower, but it protects understanding. After each change, rerun the same reproduction case. If the result changes, record what changed. If it does not, undo or revise the hypothesis.

Print statements, logs, and debuggers are tools for observing state. A simple print can show the value of a variable at a key point. A debugger can pause execution and let you inspect values step by step. The tool matters less than the question you ask with it. "What is the value of `total` after the loop?" is a good question. "Maybe something is wrong somewhere" is too broad. The [Chrome DevTools debugging guide](https://developer.chrome.com/docs/devtools/javascript/) shows how step-by-step inspection works in browser JavaScript, and the same idea exists in many editors.

Keep a short debugging log when you are stuck. It can be as simple as three columns: observation, hypothesis, result. This prevents circling back to the same failed idea and gives you material for asking for help. A professor or monitor can respond much faster when they see what you tried and what happened.

Finally, confirm the fix. Run the original failing case again. Then run one nearby case that should still work. If you fixed an average calculation, test a normal passing case and a failing case. Bugs can hide when a change fixes one input but breaks another.

## Practice routine

Take a small broken program and resist editing it immediately. Write the expected result, actual result, and one hypothesis. Add only one observation tool, such as a print statement or debugger breakpoint. After testing, decide whether the evidence supports the hypothesis.

## What to do next

For your next programming exercise, keep a debugging log even if the bug is small. The goal is not to produce a formal report. The goal is to practice evidence-based thinking before frustration takes over.
