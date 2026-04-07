export const techniques = [

  // ─── JUDO: GOKYO GROUP 1 (Dai-Ikkyo) ───────────────────────────────────────
  {
    id: 1, name: "De-ashi-barai", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 2,
    desc: "Forward foot sweep. Sweeps the opponent's leading foot as they step.",
    long: "De-ashi-barai is one of the most fundamental foot sweeps in Judo. As the opponent steps forward, the thrower sweeps their advancing foot at the moment it bears the least weight. Timing is everything — the sweep must happen at the instant the foot touches the ground and before weight is fully transferred. It is one of the most commonly scored techniques in competition at all levels.",
    setup: "Match opponent's stepping rhythm. Sweep the foot as it advances, using a circular motion.", key: "Timing beats strength. The sweep happens at the moment the foot touches down.", counters: ["Step through", "Pull back foot", "Counter sweep"], entries: ["Off forward movement", "After grip establishment", "During combination"], related: [2, 13, 3], vid: "https://www.youtube.com/watch?v=gW9LEvVmG2o", ai: "De-ashi-barai teaches you to read your opponent's weight distribution — the core skill behind all sweeping techniques. Master the timing here and every other sweep becomes easier."
  },
  {
    id: 2, name: "Hiza-guruma", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 2,
    desc: "Knee wheel. Blocks the opponent's knee and rotates them over it.",
    long: "Hiza-guruma uses a blocking foot on the opponent's knee while the upper body rotates them in a circular motion. Unlike de-ashi-barai which sweeps a moving foot, hiza-guruma plants against the knee and uses upper body rotation to topple the opponent. It teaches the principle of creating a fulcrum point.", setup: "Establish upper body control. Place your foot against opponent's knee and rotate.", key: "The block on the knee must be firm. The throw comes from upper body rotation, not the leg.", counters: ["Bend knee", "Step around block", "Posture forward"], entries: ["Off pulling motion", "When opponent is stiff-legged", "After feint"], related: [1, 3, 4], vid: "https://www.youtube.com/watch?v=a1RZvytW3OI", ai: "Hiza-guruma teaches the wheel principle that appears in many Judo throws — create a fixed point and rotate the opponent around it."
  },
  {
    id: 3, name: "Sasae-tsurikomi-ashi", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Propping drawing ankle throw. Blocks the ankle while lifting and rotating.",
    long: "Sasae-tsurikomi-ashi combines a propping foot block on the opponent's ankle with a lifting and rotating upper body action. The name describes the technique precisely — sasae means prop or block, tsurikomi means lifting-pulling, and ashi means foot. It is a technically demanding throw that rewards precise entry and hand coordination.", setup: "Grip high on collar for lifting power. Block the ankle as you pull up and rotate.", key: "The lift in the collar grip must happen simultaneously with the foot block.", counters: ["Skip over block", "Posture up", "Grip break"], entries: ["When opponent steps forward", "Off circular movement", "After grip control"], related: [1, 2, 14], vid: "https://www.youtube.com/watch?v=MiGljHOokvE", ai: "The tsurikomi (lifting-pulling) hand action in this throw is the same action used in Tsurikomi-goshi and several other techniques. Learning it here transfers directly."
  },
  {
    id: 4, name: "Uki-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 2,
    desc: "Floating hip throw. A foundational hip throw using a wraparound grip.",
    long: "Uki-goshi is considered the first hip throw most Judo students learn. The thrower wraps an arm around the opponent's back, places the hip in front, and uses a turning and lifting motion to float the opponent over. It establishes the core hip throw principle: get your hip in front of the opponent's hip, then rotate.", setup: "Wrap arm around opponent's back. Drive hip across and in front. Rotate and pull.", key: "The hip must get fully in front of the opponent's centre — a half-entry gets blocked.", counters: ["Block hip entry", "Drop weight", "Counter hip"], entries: ["From collar-sleeve grip", "Off pulling", "Direct attack"], related: [6, 7, 11], vid: "https://www.youtube.com/watch?v=5jVF6r366Kg", ai: "Uki-goshi is the gateway to all hip throws. Every hip technique in Judo shares the same fundamental entry — getting your hip across. Learn this one well and O-goshi, Harai-goshi, and Uchi-mata all become clearer."
  },
  {
    id: 5, name: "O-soto-gari", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 2,
    desc: "Major outer reaping. Sweeps the opponent's supporting leg with a large reap.",
    long: "O-soto-gari is one of the original 40 throws and one of the most powerful in competition Judo. The throw drives the opponent backward while reaping their near leg. When executed with full commitment — proper kuzushi, body contact, and a large sweeping reap — it produces spectacular ippon-scoring throws. It is the foundation of all osoto variations.", setup: "Break opponent's balance backward. Drive chest into them and reap the near leg large and straight.", key: "The reaping leg swings straight and large. Body contact is maintained throughout.", counters: ["Ko-uchi-gari counter", "Step through", "Block and lean"], entries: ["Collar-sleeve grip", "Off forward pressure", "After misdirection"], related: [6, 10, 9], vid: "https://youtu.be/c-A_nP7mKAc?si=hHqor8yzFahlubKo", ai: "O-soto-gari connects directly to Ko-uchi-gari — if the reap is blocked, your opponent's weight shifts to the far leg creating a Ko-uchi-gari entry. These two throws are natural combination partners."
  },
  {
    id: 6, name: "O-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 2,
    desc: "Major hip throw. The classical Judo hip throw using full hip contact.",
    long: "O-goshi is the classical Judo hip throw and one of Jigoro Kano's favourite techniques. The thrower wraps an arm around the opponent's waist, places the full hip in front, and drives the opponent over by straightening the legs and twisting the body. It differs from Uki-goshi in that the hips make full contact rather than floating.", setup: "Wrap arm around waist. Full hip contact. Straighten legs and rotate to throw.", key: "Hips must be lower than the opponent's hips before the throw. Bend your knees on entry.", counters: ["Block hip entry", "Grip the belt", "Counter hip"], entries: ["From basic grip", "Off forward pull", "As combination ender"], related: [4, 7, 11], vid: "https://www.youtube.com/watch?v=VLYKx-Fwhxg", ai: "O-goshi is the purest expression of the hip throw principle. If you understand why O-goshi works mechanically, you understand why all hip throws work."
  },
  {
    id: 7, name: "O-uchi-gari", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 2,
    desc: "Major inner reaping. Reaps the opponent's near leg from inside.",
    long: "O-uchi-gari attacks the inside of the opponent's near leg with a large reaping motion. The thrower drives the opponent backward while their leg hooks inside and reaps through. It is one of the most common competition throws and forms the backbone of many combination systems, particularly when combined with O-soto-gari.", setup: "Drive opponent backward. Hook inside the near leg and reap through.", key: "Drive your bodyweight into the opponent as you reap — the combination of push and reap creates the throw.", counters: ["Ko-uchi-gari", "Step around", "Hiki-goshi"], entries: ["From close body contact", "After grip fight", "Off O-soto-gari feint"], related: [5, 10, 15], vid: "https://www.youtube.com/watch?v=I3BWf1ZoIuc", ai: "O-uchi-gari and O-soto-gari are the two most fundamental reaps in Judo. They attack opposite legs and set each other up perfectly — mastering both as a unit is more valuable than either alone."
  },
  {
    id: 8, name: "Seoi-nage", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "Shoulder throw. The most iconic Judo throw — loads opponent across the shoulders.",
    long: "Seoi-nage is arguably the most iconic Judo throw. The thrower enters deeply under the opponent, loading them across the back and shoulders before driving forward and down. There are two main entries — ippon seoi-nage (one arm under) and morote seoi-nage (both arms). It requires exceptional timing, entry speed, and hip flexibility. At the elite level it is thrown from both standing and drop (kneeling) variations.", setup: "Secure a strong lapel grip. Enter by rotating 180° under opponent's centre of gravity.", key: "The entry must be explosive and complete — half entries get countered hard.", counters: ["Rear throw", "Drop back", "Counter grip"], entries: ["Standard grip", "Drop entry", "Grip break then enter"], related: [65, 42, 4], vid: "https://www.youtube.com/watch?v=eWEW9SfI5xg", ai: "Seoi-nage works best as a combination off failed O-soto-gari attempts or after drawing the opponent forward with a feint. The drop variation sacrifices stability for speed."
  },

  // ─── JUDO: GOKYO GROUP 2 (Dai-Nikyo) ──────────────────────────────────────
  {
    id: 9, name: "Ko-soto-gari", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 2,
    desc: "Minor outer reaping. Small reap to the outside of the opponent's heel.",
    long: "Ko-soto-gari is a smaller, more subtle version of O-soto-gari targeting the outside of the heel. It works best when the opponent's weight is on their heel and they are leaning slightly backward. It is often used as a combination finisher after other techniques have shifted the opponent's balance.", setup: "Draw opponent's weight onto their heel. Reap the heel sharply from outside.", key: "The reap is small and precise — it targets the heel specifically, not the whole leg.", counters: ["Lift heel", "Step forward", "Counter reap"], entries: ["After O-soto-gari feint", "When opponent leans back", "Off grip break"], related: [5, 10, 43], vid: "https://www.youtube.com/watch?v=T3rSf8CcHg4", ai: "Ko-soto-gari is best thought of as a finishing technique rather than a primary attack. Use it when other throws have already shifted the opponent's balance backward."
  },
  {
    id: 10, name: "Ko-uchi-gari", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 2,
    desc: "Minor inner reaping. Attacks the heel from inside — versatile combination starter.",
    long: "Ko-uchi-gari is one of the most versatile techniques in Judo. As a minor reaping throw it attacks the opponent's near heel from inside. Alone it can score, but its greatest value is as a combination set-up — threatening ko-uchi-gari forces the opponent to shift weight, creating openings for other techniques.", setup: "Shallow grip is fine. Reap the heel as opponent steps or when weight is on that foot.", key: "Timing is everything — reap when the foot is weighted, not floating.", counters: ["Step through", "Ko-uchi return", "Posture up"], entries: ["Off O-soto feint", "Direct attack", "After grip break"], related: [5, 7, 9], vid: "https://www.youtube.com/watch?v=5E20xuzaXNw", ai: "Think of Ko-uchi-gari as the punctuation at the end of a combination sentence. O-soto-gari opens the sentence, forces weight distribution, and Ko-uchi-gari finishes it."
  },
  {
    id: 11, name: "Koshi-guruma", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 3,
    desc: "Hip wheel. Wraps around the neck and wheels opponent over the hip.",
    long: "Koshi-guruma wraps an arm around the opponent's neck rather than the waist, creating a different mechanical action than O-goshi. The head control changes the opponent's balance point and makes the throw effective against those who defend standard hip throws by blocking at the waist.", setup: "Wrap arm around neck and head. Enter hip and wheel the opponent over.", key: "The arm must wrap securely around the neck — loose control allows escape.", counters: ["Block hip entry", "Posture forward", "Drop weight"], entries: ["When opponent defends O-goshi", "Off pulling entry", "Grip change attack"], related: [6, 4, 12], vid: null, ai: "Koshi-guruma is particularly effective against opponents who have learned to defend O-goshi by blocking at the hip — the neck wrap bypasses that defense entirely."
  },
  {
    id: 12, name: "Tsurikomi-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 3,
    desc: "Lifting pulling hip throw. Uses an upward lifting grip to unbalance before hip entry.",
    long: "Tsurikomi-goshi emphasizes the lifting-pulling (tsurikomi) hand action before the hip entry. The high collar grip is used to lift the opponent up on their toes before the hip sweeps through. This lifting destabilizes the opponent's base before the throw happens, making the hip entry more effective.", setup: "High collar grip. Lift opponent onto their toes. Enter hip and rotate to throw.", key: "The lift must come before the hip entry — you're breaking balance upward, then throwing.", counters: ["Resist the lift", "Block hip", "Counter hip"], entries: ["High collar grip established", "Off pulling", "When opponent is upright"], related: [4, 6, 11], vid: null, ai: "The tsurikomi (lifting-pulling) hand action in this throw appears in Sasae-tsurikomi-ashi and several other techniques. Learning the hand action here transfers directly to those throws."
  },
  {
    id: 13, name: "Okuri-ashi-harai", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Sliding foot sweep. Sweeps both feet as the opponent steps laterally.",
    long: "Okuri-ashi-harai is a double foot sweep executed as the opponent moves sideways. As they step laterally, both feet are together for a brief moment — the sweep targets this moment. It requires precise timing and is one of the most beautiful techniques in Judo when executed correctly.", setup: "Create lateral movement. Time the sweep for the moment both feet are together.", key: "The sweep catches both feet at once — a fraction early or late and only one foot is swept.", counters: ["Stop lateral movement", "Lift feet", "Change direction"], entries: ["During circular movement", "Off tai-sabaki", "When opponent steps sideways"], related: [1, 3, 14], vid: null, ai: "Okuri-ashi-harai teaches the highest level of timing in foot sweeping. Study it even if it's not your competition throw — the timing sensitivity it develops improves every other sweep."
  },
  {
    id: 14, name: "Tai-otoshi", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "Body drop. Rotational throw with no hip entry — opponent trips over a blocking leg.",
    long: "Tai-otoshi is unique among the major judo throws in that the hips do not contact the opponent. Instead, the thrower rotates and places a blocking leg while pulling the opponent forward and down over it. This makes it faster to enter than hip throws and effective against taller or stronger opponents who defend hip contact.", setup: "Strong sleeve and lapel grip. Pivot foot placement across opponent's path.", key: "Block leg goes across in front — the opponent trips over it, not around it.", counters: ["Step over block", "Counter rotation", "Grip break"], entries: ["From grip fight", "Off harai-goshi fake", "Direct attack"], related: [8, 15, 16], vid: null, ai: "Tai-otoshi is particularly effective against opponents who defend hip throws by lowering their hips — because it doesn't require hip contact, it punishes exactly that defensive posture."
  },
  {
    id: 15, name: "Harai-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 3,
    desc: "Sweeping hip throw. Hip rotation combined with a sweeping leg motion.",
    long: "Harai-goshi is a hip throw that sweeps the opponent's thigh and leg with the thrower's hip and thigh. The throwing action combines a forward hip drive with a large sweeping leg motion. It is often confused with uchi-mata but targets the outside of the leg. Harai-goshi is spectacular at full power and produces many ippon scores.", setup: "Deep entry with hips past the opponent's centreline. Sleeve and lapel grip.", key: "Sweep through the thighs, not behind the knees. Hip must be fully committed.", counters: ["Ura-nage", "Block with thigh", "Step around"], entries: ["Direct attack", "Off O-uchi feint", "From clinch"], related: [16, 8, 56], vid: null, ai: "Harai-goshi and Uchi-mata form a classic combination pair. Enter for harai-goshi and if the opponent drops their hip to block, switch to uchi-mata. This two-way threat is the foundation of many elite attacking systems."
  },
  {
    id: 16, name: "Uchi-mata", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 4,
    desc: "Inner thigh throw. Statistically the most used technique at elite competition level.",
    long: "Uchi-mata is statistically the most successful throw in elite Judo competition. It attacks the inner thigh of the opponent's near or far leg with a sweeping lift, combined with hip rotation and upper body pull. It can be executed as a hip or leg technique, and mastering uchi-mata is considered a career-long project for most judoka.", setup: "High lapel grip is preferred. Enter with a hip rotation and attack the inner thigh.", key: "The lifting leg sweeps from below the thigh, not behind the knee.", counters: ["Uchi-mata-gaeshi", "Step over", "Counter hip"], entries: ["Drop entry", "Ko-uchi feint", "Direct attack"], related: [15, 57, 63], vid: null, ai: "Uchi-mata connects naturally with Harai-goshi — they share the same entry and differ only in which leg is attacked. Training both from the same entry makes both more dangerous and harder to predict."
  },

  // ─── JUDO: GOKYO GROUP 3 (Dai-Sankyo) ─────────────────────────────────────
  {
    id: 17, name: "Ko-soto-gake", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Minor outer hook. Hooks the outside of the opponent's leg rather than sweeping.",
    long: "Ko-soto-gake differs from Ko-soto-gari in that it hooks and lifts the opponent's leg rather than sweeping it. The thrower hooks the outside of the opponent's ankle and drives them backward. The lifting action makes it effective even when the opponent's weight is firmly planted.", setup: "Hook outside of opponent's ankle. Drive opponent backward while lifting the hooked leg.", key: "The hook lifts rather than sweeps — maintain contact with the ankle throughout.", counters: ["Hop over", "Counter drive", "Grip break and posture"], entries: ["When opponent plants near leg", "Off O-soto combination", "After misdirection"], related: [9, 5, 43], vid: null, ai: "Ko-soto-gake is particularly useful when Ko-soto-gari fails because the opponent's foot is flat and planted — the hooking action bypasses the weight problem."
  },
  {
    id: 18, name: "Tsuri-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 3,
    desc: "Lifting hip throw. Grips the belt to lift and throw over the hip.",
    long: "Tsuri-goshi uses a belt grip on the front of the opponent's belt to lift them up and over the hip. The belt grip provides a mechanical advantage for lifting. It is an older classical technique less commonly seen in modern competition but important in kata and as a foundation technique.", setup: "Grip the front belt. Lift the opponent upward as the hip sweeps through.", key: "The belt grip does the lifting work — concentrate on the upward pull before the hip sweep.", counters: ["Block hip", "Counter hip", "Grip break"], entries: ["When belt is accessible", "From close contact", "After kumi-kata"], related: [6, 4, 11], vid: null, ai: "Tsuri-goshi teaches the lifting principle in hip throws most clearly. Understanding how belt grip lifting works here makes the tsurikomi concept in other throws more intuitive."
  },
  {
    id: 19, name: "Yoko-otoshi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 3,
    desc: "Side drop. Sacrifice throw — drops to the side and pulls opponent over.",
    long: "Yoko-otoshi is a side sacrifice technique where the thrower drops to their side and uses the momentum to pull the opponent down and over. As a sacrifice technique, the thrower gives up their own standing position to create the throwing opportunity. Timing with the opponent's forward movement is key.", setup: "As opponent moves forward, drop to the side while pulling them forward and down.", key: "Drop must be timed with opponent's forward momentum — you're using their energy.", counters: ["Stop forward movement", "Step over", "Post arm"], entries: ["Against forward-moving opponent", "Off misdirection", "Countering forward attacks"], related: [26, 36, 37], vid: null, ai: "Sacrifice throws like Yoko-otoshi require a different mindset — you must be willing to go to the ground to score. They are most effective when the opponent commits strongly to forward movement."
  },
  {
    id: 20, name: "Ashi-guruma", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Leg wheel. Extended leg acts as a wheel over which opponent is rotated.",
    long: "Ashi-guruma extends the leg across the front of both of the opponent's legs while the upper body rotates them. It creates a wheel effect — the extended leg is the axle and the opponent rotates over it. It is similar to O-guruma but applied at a lower position.", setup: "Extend your leg across opponent's thighs. Rotate the upper body to wheel them over.", key: "The leg must be placed across both thighs — one thigh only reduces the throw's effectiveness.", counters: ["Step over", "Pull back", "Block leg"], entries: ["Off pulling motion", "When opponent stands upright", "After grip fight"], related: [30, 14, 21], vid: null, ai: "Ashi-guruma and O-guruma teach the wheel principle at different heights. Understanding both gives you throwing options at multiple range levels."
  },
  {
    id: 21, name: "Hane-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 3,
    desc: "Spring hip throw. Bent knee springs upward to lift and throw.",
    long: "Hane-goshi uses a bent, springlike leg that extends upward to lift and throw the opponent. Unlike harai-goshi which sweeps with the thigh, hane-goshi uses a springing knee action. The spring gives the throw a distinctive lifting quality and makes it effective against opponents who have successfully defended sweeping hip throws.", setup: "Enter hip position. Place bent knee behind opponent's thigh and spring it upward.", key: "The spring is a controlled explosive movement — a slow spring loses all power.", counters: ["Hane-goshi gaeshi", "Block knee", "Forward defensive posture"], entries: ["When harai-goshi is blocked", "Against tall opponents", "Off combination entry"], related: [15, 16, 58], vid: null, ai: "Hane-goshi is often the answer when harai-goshi is consistently blocked. The springing knee contacts the opponent at a different angle and bypasses a thigh block."
  },
  {
    id: 22, name: "Harai-tsurikomi-ashi", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Sweeping lifting pulling ankle throw. Combines lifting hand action with a sweeping foot.",
    long: "Harai-tsurikomi-ashi combines the lifting-pulling hand action with a sweeping foot technique. The collar hand lifts the opponent up as the foot sweeps their ankle. The combination of being lifted and swept simultaneously makes this technique difficult to defend. It requires precise coordination between the hands and foot.", setup: "Lift with collar grip. Simultaneously sweep the opponent's ankle in a circular motion.", key: "The lift and sweep must happen simultaneously — one without the other loses effectiveness.", counters: ["Resist lift", "Skip over sweep", "Counter grip"], entries: ["When opponent advances", "Off circling movement", "After balance break"], related: [3, 1, 13], vid: null, ai: "Harai-tsurikomi-ashi bridges the gap between hand-dominant and foot-dominant techniques. The simultaneous lift-and-sweep principle it teaches improves all combination attacks."
  },
  {
    id: 23, name: "Tomoe-nage", sport: "judo", cat: "Throws", subcat: "Front sacrifice techniques", diff: 3,
    desc: "Circle throw. Front sacrifice throw using a foot to the stomach to launch opponent.",
    long: "Tomoe-nage is a spectacular sacrifice throw where the thrower falls backward and places a foot on the opponent's stomach or hip, using their forward momentum to launch them overhead. The name means 'circle throw' and describes the circular path the opponent travels. Timing with the opponent's forward movement is essential.", setup: "As opponent moves forward, drop backward and place foot on their stomach. Use momentum to launch them.", key: "The throw uses the opponent's energy — pull them forward as you fall back.", counters: ["Stop forward movement", "Post arms", "Sprawl"], entries: ["Against committed forward attack", "As counter to charging opponent", "Off forward pressure"], related: [24, 25, 26], vid: null, ai: "Tomoe-nage teaches you to use your opponent's energy rather than generate your own — a principle central to Judo philosophy. It is most powerful when the opponent is most committed."
  },
  {
    id: 24, name: "Kata-guruma", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 4,
    desc: "Shoulder wheel. Loads opponent across both shoulders and throws.",
    long: "Kata-guruma loads the opponent across both shoulders like a wheel and throws them to the opposite side. The thrower must lower deeply to get under the opponent's centre of gravity. It is banned in IJF competition due to the leg grab required for the classical entry, but remains an important Judo technique.", setup: "Lower deeply. Wrap one arm between legs and one around the body. Load across shoulders and throw.", key: "The load position must be solid before the throw — rushing the throw from a partial load fails.", counters: ["Sprawl", "Grip the belt", "Resist lowering"], entries: ["Direct drop to entry", "Off pulling action", "Counter to forward movement"], related: [49, 50, 8], vid: null, ai: "Kata-guruma demonstrates the principle of getting under the opponent's centre of gravity to off-balance them upward before throwing — a concept that transfers to all lifting techniques."
  },

  // ─── JUDO: GOKYO GROUP 4 (Dai-Yonkyo) ─────────────────────────────────────
  {
    id: 25, name: "Sumi-gaeshi", sport: "judo", cat: "Throws", subcat: "Front sacrifice techniques", diff: 3,
    desc: "Corner reversal. Sacrifice throw that hooks the inner thigh and rolls opponent.",
    long: "Sumi-gaeshi is a sacrifice technique where the thrower hooks the opponent's inner thigh with their leg while falling backward and to the corner. The combination of backward fall and leg hook creates a rolling throw. It is effective as a counter to hip throws and can be used to transition directly to groundwork.", setup: "Hook opponent's inner thigh with your leg. Fall to the corner while pulling them with you.", key: "The hook and fall must be coordinated — the hook without the fall or vice versa fails.", counters: ["Step over hook", "Drop weight", "Post arm"], entries: ["As counter to hip throw", "Off forward pressure", "Transitioning to groundwork"], related: [23, 26, 37], vid: null, ai: "Sumi-gaeshi is one of the best throws to study if you want to develop counter-throwing ability — it teaches how to use an opponent's committed throw attempt against them."
  },
  {
    id: 26, name: "Tani-otoshi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 3,
    desc: "Valley drop. Drops behind opponent and pulls them backward.",
    long: "Tani-otoshi has the thrower step behind the opponent and drop to the mat, pulling the opponent backward into the gap created. The dropping motion combined with the upper body pull creates a backward throwing action. It is one of the most effective throws against forward-leaning opponents.", setup: "Step behind opponent. Drop to the mat while pulling backward and down.", key: "Get completely behind the opponent before dropping — a partial position is easily defended.", counters: ["Step back over", "Forward posture", "Grip break"], entries: ["Against forward-leaning opponent", "As counter to forward attacks", "Off backward pull"], related: [19, 35, 38], vid: null, ai: "Tani-otoshi is one of the most practical throws for competitors who face larger, forward-pushing opponents. The sacrifice element means body size matters less."
  },
  {
    id: 27, name: "Hane-makikomi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "Spring winding throw. Combines hane-goshi's spring with a rolling sacrifice finish.",
    long: "Hane-makikomi starts like hane-goshi but the thrower wraps (makikomi) the opponent's arm and rolls with them rather than staying standing. The rolling sacrifice finish makes it much harder to defend than a standing version and is particularly dangerous in combination.", setup: "Enter like hane-goshi. Wrap opponent's arm and roll into them as you throw.", key: "The arm wrap is what makes it makikomi — without wrapping the arm, it becomes a different technique.", counters: ["Resist the wrap", "Counter hip", "Step over"], entries: ["When hane-goshi entry is established", "Directly from grip", "As combination ender"], related: [21, 62, 63], vid: null, ai: "Makikomi (winding/wrapping) throws are particularly effective in modern Judo because they are difficult to counter-throw — the arm wrap removes the opponent's ability to execute a rear throw defense."
  },
  {
    id: 28, name: "Sukui-nage", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "Scooping throw. Scoops opponent's legs and lifts them off the ground.",
    long: "Sukui-nage scoops under the opponent's legs to lift them and throw. It is related to Kata-guruma but the leg scoop is done with both arms rather than loading across the shoulders. It is banned in IJF competition due to the leg grab but remains important in Judo kata and practice.", setup: "Lower and scoop under opponent's legs with both arms. Lift and drive to throw.", key: "The scoop must be decisive — a tentative scoop allows the opponent to sprawl.", counters: ["Sprawl", "Grip the back", "Block with arms"], entries: ["Off forward bend", "As counter entry", "Direct low entry"], related: [24, 49, 50], vid: null, ai: "Sukui-nage teaches explosive low-level entry that is applicable even when the specific throw is banned — the entry mechanics transfer to legal techniques like Morote-gari variants."
  },
  {
    id: 29, name: "Utsuri-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 4,
    desc: "Changing hip throw. Counter throw used when opponent attempts a hip technique.",
    long: "Utsuri-goshi is specifically a counter-throw used when the opponent attempts a hip technique. As they enter, the defender lifts them from behind and transfers them to their own hip for the throw. The name means 'changing hip' and describes how the throw converts the opponent's attack into a counter.", setup: "As opponent enters for hip throw, wrap from behind and lift onto your hip. Throw the opposite direction.", key: "You must lift the opponent completely off the ground before the counter throw.", counters: ["Abandon the attack", "Lower hips", "Counter the counter"], entries: ["Against hip throw entry", "As a specific counter technique"], related: [6, 4, 37], vid: null, ai: "Utsuri-goshi teaches the highest form of Judo counter-throwing — using the opponent's committed technique against them. Studying it trains you to recognize and exploit the moment of opponent vulnerability."
  },
  {
    id: 30, name: "O-guruma", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Major wheel. Extends leg across opponent's thighs and wheels them over.",
    long: "O-guruma places the extended leg across both of the opponent's thighs — higher than Ashi-guruma — while the upper body rotates them around the leg wheel. The high leg position creates a large wheel arc and is particularly effective against opponents who are standing upright.", setup: "Extend leg high across opponent's thighs. Rotate upper body to wheel them over the leg.", key: "The leg blocks across both thighs simultaneously — target both thighs, not one.", counters: ["Step over", "Block with both hands", "Lower hips"], entries: ["When opponent stands tall", "Off forward pulling motion", "After grip establishment"], related: [20, 14, 15], vid: null, ai: "O-guruma and Ashi-guruma teach the same wheel principle at different heights. Together they give you throwing options against opponents of different heights and postures."
  },
  {
    id: 31, name: "Soto-makikomi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "Outer winding throw. Wraps opponent's arm and rolls to throw — sacrifice version.",
    long: "Soto-makikomi wraps the opponent's arm from the outside and rolls into a sacrifice position to complete the throw. The outside arm wrap is the defining feature — it traps the arm and uses the rolling motion to complete the technique. It is particularly effective against opponents who defend with strong outside grips.", setup: "Wrap opponent's near arm from outside. Roll into them to complete the throwing motion.", key: "The arm wrap must be tight — a loose wrap allows escape before the roll completes.", counters: ["Resist the wrap", "Step back", "Grip break"], entries: ["When outside grip is established", "Off circular movement", "As combination ender"], related: [27, 62, 63], vid: null, ai: "Makikomi throws in general are underutilized in recreational Judo. The arm wrap makes them inherently safer to attempt because it limits counter-throw opportunities for the opponent."
  },

  // ─── JUDO: GOKYO GROUP 5 (Dai-Gokyo) ──────────────────────────────────────
  {
    id: 32, name: "Uki-otoshi", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "Floating drop. Uses hand control to float and drop opponent without body contact.",
    long: "Uki-otoshi is the first technique of Nage-no-kata and represents one of Judo's purest principles — using hand control and balance breaking alone to throw, without body contact. The thrower breaks the opponent's balance to the corner and pulls them down and forward in a circular motion.", setup: "Break balance to the front corner. Pull down and forward in a circular arc.", key: "This throw uses kuzushi (balance breaking) alone — no body contact is needed if the balance break is complete.", counters: ["Recover balance", "Step into the pull", "Post arm"], entries: ["After superior hand control", "Off pulling action", "First technique study"], related: [34, 35, 36], vid: null, ai: "Uki-otoshi is the best throw for understanding pure kuzushi. If you can make this technique work, your balance-breaking in all other techniques will improve significantly."
  },
  {
    id: 33, name: "O-soto-guruma", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Major outer wheel. Like O-soto-gari but reaps both legs simultaneously.",
    long: "O-soto-guruma is related to O-soto-gari but the reaping leg sweeps across both of the opponent's legs rather than just the near leg. The wheel motion of reaping both legs creates a very powerful throw, particularly effective when the opponent has a wide stance.", setup: "Break balance backward. Reap both legs with a large circular leg motion.", key: "Both legs must be reaped — missing one leg turns this into a basic O-soto-gari.", counters: ["Step around", "Wide stance defense", "Counter reap"], entries: ["When opponent has wide stance", "Off O-soto-gari combination", "Direct attack"], related: [5, 9, 44], vid: null, ai: "O-soto-guruma solves a specific defensive problem — the opponent who counters O-soto-gari by shifting weight to the far leg. By reaping both legs, that defense is neutralized."
  },
  {
    id: 34, name: "Uki-waza", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 3,
    desc: "Floating technique. Sacrifice throw that floats to the side to unbalance opponent.",
    long: "Uki-waza is a side sacrifice throw where the thrower floats to the side while maintaining upper body control to unbalance and throw the opponent. The floating quality of the movement gives the technique its name. It is effective when combined with lateral movement.", setup: "Float to the side while maintaining upper body control. Pull opponent down and over.", key: "The floating movement must be smooth — a jerky drop alerts the opponent to the attack.", counters: ["Step over", "Maintain balance", "Grip break"], entries: ["Off lateral movement", "As counter throw", "When opponent's balance is broken sideways"], related: [32, 35, 36], vid: null, ai: "Uki-waza's floating quality makes it one of the hardest sacrifice throws to anticipate. The smooth continuous movement disguises the throwing attempt until the last moment."
  },
  {
    id: 35, name: "Yoko-wakare", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 3,
    desc: "Side separation. Drops to the side and separates from the opponent to throw.",
    long: "Yoko-wakare involves dropping to the side away from the opponent while maintaining grip, using the separation and pulling motion to throw them sideways. The name means 'side separation' describing the throwing mechanic.", setup: "Drop to the side opposite to throwing direction. Pull opponent in the throw direction as you separate.", key: "The separation creates the throwing force — move away from the opponent to pull them over.", counters: ["Step in the drop direction", "Grip break", "Forward posture"], entries: ["Against sideways movement", "Off combination", "Counter to forward movement"], related: [34, 19, 36], vid: null, ai: "Yoko-wakare teaches how distance and separation can create throwing force — a counter-intuitive principle that, once understood, opens up many combination possibilities."
  },
  {
    id: 36, name: "Yoko-guruma", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "Side wheel. Side sacrifice throw using a wheel motion around the opponent.",
    long: "Yoko-guruma combines dropping to the side with a wheel-like pulling motion that rotates the opponent around. It is used as both an attack and a counter, particularly against opponents who attempt forward throws.", setup: "Drop to the side and wheel the opponent around in a large circular arc.", key: "The wheel motion must be large and complete — a small arc loses the throwing power.", counters: ["Step over the wheel", "Posture up", "Block arm"], entries: ["As counter to forward throws", "Off circular movement", "Direct attack"], related: [34, 35, 37], vid: null, ai: "Yoko-guruma is one of the most spectacular throws when hit cleanly. Study it as both an attack and as a counter — its applications as a sacrifice counter are particularly valuable."
  },
  {
    id: 37, name: "Ushiro-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 4,
    desc: "Rear hip throw. Counter throw — wraps from behind to lift and throw backward.",
    long: "Ushiro-goshi is a counter-throw where the defender wraps their arms around the opponent from behind and throws them over the hip backward. It is used specifically as a counter when the opponent has partially entered for a throw. The defender must lift the opponent completely before executing the backward throw.", setup: "As opponent enters, wrap from behind. Lift completely and throw backward over the hip.", key: "Full lift is required — a partial lift allows the original throw to complete.", counters: ["Abandon attack early", "Post foot", "Lower hips"], entries: ["When opponent half-enters for forward throw", "Specific counter opportunity"], related: [29, 38, 6], vid: null, ai: "Ushiro-goshi and Utsuri-goshi are both counter-throws used when the opponent enters for a hip technique. Study them together — they give you two different counter options from the same starting position."
  },
  {
    id: 38, name: "Ura-nage", sport: "judo", cat: "Throws", subcat: "Front sacrifice techniques", diff: 4,
    desc: "Rear throw. Wraps from behind and falls backward to throw.",
    long: "Ura-nage is a sacrifice technique where the thrower wraps behind the opponent and falls backward to complete the throw. It is particularly powerful as a counter to forward-throwing attacks. The backward fall drives the opponent into the mat with significant force, making it a high-scoring technique.", setup: "Wrap behind opponent. Fall backward while maintaining grip to complete the throw.", key: "Commit fully to the backward fall — hesitation reduces throwing power significantly.", counters: ["Sprawl", "Step back", "Post arm"], entries: ["Counter to forward attacks", "When opponent is committed forward", "Off grip from behind"], related: [29, 37, 26], vid: null, ai: "Ura-nage is one of Judo's most powerful throws precisely because it uses the opponent's forward commitment against them. The more committed the opponent's attack, the more powerful the counter."
  },
  {
    id: 39, name: "Sumi-otoshi", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "Corner drop. Uses hand control to drop opponent to the corner.",
    long: "Sumi-otoshi uses pure hand control to break the opponent's balance to a rear corner and drop them down. Like Uki-otoshi, it requires no body contact — only superior hand control and balance breaking. It is particularly effective when the opponent has a stiff, upright posture.", setup: "Break balance to the rear corner with both hands. Pull down and to the corner.", key: "The direction is the rear corner — not straight back or to the side, but diagonally backward.", counters: ["Step into the pull", "Lower centre of gravity", "Recover balance"], entries: ["After grip control established", "When opponent stands stiff", "Off circular movement"], related: [32, 34, 35], vid: null, ai: "Sumi-otoshi teaches pure kuzushi application in the rear corner direction — one of the eight breaking directions in Judo. Understanding all eight directions of kuzushi transforms your entire game."
  },
  {
    id: 40, name: "Yoko-gake", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 3,
    desc: "Side hook. Hooks opponent's near ankle while falling to the side.",
    long: "Yoko-gake hooks the outside of the opponent's near ankle while the thrower falls to the side. The ankle hook combined with the sideways fall creates a sweeping and pulling action that takes the opponent off their feet. It is effective against opponents who plant their feet firmly.", setup: "Hook outside of opponent's ankle. Fall to the side while pulling them laterally.", key: "The hook catches the heel specifically — a hook higher on the ankle loses leverage.", counters: ["Lift the foot", "Step over", "Balance recovery"], entries: ["When opponent is planted", "Off circular movement", "As combination finish"], related: [9, 17, 19], vid: null, ai: "Yoko-gake is deceptively simple — the small ankle hook combined with a body drop creates surprising throwing power. It's more accessible than it looks and rewards practitioners who invest in the timing."
  },

  // ─── JUDO: SHINMEISHO NO WAZA (Newer recognized techniques) ───────────────
  {
    id: 41, name: "Obi-otoshi", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 4,
    desc: "Belt drop. Grips the belt to unbalance and drop the opponent.",
    long: "Obi-otoshi uses a belt grip to control and drop the opponent. The belt provides a central control point for unbalancing and throwing. It was recognized as an official Kodokan technique in 1982 as part of the Shinmeisho no Waza group.", setup: "Establish belt grip. Use it to break balance and drop the opponent.", key: "Belt grip control must be firm before attempting the throw.", counters: ["Grip the belt back", "Sprawl", "Posture away"], entries: ["When belt is accessible", "Off grip fight", "Against upright posture"], related: [24, 28, 8], vid: null, ai: "Obi-otoshi represents the Shinmeisho no Waza — techniques added in 1982 that had been used in competition but weren't officially recognized. These techniques are often seen in modern competition formats."
  },
  {
    id: 42, name: "Seoi-otoshi", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "Shoulder drop. Drop version of seoi-nage — enters to one knee to throw.",
    long: "Seoi-otoshi is the drop version of seoi-nage where the thrower drops to one knee to execute the throw. The lower position can bypass defenders who expect a standing seoi-nage entry. It sacrifices some standing stability for entry speed and the ability to get under taller opponents more easily.", setup: "Drop to one knee while entering the seoi-nage position. Throw forward and down.", key: "Drop to one knee only — two knees gives the opponent too much time to defend.", counters: ["Sprawl over", "Block entry", "Step around"], entries: ["Against tall opponents", "When standing entry is blocked", "As variation of seoi-nage"], related: [8, 65, 24], vid: null, ai: "Seoi-otoshi is one of the most used variations at the junior and recreational level because the kneeling entry is easier to learn than the standing seoi-nage entry. Master it here, then progress to the standing version."
  },
  {
    id: 43, name: "Yama-arashi", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 4,
    desc: "Mountain storm. Powerful grip-based throw — Kano's special favourite.",
    long: "Yama-arashi was reportedly a favourite of Jigoro Kano. It uses a powerful grip on the collar combined with a rotation that creates a storm-like throwing motion. The name 'mountain storm' captures the forceful nature of the technique. It was one of the techniques removed in 1920 and restored in 1982.", setup: "High collar grip with pulling rotation. Use the grip and body rotation to throw.", key: "The collar grip must be high and firm — the power of the throw comes from this grip.", counters: ["Counter rotation", "Grip break", "Block the entry"], entries: ["From strong collar grip", "Off forward pull", "Historical kata study"], related: [8, 32, 39], vid: null, ai: "Yama-arashi represents the tradition of Judo — techniques that were part of the original syllabus before being temporarily removed. Understanding these techniques connects practitioners to Judo's historical roots."
  },
  {
    id: 44, name: "O-soto-otoshi", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Major outer drop. Like O-soto-gari but drops the leg rather than sweeping.",
    long: "O-soto-otoshi drives the leg down behind the opponent rather than sweeping through. The dropping action is particularly effective when the opponent has shifted weight to avoid the sweep of O-soto-gari. The downward drive through the planted leg creates a direct, powerful throw.", setup: "Break balance backward. Drop your leg straight down behind opponent's leg rather than sweeping.", key: "Drive downward through the leg — the power comes from driving down, not sweeping.", counters: ["Lift hip", "Step through", "Counter reap"], entries: ["When O-soto-gari sweep is defended", "Off backward drive", "Direct attack"], related: [5, 33, 9], vid: null, ai: "O-soto-otoshi solves a specific defensive response to O-soto-gari. When opponents successfully defend the sweep by lifting their leg, the dropping action of O-soto-otoshi catches them in the defensive lifting position."
  },
  {
    id: 45, name: "Daki-wakare", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "High lift separation. Lifts opponent high before separating and throwing.",
    long: "Daki-wakare lifts the opponent off the ground before dropping to the side to complete the throw. The high lift makes it particularly spectacular and powerful. It is a physically demanding technique requiring significant strength for the lifting phase.", setup: "Wrap opponent from behind or side. Lift them high off the ground. Drop to the side to throw.", key: "The lift must be complete before dropping — partial lift reduces throwing control.", counters: ["Grip the mat", "Resist the lift", "Lower centre of gravity"], entries: ["When behind opponent", "Off grip from side", "Direct attack opportunity"], related: [38, 37, 29], vid: null, ai: "Daki-wakare's lifting requirement makes it physically demanding but the high lift creates spectacular throwing arcs. It's worth studying as a demonstration of what complete kuzushi (balance breaking) looks like taken to its extreme."
  },
  {
    id: 46, name: "Hikikomi-gaeshi", sport: "judo", cat: "Throws", subcat: "Front sacrifice techniques", diff: 4,
    desc: "Pulling down reversal. Drops underneath while pulling opponent forward and down.",
    long: "Hikikomi-gaeshi drops underneath the opponent while pulling them forward and down, creating a reversal throw. The dropping entry is combined with a powerful pull that takes the opponent over the thrower. It requires precise timing with the opponent's forward movement.", setup: "Drop underneath while pulling opponent forward. Use their forward momentum to complete the throw.", key: "Drop must be directly underneath — dropping to the side changes the technique entirely.", counters: ["Stop forward movement", "Step over", "Post arm down"], entries: ["Against committed forward attack", "Off forward pressure", "Counter attack"], related: [23, 25, 47], vid: null, ai: "Hikikomi-gaeshi demonstrates how downward dropping creates throwing opportunities. The principle of dropping under an opponent's centre transfers to wrestling concepts as well."
  },
  {
    id: 47, name: "Tawara-gaeshi", sport: "judo", cat: "Throws", subcat: "Front sacrifice techniques", diff: 3,
    desc: "Rice bale reversal. Reverses opponent's grip attempt by lifting them over.",
    long: "Tawara-gaeshi is used when an opponent attempts to grab both legs for a double-leg takedown. The defender lifts and tips the opponent over, like tipping a rice bale. It is a specific counter to double-leg and single-leg takedown attempts.", setup: "As opponent grabs legs, wrap around their body. Lift and tip them over forward.", key: "The forward tip completes the throw — pulling backward instead reduces the throwing arc.", counters: ["Drive forward harder", "Pull legs tight", "Maintain forward drive"], entries: ["When opponent grabs legs", "As specific counter to leg grabs"], related: [46, 49, 50], vid: null, ai: "Tawara-gaeshi is one of the few Judo techniques specifically designed to counter wrestling-style leg attacks. As wrestling influences in grappling continue to grow, this technique becomes increasingly relevant."
  },
  {
    id: 48, name: "Uchi-makikomi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "Inner winding throw. Inner arm wrap with rolling sacrifice finish.",
    long: "Uchi-makikomi wraps the opponent's arm from the inside and rolls into a sacrifice position to complete the throw. The inside arm wrap creates a different mechanical action than the outside wrap of Soto-makikomi, and is particularly effective against opponents who grip strongly from the outside.", setup: "Wrap opponent's near arm from inside. Roll into them to complete the throwing motion.", key: "The inside wrap is the key — the inner position creates different leverage than an outside wrap.", counters: ["Resist the wrap", "Pull arm free", "Step back"], entries: ["When inside position is established", "Off grip fight", "Combination ender"], related: [31, 27, 62], vid: null, ai: "Uchi-makikomi and Soto-makikomi give you winding throws from both inside and outside positions. Knowing both means you have a makikomi option regardless of the grip situation."
  },
  {
    id: 49, name: "Morote-gari", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "Two hand reap. Double leg takedown — banned in IJF competition but official Kodokan throw.",
    long: "Morote-gari is a double leg takedown that drives through both of the opponent's legs simultaneously. It is banned in IJF competition rules as part of the restriction on leg grabs, but remains an official Kodokan technique. It is related to wrestling's double-leg and is extremely effective in mixed grappling contexts.", setup: "Lower level. Shoot in for both legs simultaneously. Drive through to complete the takedown.", key: "Drive through the legs — stopping at the legs allows the opponent to sprawl.", counters: ["Sprawl", "Guillotine choke", "Whizzer"], entries: ["Direct low-level entry", "Off distraction", "Combination with forward technique"], related: [50, 47, 24], vid: null, ai: "Morote-gari being banned in IJF competition but remaining an official Kodokan technique illustrates the ongoing tension between Judo's traditional roots and its sport evolution. Understanding it provides context for how grappling systems overlap."
  },
  {
    id: 50, name: "Kuchiki-taoshi", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "Single leg takedown. One-hand single leg trip — also banned in IJF competition.",
    long: "Kuchiki-taoshi grabs a single leg and trips the opponent down. Like Morote-gari, it is an official Kodokan technique that is banned in IJF competition due to the leg grab restriction. It corresponds to wrestling's single-leg takedown and is effective in self-defense and non-IJF competition contexts.", setup: "Grab single leg. Trip and drive opponent to the mat.", key: "Combine the leg grab with an upper body action — leg alone is easier to defend.", counters: ["Hop and spin", "Guillotine grip", "Post arm"], entries: ["Direct single-leg attack", "Off forward bend", "Combination"], related: [49, 47, 28], vid: null, ai: "Kuchiki-taoshi and Morote-gari represent Judo's direct influence on modern wrestling-based grappling. They are studied in Judo as foundational takedown concepts even though their competition application is restricted."
  },
  {
    id: 51, name: "Uchi-mata-sukashi", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 4,
    desc: "Inner thigh void throw. Counter to uchi-mata — slips the leg and throws forward.",
    long: "Uchi-mata-sukashi is used specifically as a counter when the opponent attempts uchi-mata. As the opponent swings their leg for the inner thigh attack, the defender slips to the side and uses the opponent's momentum to throw them forward. The name means 'inner thigh void' — creating a void where the throw expected resistance.", setup: "As opponent swings for uchi-mata, slip to the side and use their momentum forward.", key: "Timing with the opponent's swing is everything — too early or late and the counter fails.", counters: ["Abort uchi-mata", "Complete before counter"], entries: ["Specific counter to uchi-mata"], related: [16, 57, 52], vid: null, ai: "Uchi-mata-sukashi is one of the highest expressions of counter-throwing in Judo — using the opponent's most committed attack against them. Studying specific counters like this dramatically improves defensive reading."
  },
  {
    id: 52, name: "Tsubame-gaeshi", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 4,
    desc: "Swallow counter. Counter sweep — used when opponent attempts de-ashi-barai.",
    long: "Tsubame-gaeshi counters the opponent's foot sweep by withdrawing the threatened foot and immediately sweeping the opponent's sweeping foot. The name 'swallow reversal' describes the quick, light movement required. It teaches the principle of converting a defensive withdrawal into an immediate attack.", setup: "Withdraw the foot being swept. Immediately counter-sweep opponent's sweeping foot.", key: "The counter must be immediate — any delay allows the opponent to recover their foot.", counters: ["Recover sweeping foot", "Drive forward"], entries: ["Counter to de-ashi-barai", "Counter to any foot sweep"], related: [1, 53, 54], vid: null, ai: "Tsubame-gaeshi teaches one of the most important defensive concepts in Judo — the instant conversion of defense into attack. The principle of immediately countering a failed technique transfers to every aspect of Judo."
  },
  {
    id: 53, name: "Ko-uchi-gaeshi", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Minor inner reaping counter. Counters ko-uchi-gari with a foot sweep reversal.",
    long: "Ko-uchi-gaeshi is the specific counter to Ko-uchi-gari. When the opponent attempts to reap the inner heel, the defender withdraws and counter-attacks with a reaping or sweeping motion of their own. Like Tsubame-gaeshi, it teaches immediate conversion of defense to offense.", setup: "Withdraw the foot being reaped. Counter with a reap or sweep of opponent's foot.", key: "Withdraw and immediately counter — the counter must come before the opponent recovers balance.", counters: ["Recover foot", "Drive through"], entries: ["Counter to ko-uchi-gari"], related: [10, 52, 54], vid: null, ai: "Ko-uchi-gaeshi, like all the gaeshi (counter) techniques, trains the reflex of immediate offensive response to being attacked. This defensive instinct is what separates intermediate from advanced Judo players."
  },
  {
    id: 54, name: "O-uchi-gaeshi", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Major inner reaping counter. Counters O-uchi-gari.",
    long: "O-uchi-gaeshi counters the opponent's O-uchi-gari attempt. As the opponent hooks inside for the reap, the defender redirects and counter-attacks. The counter can be executed as a sweep, reap, or trip depending on the positional opportunity.", setup: "Redirect opponent's O-uchi-gari attempt. Immediately counter with your own reaping action.", key: "Don't wait for the reap to complete — counter at the moment of commitment.", counters: ["Commit fully through", "Drive forward"], entries: ["Counter to O-uchi-gari"], related: [7, 53, 55], vid: null, ai: "The gaeshi series of techniques (Ko-uchi-gaeshi, O-uchi-gaeshi, O-soto-gaeshi) forms a counter-attacking system. Learning them together gives you a reliable defensive response to the most common attacks."
  },
  {
    id: 55, name: "O-soto-gaeshi", sport: "judo", cat: "Throws", subcat: "Foot techniques", diff: 3,
    desc: "Major outer reaping counter. Counters O-soto-gari.",
    long: "O-soto-gaeshi counters the opponent's O-soto-gari by withdrawing the threatened leg and immediately counter-reaping. As the opponent swings their leg for the reap, the defender steps around and reaps the opponent's now-committed leg. Timing with the reaping swing is essential.", setup: "As opponent swings for the reap, withdraw and counter-reap their swinging leg.", key: "Counter-reap the leg at the top of the swing — it's fully committed and momentarily vulnerable.", counters: ["Complete the throw before counter", "Reap quickly and withdraw"], entries: ["Counter to O-soto-gari"], related: [5, 53, 54], vid: null, ai: "O-soto-gaeshi specifically targets the moment when the opponent's reaping leg is extended and committed — a moment of maximum vulnerability. Recognizing this window transforms how you defend O-soto-gari forever."
  },
  {
    id: 56, name: "Harai-goshi-gaeshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 4,
    desc: "Sweeping hip throw counter. Counters harai-goshi.",
    long: "Harai-goshi-gaeshi counters the opponent's harai-goshi attempt. As they enter and sweep, the defender uses the opponent's rotation against them. The counter can involve lifting the opponent during the sweep or using the rotation to throw in the opposite direction.", setup: "Resist and redirect the harai-goshi entry. Use opponent's rotation to counter-throw.", key: "Engage with the throw momentum rather than simply blocking it.", counters: ["Commit completely to the throw", "Very deep entry"], entries: ["Counter to harai-goshi"], related: [15, 21, 57], vid: null, ai: "Counter techniques to hip throws require you to engage with the throwing motion rather than simply blocking. This active engagement approach produces the most reliable counter-throwing results."
  },
  {
    id: 57, name: "Uchi-mata-gaeshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 4,
    desc: "Inner thigh throw counter. Counters uchi-mata.",
    long: "Uchi-mata-gaeshi counters the uchi-mata by engaging with the sweeping leg motion. The defender uses the opponent's leg swing against them, either blocking and reversing the direction or using the committed momentum to throw in a different direction.", setup: "Engage with the uchi-mata leg swing. Redirect momentum to counter-throw.", key: "Time the counter with the peak of the opponent's leg swing — maximum commitment equals maximum counter opportunity.", counters: ["Commit completely", "Very fast entry"], entries: ["Counter to uchi-mata"], related: [16, 51, 56], vid: null, ai: "Uchi-mata-gaeshi together with Uchi-mata-sukashi gives you two different counter approaches to uchi-mata — one using avoidance and one using engagement. Having both options makes your defense far more unpredictable."
  },
  {
    id: 58, name: "Hane-goshi-gaeshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 4,
    desc: "Spring hip throw counter. Counters hane-goshi.",
    long: "Hane-goshi-gaeshi counters the hane-goshi spring throw. The defender blocks and redirects the springing leg motion, using the opponent's spring energy against them. It requires recognizing the hane-goshi entry quickly enough to establish the counter position.", setup: "Block and redirect the springing knee. Counter-throw using the opponent's spring energy.", key: "The counter uses the spring energy — blocking without redirecting wastes the opportunity.", counters: ["Very fast spring", "Commit completely"], entries: ["Counter to hane-goshi"], related: [21, 56, 57], vid: null, ai: "The gaeshi counter techniques for hip throws all share a common insight: the moment of maximum commitment in a throw is also the moment of maximum vulnerability to counter. This insight changes how you approach all Judo defense."
  },
  {
    id: 59, name: "Kani-basami", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 5,
    desc: "Crab pincer. Scissors the opponent's leg with both legs — banned in competition.",
    long: "Kani-basami uses both legs in a scissors action around the opponent's leg, dropping to the side to complete the throw. It is banned in IJF competition due to the high risk of knee injury to the opponent. It remains an official Kodokan technique studied in kata and traditional practice.", setup: "Scissors both legs around opponent's near leg. Drop to the side to complete.", key: "This technique is banned in most competition — practice with extreme caution and awareness.", counters: ["Hop over", "Pull leg free", "Step back"], entries: ["Traditional study only", "Non-IJF competition contexts"], related: [26, 34, 35], vid: null, ai: "Kani-basami's ban illustrates how Judo has evolved to prioritize safety. Understanding why certain techniques are restricted provides important context for the sport's development and the IJF's rule-making philosophy."
  },
  {
    id: 60, name: "O-soto-makikomi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "Major outer winding throw. O-soto-gari with a winding arm wrap and sacrifice fall.",
    long: "O-soto-makikomi combines the O-soto-gari reaping action with a winding arm wrap and sacrifice fall. The arm wrap prevents the opponent from executing a rear throw counter, making this variation safer to attempt than standing O-soto-gari while maintaining the reaping power.", setup: "Enter like O-soto-gari. Wrap opponent's arm and fall with them as you reap.", key: "The arm wrap must happen before the fall — wrapping during the fall is too late.", counters: ["Resist the wrap", "Pull arm free before reap"], entries: ["When O-soto-gari entry is established", "Off combination"], related: [5, 31, 62], vid: null, ai: "O-soto-makikomi solves the counter-throw problem in O-soto-gari — the arm wrap prevents the most common defensive response. Study it when opponents consistently counter your standing O-soto-gari."
  },
  {
    id: 61, name: "Kawazu-gake", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 5,
    desc: "Kawazu hook. Hooks opponent's leg from close range — banned in competition.",
    long: "Kawazu-gake hooks the opponent's near leg from close range and drops to the mat, using the hook and body weight to throw. It is banned in IJF competition because the close hooking action poses injury risk to the knee. Named after Kawazu Saburo, a legendary wrestler from Japanese history.", setup: "Hook opponent's near leg from close range. Drop body weight to complete the throw.", key: "Banned in competition — traditional and historical study only.", counters: ["Resist the hook", "Step back and away"], entries: ["Traditional study only"], related: [59, 40, 17], vid: null, ai: "Kawazu-gake represents the historical connection between Judo and Japanese sumo and wrestling traditions. Understanding these banned techniques provides important context for why Judo rules evolved as they did."
  },
  {
    id: 62, name: "Harai-makikomi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "Sweeping winding throw. Harai-goshi with winding arm wrap and sacrifice fall.",
    long: "Harai-makikomi combines harai-goshi's sweeping motion with a winding arm wrap and sacrifice fall. It is particularly effective in modern Judo competition because the winding prevents counter-throws while maintaining the sweeping power of harai-goshi.", setup: "Enter like harai-goshi. Wrap opponent's arm and fall with them as you sweep.", key: "The harai (sweep) and makikomi (wind) must happen simultaneously — one without the other loses effectiveness.", counters: ["Resist the wrap quickly", "Back step"], entries: ["When harai-goshi entry is established", "Combination attack"], related: [15, 60, 63], vid: null, ai: "Harai-makikomi is one of the most commonly used competition techniques at the elite level because it combines harai-goshi's throwing power with protection against counter-throws. Study it even if you prefer standing throws."
  },
  {
    id: 63, name: "Uchi-mata-makikomi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "Inner thigh winding throw. Uchi-mata with winding arm wrap and sacrifice fall.",
    long: "Uchi-mata-makikomi adds the winding arm wrap and sacrifice fall to uchi-mata. Like other makikomi variations, it prevents counter-throwing while completing the uchi-mata. It is extremely common at elite competition level where athletes have the counter-throwing ability to turn standing uchi-mata into ippon against the attacker.", setup: "Enter like uchi-mata. Wrap opponent's arm and fall with them as you sweep the inner thigh.", key: "Wrap before the peak of the swing — wrapping after reduces throwing control.", counters: ["Very early arm pull", "Back step immediately"], entries: ["When uchi-mata entry is established", "Direct attack variation"], related: [16, 62, 60], vid: null, ai: "Uchi-mata-makikomi is the elite answer to elite uchi-mata defense. As you progress in Judo, the standing version becomes harder to finish — study this variation to maintain the throw's effectiveness against better defenders."
  },
  {
    id: 64, name: "Sode-tsurikomi-goshi", sport: "judo", cat: "Throws", subcat: "Hip techniques", diff: 4,
    desc: "Sleeve lifting pulling hip throw. Grips both sleeves for a different hip throw entry.",
    long: "Sode-tsurikomi-goshi uses a two-sleeve grip rather than the traditional collar-sleeve grip to execute a hip throw. The sleeve control creates different kuzushi mechanics and is particularly useful when collar grips are unavailable or when opponents defend traditional hip throws with collar-based counters.", setup: "Both sleeve grips. Use sleeve control to create lifting-pulling action into hip throw.", key: "Sleeve grips require more coordinated body rotation than collar-sleeve — practice the rotation specifically.", counters: ["Grip break", "Block hip", "Pull sleeves down"], entries: ["When both sleeves are gripped", "Off defensive collar grip", "Alternative hip entry"], related: [12, 4, 6], vid: null, ai: "Sode-tsurikomi-goshi teaches that the grip mechanics in Judo are not fixed — different grip configurations create different throwing opportunities. This flexibility in grip application is a hallmark of advanced Judo."
  },
  {
    id: 65, name: "Ippon-seoi-nage", sport: "judo", cat: "Throws", subcat: "Hand techniques", diff: 3,
    desc: "One-arm shoulder throw. Seoi-nage variation using one arm under the opponent's arm.",
    long: "Ippon-seoi-nage uses one arm under the opponent's armpit rather than both arms as in morote seoi-nage. The single arm entry allows for a faster entry but requires more precise positioning. It is one of the most commonly taught seoi-nage variations and is extremely effective from both standing and drop entries.", setup: "Single arm under opponent's armpit. Rotate 180° and throw forward.", key: "The arm must be deep under the armpit — a shallow arm position loses contact during the throw.", counters: ["Block entry", "Rear throw", "Drop weight"], entries: ["Standard standing entry", "Drop entry to one knee", "Counter attack variation"], related: [8, 42, 14], vid: null, ai: "Ippon-seoi-nage vs morote seoi-nage is a common strategic choice for judoka — ippon allows faster entry while morote provides more control. Studying both and understanding the tradeoffs helps you choose based on opponent and situation."
  },
  {
    id: 66, name: "Obi-tori-gaeshi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 4,
    desc: "Belt grab reversal. Grabs belt from behind and uses sacrifice motion to throw.",
    long: "Obi-tori-gaeshi grabs the opponent's belt from behind or from the side and uses a sacrifice dropping motion to throw. The belt control combined with the body drop creates significant throwing force. It is one of the newer techniques added to the Kodokan list.", setup: "Establish belt grip. Execute sacrifice drop while pulling with the belt grip.", key: "Belt grip must be maintained throughout the sacrifice — losing it loses the throw.", counters: ["Grip the belt back", "Post foot", "Counter drive"], entries: ["When belt is accessible from behind", "Off clinch position"], related: [41, 45, 38], vid: null, ai: "Obi-tori-gaeshi represents the continuing evolution of Judo technique. The Kodokan's addition of new techniques reflects that Judo is a living martial art, not a fixed historical system."
  },
  {
    id: 67, name: "Ko-uchi-makikomi", sport: "judo", cat: "Throws", subcat: "Side sacrifice techniques", diff: 3,
    desc: "Minor inner winding throw. Ko-uchi-gari with winding arm wrap and sacrifice finish.",
    long: "Ko-uchi-makikomi adds the winding arm wrap and sacrifice fall to Ko-uchi-gari. The combination turns the small reaping technique into a powerful sacrifice throw. It is one of the last two techniques added to the Kodokan list in 1997 and is commonly used in modern competition.", setup: "Enter like Ko-uchi-gari. Wrap opponent's arm and fall with them as you reap.", key: "The reap and wrap must be coordinated — reap first, wrap immediately after.", counters: ["Pull arm before reap commits", "Step through reap"], entries: ["When Ko-uchi-gari entry is established", "Combination ender"], related: [10, 60, 62], vid: null, ai: "Ko-uchi-makikomi is the last officially added Kodokan throw and represents how classical techniques evolve. The makikomi addition to Ko-uchi-gari dramatically increases its finishing power in modern competition."
  },

  // ─── JUDO: KATAME-WAZA (Grappling) ─────────────────────────────────────────
  {
    id: 68, name: "Kesa-gatame", sport: "both", cat: "Pins", diff: 1,
    desc: "Scarf hold. Controls head and arm tightly from the side.",
    long: "Kesa-gatame is the most fundamental pin in both Judo and BJJ. The holder sits perpendicular to the opponent, capturing the head under one arm and controlling the near arm with the other. In Judo it scores ippon when held for 20 seconds. In BJJ it is a dominant position to attack chokes and armlocks.",
    setup: "Sit beside opponent, wrap their head tight, trap near arm against your body.", key: "Keep your base wide. Hips low. Don't reach — everything stays connected.", counters: ["Roll into them", "Bridge and roll", "Elbow escape"], entries: ["From throw landing", "After guard pass", "Side control transition"], related: [69, 73, 74], vid: null, ai: "Kesa-gatame transitions naturally to Juji-gatame when the opponent tries to pull their trapped arm free — as they pull, you follow and enter the armbar. This transition is worth drilling specifically."
  },
  {
    id: 69, name: "Juji-gatame", sport: "both", cat: "Armlocks", diff: 2,
    desc: "Cross armlock. Hyperextends the elbow — clean finish at all levels.",
    long: "Juji-gatame is the quintessential armlock of grappling. The attacker controls the opponent's arm across the hips while lying perpendicular, applying pressure to the elbow joint through hip extension. It can be entered from mount, guard, side control, or standing.",
    setup: "Arm trapped across your hips. Knees pinch tight. Feet control the body.", key: "Slow and controlled pressure. The tap comes before the break — don't rush.", counters: ["Stack pass", "Roll and hitchhiker", "Grip strip"], entries: ["From mount", "From guard", "Flowing from kesa-gatame"], related: [68, 74, 73], vid: null, ai: "Juji-gatame and the triangle choke form one of the most classic combinations in grappling — defending the armbar creates the triangle, defending the triangle creates the armbar. Train these as a system."
  },
  {
    id: 70, name: "Kimura", sport: "both", cat: "Armlocks", diff: 2,
    desc: "Figure-four shoulder lock. Works from side control, guard, or back.",
    long: "The Kimura lock is a double wrist lock applied to the shoulder joint. Named after legendary judoka Masahiko Kimura who used it to defeat Helio Gracie in 1951. It can be applied from nearly every position — side control, top guard, turtle, north-south, and back mount.",
    setup: "Figure-four grip on opponent's wrist and your own wrist. Rotate their arm behind their back.", key: "Control the wrist first. The shoulder breaks when the wrist goes past the hip.", counters: ["Roll toward lock", "Grip break", "Counter grip"], entries: ["From side control", "From top guard", "Off turtle"], related: [69, 75, 73], vid: null, ai: "The Kimura grip is one of the most versatile control grips in BJJ — even when you can't finish the submission, maintaining the grip allows you to sweep, take the back, or transition to other attacks."
  },
  {
    id: 71, name: "Okuri-eri-jime", sport: "judo", cat: "Chokes", diff: 3,
    desc: "Sliding lapel choke. Applied from behind using the gi collar.",
    long: "Okuri-eri-jime is a collar choke applied from behind the opponent in a manner similar to a rear naked choke but using the gi lapel. One hand grips deep on the opponent's collar while the other arm assists. It is one of the most common chokes in Judo newaza competition.",
    setup: "Control from behind. Deep collar grip with palm-up hand. Second hand reinforces.", key: "Get under the chin before pulling — a chin tuck stops this choke entirely.", counters: ["Chin tuck", "Grip strip", "Roll and escape"], entries: ["From back control", "After throwing opponent to turtling", "Off failed pin escape"], related: [68, 75, 76], vid: null, ai: "Okuri-eri-jime is the direct bridge between Judo groundwork and BJJ rear naked choke concepts. Judo players who study this naturally develop back control that transfers to no-gi."
  },

  // ─── BJJ TECHNIQUES ─────────────────────────────────────────────────────────
  {
    id: 72, name: "Omoplata", sport: "bjj", cat: "Armlocks", diff: 3,
    desc: "Shoulder lock using the legs. Also a strong sweep threat.",
    long: "The omoplata uses the attacker's legs to apply a shoulder lock from guard. Even when the submission is defended, the position creates strong sweep and back-take opportunities, making it a multi-threat attack.",
    setup: "Control opponent's posture from guard. Swing leg over arm and rotate toward the trapped side.", key: "Don't let them roll out early — control the hip and sit up before finishing.", counters: ["Roll through", "Posture up early", "Stack"], entries: ["From closed guard", "From spider guard", "Off armbar attempt"], related: [69, 70, 77], vid: null, ai: "The omoplata's real value is as a threat system. When your opponent defends by rolling, you can follow into a mounted triangle or take the back."
  },
  {
    id: 73, name: "Triangle choke", sport: "both", cat: "Chokes", diff: 3,
    desc: "Legs trap head and one arm. Can be hit from guard, mount, or back.",
    long: "The triangle choke uses the legs to replicate the mechanics of a rear naked choke. One of the opponent's arms is trapped inside while the other is outside, and the leg applies carotid pressure. Most commonly applied from guard but can be hit from mount, side control, and even standing.",
    setup: "Pull opponent's posture down. Kick shin to their neck. Catch one arm inside, one outside. Lock figure-four with your legs.", key: "Angle out 45°. The squeeze comes from the leg, not pulling the head.", counters: ["Stack and posture", "Grip the leg", "Hitchhiker escape"], entries: ["From closed guard", "Off juji-gatame", "From mount"], related: [69, 76, 77], vid: null, ai: "The triangle and juji-gatame form a natural combination from guard. Add omoplata as a third threat and you have a complete guard attack system."
  },
  {
    id: 74, name: "Rear naked choke", sport: "bjj", cat: "Chokes", diff: 2,
    desc: "Applied from back mount. Highest finish rate in any grappling sport.",
    long: "The rear naked choke is the most effective submission in grappling. Applied from back mount, one arm wraps across the throat while the other reinforces behind the head, compressing both carotid arteries. Proper application does not require strength.",
    setup: "Seat belted behind opponent. Insert hooks. Choke arm under chin, second arm behind head, squeeze.", key: "Get the chin out of the way first. Chin tucking blocks the choke — manipulate posture.", counters: ["Chin tuck", "Pull arm down", "Roll and escape"], entries: ["From back mount", "Off turtle", "After back take from guard"], related: [73, 76, 71], vid: null, ai: "Back mount and the rear naked choke are the endgame of BJJ. Every technique you learn should have a mental pathway toward taking the back."
  },
  {
    id: 75, name: "Guillotine", sport: "bjj", cat: "Chokes", diff: 2,
    desc: "Arm wraps the neck from the front. Arm-in and arm-out variations.",
    long: "The guillotine choke attacks the neck from the front — typically when the opponent shoots for a takedown or lowers their head. The arm-in guillotine applies carotid pressure and is more reliable against experienced grapplers.",
    setup: "Underhook neck, grip your own wrist or hand, pull up and in toward your armpit.", key: "Angle out. The choke doesn't finish if you're square — hip out to the opposite side.", counters: ["Head pop", "Forward roll", "Posture up"], entries: ["Off takedown defence", "From clinch", "Counter to head control"], related: [74, 73, 77], vid: null, ai: "The arm-in guillotine is one of the most underrated submissions in BJJ. Most people learn the arm-out version first, but the arm-in applies better carotid pressure and works on more body types."
  },
  {
    id: 76, name: "Closed guard", sport: "bjj", cat: "Guards", diff: 1,
    desc: "Legs locked around opponent's waist. The foundational control position.",
    long: "Closed guard is the first guard position most BJJ practitioners learn and one of the deepest. With legs locked behind the opponent's back, the bottom player can control posture, break grips, create sweeping leverage, and attack chokes and armlocks.",
    setup: "Feet locked behind opponent's back. Break posture by pulling the head down with both hands.", key: "Posture is everything — a posting opponent is difficult to attack. Prioritize breaking it.", counters: ["Stand up", "Posture up and pass", "Hip pressure stack"], entries: ["Pulled to guard", "Off failed takedown", "Drag down from clinch"], related: [73, 69, 78], vid: null, ai: "Closed guard is often abandoned too early by intermediate players. It forces you to understand posture control, framing, and timing — skills that make every other guard better."
  },
  {
    id: 77, name: "De la Riva", sport: "bjj", cat: "Guards", diff: 3,
    desc: "Hooks opponent's lead leg. Dozens of sweep and back-take entries.",
    long: "De la Riva guard wraps one leg around the outside of the opponent's near leg while the foot hooks behind the knee. From here a huge number of sweeps, back takes, and berimbolo entries become available. Named after Ricardo De la Riva who popularised it in the 1980s.",
    setup: "Outside leg hooks behind opponent's knee. Inside foot on hip. Both sleeve grips preferred.", key: "The hook must be deep — knee, not shin. A shallow hook gets passed immediately.", counters: ["Torreando pass", "X-pass", "Leg drag"], entries: ["When opponent stands in guard", "Transitioning from closed guard", "Off break fall"], related: [78, 79, 80], vid: null, ai: "De la Riva connects to the back take in one of the cleanest sequences in BJJ — when the opponent steps their near leg back to escape, the angle for a back take appears immediately."
  },
  {
    id: 78, name: "Spider guard", sport: "bjj", cat: "Guards", diff: 3,
    desc: "Controls opponent's sleeves and places feet on biceps.",
    long: "Spider guard uses sleeve grips with feet pushing on both biceps to create extreme control over the opponent's posture and arm movement. It is a gi-only guard with a wide range of triangles, armbars, and sweeps available.",
    setup: "Both sleeve grips. Push feet to biceps — don't let them bend their arms.", key: "Maintain tension in both grips constantly. Letting one go collapses the guard.", counters: ["Knee slice", "Torreando", "Leg drag"], entries: ["From guard recovery", "When opponent grips sleeves", "Transitioning from closed guard"], related: [77, 79, 69], vid: null, ai: "Spider guard teaches you to control the opponent's posture and arms before attacking — a principle that transfers to every other guard."
  },
  {
    id: 79, name: "Butterfly guard", sport: "bjj", cat: "Guards", diff: 2,
    desc: "Hooks inside opponent's thighs. Excellent sweeping leverage.",
    long: "Butterfly guard uses hooks inside the opponent's thighs to generate sweeping leverage. Combined with underhooks or over-under grips, it creates powerful mechanical advantage that works regardless of size or strength differences.",
    setup: "Sit up, both feet hooked inside opponent's thighs. Underhook one arm.", key: "Stay connected to the opponent. A butterfly guard with no upper body contact is easily passed.", counters: ["Backstep", "Long step around", "Knee slice"], entries: ["From seated position", "Off failed single leg", "Transitioning from closed guard"], related: [76, 77, 83], vid: null, ai: "Butterfly guard is one of the most important guards for grapplers with a wrestling background because the seated position and underhook control feel natural."
  },
  {
    id: 80, name: "X-guard", sport: "bjj", cat: "Guards", diff: 4,
    desc: "Under opponent with two hooks underneath. Very high sweep percentage.",
    long: "X-guard positions the bottom player completely under the opponent with both hooks controlling the thighs. The geometry creates extreme instability for the top player. Popularised by Marcelo Garcia.",
    setup: "Enter from single leg x or butterfly. Two hooks under thighs, grip ankle.", key: "Don't lie flat — keep your hips elevated and active. Flat x-guard is easy to pass.", counters: ["Disengage back", "Jump over", "Knee slide"], entries: ["Off butterfly guard", "From single leg x", "Counter to standing guard break"], related: [77, 79, 76], vid: null, ai: "X-guard is most effective when you understand the transition into it rather than trying to establish it statically. The best entries come off failed butterfly sweeps."
  },
  {
    id: 81, name: "Heel hook", sport: "bjj", cat: "Leg locks", diff: 5,
    desc: "Rotational knee attack. High damage potential — train with extreme care.",
    long: "The heel hook is a rotational attack on the knee joint. By controlling the heel and rotating, the attacker loads the ligaments of the knee — particularly the ACL and MCL. They are the highest-percentage submission in modern no-gi competition and are banned in lower belt divisions.",
    setup: "Control the leg in an entanglement. Hip-to-hip, heel in armpit, rotate torso.", key: "Tap early — the pain comes after the damage. This is not a squeeze submission.", counters: ["Heel pop", "Roll with the lock", "Knee shield"], entries: ["From leg entanglement", "Off DLR", "From outside heel hook position"], related: [82, 83, 84], vid: null, ai: "Heel hooks require a different mental framework — the window between 'it's on' and 'something tears' is extremely small. Learn the defensive escapes before drilling them offensively."
  },
  {
    id: 82, name: "Kneebar", sport: "bjj", cat: "Leg locks", diff: 3,
    desc: "Hyperextends the knee. Common from leg entanglement positions.",
    long: "The kneebar hyperextends the knee joint by using the body as a lever. It can be entered from many positions and is legal at purple belt and above in most gi competitions.",
    setup: "Control thigh and ankle. Arm across the knee joint. Drive hips in.", key: "The knee points toward the ceiling — if it's off angle the lock won't finish clean.", counters: ["Straighten leg", "Knee pop", "Roll toward attacker"], entries: ["From leg entanglement", "Off failed guard pass", "Counter to guard pull"], related: [81, 83, 84], vid: null, ai: "Kneebar appears constantly in scrambles and transitions — you don't need a dedicated leg lock game to hit kneebars, just awareness."
  },
  {
    id: 83, name: "Ankle lock", sport: "both", cat: "Leg locks", diff: 1,
    desc: "Compresses the ankle joint. The most accessible leg lock.",
    long: "The straight ankle lock is the most fundamental leg lock in grappling. Legal at white belt in most organizations, it is the foundation for more advanced leg lock systems.",
    setup: "Opponent's ankle in your armpit. Figure-four or arm grip. Arch back, not sideways.", key: "Control the knee first — without knee control the opponent can turn and escape.", counters: ["Heel pop", "Turn toward attacker", "Knee control escape"], entries: ["Off guard pass", "From 50/50", "Direct attack off takedown defense"], related: [81, 82, 84], vid: null, ai: "The ankle lock is the entry point to the entire leg lock game. Learning it well — particularly the knee control principle — teaches you the positional logic that applies to all leg locks."
  },
  {
    id: 84, name: "Bridge escape", sport: "both", cat: "Escapes", diff: 1,
    desc: "Upa from bottom mount. Essential survival skill at every level.",
    long: "The bridge and roll is the first escape from bottom mount that most grapplers learn. The bottom player traps one of the top player's arms, plants a foot, and explosively bridges to roll the opponent off.",
    setup: "Trap one arm and same-side leg. Plant foot close to your hip. Bridge explosively.", key: "Bridge straight up first, then over. A diagonal bridge doesn't generate enough force.", counters: ["Post free leg", "Weight shift", "Arm triangle as they bridge"], entries: ["From bottom mount", "After being mounted off scramble"], related: [85, 68, 69], vid: null, ai: "The bridge escape teaches one of the most important principles in grappling — isolate before you explode. Attempting to bridge without trapping first trains a bad habit."
  },
  {
    id: 85, name: "Elbow-knee escape", sport: "bjj", cat: "Escapes", diff: 2,
    desc: "Shrimping to recover guard. The single most fundamental BJJ escape.",
    long: "The elbow-knee escape uses a series of hip escapes to create space and allow the bottom player to insert a knee and recover guard. The shrimping motion appears in almost every BJJ escape and guard recovery.",
    setup: "Frame on hip and chin. Create space with a shrimp. Insert knee shield. Build back to guard.", key: "The frame buys you a moment — use it immediately. Don't hold the frame, use it to move.", counters: ["Flatten opponent out", "Crossface pressure", "Step over knee"], entries: ["From bottom mount", "From bottom side control", "From any bottom position"], related: [84, 86, 76], vid: null, ai: "The shrimping motion is the kinetic vocabulary of BJJ's entire bottom game. If you only drill one thing in BJJ, drill shrimping."
  },
  {
    id: 86, name: "Turtle escape", sport: "both", cat: "Escapes", diff: 2,
    desc: "Rolling or sit-out from the turtle. Prevents back exposure.",
    long: "The turtle position appears in both Judo and BJJ when a player is taken down or loses top position. The priority is to not give up the back. Escapes include the granby roll, the sit-out, and standing up in base.",
    setup: "Stay balled tight. Hands protecting neck. Elbows in. Do not flatten out.", key: "Never reach back to grab — it exposes an arm. Stay compact and time the escape.", counters: ["Clock choke", "Seatbelt grip for back", "Tilt to side control"], entries: ["After takedown", "When guard is passed", "Off scramble"], related: [84, 85, 74], vid: null, ai: "The turtle is a position most people are taught to escape immediately — but at higher levels it's used intentionally as a transitional position to stand up or counter-attack."
  },

  // ─── JUDO NE-WAZA: PINS ─────────────────────────────────────────────────────
  {
    id: 87, name: "Kata-gatame", sport: "judo", cat: "Pins", diff: 2,
    desc: "Shoulder hold. Traps the opponent's head and arm with chest pressure.",
    long: "Kata-gatame traps the opponent's arm and head between the holder's shoulder and the mat, simultaneously pinning and creating choke pressure on the carotid artery. The chest drives down on the upper arm while the shoulder clamps the head. It is the Judo equivalent of the BJJ arm triangle — control and submission threat in one position.",
    setup: "Thread your arm under their arm and behind their head. Clasp your hands. Drive your chest onto their upper arm and clamp your shoulder into their neck.", key: "The submission pressure comes from the chest on the arm and shoulder on the neck together — either alone is not enough.", counters: ["Hip escape to create space", "Walk feet in and bridge", "Frame on the hip and shrimp out"], entries: ["From kesa-gatame when opponent bridges", "After a throw landing in side control", "Transition from mount"], related: [68, 89, 100], vid: null, ai: "Kata-gatame is a pin and a choke threat simultaneously. The mechanism is identical to the BJJ arm triangle — understanding this turns a Judo pin into a submission weapon."
  },
  {
    id: 88, name: "Kami-shiho-gatame", sport: "judo", cat: "Pins", diff: 2,
    desc: "Upper four corner hold. Controls from above the opponent's head.",
    long: "Kami-shiho-gatame is applied from the top of the opponent's head. The holder lies chest-to-chest, threading their arms under the opponent's armpits and gripping the belt or trousers. The hips are low and spread wide to make bridging difficult. It scores ippon in Judo after 20 seconds of control.",
    setup: "Lie chest down above their head. Thread arms under armpits and grip belt. Drop your hips and spread your legs wide.", key: "Keep your hips on the mat and your weight distributed — a high hip gives the opponent space to bridge.", counters: ["Bridge and roll", "Hip escape to insert a knee", "Grab their leg and turn"], entries: ["After a throw to the back", "Transition from side control by walking toward the head", "Off a failed escape"], related: [87, 89, 90], vid: null, ai: "Kami-shiho-gatame teaches you to understand the fulcrum — the opponent's bridge only works if you give them something to push against. Spread wide and low and the bridge becomes ineffective."
  },
  {
    id: 89, name: "Yoko-shiho-gatame", sport: "judo", cat: "Pins", diff: 2,
    desc: "Side four corner hold. Chest-to-chest control from the side.",
    long: "Yoko-shiho-gatame is one of the most fundamental pins in Judo ne-waza. The holder lies chest-to-chest with the opponent at a perpendicular angle, one arm under the neck and one arm through the legs gripping the belt. It is the Judo equivalent of BJJ side control.",
    setup: "Lie perpendicular to opponent. One arm under the neck, grip collar. Other arm between the legs, grip belt. Chest on chest, hips low.", key: "Control both ends — the head end and the hip end. Losing either grip allows escape.", counters: ["Hip escape away", "Knee-elbow escape", "Bridge and roll"], entries: ["After a throw to the back or side", "Transition from kami-shiho", "After guard pass"], related: [87, 88, 90], vid: null, ai: "Yoko-shiho-gatame and BJJ side control are the same position with different grips. Your Judo ne-waza pins translate directly — the principles of weight, angle, and control are identical."
  },
  {
    id: 90, name: "Tate-shiho-gatame", sport: "judo", cat: "Pins", diff: 2,
    desc: "Lengthwise four corner hold. Mounted chest-to-chest control.",
    long: "Tate-shiho-gatame is the Judo name for the mount position — the holder sits astride the opponent's torso, knees on the mat, controlling both the upper and lower body. From here chokes and armlocks are available. In competition, it scores ippon after 20 seconds of unbroken control.",
    setup: "Sit astride opponent's chest. Knees pinched to their sides. Control both arms. Maintain an upright posture.", key: "Keep your knees tight to the sides — gaps allow the opponent's knees to come in for an elbow-knee escape.", counters: ["Bridge and roll escape", "Elbow-knee escape", "Trap the arm and roll"], entries: ["After a throw that puts you on top", "Transition from yoko-shiho", "After passing guard"], related: [88, 89, 84], vid: null, ai: "Tate-shiho-gatame — called mount in BJJ — is the highest-scoring pin in Judo ne-waza for a reason. Learn to hold it and the submissions become available naturally."
  },

  // ─── JUDO NE-WAZA: CHOKES ───────────────────────────────────────────────────
  {
    id: 91, name: "Hadaka-jime", sport: "judo", cat: "Chokes", diff: 2,
    desc: "Rear naked choke. Bare arm across the throat from behind.",
    long: "Hadaka-jime is applied from behind the opponent without using the gi, making it the most direct strangulation in Judo. The forearm presses across the throat while the other arm secures the position. It is identical to the BJJ rear naked choke and is effective at all levels of grappling.",
    setup: "Secure back control with hooks. Thread choking arm across the throat. Other hand cups the back of the head or grips the choking arm's bicep.", key: "The choke compresses both carotid arteries simultaneously — the arm must be centred on the throat, not the chin.", counters: ["Chin tuck early", "Two-hand grip break", "Step over and roll to turtle"], entries: ["From back control", "After a throw landing behind the opponent", "Off a failed turnover"], related: [92, 106, 74], vid: null, ai: "Hadaka-jime is the same technique as the rear naked choke — if you can take the back, this should always be the first submission you look for. Simple, effective, requires no gi."
  },
  {
    id: 92, name: "Kata-ha-jime", sport: "judo", cat: "Chokes", diff: 3,
    desc: "Single wing choke. One arm through the collar, the other lifts the arm.",
    long: "Kata-ha-jime chokes by driving one forearm across the carotid artery using a collar grip while the other arm threads under the opponent's arm and behind their head, blocking escape. The combination of the collar grip and the arm-under creates a powerful one-sided strangle. It is often applied from behind when the opponent turtles.",
    setup: "From behind: grip deep in the collar with one hand. Thread other arm under opponent's arm, hand behind their head. Squeeze and extend.", key: "The arm under the armpit must block the opponent's shoulder from dropping — this prevents them from shrugging the choke off.", counters: ["Tuck chin and grip the choking arm", "Step out and face opponent", "Roll into them to break the angle"], entries: ["From turtle top when opponent defends", "After back control is established", "Off okuri-eri-jime when they defend"], related: [71, 91, 93], vid: null, ai: "Kata-ha-jime is a reliable tournament technique because it attacks when the opponent is defending — the arm that's trying to block the choke is exactly what makes the choke tighter."
  },
  {
    id: 93, name: "Gyaku-juji-jime", sport: "judo", cat: "Chokes", diff: 2,
    desc: "Reverse cross choke. Both thumbs inserted into the collar.",
    long: "Gyaku-juji-jime uses both hands in a cross grip on the collar with thumbs pointing in, creating a scissor action on the carotid arteries. It is applied most commonly from inside the opponent's guard or from mount. The reverse (thumbs-in) grip generates powerful pressure with relatively little arm strength required.",
    setup: "Grip deep in both collar lapels with thumbs inside. Cross your wrists. Pull the elbows in and drive the forearms down and across.", key: "The pressure comes from crossing the forearms, not from pulling — keep elbows tight to the body and turn the wrists.", counters: ["Posture up and push elbows apart", "Stack the opponent to reduce space", "Frame on the wrists and turn"], entries: ["From inside closed guard", "From mount controlling the arms", "When opponent pulls you into guard"], related: [94, 73, 92], vid: null, ai: "The cross choke family — gyaku and nami — teaches you that the collar is a weapon. Deep collar grips from guard or mount are not just control; they are submission setups."
  },
  {
    id: 94, name: "Nami-juji-jime", sport: "judo", cat: "Chokes", diff: 2,
    desc: "Normal cross choke. One thumb in, one finger in on the collar.",
    long: "Nami-juji-jime uses a normal cross grip with one hand thumb-in and the other hand fingers-in on the lapels. It creates a scissors action on the arteries of the neck. Like gyaku-juji-jime it is most commonly applied from guard or mount using the gi collar.",
    setup: "First hand grips deep in the far collar, thumb in. Second hand crosses over to grip near collar, fingers in. Pull elbows down and cross forearms.", key: "The second (fingers-in) grip must be as deep as possible — a shallow grip means the choke strangles the chin rather than the artery.", counters: ["Posture up to break grips", "Two-on-one to peel the first grip", "Stack and drive forward"], entries: ["From closed guard", "From mount when both arms are controlled", "When opponent reaches for their belt"], related: [93, 73, 92], vid: null, ai: "Nami and gyaku-juji-jime are companion techniques — knowing both means you can adapt to which grip is available. The mechanics are nearly identical; only the orientation of the thumb differs."
  },

  // ─── JUDO NE-WAZA: ARMLOCKS ─────────────────────────────────────────────────
  {
    id: 95, name: "Ude-garami", sport: "judo", cat: "Armlocks", diff: 2,
    desc: "Entangled armlock. Figure-four grip rotating the shoulder outward.",
    long: "Ude-garami uses a figure-four grip on the opponent's bent arm to rotate the shoulder joint into extension and internal rotation simultaneously. It is the Judo name for what BJJ practitioners call the Kimura. It can be applied from many positions — side control, guard, top turtle — and is one of the most versatile submissions in grappling.",
    setup: "Bend the opponent's arm to 90 degrees. Thread your arm under their wrist and grip your own wrist over their forearm. Rotate the hand toward their head.", key: "The lock works by rotating the shoulder — drive the wrist toward the mat while keeping the elbow at 90 degrees.", counters: ["Grip your own belt to defend the grip", "Roll toward the lock to reduce shoulder rotation", "Stack the opponent to flatten them"], entries: ["From side control on the near arm", "From guard when opponent posts an arm", "Off a failed armbar when they defend"], related: [70, 69, 102], vid: null, ai: "Ude-garami (Kimura) is the most versatile submission in grappling — it appears from guard bottom, side control, turtle, and even standing. Learning the grip is learning a master key."
  },
  {
    id: 96, name: "Ude-hishigi-ude-gatame", sport: "judo", cat: "Armlocks", diff: 3,
    desc: "Arm armlock. Hyperextends the elbow using the arm against the arm.",
    long: "Ude-hishigi-ude-gatame uses the practitioner's own forearm as a fulcrum against the opponent's elbow joint while controlling the wrist, hyperextending the elbow. It is a more unusual armlock in Judo ne-waza, applied from guard or side positions when the opponent extends a straight arm.",
    setup: "Control the opponent's wrist. Place your forearm across their elbow as a fulcrum. Apply downward pressure on the wrist while lifting the elbow.", key: "The fulcrum must be placed on the elbow joint itself — too high or too low and the lock loses mechanical advantage.", counters: ["Bend the arm immediately", "Rotate the elbow to escape", "Stack and posture"], entries: ["From guard when opponent posts a straight arm", "Off a failed juji-gatame when opponent bends", "From side control on the far arm"], related: [69, 95, 97], vid: null, ai: "Ude-hishigi-ude-gatame teaches the universal principle behind all armlocks — control the wrist, apply force at the elbow. Every armlock variation in grappling follows this same mechanical logic."
  },
  {
    id: 97, name: "Ude-hishigi-hiza-gatame", sport: "judo", cat: "Armlocks", diff: 3,
    desc: "Knee armlock. Uses the knee as the fulcrum to hyperextend the elbow.",
    long: "Ude-hishigi-hiza-gatame uses the knee as the fulcrum against the opponent's elbow while the hands control the wrist. It is often applied during transitions and scrambles where the conventional juji-gatame position is not available. The knee creates a powerful and unexpected lever point.",
    setup: "Control the opponent's wrist with both hands. Place your knee under their elbow. Sit back and extend your knee upward while pulling the wrist down.", key: "The knee must drive into the crook of the elbow — if it slides to the forearm the mechanical advantage is lost.", counters: ["Flip the elbow over the knee", "Slam the arm to the mat", "Roll toward the lock"], entries: ["During scrambles off a takedown", "When opponent postures up from guard", "Off a failed juji-gatame"], related: [69, 95, 96], vid: null, ai: "Hiza-gatame is a scramble technique — it works precisely because it is unexpected. Training to recognise the opportunity during transitions rather than from static positions is the key to using it."
  },

  // ─── BJJ: GUARDS ────────────────────────────────────────────────────────────
  {
    id: 98, name: "Open guard", sport: "bjj", cat: "Guards", diff: 2,
    desc: "Feet on hips or biceps, managing distance and attacking simultaneously.",
    long: "Open guard is a family of guard positions where the legs are not locked and the bottom player uses their feet, knees, and grips to control the top player's posture and movement. It includes lasso guard, sleeve guard, and collar-sleeve guard. Open guard is the foundation of modern BJJ competition, enabling sweeps, submissions, and guard retention simultaneously.",
    setup: "Place feet on opponent's hips or biceps. Establish sleeve or collar grips. Keep active — move your hips to stay directly in front of them.", key: "Open guard is a dynamic system, not a static position. The moment you stop moving you are being passed.", counters: ["Stack the guard player", "Combat base to manage the feet", "Knee slice or torreando pass"], entries: ["When closed guard is broken", "Off a guard pull", "After a failed takedown"], related: [76, 77, 78], vid: null, ai: "Open guard rewards the player who moves first. The relationship between your feet and their posture is constant — if you control their posture, you control the match."
  },
  {
    id: 99, name: "Half guard", sport: "bjj", cat: "Guards", diff: 2,
    desc: "One leg trapped between the opponent's legs. A position between guard and side control.",
    long: "Half guard occurs when the bottom player captures one of the top player's legs between their own two legs. From here the bottom player can recover full guard, take the back, sweep with an underhook, or play deep half guard. It is one of the most common positions in BJJ, arising naturally from guard passes and takedowns.",
    setup: "Capture one leg with both your legs. Immediately fight for an underhook on the same side. Turn in to face them and look to recover.", key: "The underhook is the difference between offensive and defensive half guard. Without it you are flattened out and the pass continues.", counters: ["Crossface to flatten the bottom player", "Whizzer to control the underhook", "Pass to the other side"], entries: ["When guard is being passed", "Off a failed guard pull", "After a takedown where one leg is captured"], related: [76, 98, 104], vid: null, ai: "Half guard is not a bad position — at high levels it is an offensive system. The mindset shift from 'surviving half guard' to 'attacking from half guard' separates intermediate from advanced players."
  },

  // ─── BJJ: CHOKES ────────────────────────────────────────────────────────────
  {
    id: 100, name: "Arm triangle", sport: "bjj", cat: "Chokes", diff: 2,
    desc: "Head and arm choke from side control. Uses the opponent's own arm against them.",
    long: "The arm triangle traps the opponent's head and one arm between the attacker's arm and chest, compressing the carotid arteries on both sides of the neck. It is set up from side control or mount when the opponent pushes a hand into your chest or tries to frame. The opponent's own shoulder creates the pressure on one side.",
    setup: "From side control: trap their near arm across their own neck. Thread your arm under their neck. Walk to the same side as the trapped arm and finish.", key: "Switch sides — the finish is on the same side as the trapped arm, not where you set it up. This is the most common mistake.", counters: ["Don't let the arm get trapped — keep elbows in", "Create space with a hip escape", "Grab your own lapel or neck to defend"], entries: ["From side control when they push with a straight arm", "From mount when they frame on your chin", "Off a failed guard pass"], related: [87, 73, 75], vid: null, ai: "The arm triangle appears whenever an opponent pushes against you from the bottom. Training yourself to recognise that straight arm as a submission setup rather than just pressure changes your entire top game."
  },

  // ─── BJJ: ARMLOCKS ──────────────────────────────────────────────────────────
  {
    id: 101, name: "Armbar", sport: "bjj", cat: "Armlocks", diff: 2,
    desc: "Hyperextends the elbow joint. The highest-percentage submission in BJJ competition.",
    long: "The armbar — juji-gatame in Judo — hyperextends the elbow by placing the joint across the hips while controlling the wrist. It is available from guard, mount, back control, and during transitions. In BJJ competition it is consistently the most finished submission at all belt levels. Mastering armbar entries from multiple positions is a cornerstone of any complete BJJ game.",
    setup: "Control the wrist. Swing leg over the face, other leg across the body. Squeeze knees together. Extend hips upward while pulling the wrist down to your chest.", key: "The thumb points up — the elbow must be aligned with your hip crease. Rotation away from the thumb direction causes the finish.", counters: ["Stack and drive", "Clasped-hands defence — grip your own hands", "Roll toward the attacker to escape"], entries: ["From closed guard — sit up armbar", "From mount — high mount armbar", "From back control — rolling armbar", "Transition off triangle choke"], related: [69, 73, 73], vid: null, ai: "The armbar is the most universal submission in grappling — it appears from every position. Learning just three entries (guard, mount, back) gives you a complete armbar game that links your entire top and bottom game together."
  },
  {
    id: 102, name: "Americana", sport: "bjj", cat: "Armlocks", diff: 1,
    desc: "Bent arm shoulder lock from top. The first submission most BJJ players learn.",
    long: "The Americana — ude-garami applied from top position — rotates the shoulder into internal rotation by pushing the wrist to the mat in a figure-four grip. It is most commonly applied from mount or side control when the opponent posts their arm. It requires minimal flexibility or athleticism, making it reliable for grapplers of all body types.",
    setup: "Pin the opponent's wrist to the mat. Thread your other arm under their elbow. Grip your own wrist in a figure-four. Drive the wrist toward the mat while lifting the elbow.", key: "The elbow must stay below the shoulder — if the elbow rises the lock loses pressure. Pin the wrist first, then lift the elbow.", counters: ["Don't post the arm — keep elbows in tight", "Roll toward the lock", "Grip your own belt or lapel to defend"], entries: ["From mount when opponent posts an arm", "From side control on the near arm", "Off a failed armbar when they bend the arm"], related: [70, 95, 105], vid: null, ai: "The Americana teaches the most fundamental principle of submissions — create the angle first, then apply the pressure. Forcing the lock without the angle just gives the opponent a chance to defend."
  },

  // ─── BJJ: LEG LOCKS ─────────────────────────────────────────────────────────
  {
    id: 103, name: "Calf slicer", sport: "bjj", cat: "Leg locks", diff: 3,
    desc: "Compression lock through the calf muscle. Legal from purple belt in gi.",
    long: "The calf slicer is a compression lock that traps the opponent's calf across the shin or knee, creating intense pressure on the muscle and the knee. It is commonly found in leg entanglement positions and the truck position. In gi competitions it is legal from purple belt and above. It is often used as a sweep-to-submission combination in modern leg lock systems.",
    setup: "Thread your shin across the back of their knee into the calf. Control their ankle. Extend your hips and compress the calf against your shin.", key: "The shin must wedge into the crook of the knee, not across the calf — the mechanical pressure point is the back of the knee.", counters: ["Straighten the leg immediately", "Roll toward the attacker to reduce pressure", "Leg drag to escape the entanglement"], entries: ["From body triangle on the back", "Inside the truck position", "Off a failed heel hook when they roll"], related: [81, 82, 83], vid: null, ai: "The calf slicer rewards positional understanding more than strength — it only appears when you know leg entanglement systems. Think of it as a positional bonus available to players with a complete leg lock game."
  },

  // ─── BJJ: ESCAPES ───────────────────────────────────────────────────────────
  {
    id: 104, name: "Guard recovery", sport: "bjj", cat: "Escapes", diff: 2,
    desc: "Re-establishing guard as it is being passed. The most important defensive skill in BJJ.",
    long: "Guard recovery is the art of preventing the guard pass rather than escaping after it is complete. It uses frames, hip escapes, and knee shields at the moment the pass is attempted to re-insert a leg and rebuild guard. Good guard recovery makes every guard position more effective because the opponent cannot commit to passing without risk.",
    setup: "When the pass begins: frame on the hip or bicep. Create space with a hip escape away. Insert the inside knee. Re-establish the guard before they settle.", key: "Guard recovery happens during the pass, not after. Once side control is established the difficulty increases dramatically.", counters: ["Flatten the guard player before passing", "Crossface to prevent hip escape", "Circle the knee out of the way"], entries: ["When closed guard is broken", "As the knee slice begins", "When torreando pressure is applied"], related: [85, 98, 99], vid: null, ai: "The best guard recovery is invisible — the pass never completes. Training guard retention as a first priority rather than escaping after the fact will improve every guard you play."
  },

  // ─── BJJ: POSITIONS ─────────────────────────────────────────────────────────
  {
    id: 105, name: "Mount", sport: "bjj", cat: "Positions", diff: 2,
    desc: "Sitting astride the opponent's chest. The highest dominant position in BJJ.",
    long: "The mount is the most dominant ground position — the top player sits astride the opponent's torso, rendering their legs useless for defense. From high mount, armbars and chokes are immediately available. From low mount, the position is maintained while working to advance. Mount scores 4 points in IBJJF competition, and time spent in mount correlates strongly with competitive success.",
    setup: "Sit astride the opponent's chest, knees pinched to their sides. Control their arms. Work to advance toward high mount by walking your knees up toward their armpits.", key: "Posture is everything in mount — stay upright and balanced so that when they bridge you do not fall off. Drop your weight at the moment of their bridge.", counters: ["Bridge and roll escape", "Elbow-knee escape", "Trap the arm and roll"], entries: ["After a successful guard pass", "After a takedown landing in top position", "Transition from side control"], related: [84, 85, 101], vid: null, ai: "Mount is not just a scoring position — it is a submission platform. The player who can maintain mount under pressure and threaten submissions simultaneously will always have the advantage on the mat and on the scoreboard."
  },
  {
    id: 106, name: "Back control", sport: "bjj", cat: "Positions", diff: 3,
    desc: "Behind the opponent with hooks inserted. The dominant finishing position in BJJ.",
    long: "Back control is the highest-value position in BJJ — it scores 4 points and from it the rear naked choke is available while the opponent has no equivalent attack. Hooks are inserted inside the opponent's thighs to prevent them from turning. A seatbelt grip is maintained over one shoulder and under the other arm. Taking the back is the goal of many BJJ combinations and strategies.",
    setup: "Insert both hooks inside opponent's thighs. Establish seatbelt grip: one arm over the shoulder, one arm under the armpit, clasp hands at the chest. Stay chest-to-back.", key: "Never give up both hooks — if you lose one hook the opponent can turn in. Maintain the body triangle or hooks at all times.", counters: ["Roll to the mat and trap a hook", "Turn in toward the choking arm", "Grip and peel the seatbelt arm"], entries: ["Off a failed guard pass where opponent turtles", "After a throw landing behind the opponent", "When opponent turns away from bottom side control"], related: [74, 91, 105], vid: null, ai: "Back control is the endgame of BJJ. Every guard, every sweep, every scramble is a path to the back. When you understand this, your entire game gets a direction — and direction is what separates advanced from intermediate players."
  },
  {
    id: 107, name: "Side control", sport: "bjj", cat: "Positions", diff: 2,
    desc: "Perpendicular chest-to-chest control. The most common dominant position in BJJ.",
    long: "Side control is the foundation of top game BJJ. The attacker lies perpendicular to the opponent — chest-to-chest — controlling the near arm and the head simultaneously. From side control the top player can attack with armlocks, chokes, and the arm triangle while transitioning to mount or north-south. It scores 3 points in IBJJF competition.",
    setup: "Lie perpendicular to the opponent. Near arm under their neck, far arm blocking their hip or through their armpit. Press your chest onto theirs. Keep your hips low.", key: "Control the near arm — a free near arm allows frames that lead to hip escape and guard recovery. Pin it by trapping it with your knee or between your chest and their shoulder.", counters: ["Hip escape to create space", "Knee-elbow escape to recover guard", "Underhook and come to your knees"], entries: ["After a guard pass", "After a throw or takedown", "Transition from failed mount or back control"], related: [87, 100, 105], vid: null, ai: "Side control is where most ground fights live. The top player who can transition fluidly from side control to mount and back — threatening submissions throughout — will dominate any opponent who is only trained to survive the position."
  }
]

export const categories = ['All', 'Throws', 'Guards', 'Chokes', 'Armlocks', 'Leg locks', 'Pins', 'Escapes']