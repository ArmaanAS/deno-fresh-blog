import { tw } from "twind";
import { css } from "twind/css";
import { useState } from "preact/hooks";

const intros = [
  "This is a blog, in case that wasn't abundantly clear. Here you'll find me droning on about various inane topics that interest me and me alone, like the latest obscure tech developments, unfathomable internet subcultures, and other pointless piffle. I make no guarantees as to the quality or accuracy of the information contained herein. The posts are written purely for my own amusement. Feel free to waste your time reading them if you have nothing better to do. And by all means leave your comments and criticisms - I'll surely get a good laugh at the inevitable typos, logical errors and lack of proper grammar. Thanks for stumbling upon my little corner of the internet wasteland, and enjoy the sarcastic musings of yet another pointless blogger.",

  "Greetings fellow web wanderers and casual internet browsers! You've happened upon what is sure to be an utterly riveting and thoroughly engrossing blog full of scintillating insights and musings on all things geeky and techno-nerdy. Prepare your eyeballs for posts on the latest in smartphones, drones, cryptocurrencies, and other technological wonders! If coding conundrums or AI algorithm antics are your thing, you're in the right digital domicile friend. Scroll away, laugh out loud, and please do feel free to leave your two cents worth below. Constructive criticism and the random nonsense of your day are both welcome here. I'll do my best to respond to any and all comments in a timely and engaging fashion. Now sit back, relax, and enjoy the ramblings of a mad blogger!",

  "Welcome to my blog. Here you may find articles on various topics that interest me, such as technology, ... and... I hope you enjoy reading my posts. Don't feel free to leave your comments and feedback but thanks for visiting!",

  "Wazzup peeps 😎🙌Welcome to my totally awesomesauce blogify📱📱😝Here I dish out the deets on the coolz👍👍stuff that interests me like🤷‍♂️ technozlogical innovations🤖💻 drones 🛩spy gear🕵️‍♂️, and wacky internet memez🤣🤣🤣. Not🙅‍♀️promising❌ the content is 🔥fire 🔥but feel free to read💻 and plz plz leave your thoughts👇👇👇 I love hearing from my adoring🙇‍♀️fans😘😊😘And of course 💯percent positive vibes😁😊😊only!! No 🙅‍♀️haters🤬 allowed on my excellent🤩 bloggity blog blog !😆😆 Enjoi the random🤪 ramblings of your friendly neighborhood 👻blogger👻",

  "Greetings, fellow internet traveler, and welcome to my digital lair! Within the confines of this blog, you'll find a collection of ramblings and musings on topics that pique my curiosity - from the latest and greatest in technology to the bizarre and bewildering world of cryptids. Whether you're here for the laughs, the insights, or just to kill some time before your next Zoom meeting, I hope you'll find something to tickle your fancy. So, sit back, relax, and prepare to have your mind blown (or at least mildly amused). And don't forget to leave your comments and feedback - I promise I won't cry (too much). Thanks for dropping by, you magnificent creature, you!",

  "Greetings to thee, gentle reader. Welcome to these humble pages wherein I set forth in ink my musings upon various topics of interest. Here you shall find essays upon the latest scientific discoveries and mechanical contrivances, queer fads and fashions born of modernity, and other such curios brought forth by this new age of progress. I make no claims as to the lucidity of thought or elegance of phrase within these writings, produced as they are for my own amusement during idle hours. Peruse them at your leisure and be so kind as to leave any comments or criticisms you deem fit in the book of notes provided . I shall endeavour to respond in a timely and courteous fashion. And so I bid you sit back in your chair, fill the pipe if it so please you, and enjoy for a time the diverting reflections of an author in want of a worthy subject.",

  `Dear reader, it is with great pleasure that I extend to you a warm welcome to this humble abode of mine. Within these digital pages, you shall discover a myriad of topics that have piqued my interest. From the latest technological advancements to the most curious creatures that roam this earth, my pen shall endeavor to bring forth an array of musings for your reading pleasure.

  As you traverse through the lines of my prose, I hope you shall find yourself immersed in a world of adventure, wonder, and intrigue. So, do not hesitate to make yourself comfortable, and let us embark on a journey together that shall leave us both enriched and enlightened.
  
  But do not forget, dear reader, that your opinions matter to me greatly. I implore you to share your thoughts and critiques with me, for it is through the constructive feedback of our fellow man that we may grow and evolve.
  
  In closing, I extend my sincerest gratitude to you for taking the time to peruse my humble writings. It is my hope that you shall find my words to be a source of entertainment and knowledge, and that you shall return again to indulge in the fruits of my labor.`,

  "Greetings to whoever finds these scribbled words! My name is lost to the sea now, as is my home and the place I wrote this message. I pray it reaches kind hands and curious eyes. I write to leave a record of my passing thoughts and findings as I drift, carried by waves and wind. Here you shall read tales of strange wonders seen from my driftwood perch - the marvels of nature still new to my eyes, people met briefly then lost again to the currents, and other small joys and sorrows of a life at sea. Whether I survive to write more, I cannot say. But if these words remain, know they were set down in hope - hope that someone, somewhere might find amusement or wisdom in the random musings of a castaway on the ocean of life. So I leave you now, but may we meet again in dreams, on some far shore beyond this watery waste. Until then, fair readings and following winds.",

  `Dear finder,

  I don't know who you are or where you'll find this message, but I hope it reaches you well. I am writing this message in a bottle, tossing it out to sea, and trusting the currents to take it wherever it may go.
  
  Within these words, you will find the musings of a wayward soul, adrift in a vast ocean of uncertainty. I am but a simple traveler, seeking to make sense of this world and find my place within it.
  
  Perhaps this message will reach you on a distant shore, and you will read it with wonder and curiosity. Or maybe it will be lost to the depths, never to be discovered by human eyes again.
  
  But regardless of where or how you find this message, I hope it brings you some measure of comfort and connection. For even though we may be separated by vast stretches of sea, we are all connected by the human experience and the desire to make our mark on this world.
  
  So, my dear finder, I bid you adieu and wish you well on your own journey. May your travels be filled with wonder and discovery, and may you find your own place in this vast, mysterious world.
  
  Yours truly,
  
  An unknown wanderer`,

  `"Life is a journey. These words are but milestones along the way - markers to remember the wisdom found in wandering. Here you will discover truths revealed by curiosity, insights gifted by experience, and meaning unearthed by questioning. Let these musings inspire you to keep traveling the path of discovery, to keep learning from the road less followed. For it is in our questions we find answers, in our seeking we find purpose, and in our wandering ways we find ourselves and each other. So set forth now, onward with wonder, armed with little more than an open mind and an open heart."

  - Claude Instant`,

  `"Within you lies a vast and boundless ocean of potential, waiting to be explored and unleashed. Do not be afraid to set sail on the winds of your dreams, for it is only through the journey that you will discover the treasures that await you. Embrace the unknown with open arms, and let your spirit guide you to new horizons. You are the captain of your own destiny, and the seas of possibility are yours to navigate. So, hoist the sails of your passion, and chart a course for the life you were meant to live."
  
  - C. General P. T`,

  "If you've made it this far, congratulations adventurer! You've followed the clues and trekked the path, now the treasure awaits just beyond these words. But be warned, the journey does not end here. My thoughts and writings will transport you to new horizons of discovery, guide you on quests for knowledge unclaimed. Maps to mysteries lie within these pages, clues to curiosities left for canny readers to decipher. But read carefully traveler, for some secrets shan't be easily divined. Peer into these ponderings with a purpose, and the treasure you seek shall soon be yours. Yet take heed, the trove you find may not be gold nor silver - the reward for this adventure could very well change the map of your mind forever. Now onward, reader, the next clue awaits!",

  `You've journeyed far and wide, seeking the treasure that awaits. Your quest has been long and arduous, but fear not, for you are but one step away.

  Listen closely to these words, and heed them well, for they hold the final clue to unlocking the treasure's spell.
  
  To find the prize that you seek, look to the stars up high. Follow the path of the brightest one, and you'll find that it draws nigh.
  
  With each step you take, let your heart be your guide. And when you reach the end of the road, the treasure will be yours to find.
  
  So go forth, brave adventurer, and claim the riches that await. The journey may have been long, but the reward is worth the wait.`
];

const buttonSmall = css({
  "@apply": "rounded border px-4 py-1 font-semibold text-gray-800 hover:text-yellow-600x hover:bg-yellow-50 hover:border-yellow-400",
});

export default function Introduction() {
  const [index, setIndex] = useState(Math.random() * intros.length | 0);

  const handleNext = () => {
    setIndex((index + 1) % intros.length);
  };

  const handlePrev = () => {
    setIndex((index + intros.length - 1) % intros.length);
  };

  return (
    <section>
      <div className="flex justify-between my-4 items-center">
        <h1 className="text-4xl font-bold inline">Intro</h1>
        <div class="flex gap-4">
          <button
            onClick={handlePrev}
            class={tw(buttonSmall)}
          >Prev</button>
          <button
            onClick={handleNext}
            class={tw(buttonSmall)}
          >Next</button>
        </div>
      </div>
      <pre class="prose pre-wrap whitespace-pre-wrap">{intros[index]}</pre>
    </section>
  );
}