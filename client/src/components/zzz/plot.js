export var plott = {
  1: {
    type: "story",
    text: "According to a legend, there was an island somewhere in the sea.",
    goto: 2,
  },
  2: {
    type: "story",
    text: "In order to freeze their beauty forever, the women on the island would be turned into stone statues at the most beautiful moments of their lives.",
    goto: 3,
  },
  3: {
    type: "story",
    text: "Perhaps the island had its own name, but in the legend it was called “Stone Island”.",
    goto: 4,
  },
  4: {
    type: "story",
    text: "The younger brother’s laughter stopped the older sister’s thinking: “I didn’t expect you to still believe in these boring legends.”",
    goto: "5",
  },
  5: {
    type: "story",
    text: "Sister was used to people’s ridicule, and in the past few years of investigating Stone Island, everyone has such an attitude. ",
    goto: 6,
  },
  6: {
    type: "story",
    text: "Although they often talked about the island, no one really believed that it exists.",
    goto: 7,
  },
  7: {
    type: "story",
    text: "Sister put out a map: “I have found the approximate location of Stone Island.”",
    goto: 8,
  },
  8: {
    type: "story",
    text: "“But that’s just a legend.”",
    goto: 9,
  },
  9: {
    type: "story",
    text: "Brother’s laughter was about to intensify, Sister shook the ship key in her hand and choked it off. ",
    goto: 10,
  },
  10: {
    type: "story",
    text: "“Mum and Dad had agreed to let me sail.”",
    goto: 11,
  },
  11: {
    type: "story",
    text: "The younger brother felt unbelievable, and the elder sister was very proud. ",
    goto: 12,
  },
  12: {
    type: "story",
    text: "“I’m about to go out to sea to find Stone Island.”",
    goto: 13,
  },
  13: {
    type: "option",
    text: "[A]I don’t believe Mum and Dad would agree!\n[B]You may need an assistant",
    options: [
      ["A", "I dont’t believe Mum and Dad would agree!"],
      ["B", "You may need an assistant"],
    ],
    goto: [14, 13.05],
  },
  14: {
    type: "story",
    text: "You were still muttering this sentence until dinner.",
    goto: 15,
  },
  13.05: {
    type: "question",
    goto: 13.1,
  },
  13.1: {
    type: "story",
    text: "You did not want to find the Stone Island, but you are eager to sail. You changed your attitude immediately and beg your sister to take you with her.",
    goto: 13.2,
  },
  13.2: {
    type: "story",
    text: "My sister finally got hold of you, and her revenge ensued. She pretended to be thinking about it, but after you finished your good words, she said... Depending on your performance!",
    goto: 13.3,
  },
  13.3: {
    type: "story",
    text: "You took back all the good words you’ve said before. You list the possible dangers in front of your parents.",
    goto: 15,
  },
  15: {
    type: "story",
    text: "“It’s alright, you can go. Although we are also worried, if this is what she wants to do, and there is no need for us to stop it. Moreover, I believe that she has the ability to handle the emergencies, maybe she can find Stone Island.”",
    goto: 16,
  },
  16: {
    type: "story",
    text: "Your parents were drinking tea and looked at you and your sister with a calm expression.",
    goto: 17,
  },
  17: {
    type: "story",
    text: "Although you don’t want to say it, you really can’t question your sister’s abilities. But you still have doubts, where did your sister’s ship come from? Although you live by the sea, your father does a handicraft business.",
    goto: 18,
  },
  18: {
    type: "story",
    text: "Your parents said, “Actually we have a boat, but we haven’t used it for decades.”",
    goto: 19,
  },
  19: {
    type: "story",
    text: "Until today did you know, this hulk, covered with dirt and sand, “camouflaged” as part of the beach, that you had ignored since childhood, is the ship of the family. ",
    goto: 20,
  },
  20: {
    type: "story",
    text: "After some tinkering, the old ship was launched again after a lapse of decades.",
    goto: 20.5,
  },
  20.5: {
    type: "question",
    goto: 21,
  },
  21: {
    type: "story",
    text: "Your sister is on the boat, you and your parents are on the shore.",
    goto: 22,
  },
  22: {
    type: "story",
    text: "Sister shouted at you, “Would you like to be my assistant?”",
    goto: 23,
  },
  23: {
    type: "option",
    text: "[A]Yes  [B]No",
    options: [
      ["A", "Yes"],
      ["B", "No"],
    ],
    goto: [23.9, 23.1],
  },
  23.1: {
    type: "story",
    text: "As you found that your sister is serious about it, you felt that you should not go with the mess.",
    goto: 23.2,
  },
  23.2: {
    type: "story",
    text: "After Sister left, your family’s life continued as usual.",
    goto: 23.3,
  },
  23.3: {
    type: "story",
    text: "Eating, working, fishing, attending father’s completion ceremony…",
    goto: 23.4,
  },
  23.4: {
    type: "story",
    text: "Everything was as usual, but you found that everyone in the family missed your sister.",
    goto: 23.5,
  },
  23.5: {
    type: "story",
    text: "End 1: Happy end.",
    goto: "0",
    end: "happy",
  },
  23.9: {
    type: "question",
    goto: 24,
  },
  24: {
    type: "story",
    text: "You accepted the invitation without any hesitation.",
    goto: 25,
  },
  25: {
    type: "story",
    text: "Within a month, you witnessed two miracles. One of it being the reparation of the hulk…",
    goto: 26,
  },
  26: {
    type: "story",
    text: "Another was that, you discovered the Stone Island after a storm caused the course to deviate.",
    goto: 27,
  },
  27: {
    type: "story",
    text: "After the storm, you could only see the two types of blue -- the sky and the ocean in front of you. At the horizon, there was a black spot that made you feel unbelievable.",
    goto: 28,
  },
  28: {
    type: "story",
    text: "After observing with a telescope, Sister announced excitedly: “We found Stone Island!”",
    goto: 29,
  },
  29: {
    type: "story",
    text: "In the telescope, you saw a row of stone statues on the beach.",
    goto: 30,
  },
  30: {
    type: "story",
    text: "After landing on the island, you were shocked and speechless.",
    goto: 31,
  },
  31: {
    type: "story",
    text: "At this moment, even if you didn’t want to believe it, you had to admit that this is the Stone Island in the legend.",
    goto: 32,
  },
  32: {
    type: "story",
    text: "As described in the legend, these statues were all too real.",
    goto: 33,
  },
  33: {
    type: "story",
    text: "What you can see on this stone statue was not only the beauty, but also the fear before the woman turned into the stone statue. At the last moment, all the subtle emotions that belong to humans were frozen into the statue.",
    goto: 34,
  },
  34: {
    type: "story",
    text: "You were sure that even the most skilled sculptor couldn’t restore these kind of expressions. This was something that belonged and only belonged to humans. There was no doubt that these statues were once living people.",
    goto: 35,
  },
  35: {
    type: "story",
    text: "Following the road further into the Stone Island, you saw more stone statues. They stood in all kinds of beautiful poses, but all the stone statues had expressions of fear or reluctance on their faces.",
    goto: 36,
  },
  36: {
    type: "story",
    text: "Sister looked at all of these, and she said to herself: “These women turned into statues to froze their beauty forever, but are these statues really beautiful?”",
    goto: 37,
  },
  37: {
    type: "option",
    text: "[A]Yes, they are beauituful\n[B]No, they are not",
    options: [
      ["A", "they are beauituful"],
      ["B", "No, they are noto"],
    ],
    goto: [38.1, 37.1],
  },
  37.1: {
    type: "story",
    text: "You shook your head: “I only saw the fear and reluctance before they turned into stone statues.",
    goto: 39,
  },
  38.1: {
    type: "story",
    text: "You nodded: “There is no doubt that they are beautiful, they are the most lifelike statues I have ever seen.",
    goto: 38.2,
  },
  38.2: {
    type: "story",
    text: "However as humans, we not only look, we also think. What these stone statues convey to us cannot be described as beauty by any means.",
    goto: 39,
  },
  39: {
    type: "story",
    text: "They stayed at the most beautify moments of their lives, but what they left are not beauty.”",
    goto: 40,
  },
  40: {
    type: "story",
    text: "Sister asked you: “When do you think a person is most beautiful?”",
    goto: 41,
  },
  41: {
    type: "option",
    text: "[A]When he is in love  [B]When he has achievements ",
    options: [
      ["A", "When he is in love"],
      ["B", "When he has achievements"],
    ],
    goto: [42.1, 43.1],
  },
  42.1: {
    type: "story",
    text: "You thought for a while, then tentatively answered: “When he is in love?”",
    goto: 44,
  },
  43.1: {
    type: "story",
    text: "You thought for a while, then tentatively answered: “When he has achievements?”",
    goto: 44,
  },
  44: {
    type: "story",
    text: "“Whether one is in love or has achievement, the most beautiful time must be when they are most satisfied and confident with themselves. Who would end their lives without lingering at this time?”",
    goto: 45,
  },
  45: {
    type: "story",
    text: "Sister looked around at the delicate faces on the statues...",
    goto: 46,
  },
  46: {
    type: "story",
    text: "“Therefore, the stone island is destined to not have beautiful stone statues.”",
    goto: 47,
  },
  47: {
    type: "story",
    text: "With emotions and sympathy towards the statues, you walked around the beach and glanced through all of the statues.",
    goto: 48,
  },
  48: {
    type: "story",
    text: "At the corner of the beach, Sister’s inferences were quickly broken. This was because you saw a statue that was truely beautiful. You saw no fear or reluctance on it, only pure beauty.",
    goto: 49,
  },
  49: {
    type: "story",
    text: "“This is the most beautiful statue on the island.” At some point, without you and your sister realising, an old women appeared behind you.",
    goto: 50,
  },
  50: {
    type: "story",
    text: "After some introduction from her, you learned that there are still many residents on the island...",
    goto: 51,
  },
  51: {
    type: "story",
    text: "The old women was the eldest of them all. She never thought herself as beautiful, therefore she lived until now.",
    goto: 52,
  },
  52: {
    type: "option",
    text: "[A]We should go  [B]Ask tentatively",
    options: [
      ["A", "We should go"],
      ["B", "Ask tentatively"],
    ],
    goto: [53.1, 54.1],
  },
  53.1: {
    type: "story",
    text: "You whispered to your sister: “It’s better for us to go first, be careful not to be turned into a stone statue!” You are waiting for the opportunity, but the old lady has seen through your mind.",
    goto: 53.2,
  },
  53.2: {
    type: "story",
    text: "“No one can turn you into stone statues unless you want to.”",
    goto: 55,
  },
  54.1: {
    type: "story",
    text: "You asked: “Are there anyone else nearby?”",
    goto: 54.2,
  },
  54.2: {
    type: "story",
    text: "The old woman shook her head.",
    goto: 54.3,
  },
  54.3: {
    type: "story",
    text: "You asked again: “Do you all have the abilities to turn others into stone statues?”",
    goto: 54.4,
  },
  54.4: {
    type: "story",
    text: "Your intention seem a bit too obvious. The old woman said directly: ",
    goto: 54.5,
  },
  54.5: {
    type: "story",
    text: "“No one can turn you into stone statues unless you want to.” She looked around: “Everyone here has voluntarily turned into statues.”",
    goto: 55,
  },
  55: {
    type: "story",
    text: "Sister said: “It is said to be voluntary, but it’s more of an invisible pressure by secular traditions.”",
    goto: 56,
  },
  56: {
    type: "story",
    text: "The old woman said: “Indeed. I lived here since childhood, I understood this pressure in here better than you. I just want to tell you, no one would hurt you here. Very few people usually come here, so you don’t have to rush to escape.”",
    goto: 57,
  },
  57: {
    type: "story",
    text: "The old woman stoked the statue gently: “I can tell you about the stories of the most beautiful statue.”",
    goto: 58,
  },
  58: {
    type: "story",
    text: "Seeing that you were still hesitating, she added: “You are lucky to meet me, I am the only person on the island who has seen the process of one turning into a statue.’",
    goto: 59,
  },
  59: {
    type: "story",
    text: "Hearing this sentence, your interests were immediately raised.",
    goto: 60,
  },
  60: {
    type: "story",
    text: "#####\nThe girl sat on the edge of the cliff and looked towards the sea. ",
    goto: 61,
  },
  61: {
    type: "story",
    text: "The boy called her name anxiously and came over. After seeing the girl, he finally felt relieved. The two sat on the edge of a cliff together. The setting sun shone on the island, on the girl. The boy took out the paper and pen to describe the girl’s appearance at the moment.",
    goto: 62,
  },
  62: {
    type: "story",
    text: "The girl found out what the boy was doing. She asked the boy: “Do you think I’m beautiful?”",
    goto: 63,
  },
  63: {
    type: "option",
    text: "[A]“Yes”\n[B]Remain in silence",
    options: [
      ["A", "“Yes”"],
      ["B", "Remain in silence"],
    ],
    goto: [64.1, 65.1],
  },
  64.1: {
    type: "story",
    text: "The boy stopped writing and nodded earnestly.",
    goto: 64.2,
  },
  64.2: {
    type: "story",
    text: "But the girl was not happy because of the compliments, she lowered her head, her bright face was covered with sadness...",
    goto: 64.3,
  },
  64.3: {
    type: "option",
    text: "[A]“You are very beautiful.”  [B]“You will be beautiful at any stage of your life.”",
    options: [
      ["A", "“You are very beautiful.”"],
      ["B", "“You are be beautiful at any stage of your life.”"],
    ],
    goto: [64.41, 64.51],
  },
  64.41: {
    type: "story",
    text: "The boy continued to compliment the girl: “You are very beautiful!”",
    goto: 64.42,
  },
  64.42: {
    type: "story",
    text: "The girl’s voice is lifeless: “You’re right, I’m beautiful right now.”",
    goto: 64.43,
  },
  64.43: {
    type: "story",
    text: "She left after finishing the sentence.",
    goto: 64.44,
  },
  64.44: {
    type: "story",
    text: "A few days after, there were one more statue on the island. Like other statues, the face of the statue was covered with fear and reluctance.",
    goto: 64.45,
  },
  64.45: {
    type: "story",
    text: "End 2: Bad End",
    goto: "0",
  },
  64.51: {
    type: "story",
    text: "Complimenting a person’s beauty on Shidao often has another meaning.",
    goto: 64.52,
  },
  64.52: {
    type: "story",
    text: "But the two loved each other. There was no doubt that in the eyes of the boy, the girl was the most beautiful, and he could not lie. “There is no need at all to stay at a particular moment. You are beautiful at anyu stage of your life.”",
    goto: 64.53,
  },
  64.53: {
    type: "story",
    text: "The girl hugged the boy. She understood the boy, and she would like to see her future self.",
    goto: 66,
  },
  65.1: {
    type: "story",
    text: "The boy stopped sketching. He neither said a word, nor dared to look at the girl.",
    goto: 65.2,
  },
  65.2: {
    type: "story",
    text: "The two loved each other. There was no doubt that in the eyes of the boy, the girl was the most beautiful…",
    goto: 65.3,
  },
  65.3: {
    type: "story",
    text: "But such compliments cannot be said on the Stone Island.",
    goto: 65.4,
  },
  65.4: {
    type: "story",
    text: "The girl suddenly hugged the boy, and she understood the boy from the silence.",
    goto: 65.5,
  },
  65.5: {
    type: "story",
    text: "She did not want to leave the boy and turn into a cold statue, but she sensed that the day was getting closer. ",
    goto: 66,
  },
  66: {
    type: "story",
    text: "“As long as you choose not to, you can always...”",
    goto: 67,
  },
  67: {
    type: "story",
    text: "The girl hurriedly interrupted the boy’s words. She looked around for no one before blaming the boy: ",
    goto: 68,
  },
  68: {
    type: "story",
    text: "“You should not talk nonsense like that.”",
    goto: 69,
  },
  69: {
    type: "story",
    text: "The boy sighed.",
    goto: 70,
  },
  70: {
    type: "story",
    text: "In the evening a few days later, the two were preparing dinner, but there were people talking outside the house. More than a dozen villagers are gathering at the neighbor’s door, waiting to see what’s going on.",
    goto: 71,
  },
  71: {
    type: "story",
    text: "The boy heard voices from the neighbor’s house, and a girl was yelling: “I don’t want to be turned into a statue!”",
    goto: 72,
  },
  72: {
    type: "story",
    text: "The crowd part a way in between them, a person walked through it, and he walked into the house.",
    goto: 73,
  },
  73: {
    type: "story",
    text: "A few minutes later, the neighbor came out. She lowered her head and was very depressed, but she was now willing to be turned into a statue.",
    goto: 74,
  },
  74: {
    type: "story",
    text: "The boy knew that this was because of the persuasion of the previous person. There was always a person on the island who specialized in doing this...",
    goto: 75,
  },
  75: {
    type: "story",
    text: "But in principle, everyone is voluntarily turned into a stone statue, so people do not recognize this position. They called the person “the villager”.",
    goto: 76,
  },
  76: {
    type: "story",
    text: "The neighbor changed into a beautiful costume, which she turned into a stone statue. She left the watching crowd, looked back one last time, and walked to the deep mountain alone...",
    goto: 77,
  },
  77: {
    type: "option",
    text: "[A]Follow her  [B]Watch her",
    options: [
      ["A", "Follow her"],
      ["B", "Watch her"],
    ],
    goto: [77.1, 78.1],
  },
  77.1: {
    type: "story",
    text: "The boy wanted to follow up and say something comforting to the neighbor. But someone stopped him: “Did you forget the rules? You shouldn’t watch others turning into statues!”",
    goto: 79,
  },
  78.1: {
    type: "story",
    text: "Someone should comfort the villager now, but the boy cannot do anything. There was a rule on the Stone Island: One shouldn’t watch others turning into statues.",
    goto: 79,
  },
  79: {
    type: "story",
    text: "It wasn’t until the next day that the boy finally saw the neighbor again. After all, she couldn’t leave peacefully. She couldn’t hide the reluctance on her stone face.",
    goto: 80,
  },
  80: {
    type: "story",
    text: "Most people took one look and left. This kind of thing happened every day, as long as it had nothing to do with oneself, no one would waste a little emotion for it.",
    goto: 81,
  },
  81: {
    type: "story",
    text: "Only the boy and the girl were still here. The girl looked at the face reluctant to leave. She seemed to see herself in the near future...",
    goto: 82,
  },
  82: {
    type: "story",
    text: "“She lost both her life and her beauty. What’s the point of this ending?”",
    goto: 83,
  },
  83: {
    type: "option",
    text: "[A]“…”\n[B]“It is meaningless”",
    options: [
      ["A", "“…”"],
      ["B", "“It is meaningless”"],
    ],
    goto: [84, 84],
  },
  84: {
    type: "story",
    text: "The boy couldn’t answer, he could only quietly stay by the girl’s side.",
    goto: 85,
  },
  85: {
    type: "story",
    text: "A voice came from behind. It was “the villager”.",
    goto: 86,
  },
  86: {
    type: "story",
    text: "“You should almost turn into statue soon. Look at that statue behind you, she was younger than you.”",
    goto: 87,
  },
  87: {
    type: "story",
    text: "The boy clenched his fists. The girl ignored the villagers and dragged the boy away.",
    goto: 88,
  },
  88: {
    type: "story",
    text: "The two were walking on the road. The boy was still indignant: “When to turn into a statue is all up to you.”",
    goto: 89,
  },
  89: {
    type: "story",
    text: "“But what he said was true. Other villagers did not say anything, but I believe they all think so.”",
    goto: 90,
  },
  90: {
    type: "story",
    text: "They looked around. People’s eyes were squinting this way, intentionally or unintentionally.",
    goto: 91,
  },
  91: {
    type: "story",
    text: "The girl sat on the edge of the cliff and was writing something, while the boy painted the girl on a canvas with a brush. The girl seemed to finish writing a paragraph. She stopped and looked at the boy’s drawing. The boy asked what the girl was writing.",
    goto: 92,
  },
  92: {
    type: "story",
    text: "The girl said: “I want to leave something, your paintings, and the wonderful things that have happened in the past that I was writing about. These are all proofs of my existence.”",
    goto: 93,
  },
  93: {
    type: "story",
    text: "She looked at the boy seriously: “Do not dare to come to my statue in the future. I am sure that, like everyone else, my face will be full of fear and reluctance. It will be ugly.”",
    goto: 94,
  },
  94: {
    type: "story",
    text: "“We don’t need to turn into statues. No matter what others say, we don’t need to. I know one person who is like this. She is even elder than you, but she hasn’t turn into a statue yet.”",
    goto: 95,
  },
  95: {
    type: "story",
    text: "“I don’t think I can stand that kind of pressure. I’m neither strong enough nor religious enough, I have no choice on this island.”",
    goto: 96,
  },
  96: {
    type: "story",
    text: "The boy suddenly looked towards the ocean: “There must be other land beyond the Stone Island. I have seen a few ships sailing by that I cannot recognize…”",
    goto: 97,
  },
  97: {
    type: "story",
    text: "The boy’s words made the girl a little panicked: “Talking about things off-island is a taboo, have you forgotten the one who was thrown into the sea. This is to be heard by others...”",
    goto: 98,
  },
  98: {
    type: "story",
    text: "At this moment, the sound of branches breaking suddenly came from behind, and there were footsteps running away.",
    goto: 99,
  },
  99: {
    type: "option",
    text: "[A]Follow the sound\n[B]Perhaps he didn’t hear it",
    options: [
      ["A", "Follow the sound"],
      ["B", "Perhaps he didn’t hear it"],
    ],
    goto: [99.1, 100],
  },
  99.1: {
    type: "story",
    text: "The boy chased after the sound, but saw only a dark shadow and could not find anyone.",
    goto: 100,
  },
  100: {
    type: "story",
    text: "They can only hope that the person didn’t hear those words. They have no other choice.",
    goto: 101,
  },
  101: {
    type: "story",
    text: "The two returned to the village with uneasiness. Villegers around them didn’t say anything. Time passed peacefully for a few days, and they knew how fragile that peace was.",
    goto: 102,
  },
  102: {
    type: "story",
    text: "The girl asked: “Are there really other lands beyond this island?”",
    goto: 103,
  },
  103: {
    type: "story",
    text: "“I believe so. The ships I saw that do not belong here, there must be somewhere for them to dock.”",
    goto: 104,
  },
  104: {
    type: "story",
    text: "The girl seemed to have some aspirations: “Do they turn into statues at the most beautiful moments of their lives, just like us?”",
    goto: 105,
  },
  105: {
    type: "story",
    text: "“They don’t.”",
    goto: 106,
  },
  106: {
    type: "story",
    text: "“Why?”",
    goto: 107,
  },
  107: {
    type: "story",
    text: "“When you ask the question, you are expecting a negative answer.”",
    goto: 108,
  },
  108: {
    type: "story",
    text: "There was a knock on the door outside the house. The boy and the girl were a little panicked.",
    goto: 109,
  },
  109: {
    type: "option",
    text: "[A]“Who is it?”\n[B]pretend not to be in the house",
    options: [
      ["A", "“Who is it?”"],
      ["B", "pretend not to be in the house"],
    ],
    goto: [110.1, 111.1],
  },
  110.1: {
    type: "story",
    text: "The boy asked the people who came. He learned that they were residents of the village. They spoke softly, and the boy opened the door.",
    goto: 112,
  },
  111.1: {
    type: "story",
    text: "They stopped the conversation, and pretended that no one is in the house.",
    goto: 111.2,
  },
  111.2: {
    type: "story",
    text: "There were women chatting and frolic outside the house, and after a while, a female voice shouted: “There is something important, open the door quickly.” Looking out of the house from other windows, the boy didn’t see anyone hiding other than the women.",
    goto: 111.3,
  },
  111.3: {
    type: "option",
    text: "[A]Open the door  [B]Flee",
    options: [
      ["A", "Open the door"],
      ["B", "Flee"],
    ],
    goto: [111.41, 111.51],
  },
  111.41: {
    type: "story",
    text: "The boy opened the door and found that the women were all villagers living on the island.",
    goto: 112,
  },
  111.51: {
    type: "story",
    text: "“The villager” was sitting in the house. Someone came in and report the disappearance of the boy and the girl…",
    goto: 111.52,
  },
  111.52: {
    type: "story",
    text: "“The villager” said: “They did not disappear. They fled.”",
    goto: 111.53,
  },
  111.53: {
    type: "story",
    text: "“But they do not have ships, where can they hide except for on the island?”",
    goto: 111.54,
  },
  111.54: {
    type: "story",
    text: "Just as the villagers said, the two was in desperation after leaving the village. They had nowhere to go, they could only hid in places that were less populated and more remote…",
    goto: 111.55,
  },
  111.55: {
    type: "story",
    text: "After two weeks, a villager reported: “We found them.”",
    goto: 111.56,
  },
  111.56: {
    type: "story",
    text: "“The villager” was about to cheer, until he realise the villager had not finish his words.",
    goto: 111.57,
  },
  111.57: {
    type: "story",
    text: "“But, both of them turned into statues.”",
    goto: 111.58,
  },
  111.58: {
    type: "story",
    text: "End 3: Happy ending / Bad ending",
    goto: "0",
    end: "happy",
  },
  112: {
    type: "story",
    text: "As soon as they entered the door, they began to measure the girl with a ruler. They boy asked what they were doing, the villagers said: “We are preparing the clothes for the girl to wear when she turn into a statue.”",
    goto: 113,
  },
  113: {
    type: "story",
    text: "“It will be soon or later anyways, why not just prepare in advance?”",
    goto: 114,
  },
  114: {
    type: "story",
    text: "The girl wanted to kick them out, but seeing the calmness and acceptance on the boy’s face, the anger in her was suddenly cut off.",
    goto: 115,
  },
  115: {
    type: "story",
    text: "The girl suddenly ran out of the house. She did not come back until the evening.",
    goto: 116,
  },
  116: {
    type: "story",
    text: "The boy found her by the cliff.",
    goto: 117,
  },
  117: {
    type: "story",
    text: "“I thought about it for a long time, and I still don’t want to be turned into a stone statue!”",
    goto: 118,
  },
  118: {
    type: "story",
    text: "As if determined, the girl looked down the cliff.",
    goto: 119,
  },
  119: {
    type: "story",
    text: "“If you really love me, let’s jump off the cliff together!”",
    goto: 120,
  },
  120: {
    type: "option",
    text: "[A]“…”  [B]“No, I can’t jump”",
    options: [
      ["A", "“…”"],
      ["B", "“No, I can’t jump"],
    ],
    goto: [121.1, 122],
  },
  121.1: {
    type: "story",
    text: "“It is not time to stay in silence!”",
    goto: 122,
  },

  122: {
    type: "story",
    text: "“No, I can’t jump.”",
    goto: 123,
  },
  123: {
    type: "story",
    text: "As the boy walked off the cliff, “the villager” passed by him.",
    goto: 124,
  },
  124: {
    type: "story",
    text: "“I thought I could see some tragic scene, but in the end you were still afraid of death.”",
    goto: 125,
  },
  125: {
    type: "story",
    text: "The girl watched the boy leave, and then watched the villagers come up.",
    goto: 126,
  },
  126: {
    type: "story",
    text: "“The villager” said: “Trust me, everyone had this moment of struggle, but all of them ended up voluntarily turning into statues.",
    goto: 127,
  },
  127: {
    type: "story",
    text: "Salmon die after spawning, flocks of birds rest on the island in the fall, and turtles come ashore to lay their eggs every year. We too, turn into stone statues at the most beautiful moment of our lives.”",
    goto: 128,
  },
  128: {
    type: "story",
    text: "“Do you count on these to convince me?”",
    goto: 129,
  },
  129: {
    type: "story",
    text: "“Then let me say one more thing. If you’re going to go against tradition, then I’ll tell everyone what the boy said about the outside world.”",
    goto: 130,
  },
  130: {
    type: "story",
    text: ".",
    goto: 131,
  },
  131: {
    type: "story",
    text: ".",
    goto: 132,
  },
  132: {
    type: "story",
    text: ".",
    goto: 133,
  },
  133: {
    type: "story",
    text: "“I will promise you, please forgive him and don’t say those words to anyone again.”",
    goto: 134,
  },
  134: {
    type: "story",
    text: "####\n“That’s the story, and she finally gave in. That was when I watched the girl dressed in gorgeous clothes and walked into the jungle.”",
    goto: 135,
  },
  135: {
    type: "story",
    text: "You looked at the statue: “She was more rebellious than everyone else, but she had the most beautiful smile when she turned into a stone statue.”",
    goto: 136,
  },
  136: {
    type: "story",
    text: "Sister said: “Perhaps she did not want the boy to be sad when looking at the statue.”",
    goto: 137,
  },
  137: {
    type: "story",
    text: "You thought of something. You looked at the old woman: “You said you have seen the process of someone turning into a statue, is it this time in the story?”",
    goto: 138,
  },
  138: {
    type: "story",
    text: "The old woman nodded.",
    goto: 139,
  },
  139: {
    type: "story",
    text: "“As one’s soul is taken by the fish, its body becomes a stone statue.”",
    goto: 140,
  },
  140: {
    type: "story",
    text: "As the old woman finished her sentence, she saw the look of disbelief on your faces. She said sadly: “People do not believe me, but that was what I saw with my own eyes.",
    goto: 141,
  },
  141: {
    type: "story",
    text: "On the day the girl turned into the statue, I waited for others to go. At night, I secretly followed the path where the girl left.",
    goto: 142,
  },
  142: {
    type: "story",
    text: "On my first sight, I saw this statue.",
    goto: 143,
  },
  143: {
    type: "story",
    text: "and immediately after that,",
    goto: 144,
  },
  144: {
    type: "story",
    text: "I saw the fish carrying her soul away.”",
    goto: 144.1,
  },
  144.1: {
    type: "story",
    text: "The sunset has already fallen. Under the cliff, a fishing boat sailed into the distance. The fishing ship, although much newer than the one at my home, is undoubtedly the same ship. A few faint lights on the ship were tiny flickering dots of light on the vast ocean, vaguely reflecting the two people on board -- the boy and the girl. They looked into the distance away from the island. Their eyes full of longing and hope.",
    goto: 145,
  },
  145: {
    type: "story",
    text: "True End",
    goto: "end",
  },
  end: {
    type: "story",
    text: "Congratulations! You have completed the game!",
    goto: "0",
    end: "true",
  },
};
