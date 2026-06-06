# Variables and Flow

A variable is a name for a value at a particular moment in a program. That last phrase is important: at a particular moment. Beginners often read code as if every line is visible at once and every variable has one permanent meaning. A running program is different. It moves through instructions in order, takes branches, repeats loops, and changes stored values. Learning to follow that movement is one of the most useful early programming skills.

Imagine this simple goal: count from 1 to 5 and keep a running total. The variable `count` may begin at 1, while `total` begins at 0. After the first pass, `total` becomes 1. After the second pass, `count` becomes 2 and `total` becomes 3. The names stay the same, but the values change. If a student only reads the loop description, the result may feel mysterious. If the student traces the values, the loop becomes a visible sequence.

| Step | count | total | What happened |
| --- | --- | --- | --- |
| Start | 1 | 0 | Initial values |
| Pass 1 | 1 | 1 | Add count to total |
| Pass 2 | 2 | 3 | Increase count, add again |
| Pass 3 | 3 | 6 | Continue while rule is true |
| Pass 4 | 4 | 10 | Total grows |
| Pass 5 | 5 | 15 | Last allowed value |

This kind of table is called tracing. It is slow at first, but it teaches how program flow actually works. You do not need a special tool to begin. A notebook, a text file, or comments beside the code can work. The goal is to record important values after each meaningful line or loop pass. When a result is wrong, the trace usually shows the first moment where reality separates from expectation.

Conditions are the second part of flow. A condition is a yes-or-no question the program answers while running. "Is the average greater than or equal to seven?" is a condition. "Has the count reached five?" is a condition. Good conditions should be read as questions, not as punctuation. If the answer is yes, one path runs. If the answer is no, another path runs or the current block is skipped.

Loops add repetition. A loop needs three ideas: where it starts, what changes each time, and why it stops. Missing any of those ideas creates common beginner bugs. If the starting value is wrong, the loop may skip useful work. If nothing changes, the loop may never stop. If the stopping rule is wrong, the loop may run one time too many or one time too few. These mistakes are not signs of failure; they are exactly why tracing is useful.

The [Python tutorial on control flow](https://docs.python.org/3/tutorial/controlflow.html) gives readable examples of conditions and loops, even if your class uses another language. The [MDN JavaScript guide to loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) is helpful for seeing the same ideas in a web language. The syntax differs, but the reasoning pattern is shared: values change, conditions choose, loops repeat.

When reading a program, pause at each assignment and ask, "What value does this name hold now?" Pause at each condition and ask, "Which branch runs for my example?" Pause at each loop and ask, "What changed, and is the stopping rule closer?" If you cannot answer, write a trace table. Do not wait until the program breaks. Tracing before running code is a strong way to predict behavior.

This also helps when code uses functions. A function call can be treated as a smaller flow: it receives arguments, creates local values, follows conditions or loops, and returns a result. Beginners sometimes lose track because a function hides details behind a name. Write down the arguments going in and the return value coming out. That small habit turns a function from a black box into a predictable part of the program.

## Practice routine

Pick a loop with two variables. Before running it, create a table with one row for each expected loop pass. Fill in the values by hand. Then run the program and compare the actual output. If the output differs, mark the first row where your prediction and the program disagree.

## What to do next

Trace a short counting loop, then change the starting value or stopping rule. Predict the new result before running it. This builds confidence that you understand the flow, not just the original example.
