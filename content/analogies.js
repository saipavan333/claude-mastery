/* School-kid analogies — one concrete everyday picture per lesson.
   Loaded after the track files; adds L[id].kid, which app.js renders as the
   "School-kid picture" callout right under "In one breath".
   Rule for writing these: one picture a 12-year-old already owns, and say
   where the picture stops being true when that matters. Added 2026-11-03. */
(function(){
var L = window.LESSONS || {};
var K = {
/* Track 1 — How Claude Works */
"1.1": "Think of the friend who has read every book in the school library and can make up a brand-new story on the spot in any style you ask. They are not looking the story up; they are inventing it word by word from everything they have read — which is also why they sometimes invent a «fact» that sounds right but isn't.",
"1.2": "Claude works at a desk. Everything for the job — your message, the whole chat so far, any files, and the answer it is writing — has to fit on that desk at once. Words are cut into small Lego bricks (tokens) before they go on the desk, and the desk only holds so many bricks.",
"1.3": "A school has a cycle, a scooter and a bus. You don't take the bus to the shop next door, and you don't carry forty kids on a cycle. Haiku, Sonnet, Opus and Fable are the same idea: pick the vehicle that fits the trip and the budget.",
"1.4": "It is one brain that can wear different uniforms: a chat window for talking, Cowork for doing chores on your files, Claude Code for building things, Chrome for errands on websites. Same person, different job, different uniform.",
"1.5": "Like a mobile data plan: a free pack to try it, a monthly pack for regular use, a bigger pack if you stream all day. The API is a separate prepaid meter — you pay for exactly what your own app uses.",
"1.6": "Claude is the classmate who always answers confidently, even when they are guessing. You don't stop asking them; you learn to say «show me where it says that in the textbook» before you copy the answer into your exam notes.",
/* Track 2 — Prompting Foundations */
"2.1": "Asking Claude for help is like giving a new substitute teacher instructions for your class: who the kids are, what the lesson is, what «done» looks like, and what to avoid. A sticky note saying «teach maths» gets you a random maths lesson.",
"2.2": "Tell a friend «get snacks» and you get chips. Tell them «two packets of salted peanuts, under ₹50, from the shop near the gate» and you get exactly that. Clear, direct instructions are the second message.",
"2.3": "When the art teacher shows one finished drawing before you start, everyone's work suddenly looks closer to what she wanted. Examples do the same for Claude — they show the target instead of describing it.",
"2.4": "A form with boxes (Name: ___, Class: ___) gets neater answers than a blank page. XML tags and output formats are the boxes you draw for Claude's answer.",
"2.5": "In a maths test, writing your working on rough paper catches mistakes that mental arithmetic misses — but you don't need rough paper to add 2 + 3. Thinking is the rough paper: use it for hard problems, skip it for easy ones.",
"2.6": "A school play: the same student acts very differently as the king, the doctor or the villain, depending on the role card they are handed. The system prompt is the role card.",
"2.7": "Nobody gets a drawing perfect on the first sketch. You draw, the teacher says «bigger sun, darker trees», you redraw. A conversation with Claude is the same loop of draft, feedback, redraft.",
/* Track 3 — Advanced Prompting */
"3.1": "You don't cook a whole biryani in one step. Wash the rice, fry the onions, cook the meat, layer, then steam. Prompt chaining splits a big job into steps where each step's output is the next step's input.",
"3.2": "Finding one sentence in a 500-page book is easier if the book is on the table first and your question is on a sticky note on top, not buried in chapter 12. Put the big documents first and the question last.",
"3.3": "Fill-in-the-blank worksheets get tidier answers than «write about it». Telling Claude exactly where to start and what boxes to fill keeps its answer on the rails.",
"3.4": "A good science project shows its sources, double-checks measurements, and says «we are not sure» when the data is thin. Hallucination defences are the same habits, built into the prompt.",
"3.5": "A birthday-invitation template: the layout stays the same, and you only change the name, date and place. A prompt template is that, for work you do every week.",
"3.6": "Before the real exam, the teacher gives a practice test with an answer key, so you know whether your study method actually works. An eval is the practice test for your prompt.",
"3.7": "A recipe book: you don't invent dal from scratch each night, you open the page that already works. The pattern library is the cookbook of prompts that have been tested.",
/* Track 4 — Claude App Mastery */
"4.1": "Most people use a new phone only for calls and photos, never finding the torch, the scanner or the translator. This lesson is the tour of the buttons you didn't know you had.",
"4.2": "Projects are labelled school binders: the science binder holds the science notes and instructions, so every time you open it you don't have to explain science again.",
"4.3": "Memory is like a class teacher who remembers you prefer examples from cricket. Useful — and you should know what's in that teacher's notebook and how to erase a page.",
"4.4": "Hand Claude a photo of the class timetable or a spreadsheet of marks and it reads it like a classmate would — then you check it read the numbers right.",
"4.5": "You describe a game you want («a quiz with a timer and a score»), and a helper builds a working toy on the table while you watch. Artifacts turn a sentence into a small working thing.",
"4.6": "Research mode is a librarian who goes through many books and websites for you, then hands back a report with sticky notes showing where each fact came from.",
"4.7": "Connectors are like giving the helper a key to the school's notice board and library, so it can look things up there instead of asking you to copy-paste everything.",
"4.8": "A Skill is a recipe card in a drawer. Claude only reads the title on each card until a job matches, then pulls out that card and follows it step by step.",
/* Track 5 — Cowork */
"5.1": "A chatbot is a friend on the phone giving advice; Cowork is a friend who comes over and actually helps tidy your room while you watch.",
"5.2": "Before the helper starts, you show them which cupboards they may open and which they must not touch, and you check their work before it's final.",
"5.3": "A messy drawer of 500 receipts becomes neat folders by month and a list of totals — the boring sorting job done for you, with you checking a few at random.",
"5.4": "Like a class monitor who turns the teacher's rough notes into a neat handout, a marks sheet and a slide show for parents' day.",
"5.5": "An alarm clock that doesn't just ring but also does the job: every Monday at 8 it makes the weekly summary and leaves it on your desk.",
"5.6": "A group project with roles: one kid researches, one writes, one checks. Sub-agents are those teammates, each with one clear job.",
/* Track 6 — Claude in Your Tools */
"6.1": "Like asking a careful older cousin to fill a form on a website for you while you sit next to them — and you stop them before they press «Pay».",
"6.2": "A calculator that can read the whole marks spreadsheet, explain the averages, and write the formula for you — while you check the answers make sense.",
"6.3": "Instead of walking to the staff room to ask a question, the helper is already sitting in your class WhatsApp group and in the shared documents.",
"6.4": "You don't use a hammer to cut paper. Pick the tool by the job: chat to think, Cowork for file chores, Code for building, Chrome for website errands.",
/* Track 7 — Claude Code */
"7.1": "Claude Code is a helper who works inside the toolbox itself — it can open drawers (files), use the tools (commands) and build the thing, not just tell you how.",
"7.2": "First day with a new lab partner: you explain the experiment, they suggest a step, you say «yes» or «no», and together you finish and write it up.",
"7.3": "CLAUDE.md is the note on the classroom door: «Shoes off. Science kit in cupboard 3. Never touch the fish tank.» Every helper who walks in reads it first.",
"7.4": "Shortcuts and modes are like the buttons on a game controller: one to pause and plan, one to save a checkpoint, one to rewind when something goes wrong.",
"7.5": "A workshop: recipe cards (skills) for the usual jobs, apprentices (subagents) who go do side tasks and report back, and safety switches (hooks) that stop the saw if the guard is open — no matter who is using it.",
"7.6": "Like running three washing machines at once: each load goes on its own, and you come back to check them when they beep.",
"7.7": "The same helper who builds code can also sort files, research, and fix the school website's settings — it's a general handyman, not only a coder.",
"7.8": "The science-fair rule: plan the experiment, build it, test it, then write it up — and never skip the test before you show the judges.",
/* Track 8 — MCP */
"8.1": "MCP is the USB-C port. Before it, every gadget needed its own charger; now one standard plug connects any AI to any tool that speaks the standard.",
"8.2": "Plugging a stranger's pen drive into the school computer is risky. Using an MCP server is the same: check where it came from and what it is allowed to touch.",
"8.3": "An app store for plugs: a directory where you find ready-made MCP servers, read reviews, and see what each one is allowed to do before you install it.",
"8.4": "You build the plug for your own gadget. A short program that says «here are my buttons, here is what each one does» — and suddenly any AI can press them.",
"8.5": "Never let one helper have all three: the house keys (your private data), letters from strangers (untrusted content), and a phone to call out (a way to send data away). With all three, one tricky letter can make them hand your keys to a stranger.",
/* Track 9 — The Claude API */
"9.1": "The app is eating at a restaurant; the API is ordering from the kitchen directly, by writing the order on a slip in an exact format, so your own app can serve the food.",
"9.2": "Claude has no memory between calls, like a goldfish. Each time, you hand it the whole conversation written on a scroll, plus a card of house rules (the system prompt).",
"9.3": "Like showing a classmate a photo of the blackboard or a scanned worksheet: Claude can read images and PDFs, not just typed words.",
"9.4": "Claude can't press buttons itself. It writes a note saying «please look up order 77», your program does it, and hands the answer back. Tools are the notes it can pass.",
"9.5": "A form with fixed boxes that the pen physically can't write outside of. Structured outputs make Claude's answer fit your boxes exactly.",
"9.6": "Photocopying the same 30-page textbook for every student is expensive; keeping one copy in the class library and letting everyone read it is cheap. Caching keeps the unchanging part ready so you don't pay full price for it every time. Batching is posting letters by regular mail instead of courier: slower, half the price.",
"9.7": "Planning a school trip budget: cheaper bus for the long road, a taxi only where it's needed, packed lunches instead of restaurants. Cost engineering is choosing the cheapest option that still does the job well.",
"9.8": "The science fair project you actually build and show: not just the idea, but a working model, a poster, and a price label.",
/* Track 10 — Agents */
"10.1": "A robot vacuum: it has a goal (clean floor), looks around, moves, bumps into something, changes direction, and keeps going until done. An agent is a goal plus that loop.",
"10.2": "A kitchen line: one cook chops, the next fries, the head chef decides which dish goes to which cook. Workflows are fixed kitchen lines; agents decide the steps themselves.",
"10.3": "Claude Code packaged into a box you can put inside your own machine — the same helper, now working inside your app.",
"10.4": "Renting a fully staffed workshop instead of building your own: Anthropic provides the room, tools and supervisor, you give the job.",
"10.5": "A driving test before the licence, a seatbelt during the drive, and an adult in the passenger seat for tricky roads. Evals, guardrails and human checks keep an agent safe to use.",
"10.6": "Give a new helper only the keys to the rooms they need, never the master key, and assume any note slipped under the door might be a trick.",
/* Track 11 — Freelancing */
"11.1": "Before opening a lemonade stand, you check which street has thirsty people and how many other stands are already there.",
"11.2": "«I do everything» is a stall with no sign. «Birthday cards in 24 hours» is a stall people can find and remember.",
"11.3": "Different markets for different stalls: a busy fair (Upwork), a small-craft corner (Fiverr), and a notice board where people already know you (LinkedIn).",
"11.4": "If you can now make a birthday card in 10 minutes instead of an hour, charging by the minute means you earn less for being faster. Charge for the card, not the minutes.",
"11.5": "A sandwich stall with a fixed routine: same order of steps, same checks, every time — so every sandwich is good even on a busy day.",
"11.6": "From one lemonade stand to three, with friends running two of them using your recipe card and you checking quality.",
"11.7": "Before you borrow a friend's bike, you agree on rules: who fixes a puncture, when it comes back. Contracts and data rules are that agreement with clients.",
/* Track 12 — Products & Content */
"12.1": "Before baking 100 cupcakes for the school sale, you ask 10 classmates if they'd actually buy one, and at what price.",
"12.2": "If each cupcake costs ₹15 to make and you sell it for ₹12, the more you sell the more you lose. Unit economics is checking that sum before you scale.",
"12.3": "A small team where Claude plays many roles: the designer, the copywriter and the tester, while you stay the boss who decides.",
"12.4": "Like selling a handmade board game: the box (plugin), the rule book (skill) and the special dice (MCP server) can each be sold to people who need them.",
"12.5": "Posting videos is like a school stall at a giant fair: a few stalls get crowds, most get a few visitors. Plan for the honest middle, not the lucky top.",
"12.6": "For every famous school project there were twenty that failed quietly. Studying why they failed is cheaper than repeating it.",
/* Track 13 — Get Hired */
"13.1": "Like knowing which colleges are opening new seats this year and which subjects they want, before you choose your stream.",
"13.2": "A swimming certificate proves you passed a test, but the coach still wants to see you swim. Certificates open the door; your work gets you picked.",
"13.3": "A science-fair stall with your actual working models on the table beats a poster that only says «I am good at science».",
"13.4": "Using a study partner to sharpen your application: they quiz you, check your answers, and spot weak spots — but you still write it in your own voice.",
"13.5": "An interview is a viva: they ask «why did you do it this way?», and the one who built it and can explain the choices wins.",
/* Track 14 — Capstones */
"14.1": "Set up your own morning routine machine: the alarm, the lunchbox checklist and the homework reminder all run themselves.",
"14.2": "A factory line for school reports: papers go in one end, neat checked reports come out the other, and a teacher checks the tricky ones.",
"14.3": "Build a new plug for your own gadget, test it with friends, and write the instruction leaflet so anyone can use it.",
"14.4": "Your own small shop on the internet: one useful thing, a price, and a counter that keeps track of what each sale costs you.",
"14.5": "A 30-day plan for your lemonade stand: week 1 recipe, week 2 first customers, week 3 feedback, week 4 the real launch.",
/* Track 15 — Agent Build-Alongs */
"15.1": "A recipe book for helpers people will pay for: what job it does, what it must never do, and how you prove it works.",
"15.2": "The school office helper who sorts the morning mail into piles (urgent, normal, junk) and writes draft replies — but the principal signs every letter that goes out.",
"15.3": "One long speech turned into a poster, a short notice and a WhatsApp message — same message, cut to fit each place, and checked against the original.",
"15.4": "A news monitor for your cricket team: every morning it reads the sports pages and tells you only what changed about the teams you care about, with links.",
"15.5": "A help desk that answers the common questions from the school handbook, shows the page it used, and hands the unusual ones to a teacher.",
"15.6": "Turning your homemade board game into a boxed product with a price, a guarantee and a support email.",
/* Track 16 — The 2026 Frontier */
"16.1": "One school bag with separate pockets for notebooks, lunch and sports kit — chat, Cowork, Docs and Slides now live in one app instead of four.",
"16.2": "A group project binder where several classmates work on different chapters at once and share the same notes page.",
"16.3": "A cousin who can now run whole website errands by themselves — and still stops to ask before paying or sending anything.",
"16.4": "You write a recipe card once, and any kitchen that follows the same card format — Claude's app, Claude Code, the API — can cook it.",
"16.5": "A smart filing cabinet: you drop in a stack of receipts once, and the helper reads them, fills a table, and flags any it couldn't read clearly.",
"16.6": "Instead of making «a game», you make «a revision game for Class 10 maths» and sell it to every school that teaches Class 10 maths."
};
Object.keys(K).forEach(function(id){ if(L[id]) L[id].kid = K[id]; });
window.KID_ANALOGIES = K;
})();
