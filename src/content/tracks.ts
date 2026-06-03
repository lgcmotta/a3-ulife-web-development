import type { LearningTrack } from "@/content/types";

export const learningTracks: LearningTrack[] = [
  {
    slug: "programming-foundations",
    title: "Programming Foundations",
    summary: "Start with the habits and concepts behind writing clear programs.",
    description:
      "This track introduces problem solving, variables, control flow, and debugging as practical study habits rather than isolated definitions.",
    recommendedFor: "Students writing their first programs or returning after a difficult first course.",
    topics: [
      {
        slug: "problem-solving-basics",
        trackSlug: "programming-foundations",
        title: "Problem-Solving Basics",
        summary:
          "Learn how to break a programming exercise into inputs, steps, and expected results before writing code.",
        whyItMatters:
          "Beginners often struggle because they start typing too soon. A simple problem plan makes code easier to write, test, and explain.",
        studyNext:
          "Choose one small exercise and write the input, output, and three steps in plain language before coding.",
        keyIdeas: ["Inputs and outputs", "Step-by-step reasoning", "Checking an example by hand"],
      },
      {
        slug: "variables-and-flow",
        trackSlug: "programming-foundations",
        title: "Variables and Flow",
        summary:
          "Understand how stored values, conditions, and repetition shape the path a program follows.",
        whyItMatters:
          "Most early programming errors come from losing track of changing values or reading branches out of order.",
        studyNext:
          "Trace a small program line by line and keep a table of each variable value after every step.",
        keyIdeas: ["State", "Conditions", "Loops", "Tracing"],
      },
      {
        slug: "debugging-habits",
        trackSlug: "programming-foundations",
        title: "Debugging Habits",
        summary:
          "Practice finding mistakes by narrowing the problem, reading messages, and changing one thing at a time.",
        whyItMatters:
          "Debugging is not a sign of failure; it is the normal process of making a program understandable.",
        studyNext:
          "Reproduce one error, write what you expected, write what happened, and test one focused change.",
        keyIdeas: ["Reproduce", "Observe", "Change one variable", "Confirm the fix"],
      },
    ],
  },
  {
    slug: "web-and-accessibility",
    title: "Web and Accessibility",
    summary: "Learn how structure, layout, and inclusive design make web pages easier to use.",
    description:
      "This track connects basic web interface decisions with usability and accessibility expectations for real students.",
    recommendedFor: "Students building their first web assignment or improving a class prototype.",
    topics: [
      {
        slug: "semantic-structure",
        trackSlug: "web-and-accessibility",
        title: "Semantic Structure",
        summary:
          "Use meaningful page regions and headings so students and assistive technology can understand the page.",
        whyItMatters:
          "A clear structure helps everyone scan a page, and it is essential for screen reader navigation.",
        studyNext:
          "Review one page and list its main heading, navigation, main content, and supporting sections.",
        keyIdeas: ["Headings", "Landmarks", "Reading order", "Labels"],
      },
      {
        slug: "responsive-layouts",
        trackSlug: "web-and-accessibility",
        title: "Responsive Layouts",
        summary:
          "Plan pages that remain readable and navigable on both desktop and mobile screens.",
        whyItMatters:
          "A class presentation may happen on a projector, laptop, or phone, so essential content must adapt cleanly.",
        studyNext:
          "Sketch the same page in a wide and narrow layout and mark which content must stay visible first.",
        keyIdeas: ["Readable line length", "Flexible sections", "No horizontal scrolling"],
      },
      {
        slug: "accessible-navigation",
        trackSlug: "web-and-accessibility",
        title: "Accessible Navigation",
        summary:
          "Make links, controls, and current location understandable without relying only on color or pointer hover.",
        whyItMatters:
          "Navigation is the student's map. If it only works visually or with a mouse, part of the audience is excluded.",
        studyNext:
          "Use only the keyboard to move through a page and note every place where focus or labels are unclear.",
        keyIdeas: ["Keyboard order", "Visible focus", "Current page text", "Descriptive labels"],
      },
    ],
  },
  {
    slug: "study-methods",
    title: "Study Methods for CS",
    summary: "Build routines for reading, planning, and asking better questions.",
    description:
      "This track helps students approach Computer Science material with repeatable study behaviors and less confusion.",
    recommendedFor: "Students who know what to study but need a calmer way to keep going.",
    topics: [
      {
        slug: "reading-technical-texts",
        trackSlug: "study-methods",
        title: "Reading Technical Texts",
        summary:
          "Read definitions, diagrams, and examples actively instead of trying to memorize every sentence.",
        whyItMatters:
          "Technical material becomes easier when students separate vocabulary, examples, and questions.",
        studyNext:
          "Pick one short article and mark one definition, one example, and one question to bring to class.",
        keyIdeas: ["Vocabulary", "Examples", "Questions", "Summaries"],
      },
      {
        slug: "planning-study-sessions",
        trackSlug: "study-methods",
        title: "Planning Study Sessions",
        summary:
          "Turn a broad topic into a small study session with a goal, activity, and quick review.",
        whyItMatters:
          "Beginner students often lose time deciding what to do next. A small plan lowers that friction.",
        studyNext:
          "Write a 30-minute plan with one concept to review, one exercise to try, and one note to save.",
        keyIdeas: ["Small goals", "Practice", "Review", "Consistency"],
      },
      {
        slug: "asking-better-questions",
        trackSlug: "study-methods",
        title: "Asking Better Questions",
        summary:
          "Prepare questions that include context, what you tried, and where you got stuck.",
        whyItMatters:
          "Clear questions make it easier for professors, monitors, and classmates to give useful help.",
        studyNext:
          "Rewrite one vague question by adding the task, your attempt, and the exact confusing point.",
        keyIdeas: ["Context", "Attempt", "Specific blocker", "Next step"],
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
