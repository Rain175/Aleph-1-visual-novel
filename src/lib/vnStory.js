const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

// Visual novel story data for "Aleph-1 Break-In"

export const ASSETS = {
  bgGateClosed: "/bg-doors.webp",
  bgCorridorOpen: "/bg-tunnel-gray.webp",
  bgCorridorAlarm: "/bg-tunnel-purple.jpeg",
  rainSprite: "/roblox-guy.png",
  rainVoice: "/jjs-talking.mp3",
};

export const BIRTHDAY_MESSAGES = [
  { from: "Prateeksha", text: `Hello.
Hope you have a good day and enjoy yourself. And keep it up with your smart brain and spamming codes into the GC.` },

  { from: "Sofia", text: `Hello bro!
Ik u probably don't know me much since we haven't talked a lot lol, but I want to wish you a happy birthday, idk u much so I really can't say anything else 😅.
Happy birthday!` },

  { from: "Lucas", text: `Hi mrudil, happy birthday to you! I'm glad to have you as a part of your friend group this year! Hope you have an amazing rest of your year and beyond!` },

  { from: "Dani", text: `...` },

  { from: "Arthur", text: `...` },

  { from: "Sashtik", text: `...` },

  { from: "Nithilan", text: `Heya man, good job on surviving 15 years of life, ts reminded me of the first time you came to school, like right before the huge project (remember treball de sintesis??).
I mean, inspiration from you is how i started randomly making ts, even the one that you just experienced. Pretty shitty, wasn't it?? but hey, im not going into IT, no thank you I don't wanna work at mcdonalds.
But in reality, I really do enjoy your company you add a fun twist to things.
Now then, the reason I made this thing was very simple: you helped me make the ones for the others, so it's only right I made one when it was your bday.
Speaking of bdays…HAPPY BIRTHDAY!!!!

P.S: this wasn't written by AI-Nithilan` },
];

export const PHASES = [
  {
    id: 1,
    title: "The First Gate",
    background: ASSETS.bgGateClosed,
    introBeats: [
      { speaker: "rain", text: "Okay, remind me again why we thought breaking into an abandoned underground AI lab on a Tuesday was a good idea?" },
      { speaker: "player", text: "Because the main network interface is here, and Axiom-7 left a trail. Besides, where's your sense of adventure?" },
      { speaker: "rain", text: "Right here, currently screaming at me to turn around. Look at this thing—it's built like a bank vault. Four separate terminals are wired into the lock sequence." },
      { speaker: "player", text: "Classic corporate over-engineering. If we bypass the subnet masks simultaneously, the main piston should release. I'll take the two on the left; you take the right." },
      { speaker: "rain", text: "Fine, but if alarms start blaring and security drones drop from the ceiling, I'm blaming your optimism." },
    ],
    choice: {
      question: "How do you want to handle the first set of terminals?",
      options: [
        { id: "a", text: "\"Trust me, I've hacked worse systems in my sleep. Let's race.\"" },
        { id: "b", text: "\"Stay close and watch my back while I interface with the main node.\"" },
        { id: "c", text: "\"If things go south, just grab the data drive and run.\"" },
      ],
    },
    puzzles: [
      {
        id: "p1-1",
        language: "Python",
        context: "The terminal needs to calculate baseline power before booting the main screen.",
        codeBefore: "base_power = 50\nboost = 25\ntotal_power = ",
        codeAfter: "\nprint(\"System Power Level:\")\nprint(total_power)",
        answers: ["base_power + boost", "base_power+boost"],
        placeholder: "base_power + boost",
      },
      {
        id: "p1-2",
        language: "Python",
        context: "Checking if the airlock pressure is safe to open.",
        codeBefore: "pressure_psi = 14.7\nif pressure_psi ",
        codeAfter: " 14.7:\n    print(\"Airlock sealed safely.\")\nelse:\n    print(\"Warning: Pressure fluctuation detected!\")",
        answers: ["=="],
        placeholder: "==",
      },
      {
        id: "p1-3",
        language: "Java",
        context: "Printing a welcome banner to the station mainframe.",
        codeBefore: "String stationName = \"Abyss-IV\";\nint sector = 3;\nSystem.out.println(\"Connected to: \" + stationName ",
        codeAfter: " \" Sector \" + sector);",
        answers: ["+"],
        placeholder: "+",
      },
      {
        id: "p1-4",
        language: "Java",
        context: "The backup access keys are stored in an array in order. We need the SECOND key. Hint: Java arrays start counting from 0, so the first item is index 0.",
        codeBefore: "int[] keys = {101, 202, 303, 404};\nint activeKey = keys[",
        codeAfter: "];\nSystem.out.println(\"Active Key: \" + activeKey);",
        answers: ["1"],
        placeholder: "1",
      },
    ],
    outroBeats: [
      { speaker: "rain", text: "Well, what do you know? It actually worked. Though... I really didn't need that heart attack." },
    ],
  },
  {
    id: 2,
    title: "The Second Gate",
    background: ASSETS.bgCorridorOpen,
    introBeats: [
      { speaker: "player", text: "Not bad, but we aren't at the core yet. Looks like another security layer. Three more computers this time." },
      { speaker: "rain", text: "Three? They really didn't want anyone wandering into their subterranean playground, did they? Wonder what they were hiding down here." },
      { speaker: "player", text: "Whatever it was, Axiom-7 was managing it before the whole place went dark and the staff... well, you know. Let's just focus on the code." },
      { speaker: "rain", text: "On it. Honestly, these terminals look like they're running on ancient architecture. It's almost nostalgic if it wasn't so creepy." },
    ],
    choice: {
      question: "What is your theory on what Aleph-1 was actually researching down here?",
      options: [
        { id: "a", text: "\"Probably military AI routines. They never know when to quit.\"" },
        { id: "b", text: "\"Something experimental. Or maybe they were just trying to lock away a really big secret.\"" },
        { id: "c", text: "\"Who cares? Let's just see what's on the other side.\"" },
      ],
    },
    puzzles: [
      {
        id: "p2-1",
        language: "Python",
        context: "Melchior needs to read the first character of the purge code to confirm it's valid. Hint: Python strings are indexed starting from 0, so the first character is index 0.",
        codeBefore: "code = \"ALPHA-7\"\nprint(code[",
        codeAfter: "])",
        answers: ["0"],
        placeholder: "0",
      },
      {
        id: "p2-2",
        language: "Java",
        context: "Caspar manages tactical strategy and thermal safety. Evaluating whether an engine's temperature exceeds safe operational limits.",
        codeBefore: "public static boolean isOverheated(double temp) {\n    if (temp ",
        codeAfter: " 85.0) {\n        return true;\n    } else {\n        return false;\n    }\n}",
        answers: [">"],
        placeholder: ">",
      },
      {
        id: "p2-3",
        language: "JavaScript",
        context: "Balthasar is responsible for the facility's power grid. Verify if the current power draw is within safe operational limits.",
        codeBefore: "let currentLoadMW = 450.5;\nlet maxCapacityMW = 500.0;\nif (currentLoadMW ",
        codeAfter: " maxCapacityMW) {\n    console.log(\"Balthasar: Power grid stable.\");\n}",
        answers: ["<="],
        placeholder: "<=",
      },
    ],
    outroBeats: [
      { speaker: "rain", text: "Boom. We're making serious progress. Lead the way to the final bottleneck." },
    ],
  },
  {
    id: 3,
    title: "The Final Gate",
    background: ASSETS.bgCorridorAlarm,
    introBeats: [
      { speaker: "player", text: "This is it. The final gate. Just two terminals left between us and the core." },
      { speaker: "rain", text: "Only two? After seven systems, this feels almost suspiciously easy." },
      { speaker: "player", text: "Don't jinx it. The core firewalls are usually the most aggressive. Keep your fingers ready on the override keys." },
      { speaker: "rain", text: "Copy that. Let's finish this before the local generators give out completely—this place looks like it's running on sheer stubbornness anyway." },
    ],
    choice: {
      question: "Before hitting the final override, what do you say to Rain?",
      options: [
        { id: "a", text: "\"Ready to see what's waiting for us at the bottom?\"" },
        { id: "b", text: "\"Whatever happens next, I'm glad you came along for the ride.\"" },
        { id: "c", text: "\"Cover your ears, this next script is going to be loud.\"" },
      ],
    },
    puzzles: [
      {
        id: "p3-1",
        language: "Python",
        context: "Combining system tokens to force a manual command override in the core mainframe.",
        codeBefore: "prefix = \"SYS_\"\ncommand = \"REBOOT\"\noverride_code = prefix ",
        codeAfter: " command\nprint(\"Executing:\", override_code)",
        answers: ["+"],
        placeholder: "+",
      },
      {
        id: "p3-2",
        language: "JavaScript",
        context: "Querying the core terminal state object to check lock status before granting root access.",
        codeBefore: "let terminal = { id: 101, isLocked: false };\nif (terminal.isLocked === ",
        codeAfter: ") {\n    console.log(\"Access Granted to Terminal\", terminal.id);\n}",
        answers: ["false"],
        placeholder: "false",
      },
    ],
    outroBeats: [
      { speaker: "rain", text: "Whoa... Look at this place. Whatever happened here, it wasn't a clean shutdown." },
      { speaker: "player", text: "The whole sector is wrecked... except for that one terminal right there in the middle. It's already unlocked." },
      { speaker: "rain", text: "That's... really weird. An abandoned lab with a completely open terminal? It's like someone left a breadcrumb trail specifically for us." },
      { speaker: "player", text: "Let's see what's on the screen. It shouldn't be operational data..." },
    ],
  },
];

export const CORE_ROOM = {
  reveal: [
    { speaker: "rain", text: "Wait, are those... files? Open them up, let's see what's inside." },
  ],
  after: [
    { speaker: "player", text: "...They aren't system logs at all. They're messages. Birthday wishes." },
    { speaker: "rain", text: "No way. Someone actually went through the trouble of hiding birthday greetings deep inside an abandoned sci-fi hacker lab infrastructure? That is elite-level dedication." },
    { speaker: "player", text: "Yeah... they really did. Happy birthday to us, I guess." },
    { speaker: "rain", text: "Well, mission accomplished. Forget the AI secrets—this is way better than anything Aleph-1 manufactured down here." },
  ],
};
