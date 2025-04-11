import { inHouseAnalytics } from "@/utils/gtag";
import { sendGAEvent } from "@next/third-parties/google";
import LiteYouTubeEmbed, { imgResolution } from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeEmbedType {
  videoId: string;
  title: string;
  poster: imgResolution;
}

/**
 * Renders a YouTube video embed component with analytics tracking.
 *
 * @param {YoutubeEmbedType} props - The properties for the YoutubeEmbed component.
 * @returns {JSX.Element} - A React JSX element representing the embedded YouTube video.
 */
export function YoutubeEmbed({ videoId, title, poster }: YoutubeEmbedType) {
  /**
   * Handles the play action by sending analytics events to Google Analytics (GA) and internal analytics system.
   *
   * @function
   */
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
