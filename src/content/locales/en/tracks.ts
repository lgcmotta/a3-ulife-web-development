import type { LearningTrack } from "@/content/types";

export const learningTracks: LearningTrack[] = [
  {
    slug: "programming-foundations",
    title: "Programming Foundations",
    summary: "Build the habits behind clear programs before focusing on syntax alone.",
    description:
      "This track helps beginners slow down, describe a problem, follow how values change, and debug with evidence. It is designed for students who feel unsure where to begin when an exercise is placed in front of them.",
    recommendedFor: "Students writing their first programs or returning after a difficult first course.",
    outcome:
      "After this track, students can plan a small program, trace its behavior, and use a repeatable debugging routine.",
    topics: [
      {
        slug: "problem-solving-basics",
        trackSlug: "programming-foundations",
        title: "Problem-Solving Basics",
        summary:
          "Learn how to translate a programming exercise into inputs, outputs, constraints, and a short plan before writing code.",
        whyItMatters:
          "Many beginner mistakes happen before the first line of code. A student may understand the syntax but still be unsure what the program should receive, calculate, or return. Planning the problem in plain language makes the code easier to write, explain, and test.",
        studyNext:
          "Choose one small exercise, write the input and output in one sentence each, then list three steps the program must follow before coding.",
        keyIdeas: [
          "Identify the information the program receives",
          "State the result the program must produce",
          "Break the work into ordered actions",
          "Check one sample case by hand",
        ],
        practicePrompt:
          "Plan a grade-average calculator without code: name the input values, the calculation, and the message a student should see at the end.",
        professorNote:
          "Diogenes would ask for the story of the solution first. If you cannot explain the steps to a classmate, the computer will not make them clearer for you.",
      },
      {
        slug: "variables-and-flow",
        trackSlug: "programming-foundations",
        title: "Variables and Flow",
        summary:
          "Understand how stored values, conditions, and repetition shape the path a program follows.",
        whyItMatters:
          "Variables are not just names on a page; they are the memory of the program at a specific moment. Conditions and loops decide which instructions run next. When students learn to trace those changes, confusing code becomes a sequence they can inspect.",
        studyNext:
          "Trace a short program line by line and keep a table showing the value of each variable after every important step.",
        keyIdeas: [
          "Track variable values as program state",
          "Read conditions as yes-or-no decisions",
          "Describe loops by their stopping rule",
          "Use tracing to find where expectations change",
        ],
        practicePrompt:
          "Create a trace table for a loop that counts from 1 to 5 and records the running total after each pass.",
        professorNote:
          "A loop is easier to trust when you know when it starts, what changes each time, and why it eventually stops.",
      },
      {
        slug: "debugging-habits",
        trackSlug: "programming-foundations",
        title: "Debugging Habits",
        summary:
          "Practice finding mistakes by reproducing the problem, reading the evidence, and changing one thing at a time.",
        whyItMatters:
          "Debugging is normal programming work, not a sign that a student failed. The risk is trying random changes until the error disappears. A calm routine helps students understand the cause, confirm the fix, and avoid creating a new problem.",
        studyNext:
          "When an error appears, write what you expected, what actually happened, and the one focused change you will test next.",
        keyIdeas: [
          "Reproduce the issue before changing code",
          "Read error messages for location and cause",
          "Change one variable or line at a time",
          "Confirm the fix with the same input",
        ],
        practicePrompt:
          "Take a small broken program and keep a debugging log with three columns: observation, hypothesis, and result.",
        professorNote:
          "Diogenes treats an error message like a clue from a careful examiner. Read it slowly before you argue with it.",
      },
    ],
  },
  {
    slug: "web-and-accessibility",
    title: "Web and Accessibility",
    summary: "Learn how structure, layout, and inclusive interaction make pages easier to use.",
    description:
      "This track connects beginner web interface decisions with usability and accessibility. Students study how headings, landmarks, responsive layout, labels, focus order, and visual contrast affect real people using the same page in different ways.",
    recommendedFor: "Students building their first web assignment or improving a class prototype.",
    outcome:
      "After this track, students can review a simple web page for structure, mobile readability, keyboard access, and non-color cues.",
    topics: [
      {
        slug: "semantic-structure",
        trackSlug: "web-and-accessibility",
        title: "Semantic Structure",
        summary:
          "Use meaningful page regions, headings, labels, and reading order so people and assistive technology can understand the page.",
        whyItMatters:
          "A web page is easier to use when its structure matches its purpose. Headings help students scan, landmarks help screen reader users jump between regions, and clear labels explain what each link or control will do.",
        studyNext:
          "Review one page and list its main heading, navigation region, main content region, and every link whose purpose is unclear.",
        keyIdeas: [
          "Use one clear main heading per page",
          "Group navigation and main content semantically",
          "Write labels that describe the destination or action",
          "Keep visual order and reading order aligned",
        ],
        practicePrompt:
          "Sketch the outline of a topic page using only headings and region names, then check whether the outline still explains the page.",
        professorNote:
          "Good structure is quiet. Most people notice it only when it is missing, but assistive technology depends on it from the start.",
      },
      {
        slug: "responsive-layouts",
        trackSlug: "web-and-accessibility",
        title: "Responsive Layouts",
        summary:
          "Plan pages that remain readable and navigable on phones, laptops, and presentation screens.",
        whyItMatters:
          "Students may open a class project on a phone, a notebook, or a projector. If text becomes crowded, links move unpredictably, or horizontal scrolling appears, the content may be technically present but practically hard to use.",
        studyNext:
          "Sketch the same page in a wide and narrow layout, then mark which heading, navigation, and primary action should remain easy to find first.",
        keyIdeas: [
          "Use flexible sections instead of fixed-width layouts",
          "Keep line length comfortable for reading",
          "Avoid horizontal scrolling for core content",
          "Prioritize important actions in narrow views",
        ],
        practicePrompt:
          "Compare a three-column track overview with a one-column mobile version and decide what content order best supports scanning.",
        professorNote:
          "Responsive design is not decoration. It is a promise that the lesson still works when the screen changes.",
      },
      {
        slug: "accessible-navigation",
        trackSlug: "web-and-accessibility",
        title: "Accessible Navigation",
        summary:
          "Make links, controls, focus, and current location understandable without relying only on color or mouse hover.",
        whyItMatters:
          "Navigation is the student's map through the site. If the map only works visually, only works with a mouse, or hides the current location, students using keyboards or assistive technology lose confidence quickly.",
        studyNext:
          "Use only the keyboard to move through a page and write down every place where focus, link purpose, or current page state is unclear.",
        keyIdeas: [
          "Keep keyboard order close to visual order",
          "Show visible focus on every interactive item",
          "Name links by destination or result",
          "Indicate current location with text or underline",
        ],
        practicePrompt:
          "Test a navigation menu with Tab and Shift+Tab, then note whether every focused item can be identified without seeing color.",
        professorNote:
          "If a student can get lost in the navigation, the content has not truly been reached yet.",
      },
    ],
  },
  {
    slug: "study-methods",
    title: "Study Methods for CS",
    summary: "Use practical routines for reading, planning, and asking for help in Computer Science.",
    description:
      "This track supports the habits around technical learning: reading with a purpose, planning short study sessions, and asking questions that give professors, monitors, and classmates enough context to help.",
    recommendedFor: "Students who know what to study but need a calmer way to keep going.",
    outcome:
      "After this track, students can prepare a focused study session, summarize technical material, and ask specific questions when blocked.",
    topics: [
      {
        slug: "reading-technical-texts",
        trackSlug: "study-methods",
        title: "Reading Technical Texts",
        summary:
          "Read definitions, diagrams, and samples actively instead of trying to memorize every sentence.",
        whyItMatters:
          "Computer Science texts often combine vocabulary, diagrams, code, and assumptions in a small space. Beginners learn more when they separate what a term means, how it appears in a sample, and what question still remains.",
        studyNext:
          "Pick one short article and mark one definition, one code sample, and one question to bring to class.",
        keyIdeas: [
          "Separate vocabulary from procedure",
          "Connect diagrams to the written explanation",
          "Summarize the main idea in your own words",
          "Save questions instead of skipping confusion",
        ],
        practicePrompt:
          "Read a short explanation of arrays and write three notes: one definition, one use case, and one point that still feels unclear.",
        professorNote:
          "Do not measure reading by pages finished. Measure it by what you can explain after closing the page.",
      },
      {
        slug: "planning-study-sessions",
        trackSlug: "study-methods",
        title: "Planning Study Sessions",
        summary:
          "Turn a broad topic into a small session with a goal, practice activity, and quick review.",
        whyItMatters:
          "A topic like algorithms or web accessibility can feel too large to begin. A short plan lowers that friction by naming one concept, one activity, and one way to check what was learned.",
        studyNext:
          "Write a 30-minute plan with one concept to review, one exercise to try, and one note to save for your next session.",
        keyIdeas: [
          "Choose one small learning goal",
          "Pair reading with active practice",
          "Reserve time for a short review",
          "Keep the next session easy to restart",
        ],
        practicePrompt:
          "Plan a 30-minute session for loops: 10 minutes reading, 15 minutes solving one exercise, and 5 minutes writing what changed in your understanding.",
        professorNote:
          "A good study plan is small enough to start today and clear enough to continue tomorrow.",
      },
      {
        slug: "asking-better-questions",
        trackSlug: "study-methods",
        title: "Asking Better Questions",
        summary:
          "Prepare questions that include context, what you tried, what happened, and the exact point where you got stuck.",
        whyItMatters:
          "Professors and classmates can help faster when they see the task, the attempt, and the blocker. A precise question also helps the student notice whether the issue is vocabulary, logic, syntax, or debugging.",
        studyNext:
          "Rewrite one vague question by adding the task, your attempt, the result you expected, and the exact confusing point.",
        keyIdeas: [
          "State the assignment or concept",
          "Show the attempt or reasoning so far",
          "Name the specific blocker",
          "Ask for the next step, not the whole answer",
        ],
        practicePrompt:
          "Turn 'my code does not work' into a complete help request with context, attempted solution, observed result, and one focused question.",
        professorNote:
          "A careful question is not a confession of weakness. It is the shortest path from confusion to useful feedback.",
      },
    ],
  },
];

export function getTrack(trackSlug: string) {
  return learningTracks.find((track) => track.slug === trackSlug);
}

export function getTopic(trackSlug: string, topicSlug: string) {
  return getTrack(trackSlug)?.topics.find((topic) => topic.slug === topicSlug);
}
