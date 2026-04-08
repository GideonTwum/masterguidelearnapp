/**
 * Staff training quiz — club organisation, church history, youth ministry,
 * leadership, and drill. Align with your conference manual where specifics differ.
 */

export const quizMeta = {
  title: "Pathfinder staff training quiz",
  subtitle:
    "Scripture & Spirit of Prophecy, club life, Adventist history, youth ministry, leadership, drill",
};

/** Maps question.topicId → section heading */
export const topicLabels = {
  clubOrg: "Club organisation",
  adventistHistory: "Adventist Church history",
  youthMinistry: "General knowledge — youth ministry",
  clubLeadership: "Club leadership",
  drillCeremonies: "Drill and ceremonies",
  scriptureAndEgW: "Scripture & Ellen G. White writings",
};

/** @typedef {{ id: string, label: string }} QuizOption */

/**
 * @typedef {Object} QuizQuestionBase
 * @property {string} id
 * @property {keyof typeof topicLabels} topicId
 * @property {string} prompt
 */

/**
 * @typedef {QuizQuestionBase & {
 *   type: 'multiple',
 *   options: QuizOption[],
 *   correctIds: string[],
 * }} MultipleQuestion
 */

/**
 * @typedef {QuizQuestionBase & {
 *   type: 'fill',
 *   acceptableAnswers: string[],
 *   correctDisplay: string,
 * }} FillQuestion
 */

/**
 * @typedef {QuizQuestionBase & {
 *   type: 'paragraph',
 *   sampleAnswer: string,
 * }} ParagraphQuestion
 */

/** @type {(MultipleQuestion|FillQuestion|ParagraphQuestion)[]} */
export const questions = [
  // —— Club organisation (10) ——
  {
    id: "co-01-calendar",
    topicId: "clubOrg",
    type: "multiple",
    prompt:
      "Many Pathfinder clubs plan their core program around which kind of yearly pattern?",
    options: [
      { id: "ten", label: "A ten-month program calendar (school-year rhythm)" },
      { id: "twelve", label: "Twelve identical months with no seasonal break" },
      { id: "random", label: "Only random weekend events without a schedule" },
      { id: "summer-only", label: "Summer-only meetings with no fall or spring plan" },
    ],
    correctIds: ["ten"],
  },
  {
    id: "co-02-unit",
    topicId: "clubOrg",
    type: "multiple",
    prompt:
      "A smaller team inside the club (often by age or class) that plans and travels together is commonly called a:",
    options: [
      { id: "unit", label: "Unit" },
      { id: "conference", label: "General Conference" },
      { id: "union", label: "Union office staff" },
      { id: "board", label: "Only the church board" },
    ],
    correctIds: ["unit"],
  },
  {
    id: "co-03-classes",
    topicId: "clubOrg",
    type: "multiple",
    prompt:
      "Which names are Pathfinder class levels in the usual progressive sequence? (Select all that apply.)",
    options: [
      { id: "friend", label: "Friend" },
      { id: "companion", label: "Companion" },
      { id: "explorer", label: "Explorer" },
      { id: "ranger", label: "Ranger" },
      { id: "voyager", label: "Voyager" },
      { id: "guide", label: "Guide" },
      { id: "eager", label: "Eager Beaver" },
    ],
    correctIds: ["friend", "companion", "explorer", "ranger", "voyager", "guide"],
  },
  {
    id: "co-04-voyager",
    topicId: "clubOrg",
    type: "fill",
    prompt:
      "The Voyager class is generally for youth about age 14 or grade _____. (number)",
    acceptableAnswers: ["9", "nine"],
    correctDisplay: "9",
  },
  {
    id: "co-05-director",
    topicId: "clubOrg",
    type: "multiple",
    prompt:
      "Who typically provides overall leadership for the Pathfinder Club program at the local church?",
    options: [
      { id: "director", label: "The Pathfinder Club director (with church support)" },
      { id: "only-youth-pastor", label: "Only the conference youth director, never local staff" },
      { id: "pathfinders-alone", label: "Senior Pathfinders with no adult oversight" },
      { id: "random", label: "Whoever shows up first each week" },
    ],
    correctIds: ["director"],
  },
  {
    id: "co-06-staff-roles",
    topicId: "clubOrg",
    type: "multiple",
    prompt:
      "Which roles are commonly part of a club’s staff team? (Select all that apply.)",
    options: [
      { id: "counselors", label: "Counselors / unit leaders" },
      { id: "instructors", label: "Instructors for honors and skills" },
      { id: "deputy", label: "Associate or deputy director (when used)" },
      { id: "pastor-only", label: "No one except the senior pastor, ever" },
    ],
    correctIds: ["counselors", "instructors", "deputy"],
  },
  {
    id: "co-07-investiture",
    topicId: "clubOrg",
    type: "multiple",
    prompt:
      "An investiture service is primarily meant to:",
    options: [
      {
        id: "recognize",
        label:
          "Recognize class advancement, achievements, and spiritual growth in a worship setting",
      },
      {
        id: "punish",
        label: "Publicly punish members who missed meetings",
      },
      {
        id: "replace",
        label: "Replace Sabbath School entirely",
      },
      {
        id: "skip",
        label: "Skip all planning because it is optional everywhere",
      },
    ],
    correctIds: ["recognize"],
  },
  {
    id: "co-08-records",
    topicId: "clubOrg",
    type: "multiple",
    prompt:
      "Good club organisation includes keeping useful records such as: (Select all that apply.)",
    options: [
      { id: "membership", label: "Membership and attendance" },
      { id: "permits", label: "Permission forms and safety-related documentation" },
      { id: "finance", label: "Basic budget and expense tracking (as required)" },
      { id: "none", label: "No records — memory is enough" },
    ],
    correctIds: ["membership", "permits", "finance"],
  },
  {
    id: "co-09-open-reg",
    topicId: "clubOrg",
    type: "multiple",
    prompt:
      "If registration is “open” constantly with no predictable roster, what problem does training often highlight?",
    options: [
      {
        id: "prep",
        label:
          "Counselors and instructors struggle to prepare quality activities without knowing who or how many will come",
      },
      {
        id: "money",
        label: "The church is forbidden to buy uniforms",
      },
      {
        id: "legal",
        label: "Clubs are illegal in most countries",
      },
      {
        id: "none",
        label: "There is never any downside",
      },
    ],
    correctIds: ["prep"],
  },
  {
    id: "co-10-nad",
    topicId: "clubOrg",
    type: "fill",
    prompt:
      "In North America, “NAD” in Pathfinder resources stands for North _____ Division. (one word)",
    acceptableAnswers: ["american"],
    correctDisplay: "American",
  },

  // —— Adventist Church history (10) ——
  {
    id: "ah-01-org-year",
    topicId: "adventistHistory",
    type: "fill",
    prompt:
      "The General Conference of Seventh-day Adventists was organized in the year _____. (four digits)",
    acceptableAnswers: ["1863"],
    correctDisplay: "1863",
  },
  {
    id: "ah-02-disappointment",
    topicId: "adventistHistory",
    type: "multiple",
    prompt:
      "The “Great Disappointment” in Adventist history is associated with which expectation?",
    options: [
      {
        id: "return",
        label: "The expected return of Christ on October 22, 1844 (Millerite movement)",
      },
      {
        id: "temple",
        label: "The dedication of Solomon’s temple in modern Jerusalem",
      },
      {
        id: "reformation",
        label: "Martin Luther posting theses in 1914",
      },
      {
        id: "pentecost",
        label: "The first Christian Pentecost in Rome",
      },
    ],
    correctIds: ["return"],
  },
  {
    id: "ah-03-miller",
    topicId: "adventistHistory",
    type: "fill",
    prompt:
      "The Millerite movement took its name from William _____. (last name only)",
    acceptableAnswers: ["miller"],
    correctDisplay: "Miller",
  },
  {
    id: "ah-04-ellen",
    topicId: "adventistHistory",
    type: "multiple",
    prompt:
      "Ellen G. White is best described in official Adventist history as:",
    options: [
      {
        id: "messenger",
        label: "A cofounder and prophetic messenger whose writings have guided the church’s mission and lifestyle",
      },
      {
        id: "gc-president",
        label: "The first president of the General Conference for 40 years",
      },
      {
        id: "catholic",
        label: "A Roman Catholic reformer",
      },
      {
        id: "atheist",
        label: "A critic who opposed all religion",
      },
    ],
    correctIds: ["messenger"],
  },
  {
    id: "ah-05-sabbath",
    topicId: "adventistHistory",
    type: "multiple",
    prompt:
      "Seventh-day Adventists take their name partly because they uphold:",
    options: [
      {
        id: "sabbath",
        label: "Biblical seventh-day (Saturday) Sabbath observance",
      },
      {
        id: "sunday",
        label: "Sunday as the only rest day",
      },
      {
        id: "no-rest",
        label: "No weekly day of rest",
      },
      {
        id: "friday",
        label: "Friday-only worship without Sabbath",
      },
    ],
    correctIds: ["sabbath"],
  },
  {
    id: "ah-06-james",
    topicId: "adventistHistory",
    type: "multiple",
    prompt:
      "James White is especially remembered for early Adventist work in:",
    options: [
      {
        id: "publishing",
        label: "Publishing, organization, and leadership alongside Ellen White",
      },
      {
        id: "pope",
        label: "Leading the Vatican youth department",
      },
      {
        id: "military",
        label: "Founding the first Adventist army",
      },
      {
        id: "music",
        label: "Inventing modern electronic music only",
      },
    ],
    correctIds: ["publishing"],
  },
  {
    id: "ah-07-mission",
    topicId: "adventistHistory",
    type: "multiple",
    prompt:
      "A driving purpose of the worldwide Seventh-day Adventist Church is:",
    options: [
      {
        id: "gospel",
        label: "Proclaiming the three angels’ messages and Christ’s soon return (gospel mission)",
      },
      {
        id: "politics",
        label: "Running national governments as its main goal",
      },
      {
        id: "wealth",
        label: "Personal wealth for members only",
      },
      {
        id: "isolation",
        label: "Avoiding all contact with non-members",
      },
    ],
    correctIds: ["gospel"],
  },
  {
    id: "ah-28-beliefs",
    topicId: "adventistHistory",
    type: "fill",
    prompt:
      "The church’s official statement of teachings is often summarized as the _____ Fundamental Beliefs (number word or digits).",
    acceptableAnswers: ["28", "twenty eight", "twenty-eight"],
    correctDisplay: "28",
  },
  {
    id: "ah-09-health",
    topicId: "adventistHistory",
    type: "multiple",
    prompt:
      "Early Adventist health reform (often linked to ministry of healing and lifestyle) emphasized: (Select all that apply.)",
    options: [
      { id: "body", label: "Care for the body as the temple of the Spirit" },
      { id: "service", label: "Simple remedies, temperance, and service to others" },
      { id: "ignore", label: "Ignoring science and doctors entirely in every case" },
      { id: "harm", label: "Encouraging harmful habits on purpose" },
    ],
    correctIds: ["body", "service"],
  },
  {
    id: "ah-10-global",
    topicId: "adventistHistory",
    type: "multiple",
    prompt:
      "Today the Seventh-day Adventist Church is structured as:",
    options: [
      {
        id: "global",
        label: "A global movement with local churches, conferences, unions, divisions, and the General Conference",
      },
      {
        id: "one-building",
        label: "A single building in one country only",
      },
      {
        id: "secret",
        label: "A secret society with no public worship",
      },
      {
        id: "online-only",
        label: "An online-only club with no local congregations",
      },
    ],
    correctIds: ["global"],
  },

  // —— General knowledge — youth ministry (10) ——
  {
    id: "ym-01-aym",
    topicId: "youthMinistry",
    type: "multiple",
    prompt:
      "Pathfinder Clubs are part of the church’s ministry to young people, alongside programs such as: (Select all that apply.)",
    options: [
      { id: "adventurer", label: "Adventurers (for younger children)" },
      { id: "youth-sabbath", label: "Youth Sabbath School and young adult ministries (as organized locally)" },
      { id: "public-school-only", label: "Only public school sports teams" },
      { id: "no-other", label: "No other church youth programs anywhere" },
    ],
    correctIds: ["adventurer", "youth-sabbath"],
  },
  {
    id: "ym-02-holistic",
    topicId: "youthMinistry",
    type: "multiple",
    prompt:
      "Balanced Pathfinder ministry intentionally develops: (Select all that apply.)",
    options: [
      { id: "spiritual", label: "Spiritual growth" },
      { id: "mental", label: "Mental / cognitive growth" },
      { id: "physical", label: "Physical fitness and practical skills" },
      { id: "social", label: "Social skills and teamwork" },
      { id: "none", label: "Only competition with no character goals" },
    ],
    correctIds: ["spiritual", "mental", "physical", "social"],
  },
  {
    id: "ym-03-honors",
    topicId: "youthMinistry",
    type: "fill",
    prompt:
      "Specialized skill and study awards in Pathfinders are called _____. (one word)",
    acceptableAnswers: ["honors", "honours"],
    correctDisplay: "honors",
  },
  {
    id: "ym-04-outreach",
    topicId: "youthMinistry",
    type: "multiple",
    prompt:
      "The Pathfinder Club can serve outreach because it:",
    options: [
      {
        id: "visible",
        label:
          "Is a visible, welcoming community where guests can belong, learn skills, and hear the gospel",
      },
      {
        id: "hidden",
        label: "Must never invite community children",
      },
      {
        id: "paywall",
        label: "Is only for families who pay for membership in a private club unrelated to church",
      },
      {
        id: "ignore-guest",
        label: "Should ignore visitors to focus on insiders only",
      },
    ],
    correctIds: ["visible"],
  },
  {
    id: "ym-05-camporee",
    topicId: "youthMinistry",
    type: "multiple",
    prompt:
      "A “camporee” in youth ministry is best described as:",
    options: [
      {
        id: "camping",
        label: "A larger camping rally bringing clubs together for worship, skills, and fellowship",
      },
      {
        id: "classroom",
        label: "A weekly classroom lecture only",
      },
      {
        id: "online-game",
        label: "An online video game tournament only",
      },
      {
        id: "business",
        label: "A business conference for adults only",
      },
    ],
    correctIds: ["camping"],
  },
  {
    id: "ym-06-outdoor",
    topicId: "youthMinistry",
    type: "multiple",
    prompt:
      "Outdoor learning in Pathfinders helps youth gain: (Select all that apply.)",
    options: [
      { id: "nature", label: "Appreciation for God’s creation and nature" },
      { id: "skills", label: "Practical outdoor and safety skills" },
      { id: "team", label: "Confidence and teamwork" },
      { id: "avoid", label: "A reason to avoid all church worship" },
    ],
    correctIds: ["nature", "skills", "team"],
  },
  {
    id: "ym-07-parents",
    topicId: "youthMinistry",
    type: "multiple",
    prompt:
      "Strong youth ministry partnerships usually include:",
    options: [
      {
        id: "parents",
        label: "Clear communication and cooperation with parents and guardians",
      },
      {
        id: "secret",
        label: "Keeping all activities secret from families",
      },
      {
        id: "replace",
        label: "Replacing parents’ spiritual role entirely",
      },
      {
        id: "ignore",
        label: "Ignoring permission and medical forms",
      },
    ],
    correctIds: ["parents"],
  },
  {
    id: "ym-08-volunteer",
    topicId: "youthMinistry",
    type: "fill",
    prompt:
      "Most Pathfinder staff serve as _____ leaders (one word) who need support, training, and appreciation.",
    acceptableAnswers: ["volunteer"],
    correctDisplay: "volunteer",
  },
  {
    id: "ym-09-safety",
    topicId: "youthMinistry",
    type: "multiple",
    prompt:
      "Which practices reflect responsible youth ministry? (Select all that apply.)",
    options: [
      { id: "ratio", label: "Adequate adult supervision for activities" },
      { id: "training", label: "Staff orientation and safety training" },
      { id: "two", label: "Two-adult or open-door policies where required by policy" },
      { id: "alone", label: "One adult alone with minors in a closed room for all activities" },
    ],
    correctIds: ["ratio", "training", "two"],
  },
  {
    id: "ym-10-purpose",
    topicId: "youthMinistry",
    type: "paragraph",
    prompt:
      "In two or three sentences, describe one way a Pathfinder club can help a young person grow closer to Christ this year.",
    sampleAnswer:
      "Examples: consistent worship and prayer in club settings, Bible-based honors, mentors who model Christ-like character, service projects that practice love for others, and inviting youth to study Scripture and share their faith in age-appropriate ways.",
  },

  // —— Club leadership (10) ——
  {
    id: "cl-01-spirit",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "Training often says a tangible key to a club’s success is:",
    options: [
      { id: "morale", label: "High morale and positive club spirit" },
      { id: "money", label: "Only the amount of money spent on gadgets" },
      { id: "silent", label: "Leaders staying completely silent all year" },
      { id: "fear", label: "Ruling primarily by fear and shame" },
    ],
    correctIds: ["morale"],
  },
  {
    id: "cl-02-styles",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "Three leadership styles commonly named in basic staff training are: (Select all that apply.)",
    options: [
      { id: "democratic", label: "Democratic (participative)" },
      { id: "laissez", label: "Laissez-faire" },
      { id: "bureaucratic", label: "Bureaucratic (political)" },
      { id: "monarch", label: "Absolute monarchy with no church board" },
    ],
    correctIds: ["democratic", "laissez", "bureaucratic"],
  },
  {
    id: "cl-03-laissez",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "Laissez-faire leadership tends to mean the leader:",
    options: [
      {
        id: "hands-off",
        label: "Gives little direction and a lot of freedom (can lack structure if overused)",
      },
      {
        id: "micromanage",
        label: "Micromanages every detail of every minute",
      },
      {
        id: "vote",
        label: "Votes on every shoelace with the whole world",
      },
      {
        id: "absent",
        label: "Is never present at any club function",
      },
    ],
    correctIds: ["hands-off"],
  },
  {
    id: "cl-04-democratic-con",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "A disadvantage of democratic (participative) leadership can be:",
    options: [
      {
        id: "unclear",
        label: "Rules and expectations may be less clearly defined or understood",
      },
      {
        id: "instant",
        label: "Decisions are always instant with zero discussion",
      },
      {
        id: "no-voice",
        label: "No one ever shares an opinion",
      },
      {
        id: "illegal",
        label: "It is forbidden in the Adventist Church",
      },
    ],
    correctIds: ["unclear"],
  },
  {
    id: "cl-05-purpose-members",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "Pathfinder leadership aims to help members become people who: (Select all that apply.)",
    options: [
      { id: "responsible", label: "Are responsible and maturing" },
      { id: "family", label: "Bless their families" },
      { id: "church", label: "Serve their church" },
      { id: "world", label: "Contribute positively to the world" },
      { id: "selfish", label: "Avoid all responsibility on purpose" },
    ],
    correctIds: ["responsible", "family", "church", "world"],
  },
  {
    id: "cl-06-christ-method",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "Christ’s method of reaching people, as often summarized in ministry training, includes: (Select all that apply.)",
    options: [
      { id: "mingle", label: "Mingling with people" },
      { id: "sympathy", label: "Showing sympathy" },
      { id: "needs", label: "Ministering to needs" },
      { id: "confidence", label: "Winning confidence before heavy appeals" },
      { id: "ignore", label: "Avoiding all contact until they join the church" },
    ],
    correctIds: ["mingle", "sympathy", "needs", "confidence"],
  },
  {
    id: "cl-07-discipline-avoid",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "Which approaches are commonly listed among discipline methods to avoid? (Select all that apply.)",
    options: [
      { id: "corporal", label: "Corporal punishment" },
      { id: "public-force", label: "Forcing humiliating public apologies" },
      { id: "threats", label: "Empty threats and harsh ridicule as a primary tool" },
      { id: "praise", label: "Sincere, specific encouragement" },
    ],
    correctIds: ["corporal", "public-force", "threats"],
  },
  {
    id: "cl-08-delegate",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "Sharing leadership with willing staff:",
    options: [
      {
        id: "grow",
        label: "Develops others, prevents burnout, and strengthens the whole team",
      },
      {
        id: "weak",
        label: "Always weakens the club with no exceptions",
      },
      {
        id: "forbidden",
        label: "Is never allowed in Pathfinders",
      },
      {
        id: "lazy",
        label: "Means the director is always lazy",
      },
    ],
    correctIds: ["grow"],
  },
  {
    id: "cl-09-meetings",
    topicId: "clubLeadership",
    type: "multiple",
    prompt:
      "Effective staff meetings usually:",
    options: [
      {
        id: "planned",
        label: "Follow an agenda, start/end on time, and assign clear follow-up",
      },
      {
        id: "chaos",
        label: "Have no purpose so youth can lead everything without adults",
      },
      {
        id: "skip",
        label: "Should never happen in a healthy club",
      },
      {
        id: "hours",
        label: "Last unplanned hours every week with no decisions",
      },
    ],
    correctIds: ["planned"],
  },
  {
    id: "cl-10-scenario",
    topicId: "clubLeadership",
    type: "paragraph",
    prompt:
      "On an outdoor trip, one Pathfinder ignores a safety rule and others copy the behavior. Briefly describe how you would respond as a leader in the moment and in follow-up.",
    sampleAnswer:
      "Stop the activity calmly, ensure everyone is safe, restate the rule and why it matters, address the influencing youth privately with teaching (not only shame), involve parents if policy requires, document if needed, and debrief with staff so the team applies the lesson next time.",
  },

  // —— Drill and ceremonies (10) ——
  {
    id: "dc-01-attention",
    topicId: "drillCeremonies",
    type: "multiple",
    prompt:
      "At the command “Attention,” members typically:",
    options: [
      { id: "stand", label: "Stand straight, still, and ready with feet together and arms at sides" },
      { id: "sit", label: "Sit randomly wherever they want" },
      { id: "run", label: "Begin running laps" },
      { id: "talk", label: "Continue loud conversations" },
    ],
    correctIds: ["stand"],
  },
  {
    id: "dc-02-parade-rest",
    topicId: "drillCeremonies",
    type: "multiple",
    prompt:
      "“Parade rest” is generally a position of:",
    options: [
      {
        id: "relaxed",
        label: "Relaxed standing (e.g., feet apart, hands clasped behind or in front — per your manual)",
      },
      { id: "sleep",
        label: "Lying down asleep",
      },
      {
        id: "eating",
        label: "Eating lunch in formation",
      },
      {
        id: "phone",
        label: "Using phones with backs turned to the commander",
      },
    ],
    correctIds: ["relaxed"],
  },
  {
    id: "dc-03-fall-in",
    topicId: "drillCeremonies",
    type: "multiple",
    prompt:
      "“Fall in” means to:",
    options: [
      { id: "formation", label: "Take your place in the formation quickly and quietly" },
      { id: "leave", label: "Leave the field immediately" },
      { id: "hide", label: "Hide behind vehicles" },
      { id: "skip", label: "Skip the ceremony entirely" },
    ],
    correctIds: ["formation"],
  },
  {
    id: "dc-04-dress-right",
    topicId: "drillCeremonies",
    type: "multiple",
    prompt:
      "“Dress right dress” is used to:",
    options: [
      { id: "align", label: "Align the line using a reference point so the formation is straight" },
      { id: "uniforms", label: "Change into pajamas" },
      { id: "race", label: "Race to the cafeteria" },
      { id: "ignore", label: "Ignore the commander’s instructions" },
    ],
    correctIds: ["align"],
  },
  {
    id: "dc-05-march-foot",
    topicId: "drillCeremonies",
    type: "fill",
    prompt:
      "In standard U.S.-style marching, the first step of forward march is usually taken with the _____ foot. (left / right)",
    acceptableAnswers: ["left"],
    correctDisplay: "left",
  },
  {
    id: "dc-06-cadence",
    topicId: "drillCeremonies",
    type: "multiple",
    prompt:
      "Calling cadence while marching helps the group:",
    options: [
      { id: "together", label: "Stay in step and move together" },
      { id: "scatter", label: "Scatter randomly" },
      { id: "slow", label: "Always sit down" },
      { id: "skip-beat", label: "Ignore rhythm completely" },
    ],
    correctIds: ["together"],
  },
  {
    id: "dc-07-ceremony",
    topicId: "drillCeremonies",
    type: "multiple",
    prompt:
      "During formal ceremonies (flags, prayer, investiture), Pathfinders should: (Select all that apply.)",
    options: [
      { id: "respect", label: "Show respect with posture and attention" },
      { id: "quiet", label: "Remain quiet unless responding to a part" },
      { id: "uniform", label: "Wear uniform or dress as instructed" },
      { id: "mock", label: "Mock other clubs or guests" },
    ],
    correctIds: ["respect", "quiet", "uniform"],
  },
  {
    id: "dc-08-commander",
    topicId: "drillCeremonies",
    type: "multiple",
    prompt:
      "The person leading drill commands is usually addressed as:",
    options: [
      { id: "commander", label: "Commander (or as your conference specifies)" },
      { id: "buddy", label: "Whatever nickname you prefer in the moment" },
      { id: "sir-only-guest", label: "Only guests may give commands" },
      { id: "random", label: "Whoever shouts loudest from the crowd" },
    ],
    correctIds: ["commander"],
  },
  {
    id: "dc-09-demonstration",
    topicId: "drillCeremonies",
    type: "multiple",
    prompt:
      "A “drill and marching demonstration” for beginners often includes: (Select all that apply.)",
    options: [
      { id: "standing", label: "Standing movements (attention, parade rest, etc.)" },
      { id: "basic", label: "Basic marching and halts" },
      { id: "safety", label: "Clear instructions and safety awareness" },
      { id: "ignore", label: "No practice before performing publicly" },
    ],
    correctIds: ["standing", "basic", "safety"],
  },
  {
    id: "dc-10-opening",
    topicId: "drillCeremonies",
    type: "fill",
    prompt:
      "Many club openings include prayer, announcements, and sometimes flag ceremony and _____ to country or club (e.g., pledge). (one word)",
    acceptableAnswers: ["pledge", "pledges"],
    correctDisplay: "pledge",
  },

  // —— Scripture & Ellen G. White quotations (12) ——
  {
    id: "se-bible-matt28",
    topicId: "scriptureAndEgW",
    type: "fill",
    prompt:
      'Matthew 28:19 (NKJV): "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy _____. "',
    acceptableAnswers: ["spirit", "ghost", "holy ghost"],
    correctDisplay: "Spirit",
  },
  {
    id: "se-bible-1tim4",
    topicId: "scriptureAndEgW",
    type: "fill",
    prompt:
      '1 Timothy 4:12: "Let no one despise your _____, but be an example to the believers in word, in conduct, in love, in spirit, in faith, in purity." (one word)',
    acceptableAnswers: ["youth"],
    correctDisplay: "youth",
  },
  {
    id: "se-bible-phil4",
    topicId: "scriptureAndEgW",
    type: "fill",
    prompt:
      'Philippians 4:13: "I can do all things through ______ who strengthens me." (one word — name/title)',
    acceptableAnswers: ["christ", "him", "jesus"],
    correctDisplay: "Christ",
  },
  {
    id: "se-bible-ps119",
    topicId: "scriptureAndEgW",
    type: "fill",
    prompt:
      'Psalm 119:105: "Your word is a lamp to my feet and a light to my _____."',
    acceptableAnswers: ["path", "paths"],
    correctDisplay: "path",
  },
  {
    id: "se-bible-prov3",
    topicId: "scriptureAndEgW",
    type: "fill",
    prompt:
      'Proverbs 3:5–6: "Trust in the Lord with all your heart, and lean not on your own ______."',
    acceptableAnswers: ["understanding"],
    correctDisplay: "understanding",
  },
  {
    id: "se-bible-john3",
    topicId: "scriptureAndEgW",
    type: "multiple",
    prompt:
      'The verse beginning "For God so loved the world that He gave His only begotten Son…" (John 3:16) is found in which Gospel?',
    options: [
      { id: "john", label: "The Gospel according to John" },
      { id: "matthew", label: "The Gospel according to Matthew" },
      { id: "luke", label: "The Gospel according to Luke" },
      { id: "mark", label: "The Gospel according to Mark" },
    ],
    correctIds: ["john"],
  },
  {
    id: "se-egw-mh-method",
    topicId: "scriptureAndEgW",
    type: "multiple",
    prompt:
      "Ellen G. White describes Christ’s way of ministry—mingling with people, showing sympathy, ministering to needs, and winning confidence—as presented especially in which book?",
    options: [
      { id: "mh", label: "The Ministry of Healing" },
      { id: "gc", label: "The Great Controversy" },
      { id: "da", label: "Patriarchs and Prophets" },
      { id: "ed", label: "The Acts of the Apostles only" },
    ],
    correctIds: ["mh"],
  },
  {
    id: "se-egw-education",
    topicId: "scriptureAndEgW",
    type: "fill",
    prompt:
      'Education (E.G. White): True education "is the harmonious development of the _____, the mental, and the spiritual powers." (one word)',
    acceptableAnswers: ["physical"],
    correctDisplay: "physical",
  },
  {
    id: "se-egw-desire-of-ages",
    topicId: "scriptureAndEgW",
    type: "multiple",
    prompt:
      "Which Ellen G. White book is widely used for a narrative presentation of the life and ministry of Jesus Christ?",
    options: [
      { id: "da", label: "The Desire of Ages" },
      { id: "pp", label: "Thoughts From the Mount of Blessing only" },
      { id: "col-wrong", label: "Christ’s Object Lessons only" },
      { id: "gc", label: "The Great Controversy only" },
    ],
    correctIds: ["da"],
  },
  {
    id: "se-egw-steps",
    topicId: "scriptureAndEgW",
    type: "multiple",
    prompt:
      "Which short Ellen G. White book is often shared as a simple, devotional introduction to faith in Christ and the Christian life?",
    options: [
      { id: "sc", label: "Steps to Christ" },
      { id: "gc", label: "The Great Controversy" },
      { id: "tm", label: "Testimonies for the Church, volume 9 only" },
      { id: "mh", label: "The Ministry of Healing" },
    ],
    correctIds: ["sc"],
  },
  {
    id: "se-egw-great-controversy",
    topicId: "scriptureAndEgW",
    type: "multiple",
    prompt:
      "The Great Controversy presents, in broad outline, the conflict between:",
    options: [
      {
        id: "christ-satan",
        label: "Christ and Satan down through history to the final triumph of truth",
      },
      {
        id: "rome-only",
        label: "Only ancient Rome and Greece, with no spiritual meaning today",
      },
      {
        id: "pathfinder",
        label: "Pathfinder drill teams only",
      },
      {
        id: "music",
        label: "Secular music versus classical music only",
      },
    ],
    correctIds: ["christ-satan"],
  },
  {
    id: "se-egw-col-parables",
    topicId: "scriptureAndEgW",
    type: "multiple",
    prompt:
      "Christ’s Object Lessons by Ellen G. White focuses especially on:",
    options: [
      {
        id: "parables",
        label: "The parables of Christ and the lessons drawn from them",
      },
      {
        id: "drill",
        label: "Military drill commands for youth clubs",
      },
      {
        id: "music",
        label: "Choir music theory only",
      },
      {
        id: "cooking",
        label: "Cooking honors only",
      },
    ],
    correctIds: ["parables"],
  },
];
