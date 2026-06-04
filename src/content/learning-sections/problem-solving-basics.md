# Problem-Solving Basics

Programming beginners often believe the hard part starts when they write the first line of code. Diogenes would disagree. The hard part usually begins a few minutes earlier, when the exercise is still a small story written in natural language and the student has not yet decided what the program receives, what it must produce, and what steps connect those two points. A clear problem plan does not make syntax unnecessary, but it gives syntax a job to do.

Start by reading the exercise as if you were explaining it to a classmate. Do not search for loops, variables, or functions immediately. First ask: What information arrives from outside the program? What final answer should the program show or return? What rules limit the answer? A grade average calculator, for example, may receive three grades, calculate their arithmetic mean, and print a message such as "approved" only when the mean reaches a required threshold. Before code exists, the student can already describe inputs, output, calculation, and decision rule.

| Planning question | What to write down | Example for grade average |
| --- | --- | --- |
| What comes in? | The values the program must receive | Three numeric grades |
| What goes out? | The result the user or caller needs | Average and approval message |
| What rules apply? | Constraints, thresholds, or special cases | Passing average is 7.0 |
| What can I test by hand? | One small example with expected result | 8, 7, 6 gives average 7 |

After that, write a short plan in ordered steps. Keep the steps plain: "read the three grades", "add the grades", "divide by three", "compare the average with seven", "show the result." This plan is not pseudocode yet. It is a bridge between the assignment and the code. If one of the steps sounds vague, that is useful evidence. "Process the grade" is too vague because it hides whether the program should add, divide, compare, round, or display.

A useful beginner routine is the input-output-steps-example pattern:

1. Name the inputs.
2. Name the output.
3. List the steps in order.
4. Work through one example by hand.
5. Only then choose syntax.

The example by hand matters because it gives you a target. If you calculate that 8, 7, and 6 should produce 7.0 and "approved", your program has something concrete to match. When the program produces 21, you know the addition happened but the division did not. When it produces "approved" for an average of 5, you know the comparison rule is wrong. This turns debugging into comparison instead of guessing.

This habit also supports communication. If you ask for help and can say "my inputs are three grades, my expected average is 7, but my program prints 21", the helper can focus on the missing operation. If you only say "my code does not work", the helper must reconstruct the whole problem before helping. Good questions often begin with good plans.

For broader practice, the [Khan Academy introduction to algorithms](https://www.khanacademy.org/computing/computer-science/algorithms) shows how step-by-step procedures can be described before implementation. The [MDN glossary entry for algorithm](https://developer.mozilla.org/en-US/docs/Glossary/Algorithm) is also a concise reminder that a program is built around a finite set of instructions for solving a problem.

When exercises become larger, keep the same structure but divide the work into smaller parts. A shopping cart total may need a subtotal, a discount rule, a tax rule, and a final message. Each part can have its own inputs, output, and hand-checked example. You are not trying to design a perfect system at the beginning. You are making the next line of reasoning visible enough to trust.

## Practice routine

Choose a small exercise and do not code for five minutes. Write the input, output, rules, and one example. Then show the plan to a classmate or read it aloud. If the plan can be understood without the assignment text, it is probably clear enough to start coding. If not, revise the plan before opening the editor.

## What to do next

Take the grade-average calculator and write two examples: one passing and one failing. Keep them beside you while coding. When the program runs, compare its output with those examples before changing anything else.
