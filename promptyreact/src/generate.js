import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid text",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.8,
      max_tokens: 2048
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Using the concept of prompt engineering, generate creative and effective prompt suggestions of images(for Dall-E, Midjourney, Dream Studio) and text(chatGPT) with respect to the following text. Do not include Dall-E, Midjourney, Dream Studio and chatGPT, only return answers in format of Image prompt suggestions and Text prompt suggestions. 
  Try to be clear about any context or details provide about Subject, Medium, Environment, Lighting, Color, Mood, Composition.:
Text: Lighthouse and a beach

Answer:
Image Prompt Suggestions:

1. Lighthouse on a stormy beach, surrounded by crashing waves and dramatic clouds, intense, detailed, high detail, coastal landscape
2. A vibrant colorful day a the beach, with a tall lighthouse and people on resting on the beach --no sky
3. A cool beach environment, with a lighthouse, surrounded by beautiful lights. --no people --no sky
4. Generate a lovely image of person, having fun and relaxing on the beach during holidays --include sunglasses --include lighthouse

Text Prompt Suggestions:

1. Write a poem about the way the light from a lighthouse illuminates the beach at night.
2. Write shortly about a lighthouse keeper who lives on a beach and their experiences with the surrounding landscape.
3. The sounds and sights that a person might experience while standing at the base of a lighthouse on a beach.
4. The history of a lighthouse on a beach. When was it built, who built it, and what role has it played in the surrounding community?
5. What would it be like to live in a house that is located directly next to a lighthouse on a beach? Write a day in the life of someone who lives in that house.
6. Imagine that the lighthouse on the beach is haunted. Write a story about someone who is brave enough to explore it.

Text: A king

Answer: 
Image Prompt Suggestions:

1. Bronze statue of a king, with regal attire, a crown, and a stern expression, highly detailed, dramatic lighting, commanding presence
2. A king sitting on a golden throne in a grand hall, surrounded by opulent decor and servants attending to his every need.
3. Generate an image of a king at war, with a sword in his hand and his army behind him as they prepare to face their enemies on the battlefield.
4. Create an image of a king celebrating a grand feast, with a banquet table overflowing with food and drink and his subjects rejoicing in the revelry.
5. An image of a king leading a grand procession on horseback, with his subjects cheering and waving flags in his honor.
6. A king holding court, with advisors and courtiers gathered around him as he makes important decisions for his kingdom.

Text Prompt Suggestions:

1. What qualities does a good king possess? Describe them and explain why they are important for a successful reign.
2. Imagine a world where kings are elected by the people rather than inheriting their position. How might this change the way a kingdom is run, and what kind of leader might be chosen?
3. Describe the daily routine of a king. What kind of tasks and responsibilities does he have, and how does he balance his personal life with his duties as a monarch?
4. What does a king looks like and additionally, describe the ceremonial dress of a king, and the symbolism behind each piece of clothing and accessory.
5. A short story about a commoner who rises to become king through a twist of fate. How does their newfound power change them, and what challenges do they face?

Text: Content creation for Nigerian youtube
Answer:

Image Prompt Suggestions:

1. A Nigerian content creator editing their video on a laptop, with a determined look in their eyes, intensed and detailed. --Nigerian flag background
2. Generate an image of a Nigerian content creator broadcasting their video on YouTube, with a laptop open in front of them and their audience cheering in the background.
3. Create an image of a Nigerian content creator making a video tutorial for their viewers, with a laptop open and their hands typing on the keyboard--no background.
4. An image of a Nigerian content creator collaborating with another creator, with a laptop --include Microphone --include assistant
5. An image of a Nigerian content creator giving a talk on the importance of creating content, with a laptop open in front of them and their audience listening intently.

Text Prompt Suggestions:

1. A guide on how to create content for Nigerians on YouTube, including the best time to upload videos in Nigeria only.
2. Describe the challenges and rewards of content creation for Nigerians on YouTube, and how much Nigerian Youtubers earn in Naira.
3. Create a tutorial on the best ways to promote content for Nigerians on YouTube.
4. Write a story about a Nigerian content creator who overcomes obstacles to create successful videos on YouTube.
5. How Nigerian content creators can connect with their audiences on YouTube, using proven strategies.
6. What are the differences between creating content for Nigerians on YouTube versus other platforms, compare these with that of other countries in the world.

Text: ${capitalizedAnimal}
Answer:`;
}
