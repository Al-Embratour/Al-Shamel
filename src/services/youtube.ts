const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
// حط هنا الـ ID بتاع قناتك، بيبدأ بـ UC
const CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE'; 

export const getYouTubeVideos = async () => {
  try {
    const response = await fetch(
      `https://youtube.com/@alrahawy?si=O8w9L8c7kuw5gyzl?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};