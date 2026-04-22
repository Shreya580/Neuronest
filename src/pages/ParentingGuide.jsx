import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Research-backed guide data ───────────────────────────────────────────────
// Sources:
// 1. Rahman et al., 2016 (Lancet Psychiatry) — PASS trial, India/Pakistan, parent-mediated intervention
// 2. Oono et al., 2013 (Cochrane) — Parent-mediated early intervention for ASD
// 3. Uke et al., 2024 (PMC) — ASD interventions in India
// 4. Divan et al., 2022 (PMC) — Community-based autism in India
// 5. START research (Dubey et al., 2024) — Social, sensory, motor domains

const CATEGORIES = [
  { id: "all",     label: "All Guides",       emoji: "📚", color: "from-slate-400 to-slate-500" },
  { id: "social",  label: "Social Skills",    emoji: "👥", color: "from-pink-400 to-rose-500" },
  { id: "speech",  label: "Speech & Language",emoji: "🗣️", color: "from-sky-400 to-blue-500" },
  { id: "sensory", label: "Sensory",          emoji: "🌀", color: "from-purple-400 to-violet-500" },
  { id: "motor",   label: "Motor Skills",     emoji: "✋", color: "from-green-400 to-teal-500" },
  { id: "behavior",label: "Behaviour",        emoji: "🧩", color: "from-orange-400 to-amber-500" },
  { id: "routine", label: "Daily Routines",   emoji: "🌅", color: "from-yellow-400 to-orange-400" },
];

const GUIDES = [
  // ── SOCIAL ──────────────────────────────────────────────────────────────────
  {
    id: 1, category: "social", age: "1–3 yrs",
    title: "Joint Attention: The Foundation of Social Learning",
    summary: "Help your child learn to share attention with you — one of the most powerful early skills.",
    emoji: "👀",
    color: { bg: "bg-pink-50", border: "border-pink-200", tag: "bg-pink-100 text-pink-700", btn: "from-pink-400 to-rose-500" },
    research: "Rahman et al. (2016, Lancet Psychiatry) — PASS RCT in India",
    researchNote: "Parent-mediated communication interventions in India improved joint attention in 8 months (p<0.05). The PASS trial — the first large RCT in South Asia — showed that non-specialist delivered approaches work at home.",
    badge: "🔬 RCT Evidence",
    steps: [
      { title: "Follow their lead", desc: "Join whatever your child is already doing. If they're stacking blocks, you stack blocks too. This builds shared focus naturally." },
      { title: "Comment, don't command", desc: "Instead of 'Look at the dog!', say 'Oh! A dog.' softly. Wait 3–5 seconds. If they look, smile and repeat. No pressure." },
      { title: "Pause and wait", desc: "During play, pause suddenly and look at your child expectantly. This 'expectant pause' invites them to check in with you — the heart of joint attention." },
      { title: "Point and name", desc: "Point to interesting things throughout the day (birds, colours, people). Say one word clearly. Don't wait for a response. Just narrate the world." },
      { title: "Celebrate every look", desc: "Any time they make eye contact or look where you point, immediately smile, say their name warmly, and continue the interaction. Positive reinforcement is everything." },
    ],
    tips: ["Do this for 10–15 minutes, 3× daily — consistency matters more than duration", "Works best during meals, bath time, and outdoor walks", "If your child ignores you, don't repeat loudly — quietly try again in 30 seconds"],
    redFlags: ["No response to name by 12 months", "Not pointing by 14 months", "Not sharing interest in objects by 18 months"],
  },
  {
    id: 2, category: "social", age: "2–5 yrs",
    title: "Building Social Smiling & Reciprocal Play",
    summary: "Simple face-to-face games that strengthen your child's social reward pathways.",
    emoji: "😊",
    color: { bg: "bg-rose-50", border: "border-rose-200", tag: "bg-rose-100 text-rose-700", btn: "from-rose-400 to-pink-500" },
    research: "Dubey et al. (2024, Autism) — START study, India",
    researchNote: "START research showed that typically developing children have significantly higher social stimulus preference than autistic children. Building social reward responsivity early improves long-term social outcomes.",
    badge: "🏥 India Research",
    steps: [
      { title: "Peek-a-boo variations", desc: "Classic but powerful. Hide behind your hands, a cloth, or a door. The anticipation builds social expectation and reward circuitry." },
      { title: "Mirror games", desc: "Sit facing your child and copy exactly what they do — sounds, movements, expressions. When they notice, pause. Most children will repeat the action to see if you copy again." },
      { title: "Tickle and wait", desc: "Tickle their tummy gently, then stop and wait. Make eye contact. When they look at you, do it again. This teaches: 'looking at people makes good things happen.'" },
      { title: "Turn-taking with objects", desc: "Roll a ball back and forth. Take turns building a tower. Even 2 turns = success. Gradually increase." },
      { title: "Narrate emotions", desc: "Name what you and they feel: 'You're happy! Look at that smile!' Simple emotion labelling builds self-awareness." },
    ],
    tips: ["Keep sessions short — 5 mins works better than 30 forced minutes", "Match your energy to your child's — don't be louder than they want", "Physical closeness (sitting face-to-face on the floor) dramatically improves engagement"],
    redFlags: ["Not smiling back by 6 months", "No reciprocal play by 18 months", "Prefers objects over people consistently after age 2"],
  },
  // ── SPEECH ──────────────────────────────────────────────────────────────────
  {
    id: 3, category: "speech", age: "0–3 yrs",
    title: "Speech Stimulation: Talking to Your Baby the Right Way",
    summary: "Research-backed techniques to accelerate language development through everyday conversation.",
    emoji: "🗣️",
    color: { bg: "bg-sky-50", border: "border-sky-200", tag: "bg-sky-100 text-sky-700", btn: "from-sky-400 to-blue-500" },
    research: "Oono et al. (2013, Cochrane Review) — Parent-mediated early intervention",
    researchNote: "Cochrane review of 19 RCTs found parent-mediated interventions significantly improved child language outcomes (SMD 0.30, 95% CI). Parental language input quality predicts vocabulary size at age 3.",
    badge: "📋 Cochrane Review",
    steps: [
      { title: "Child-Directed Speech (CDS)", desc: "Speak slightly slower, with higher pitch, shorter sentences, and exaggerated intonation. This is NOT 'baby talk' — it's a proven technique called CDS that helps brains tune to language." },
      { title: "Respond to all communication attempts", desc: "If your child makes a sound, babbles, or reaches — respond with words. 'Oh! You want the cup? Here's the cup!' This creates a communication loop." },
      { title: "Expand their utterances", desc: "Child says 'ball'. You say 'Yes! Big red ball!' Child says 'more milk'. You say 'More milk please!' Add 1–2 words each time, never more." },
      { title: "Reduce questions, increase comments", desc: "Instead of 'What colour is this?' say 'That's a blue block!' Questions put pressure on children. Comments invite them in." },
      { title: "Read aloud daily — even to newborns", desc: "Point at pictures and name them. Use different voices. Stop and wait on familiar pages — can they fill in the word? This builds vocabulary AND narrative thinking." },
    ],
    tips: ["Target: 30,000 words/day heard by your child (research-backed 'word gap' finding)", "Bilingual homes: use each language consistently — bilingualism does NOT cause delays", "Turn off background TV — it reduces quality child-directed speech by 30%"],
    redFlags: ["No babbling by 12 months", "No single words by 16 months", "No 2-word phrases by 24 months", "Any loss of previously acquired language"],
  },
  {
    id: 4, category: "speech", age: "3–6 yrs",
    title: "Building Vocabulary Through Play & Routines",
    summary: "Natural language-rich environments help children with delays catch up faster.",
    emoji: "📖",
    color: { bg: "bg-blue-50", border: "border-blue-200", tag: "bg-blue-100 text-blue-700", btn: "from-blue-400 to-indigo-500" },
    research: "Uke et al. (2024, PMC) — ASD interventions, India",
    researchNote: "Speech-language therapy is the most commonly used and evidence-supported intervention for children with ASD. In India, parent-implemented approaches are equally effective and far more accessible (Uke et al., 2024).",
    badge: "🇮🇳 India Context",
    steps: [
      { title: "Narrate your day", desc: "Running commentary of everything you do: 'Now we're washing hands. Water is cold! Soap is white and bubbly.' 5 mins of this beats 30 mins of structured lessons." },
      { title: "Mealtime conversations", desc: "Name every food. Describe textures ('soft roti', 'crunchy carrot'). Ask 'Is it hot or cold?' Wait 10 seconds. If no response, answer yourself calmly." },
      { title: "Sing with actions", desc: "Action songs (Wheels on the Bus, Twinkle Twinkle) build vocabulary, rhythm, and motor-language connections simultaneously. Pause on familiar lines and wait for them to fill in." },
      { title: "Picture books over screen time", desc: "Shared book reading produces 3× more vocabulary exposure per minute than equivalent screen time. Use books WITH your child, not screens for your child." },
      { title: "PECS basics", desc: "Picture Exchange Communication System — if your child is minimally verbal, print pictures of their favourite things. Teach them to hand you the picture to request the item. Simple, powerful, evidence-based." },
    ],
    tips: ["Augmentative communication (pictures, gestures, signing) does NOT delay speech — it supports it", "In multilingual homes, pick one language for reading and keep it consistent", "If your child has a word and loses it — see a professional within 2 weeks"],
    redFlags: ["Fewer than 50 words by age 2", "No sentences by age 3", "Difficulty being understood by strangers at age 4+"],
  },
  // ── SENSORY ─────────────────────────────────────────────────────────────────
  {
    id: 5, category: "sensory", age: "1–6 yrs",
    title: "Understanding Sensory Sensitivities in Young Children",
    summary: "Why your child covers ears, avoids textures, or spins objects — and what helps.",
    emoji: "🌀",
    color: { bg: "bg-purple-50", border: "border-purple-200", tag: "bg-purple-100 text-purple-700", btn: "from-purple-400 to-violet-500" },
    research: "Dubey et al. (2024, Autism) — START sensory domain",
    researchNote: "START research found children with neurodevelopmental conditions showed significantly higher fascination with repetitive/spinning stimuli and higher sensory sensitivity. Understanding this helps caregivers respond, not react.",
    badge: "🔬 START Research",
    steps: [
      { title: "Identify your child's sensory profile", desc: "Note which senses they're OVER-sensitive to (noise, touch, light) and which they SEEK (spinning, deep pressure, movement). Both are valid — and both need different strategies." },
      { title: "Create a sensory diet", desc: "Schedule regular sensory inputs throughout the day: proprioceptive (carrying heavy bags, playing with playdough), vestibular (swinging, rocking), and tactile (sand, water play). Predictable sensory input reduces overall anxiety." },
      { title: "Noise preparation, not avoidance", desc: "For noise-sensitive children: warn them before loud sounds ('The mixer is going on now — it'll be loud for 30 seconds'). Verbal warnings reduce sensory distress significantly." },
      { title: "Slow desensitisation for textures", desc: "For food texture issues: put new foods on the plate without pressure. Progress: tolerate → touch → smell → lick → bite. Never force. Takes weeks to months." },
      { title: "Safe sensory space", desc: "Create one corner at home with dim light, soft textures, and quiet. When overstimulated, guide your child there — not as punishment, but as regulation. This builds self-regulation skills." },
    ],
    tips: ["Sensory-seeking behaviours (spinning, flapping) are regulation strategies — they serve a function", "Cutting tags from clothes, choosing soft fabrics = low-cost, high-impact intervention", "Noise-cancelling headphones during overwhelming situations are a legitimate tool, not 'giving in'"],
    redFlags: ["Extreme distress (30+ min) from normal sensory input", "Sensory sensitivity preventing school or meals", "Self-injurious behaviour to escape sensory input"],
  },
  // ── MOTOR ────────────────────────────────────────────────────────────────────
  {
    id: 6, category: "motor", age: "1–4 yrs",
    title: "Fine Motor Development Through Everyday Play",
    summary: "Simple daily activities that build the hand precision skills linked to academic success.",
    emoji: "✋",
    color: { bg: "bg-green-50", border: "border-green-200", tag: "bg-green-100 text-green-700", btn: "from-green-400 to-teal-500" },
    research: "Dubey et al. (2024, Autism) — START motor domain",
    researchNote: "START found lower fine motor accuracy (higher spatial error, RMSE) in autistic and ID children vs. typically developing children. Fine motor practice at home significantly improves outcomes — the brain remains highly plastic until age 6.",
    badge: "🔬 START Research",
    steps: [
      { title: "Playdough daily", desc: "Rolling, pinching, poking, cutting playdough strengthens the intrinsic hand muscles used for writing and tool use. 10 minutes = meaningful gains. Make at home with flour, salt, and water." },
      { title: "Stacking and sorting", desc: "Nesting cups, block towers, sorting by colour or shape. These build pincer grip, bilateral coordination, and visual-motor integration simultaneously." },
      { title: "Finger painting & drawing", desc: "Finger painting before pencils. Crayon grip develops naturally when children have had enough experience with their fingers. Don't rush to pencils." },
      { title: "Threading and lacing", desc: "Thread large beads, pasta tubes, or cheerios onto a shoelace. Progressively reduce bead size. This directly trains the precision grip needed for writing." },
      { title: "Water and sand play", desc: "Pouring water between containers, scooping sand, sieving — these build wrist control, grip strength, and spatial coordination. Completely free, completely effective." },
    ],
    tips: ["Children need 2 years of gross motor before fine motor — don't skip running, climbing, and throwing", "Scissors with spring mechanisms help children with low grip strength", "Left-handed children: get left-handed scissors and adapt — do not switch their dominant hand"],
    redFlags: ["Not picking up small objects (raisins) by 12 months", "Not using spoon/fork with some accuracy by 24 months", "Not drawing any recognisable lines or circles by age 3"],
  },
  {
    id: 7, category: "motor", age: "2–6 yrs",
    title: "Gross Motor Milestones and How to Support Them",
    summary: "Walking, running, jumping and climbing aren't just fun — they're brain development.",
    emoji: "🏃",
    color: { bg: "bg-teal-50", border: "border-teal-200", tag: "bg-teal-100 text-teal-700", btn: "from-teal-400 to-green-500" },
    research: "WHO Nurturing Care Framework (2018) + CDC developmental milestones",
    researchNote: "The WHO Nurturing Care for Early Childhood Development framework emphasises that movement is a primary driver of cognitive development. Physical play improves attention, motor planning, and social engagement simultaneously.",
    badge: "🌍 WHO Framework",
    steps: [
      { title: "Floor time — literally", desc: "Babies and toddlers need time on the floor every day without being held or put in bouncers. Tummy time, rolling, crawling — these build the postural muscles and neurological pathways for all movement." },
      { title: "Obstacle courses at home", desc: "Cushions to climb over, tunnels made from chairs and blankets, things to step on and off. Novel physical challenges build motor planning — the brain's ability to sequence movements." },
      { title: "Jumping milestones", desc: "Two-foot jump by 2 years. Hop on one foot by 4 years. Skip by 5 years. If delayed: practice stepping off a step, then jumping from low platforms. Trampoline time is excellent therapy." },
      { title: "Ball skills", desc: "Rolling, throwing, kicking, and catching develop eye-hand coordination and anticipatory motor control. Start large, move to smaller balls. Catching a large beachball at age 2 → tennis ball at age 5." },
      { title: "Outdoor time daily", desc: "Uneven surfaces (grass, sand, gravel) challenge the balance system far more than indoor floors. 60 minutes outdoors per day is the WHO recommendation." },
    ],
    tips: ["Limit chairs and high chairs — more time on the floor = more motor development", "Water play and swimming are excellent for children with motor delays", "If your child walks on tiptoes persistently after age 3, mention this to your pediatrician"],
    redFlags: ["Not walking by 18 months", "Persistent toe-walking after age 3", "Falling frequently or appearing very uncoordinated after age 4"],
  },
  // ── BEHAVIOUR ────────────────────────────────────────────────────────────────
  {
    id: 8, category: "behavior", age: "1–6 yrs",
    title: "Understanding & Responding to Meltdowns",
    summary: "Meltdowns are not tantrums. Understanding the difference changes everything.",
    emoji: "🧩",
    color: { bg: "bg-orange-50", border: "border-orange-200", tag: "bg-orange-100 text-orange-700", btn: "from-orange-400 to-amber-500" },
    research: "ABA meta-analysis — Springer (2022); Uke et al. (2024, PMC)",
    researchNote: "Meta-analysis (Springer, 2022) of 51 RCTs found ABA-based parent interventions had effect size g=0.55 for reducing challenging behaviours. Understanding the function of behaviour before responding is the evidence-based starting point.",
    badge: "📊 Meta-Analysis",
    steps: [
      { title: "Tantrum vs. meltdown", desc: "Tantrum: goal-directed, child checks your reaction, can be stopped by giving what they want. Meltdown: neurological overwhelm, no goal, cannot be stopped by 'giving in'. Respond differently." },
      { title: "During a meltdown: safety first", desc: "Remove dangerous objects. Don't talk, reason, or punish. Get down to their level quietly. Minimise sensory input (dim lights, reduce noise). Wait. This is not the time to teach anything." },
      { title: "Identify triggers", desc: "Keep a simple log for 2 weeks: time, what happened before, intensity, duration, what ended it. Patterns emerge. Most meltdowns have consistent antecedents that can be modified." },
      { title: "Teach regulation before the meltdown", desc: "During calm moments, teach simple strategies: deep breaths (blow out a candle), squeezing a soft toy, going to a quiet spot. Practice when calm so it's available when needed." },
      { title: "After the meltdown: reconnect", desc: "Once calm, offer a hug or quiet closeness. Don't lecture or punish. They're often exhausted and scared. Reconnection helps. Teaching can happen much later." },
    ],
    tips: ["Hunger, tiredness, and transitions (arriving somewhere new, switching activities) cause 80% of meltdowns", "Visual schedules dramatically reduce transition meltdowns — show what comes next", "Your own calm IS the intervention — regulated adult = faster regulated child"],
    redFlags: ["Meltdowns lasting >60 minutes", "Self-injury during meltdowns", "More than 10 meltdowns per day after age 4"],
  },
  {
    id: 9, category: "behavior", age: "2–6 yrs",
    title: "Positive Behaviour Support at Home",
    summary: "Evidence-based strategies to build good behaviour without punishments.",
    emoji: "⭐",
    color: { bg: "bg-amber-50", border: "border-amber-200", tag: "bg-amber-100 text-amber-700", btn: "from-amber-400 to-orange-500" },
    research: "Parent-Implemented Interventions meta-analysis (Springer, 2022)",
    researchNote: "51-RCT meta-analysis found parent-implemented positive behaviour support had effect size g=0.60 for improving social skills and g=0.52 for reducing maladaptive behaviour — comparable to therapist-delivered intervention.",
    badge: "📊 51-RCT Evidence",
    steps: [
      { title: "Catch them being good", desc: "Describe exactly what you see: 'You put your shoes away without being asked — that's wonderful!' Specific praise is 4× more effective than 'Good boy/girl'." },
      { title: "1:4 ratio", desc: "For every correction, give 4 positive comments. This ratio is the minimum needed to maintain a child's willingness to try. Count yours — most parents give 1:1 or worse." },
      { title: "Clear, simple instructions", desc: "One instruction at a time. Use their name first. Get down to their level. Make eye contact. State what TO do ('Sit here') not what NOT to do ('Stop running')." },
      { title: "Visual schedules", desc: "Sequence of pictures showing the morning routine / bedtime routine / school prep. Reduces arguments by 60-70% in ASD research. Children follow pictures better than words." },
      { title: "First-Then boards", desc: "'First shoes, then iPad.' Shows the child exactly what they need to do AND what reward is coming. Removes power struggles by making expectations visible and the outcome predictable." },
    ],
    tips: ["Punishment teaches what NOT to do but doesn't teach what TO do — always pair with positive alternative", "Time-outs work only if the child understands why, can remember why, and isn't using them to escape demands", "Consistency between caregivers matters more than the strategy itself"],
    redFlags: ["Child shows no response to any praise or reward", "Aggression toward others daily after age 5", "Destruction of property regularly after age 4"],
  },
  // ── ROUTINE ──────────────────────────────────────────────────────────────────
  {
    id: 10, category: "routine", age: "1–6 yrs",
    title: "Why Routines Are Therapeutic for Neurodivergent Children",
    summary: "Predictability isn't just comforting — it's cognitively essential for atypically developing children.",
    emoji: "🌅",
    color: { bg: "bg-yellow-50", border: "border-yellow-200", tag: "bg-yellow-100 text-yellow-700", btn: "from-yellow-400 to-orange-400" },
    research: "Divan et al. (2022, PMC) — Community autism interventions India",
    researchNote: "Indian community-based autism research found that structured daily routines reduced anxiety, improved sleep, and increased engagement with learning activities in children with ASD. Routine is not restriction — it is scaffolding.",
    badge: "🇮🇳 India Research",
    steps: [
      { title: "Morning routine in pictures", desc: "Photograph your child doing each step: wake up → toilet → wash face → get dressed → eat breakfast. Laminate and put on bedroom door. Point to each step as it happens." },
      { title: "Transition warnings", desc: "Five-minute warning before any activity change: 'In 5 minutes, we're leaving the park.' Then 2 minutes. Then 1 minute. Then the change. Reduces resistance by 60-80%." },
      { title: "Consistent mealtimes", desc: "Same chair, same time, same routine signals safety to a dysregulated nervous system. Introduce new foods alongside accepted foods — never remove accepted foods." },
      { title: "Bedtime routine", desc: "Research shows children with ASD with consistent 20-30 minute bedtime routines fall asleep 40 minutes faster. Bath → pyjamas → one book → lights out. Same every night." },
      { title: "Prepare for disruptions", desc: "When routine must break (travel, illness, school holiday), show the new schedule in advance. 'Saturday is different — here is what we'll do instead.' Preparation prevents meltdowns." },
    ],
    tips: ["'Sameness' in autism is not stubbornness — it is a coping strategy for an overwhelming world", "Change one thing at a time. Never change multiple routines simultaneously", "School holidays need their own mini-structure — complete unstructured time is harder, not easier"],
    redFlags: ["Complete inability to deviate from routine even in emergencies", "Extreme distress at any routine change lasting >2 hours", "Rituals taking >2 hours per day"],
  },
  {
    id: 11, category: "routine", age: "2–6 yrs",
    title: "Sleep Strategies for Children with Developmental Differences",
    summary: "70% of children with ASD have sleep problems. Here's what the evidence actually says.",
    emoji: "🌙",
    color: { bg: "bg-indigo-50", border: "border-indigo-200", tag: "bg-indigo-100 text-indigo-700", btn: "from-indigo-400 to-purple-500" },
    research: "Williams & Shedko (2022); Richdale & Schreck (2009)",
    researchNote: "70% of children with ASD experience chronic sleep problems (Richdale & Schreck, 2009). Behavioural sleep interventions have strong evidence — sleep improvements also reduce daytime behaviour challenges by 30-40%.",
    badge: "📊 Strong Evidence",
    steps: [
      { title: "Consistent sleep/wake times", desc: "Same bedtime and wake time 7 days a week — weekends included. The circadian rhythm cannot be 'saved up'. Each late night costs 3-4 days of recovery." },
      { title: "Blue light curfew", desc: "All screens off 60 minutes before bed. Blue light suppresses melatonin by up to 50%. Replace with books, puzzles, or quiet play with dim lighting." },
      { title: "Body clock feeding cues", desc: "A small, warm snack 30 mins before bed (milk, banana, oats) raises tryptophan — the melatonin precursor. This is why 'a warm glass of milk' is genuinely evidence-based." },
      { title: "Visual sleep story", desc: "Create a booklet: 'First I have a bath. Then I put on pyjamas. Then Mama reads one book. Then it's dark and quiet and safe.' Read it together each night. Predictability = safety = sleep." },
      { title: "Weighted blanket trial", desc: "Weighted blankets (roughly 10% of body weight) improve sleep onset for sensory-sensitive children in several small studies. Low risk, low cost — worth trying for 2 weeks." },
    ],
    tips: ["Melatonin supplements: only after paediatric advice — but safe and effective for ASD sleep (AAP 2020)", "Co-sleeping is culturally normative in India and not inherently harmful", "If your child is sleeping fewer than 9 hours at age 3-5, this alone can cause significant behavioural difficulties"],
    redFlags: ["Sleeping fewer than 8 hours consistently after age 3", "Unable to stay asleep for more than 2 hour stretches", "Snoring loudly — may indicate obstructive sleep apnoea, not ASD"],
  },
  // ── BONUS ─────────────────────────────────────────────────────────────────
  {
    id: 12, category: "social", age: "3–6 yrs",
    title: "Parent Wellbeing: You Cannot Pour from an Empty Cup",
    summary: "Research is clear: parent mental health directly predicts child outcomes. Take care of yourself.",
    emoji: "💙",
    color: { bg: "bg-blue-50", border: "border-blue-200", tag: "bg-blue-100 text-blue-700", btn: "from-blue-400 to-sky-500" },
    research: "Action for Autism, New Delhi — Parent-Child Training Program (Belmonte et al.)",
    researchNote: "A 3-month Parent-Child Training Program in New Delhi showed significant reduction in parent stress AND improvements in child outcomes simultaneously. Parent mental health IS child intervention.",
    badge: "🇮🇳 New Delhi Study",
    steps: [
      { title: "Name your grief without shame", desc: "Receiving a developmental concern is a loss — of expected futures, of ease, of certainty. Grief is normal and healthy. It does not mean you love your child less." },
      { title: "Connect with other parents", desc: "Action for Autism (India), Autism Society India, and local parent groups provide peer support that professionals cannot replicate. Shared experience is uniquely powerful." },
      { title: "Divide the load", desc: "In Indian families, extended family can be powerful allies — or unwilling critics. A family education session with a specialist can shift dynamics. You don't have to carry this alone." },
      { title: "Respite is not abandonment", desc: "Schedule regular time where you are not caregiving. Even 2 hours per week reduces parental burnout significantly. A regulated parent is the best therapy your child can have." },
      { title: "Celebrate small wins", desc: "Keep a 'win journal'. One sentence a day: 'She looked at me during breakfast today.' Over months, this becomes evidence of progress when progress is hard to see." },
    ],
    tips: ["iCall (India): 9152987821 — free mental health support for parents", "Vandrevala Foundation: 1860-2662-345 — 24/7, free, multilingual", "Action for Autism helpline: +91 11 4054 0991"],
    redFlags: [],
  },
];

// ─── Guide Detail Modal ────────────────────────────────────────────────────────
function GuideModal({ guide, onClose }) {
  const [activeTab, setActiveTab] = useState("steps");
  if (!guide) return null;
  const c = guide.color;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(6px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="bg-white w-full sm:max-w-lg max-h-[92vh] overflow-hidden rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={`${c.bg} border-b ${c.border} p-6 flex-shrink-0`}>
          <div className="flex justify-between items-start mb-3">
            <span className={`text-xs font-black px-3 py-1 rounded-full ${c.tag}`}>{guide.badge}</span>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-slate-500 hover:bg-white transition font-black text-lg">
              ×
            </button>
          </div>
          <div className="text-5xl mb-3">{guide.emoji}</div>
          <h2 className="text-2xl font-black text-slate-800 mb-1 leading-tight">{guide.title}</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="font-bold">📅 {guide.age}</span>
            <span>·</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.tag}`}>{CATEGORIES.find(c => c.id === guide.category)?.label}</span>
          </div>
        </div>

        {/* Research citation */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">🔬</span>
            <div>
              <div className="text-xs font-black text-slate-600 mb-0.5">{guide.research}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{guide.researchNote}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 flex-shrink-0">
          {[
            { id: "steps", label: "📋 Steps" },
            { id: "tips", label: "💡 Tips" },
            ...(guide.redFlags?.length ? [{ id: "flags", label: "⚠️ Watch For" }] : []),
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-xs font-black transition ${activeTab === tab.id ? "text-slate-800 border-b-2 border-purple-500 bg-purple-50/50" : "text-slate-400 hover:text-slate-600"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {activeTab === "steps" && (
            <div className="space-y-4">
              {guide.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${guide.color.btn} text-white text-sm font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-black text-slate-800 text-sm mb-1">{step.title}</div>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "tips" && (
            <div className="space-y-3">
              {guide.tips.map((tip, i) => (
                <div key={i} className={`flex gap-3 ${c.bg} rounded-2xl p-4 border ${c.border}`}>
                  <span className="text-xl flex-shrink-0">✨</span>
                  <p className="text-sm text-slate-700 font-semibold leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "flags" && guide.redFlags?.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">These are signs to discuss with your pediatrician. They don't mean something is definitely wrong — they mean a professional opinion would be valuable.</p>
              <div className="space-y-3">
                {guide.redFlags.map((flag, i) => (
                  <div key={i} className="flex gap-3 bg-red-50 rounded-2xl p-4 border border-red-200">
                    <span className="text-xl flex-shrink-0">🔔</span>
                    <p className="text-sm text-red-700 font-bold leading-relaxed">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4 flex-shrink-0">
          <button onClick={onClose}
            className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${guide.color.btn} text-white font-black text-sm shadow-lg hover:scale-[1.02] transition`}>
            Got it! Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Guide Card ────────────────────────────────────────────────────────────────
function GuideCard({ guide, onClick }) {
  const c = guide.color;
  return (
    <div
      onClick={onClick}
      className={`${c.bg} border-2 ${c.border} rounded-3xl p-6 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{guide.emoji}</div>
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${c.tag}`}>{guide.badge}</span>
      </div>
      <h3 className="font-black text-slate-800 text-base leading-tight mb-2">{guide.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{guide.summary}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400">📅 {guide.age}</span>
        <span className={`text-xs font-black bg-gradient-to-r ${c.btn} bg-clip-text text-transparent group-hover:underline`}>
          Read guide →
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ParentingGuide() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeGuide, setActiveGuide] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = GUIDES.filter(g => {
    const matchCat = activeCategory === "all" || g.category === activeCategory;
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] via-[#F0F9FF] to-[#F5F0FF]">

      {/* Modal */}
      {activeGuide && <GuideModal guide={activeGuide} onClose={() => setActiveGuide(null)} />}

      {/* Top bar */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center text-lg">🧠</div>
            <div>
              <div className="font-black text-lg bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-none">NeuroNest</div>
              <div className="text-[9px] text-slate-400 font-bold tracking-widest">PARENTING GUIDES</div>
            </div>
          </button>
          <button onClick={() => navigate("/")}
            className="text-slate-500 text-sm font-bold hover:text-slate-700 transition flex items-center gap-1">
            ← Home
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black mb-4 border border-orange-200">
            🔬 Backed by peer-reviewed research
          </div>
          <h1 className="text-4xl font-black text-slate-800 mb-3 leading-tight">
            Parenting Guides for{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Early Development
            </span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Every guide is grounded in published research — including studies from India. Practical steps you can start today.
          </p>

          {/* Research sources */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {[
              "Rahman et al. 2016 (Lancet)",
              "Oono et al. 2013 (Cochrane)",
              "Dubey et al. 2024 (Autism)",
              "Uke et al. 2024 (PMC)",
              "WHO Nurturing Care 2018",
            ].map(s => (
              <span key={s} className="bg-white border border-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                📄 {s}
              </span>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search guides (e.g. speech, sleep, meltdown...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-white text-slate-700 font-semibold text-sm focus:outline-none focus:border-purple-300 transition shadow-sm"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black whitespace-nowrap transition-all flex-shrink-0
                ${activeCategory === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-md`
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"}`}>
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Guide count */}
        <p className="text-sm text-slate-400 font-bold mb-5">
          Showing {filtered.length} guide{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
        </p>

        {/* Guide grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-bold text-lg">No guides found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(guide => (
              <GuideCard key={guide.id} guide={guide} onClick={() => setActiveGuide(guide)} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl p-8 text-center text-white">
          <div className="text-4xl mb-3">🧠</div>
          <h3 className="text-2xl font-black mb-2">Not sure where to start?</h3>
          <p className="text-white/80 mb-6 text-sm leading-relaxed max-w-md mx-auto">
            Take our 5-minute screening first. Your child's results will tell you exactly which areas need attention.
          </p>
          <button onClick={() => navigate("/game/1")}
            className="bg-white text-purple-600 font-black px-8 py-3.5 rounded-full hover:scale-105 transition shadow-xl">
            🎮 Start Free Screening
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed max-w-xl mx-auto">
          ⚠️ These guides are for informational purposes only and are not a substitute for professional medical advice. If you have concerns about your child's development, consult a qualified developmental pediatrician or child psychologist.
        </p>
      </div>
    </div>
  );
}