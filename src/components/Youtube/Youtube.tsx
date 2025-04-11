import { inHouseAnalytics } from "@/utils/gtag";
import { sendGAEvent } from "@next/third-parties/google";
import LiteYouTubeEmbed, { imgResolution } from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeEmbedType {
  videoId: string;
  title: string;
  poster: imgResolution;
}

export function YoutubeEmbed({ videoId, title, poster }: YoutubeEmbedType) {
  const handlePlay = () => {
    sendGAEvent("event", "video_view");
    inHouseAnalytics("video_view",{"videoId": "-1"})
  };

  return (
    <LiteYouTubeEmbed
      id={videoId}
      title={title}
      poster={poster}
      cookie={true}
      webp
      onIframeAdded={handlePlay}
    />
  );
}
